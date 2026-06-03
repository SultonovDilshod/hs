const { useState, useEffect, useRef, useMemo, useCallback } = React;

const CHAPTER_COLORS = {
  '07':'#10B981','33':'#F59E0B','49':'#8B5CF6','61':'#EC4899',
  '64':'#F97316','69':'#14B8A6','72':'#6366F1','73':'#1D4ED8',
  '78':'#A78BFA','84':'#3B82F6','85':'#EF4444','87':'#22D3EE',
  '39':'#D946EF','40':'#FB923C','94':'#84CC16',
};

const COUNTRY_NAMES = {
  '156':'Xitoy','276':'Germaniya','392':'Yaponiya','410':'Koreya',
  '840':'AQSh','036':'Avstraliya','764':'Tailand','682':'Saudiya',
  '356':'Hindiston',
};

// ─── LAYOUT / DISPLAY TUNABLES ────────────────────────────────────────────
// Edit these to change how the graph renders. Reload the page to see effects.
const LAYOUT = {
  // When the visible node count is at or under this, use the "cose" layout
  // (organic, spring-based). Above it, fall back to "concentric" which is
  // much faster on large graphs.
  coseMaxNodes: 900,

  // "cose" layout tuning. Most edges in this dataset are between codes that
  // don't share a neighbour, so the graph has *many* small components. The
  // critical knob for that case is `componentSpacing` — cytoscape's default
  // (40) spreads components so far apart that fit-to-viewport shrinks the
  // main cluster to a dot. Keep it small.
  //
  // - nodeRepulsion: higher = nodes inside a component push each other further apart.
  // - idealEdgeLength: target distance between connected nodes, in pixels.
  // - componentSpacing: gap between disconnected sub-graphs. Lower = tighter overall layout.
  // - gravity: pull toward the centre. Higher = less spread.
  // - numIter: more iterations = better layout but slower.
  cose: {
    nodeRepulsion: 500,
    idealEdgeLength: 60,
    componentSpacing: 20,
    gravity: 4.2,
    numIter: 250,
  },

  // After the layout finishes, zoom out so all elements are visible plus
  // this much padding (in pixels). Increase if labels get clipped at edges.
  fitPadding: 40,
};

// Format an HS code with spaces so it's easier to read in the UI:
//   10 digits → "1234 56 78 99"   (4-2-2-2 grouping used in customs)
//    8 digits → "1234 56 78"
//    6 digits → "1234 56"
// Anything else is returned unchanged. The original id is never modified —
// this is only used for display.
function formatHs(code) {
  if (!code) return '';
  const s = String(code);
  if (s.length === 10) return `${s.slice(0,4)} ${s.slice(4,6)} ${s.slice(6,8)} ${s.slice(8,10)}`;
  if (s.length === 8)  return `${s.slice(0,4)} ${s.slice(4,6)} ${s.slice(6,8)}`;
  if (s.length === 6)  return `${s.slice(0,4)} ${s.slice(4,6)}`;
  return s;
}

window.NetworkAnalysisPage = () => {
  const [hsLevel, setHsLevel] = useState('10');
  const [period, setPeriod] = useState('3m');
  const [weightMetric, setWeightMetric] = useState('frequency');
  const [nodeColor, setNodeColor] = useState('uniform');
  const [nodeSize, setNodeSize] = useState('uniform');
  const [importerFilter, setImporterFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [chapterFilter, setChapterFilter] = useState('all');
  const [topN, setTopN] = useState(50);
  const [minEdge, setMinEdge] = useState(1);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const searchTimerRef = useRef(null);

  // Debounce search
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, [searchTerm]);

  const dataKey = `${hsLevel}_${period}`;
  const amendments = MOCK.network[`amendments_${dataKey}`] || [];
  const declarations = MOCK.network[`declarations_${dataKey}`] || [];

  // Filtered data
  const filteredAmendments = useMemo(() => {
    return amendments.filter(r =>
      (importerFilter === 'all' || r.importer === importerFilter) &&
      (countryFilter === 'all' || r.country_of_origin === countryFilter)
    );
  }, [amendments, importerFilter, countryFilter]);

  const filteredDeclarations = useMemo(() => {
    return declarations.filter(r =>
      (importerFilter === 'all' || r.importer === importerFilter) &&
      (countryFilter === 'all' || r.country_of_origin === countryFilter)
    );
  }, [declarations, importerFilter, countryFilter]);

  // Build declarations lookup for amendment rate
  const declLookup = useMemo(() => {
    const map = {};
    filteredDeclarations.forEach(d => {
      const key = `${d.hs_code}|${d.importer}|${d.country_of_origin}`;
      map[key] = (map[key] || 0) + d.count;
    });
    return map;
  }, [filteredDeclarations]);

  // Unique importers and countries from full (unfiltered) data
  const uniqueImporters = useMemo(() => {
    const s = new Set();
    amendments.forEach(r => { if (r.importer) s.add(r.importer); });
    declarations.forEach(r => { if (r.importer) s.add(r.importer); });
    return [...s].sort();
  }, [amendments, declarations]);

  const uniqueCountries = useMemo(() => {
    const s = new Set();
    amendments.forEach(r => { if (r.country_of_origin) s.add(r.country_of_origin); });
    declarations.forEach(r => { if (r.country_of_origin) s.add(r.country_of_origin); });
    return [...s].sort();
  }, [amendments, declarations]);

  const hasImporterData = uniqueImporters.length > 0;
  const hasCountryData = uniqueCountries.length > 0;

  // Aggregate edges
  const edgeMap = useMemo(() => {
    const map = {};
    filteredAmendments.forEach(r => {
      const key = `${r.first_hs_code}\u2192${r.corrected_hs_code}`;
      if (!map[key]) map[key] = { source: r.first_hs_code, target: r.corrected_hs_code, frequency: 0, tax: 0, amendCount: 0, declCount: 0, importers: new Set() };
      map[key].frequency += r.count;
      map[key].tax += r.tax_amount;
      map[key].importers.add(r.importer);
      const declKey = `${r.first_hs_code}|${r.importer}|${r.country_of_origin}`;
      map[key].amendCount += r.count;
      map[key].declCount += (declLookup[declKey] || 0);
    });
    return map;
  }, [filteredAmendments, declLookup]);

  // Chapter (2-digit HS) stats for the chapter filter dropdown.
  const chapterStats = useMemo(() => {
    const ch = {};
    Object.values(edgeMap).forEach(e => {
      const a = e.source.slice(0, 2);
      const b = e.target.slice(0, 2);
      ch[a] = (ch[a] || 0) + e.frequency;
      if (b !== a) ch[b] = (ch[b] || 0) + e.frequency;
    });
    return Object.entries(ch).sort((a, b) => b[1] - a[1]);
  }, [edgeMap]);

  // Compute node amendment counts for sizing
  const nodeAmendCounts = useMemo(() => {
    const counts = {};
    Object.values(edgeMap).forEach(e => {
      counts[e.source] = (counts[e.source] || 0) + e.frequency;
      counts[e.target] = (counts[e.target] || 0) + e.frequency;
    });
    return counts;
  }, [edgeMap]);

  // Build graph elements
  const { nodeElements, edgeElements, maxWeight, summaryStats, totalCandidates } = useMemo(() => {
    const nodes = new Set();
    const edges = [];
    let totalAmend = 0, totalTax = 0;
    const declaredSet = new Set(), correctedSet = new Set();
    const pairCounts = [];

    // 1. Compute weight per candidate and apply count + chapter filters.
    const computeWeight = e => {
      if (weightMetric === 'frequency') return e.frequency;
      if (weightMetric === 'tax') return e.tax;
      return e.declCount > 0 ? e.frequency / e.declCount : 0;
    };

    let candidates = Object.values(edgeMap).filter(e => {
      if (e.frequency < minEdge) return false;
      if (chapterFilter !== 'all') {
        const a = e.source.slice(0, 2);
        const b = e.target.slice(0, 2);
        if (a !== chapterFilter && b !== chapterFilter) return false;
      }
      return true;
    });

    const totalCount = candidates.length;

    // 2. Sort by weight desc and keep only the top N (so the layout actually renders).
    candidates.sort((a, b) => computeWeight(b) - computeWeight(a));
    if (topN !== 'all' && candidates.length > topN) {
      candidates = candidates.slice(0, topN);
    }

    // 3. Build edge/node elements from the surviving candidates.
    candidates.forEach(e => {
      const weight = computeWeight(e);
      nodes.add(e.source);
      nodes.add(e.target);
      declaredSet.add(e.source);
      correctedSet.add(e.target);
      totalAmend += e.frequency;
      totalTax += e.tax;
      pairCounts.push({ source: e.source, target: e.target, count: e.frequency, tax: e.tax });

      edges.push({
        group: 'edges',
        data: {
          id: `${e.source}\u2192${e.target}`,
          source: e.source,
          target: e.target,
          weight,
          frequency: e.frequency,
          tax: e.tax,
          rate: e.declCount > 0 ? (e.frequency / e.declCount) : null,
          importerCount: e.importers.size,
        }
      });
    });

    const maxW = edges.length > 0 ? Math.max(...edges.map(e => e.data.weight)) : 1;

    // Compute top 20% weight threshold for edge labels
    const sortedWeights = edges.map(e => e.data.weight).sort((a, b) => a - b);
    const top20Threshold = sortedWeights.length > 0
      ? sortedWeights[Math.floor(sortedWeights.length * 0.8)]
      : Infinity;

    // Normalize edge widths and assign labels
    edges.forEach(e => {
      const norm = maxW > 0 ? e.data.weight / maxW : 0;
      e.data.width = 1 + norm * 7;
      e.data.opacity = 0.4 + norm * 0.4;

      // Edge label for top 20%
      if (e.data.weight >= top20Threshold) {
        if (weightMetric === 'frequency') {
          e.data.edgeLabel = String(e.data.frequency);
        } else if (weightMetric === 'tax') {
          e.data.edgeLabel = formatCurrency(e.data.tax);
        } else {
          e.data.edgeLabel = e.data.rate !== null ? (e.data.rate * 100).toFixed(0) + '%' : '';
        }
      } else {
        e.data.edgeLabel = '';
      }
    });

    const getColor = (code) => {
      if (nodeColor === 'uniform') return '#1D4ED8';
      return CHAPTER_COLORS[code.substring(0, 2)] || '#1D4ED8';
    };

    // Node sizing
    const allCounts = [...nodes].map(code => nodeAmendCounts[code] || 0);
    const minCount = allCounts.length > 0 ? Math.min(...allCounts) : 0;
    const maxCount = allCounts.length > 0 ? Math.max(...allCounts) : 0;
    const countRange = maxCount - minCount || 1;

    const nodeEls = [...nodes].map(code => {
      let size = 22;
      if (nodeSize === 'volume') {
        const c = nodeAmendCounts[code] || 0;
        size = 20 + ((c - minCount) / countRange) * 40;
      }
      return {
        group: 'nodes',
        data: { id: code, label: formatHs(code), color: getColor(code), nodeWidth: size, nodeHeight: size }
      };
    });

    pairCounts.sort((a, b) => b.count - a.count);
    const top5 = pairCounts.slice(0, 5);

    return {
      nodeElements: nodeEls,
      edgeElements: edges,
      maxWeight: maxW,
      summaryStats: { totalAmend, totalTax, declaredCount: declaredSet.size, correctedCount: correctedSet.size, top5 },
      totalCandidates: totalCount,
    };
  }, [edgeMap, filteredDeclarations, minEdge, weightMetric, nodeColor, nodeSize, nodeAmendCounts, chapterFilter, topN]);

  // Max edge for slider
  const maxEdgeCount = useMemo(() => {
    const counts = Object.values(edgeMap).map(e => e.frequency);
    return counts.length > 0 ? Math.max(...counts) : 1;
  }, [edgeMap]);

  // Initialize Cytoscape
  useEffect(() => {
    if (!containerRef.current) return;
    const cy = cytoscape({
      container: containerRef.current,
      style: [
        { selector: 'node', style: {
          'background-color': 'data(color)',
          'label': 'data(label)',
          'font-size': '9px',
          'color': '#1E293B',
          'text-outline-color': '#FFFFFF',
          'text-outline-width': 1.5,
          'text-valign': 'bottom',
          'text-margin-y': 4,
          'width': 'data(nodeWidth)',
          'height': 'data(nodeHeight)',
          'border-width': 0,
          'border-color': '#F59E0B',
          'transition-property': 'width, height, border-width, border-color, opacity, background-color',
          'transition-duration': '200ms',
        }},
        { selector: 'edge', style: {
          'width': 'data(width)',
          'line-color': '#94A3B8',
          'line-opacity': 'data(opacity)',
          'target-arrow-color': '#94A3B8',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.7,
          'curve-style': 'bezier',
          'label': 'data(edgeLabel)',
          'font-size': '10px',
          'color': '#1E293B',
          'text-background-color': '#FFFFFF',
          'text-background-opacity': 0.75,
          'text-background-padding': '2px',
          'text-background-shape': 'roundrectangle',
          'text-margin-y': -8,
          'transition-property': 'line-opacity, width, line-color, target-arrow-color',
          'transition-duration': '200ms',
        }},
        { selector: '.dimmed', style: {
          'opacity': 0.15,
        }},
        { selector: 'edge.dimmed', style: {
          'line-opacity': 0.08,
        }},
        { selector: 'node.highlighted', style: {
          'border-width': 2,
          'border-color': '#F59E0B',
        }},
        { selector: 'node.neighbor', style: {
          'border-width': 1.5,
          'border-color': '#F59E0B',
        }},
        { selector: 'edge.highlighted', style: {
          'line-opacity': 1,
          'line-color': '#F59E0B',
          'target-arrow-color': '#F59E0B',
        }},
        { selector: 'node:active, node:selected', style: {
          'border-width': 2.5,
          'border-color': '#F59E0B',
          'background-color': '#F59E0B',
        }},
        { selector: 'edge:active, edge:selected', style: {
          'line-color': '#F59E0B',
          'target-arrow-color': '#F59E0B',
          'line-opacity': 1,
        }},
        // Search highlight styles
        { selector: 'node.search-match', style: {
          'border-width': 2.5,
          'border-color': '#1D4ED8',
          'background-color': 'data(color)',
          'z-index': 10,
        }},
        { selector: '.search-dimmed', style: {
          'opacity': 0.15,
        }},
        { selector: 'edge.search-dimmed', style: {
          'line-opacity': 0.08,
        }},
      ],
      layout: { name: 'cose', animate: false },
      minZoom: 0.2,
      maxZoom: 4,
      wheelSensitivity: 0.3,
    });
    cyRef.current = cy;

    cy.on('tap', 'node', (e) => {
      const nd = e.target.data();
      let outCount = 0, inCount = 0, outTax = 0, inTax = 0;
      const connected = {};
      Object.values(edgeMap).forEach(ed => {
        if (ed.source === nd.id) {
          outCount += ed.frequency; outTax += ed.tax;
          const k = ed.target;
          connected[k] = connected[k] || { code: k, dir: '\u2192', count: 0, tax: 0 };
          connected[k].count += ed.frequency; connected[k].tax += ed.tax;
        }
        if (ed.target === nd.id) {
          inCount += ed.frequency; inTax += ed.tax;
          const k = ed.source;
          connected[k] = connected[k] || { code: k, dir: '\u2190', count: 0, tax: 0 };
          connected[k].count += ed.frequency; connected[k].tax += ed.tax;
        }
      });
      const top5 = Object.values(connected).sort((a, b) => b.count - a.count).slice(0, 5);
      setSelected({ type: 'node', data: { id: nd.id, outCount, inCount, outTax, inTax, totalTax: outTax + inTax, top5 } });
    });

    cy.on('tap', 'edge', (e) => {
      const ed = e.target.data();
      setSelected({ type: 'edge', data: ed });
    });

    cy.on('tap', (e) => {
      if (e.target === cy) setSelected(null);
    });

    // Hover highlight — node
    cy.on('mouseover', 'node', (e) => {
      const node = e.target;
      const neighborhood = node.neighborhood();
      cy.elements().addClass('dimmed');
      node.removeClass('dimmed').addClass('highlighted');
      neighborhood.removeClass('dimmed');
      neighborhood.nodes().addClass('neighbor');
      neighborhood.edges().addClass('highlighted');
      containerRef.current.style.cursor = 'pointer';
    });

    cy.on('mouseout', 'node', () => {
      cy.elements().removeClass('dimmed highlighted neighbor');
      // Re-apply search highlight if active
      applySearchHighlight();
      containerRef.current.style.cursor = '';
    });

    // Hover highlight — edge
    cy.on('mouseover', 'edge', (e) => {
      const edge = e.target;
      const srcNode = edge.source();
      const tgtNode = edge.target();
      cy.elements().addClass('dimmed');
      edge.removeClass('dimmed').addClass('highlighted');
      srcNode.removeClass('dimmed').addClass('neighbor');
      tgtNode.removeClass('dimmed').addClass('neighbor');
      containerRef.current.style.cursor = 'pointer';
    });

    cy.on('mouseout', 'edge', () => {
      cy.elements().removeClass('dimmed highlighted neighbor');
      applySearchHighlight();
      containerRef.current.style.cursor = '';
    });

    return () => cy.destroy();
  }, []);

  // Function to apply search highlight (called after hover clears)
  const applySearchHighlight = useCallback(() => {
    const cy = cyRef.current;
    if (!cy || !debouncedSearch) return;

    const term = debouncedSearch.toLowerCase();
    const matches = cy.nodes().filter(n => {
      const id = n.data('id').toLowerCase();
      return id.startsWith(term) || id.includes(term);
    });

    if (matches.length > 0) {
      cy.elements().addClass('search-dimmed');
      matches.removeClass('search-dimmed').addClass('search-match');
      // Also show connected edges
      matches.connectedEdges().removeClass('search-dimmed');
    }
  }, [debouncedSearch]);

  // Search highlight effect
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Clear previous search highlights
    cy.elements().removeClass('search-match search-dimmed');

    if (!debouncedSearch) return;

    const term = debouncedSearch.toLowerCase();
    const matches = cy.nodes().filter(n => {
      const id = n.data('id').toLowerCase();
      return id.startsWith(term) || id.includes(term);
    });

    if (matches.length === 0) return;

    // Dim everything, highlight matches
    cy.elements().addClass('search-dimmed');
    matches.removeClass('search-dimmed').addClass('search-match');
    matches.connectedEdges().removeClass('search-dimmed');

    // If exactly one match, zoom to it
    if (matches.length === 1) {
      cy.animate({
        center: { eles: matches },
        zoom: 2.5,
      }, { duration: 400 });
    }
  }, [debouncedSearch]);

  // Update graph when data changes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().remove();
    if (nodeElements.length > 0) {
      cy.add([...nodeElements, ...edgeElements]);
      const big = nodeElements.length > LAYOUT.coseMaxNodes;
      const layout = cy.layout(big
        ? { name: 'concentric', animate: false, fit: true, padding: LAYOUT.fitPadding,
            concentric: n => n.degree(), levelWidth: () => 4 }
        : {
            name: 'cose',
            animate: false,
            fit: true,
            randomize: false,
            numIter: LAYOUT.cose.numIter,
            nodeRepulsion: () => LAYOUT.cose.nodeRepulsion,
            idealEdgeLength: () => LAYOUT.cose.idealEdgeLength,
            componentSpacing: LAYOUT.cose.componentSpacing,
            gravity: LAYOUT.cose.gravity,
            padding: LAYOUT.fitPadding,
          }
      );
      // Force a fit after the layout settles so the viewport always frames
      // every node, regardless of how the layout positioned them.
      layout.one('layoutstop', () => cy.fit(cy.elements(), LAYOUT.fitPadding));
      layout.run();
    }
  }, [nodeElements, edgeElements]);

  // Update node click handler when edgeMap changes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.removeListener('tap', 'node');
    cy.on('tap', 'node', (e) => {
      const nd = e.target.data();
      let outCount = 0, inCount = 0, outTax = 0, inTax = 0;
      const connected = {};
      Object.values(edgeMap).forEach(ed => {
        if (ed.source === nd.id) {
          outCount += ed.frequency; outTax += ed.tax;
          const k = ed.target;
          connected[k] = connected[k] || { code: k, dir: '\u2192', count: 0, tax: 0 };
          connected[k].count += ed.frequency; connected[k].tax += ed.tax;
        }
        if (ed.target === nd.id) {
          inCount += ed.frequency; inTax += ed.tax;
          const k = ed.source;
          connected[k] = connected[k] || { code: k, dir: '\u2190', count: 0, tax: 0 };
          connected[k].count += ed.frequency; connected[k].tax += ed.tax;
        }
      });
      const top5 = Object.values(connected).sort((a, b) => b.count - a.count).slice(0, 5);
      setSelected({ type: 'node', data: { id: nd.id, outCount, inCount, outTax, inTax, totalTax: outTax + inTax, top5 } });
    });
  }, [edgeMap]);

  // Zoom controls
  const handleZoomIn = () => {
    const cy = cyRef.current;
    if (!cy) return;
    const center = { x: cy.width() / 2, y: cy.height() / 2 };
    cy.animate({ zoom: { level: cy.zoom() * 1.3, renderedPosition: center } }, { duration: 200 });
  };

  const handleZoomOut = () => {
    const cy = cyRef.current;
    if (!cy) return;
    const center = { x: cy.width() / 2, y: cy.height() / 2 };
    cy.animate({ zoom: { level: cy.zoom() / 1.3, renderedPosition: center } }, { duration: 200 });
  };

  const handleFit = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.animate({ fit: { eles: cy.elements(), padding: 30 } }, { duration: 200 });
  };

  // Export PNG
  const handleExport = () => {
    const cy = cyRef.current;
    if (!cy) return;
    const png = cy.png({ full: true, bg: '#FFFFFF', scale: 2 });
    const link = document.createElement('a');
    link.href = png;
    link.download = `tarmoq_tahlili_${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  };

  // Toggle button helper
  const ToggleBtn = ({ active, onClick, children }) => (
    <button onClick={onClick}
      className={`px-3 py-1 rounded text-xs font-medium transition-all ${
        active ? 'bg-blue-600/15 text-blue-700 border border-blue-500/40'
               : 'bg-[#F1F5F9] text-gray-600 border border-transparent hover:text-gray-700'
      }`}>{children}</button>
  );

  // Summary panel
  const SummaryPanel = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Umumiy ko'rsatkichlar</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Jami tuzatishlar</div>
          <div className="text-lg font-bold text-blue-700">{formatNumber(summaryStats.totalAmend)}</div>
        </div>
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Jami summa</div>
          <div className="text-lg font-bold text-blue-700">{formatCurrency(summaryStats.totalTax)}</div>
        </div>
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Deklarat. kodlar</div>
          <div className="text-lg font-bold text-gray-900">{summaryStats.declaredCount}</div>
        </div>
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Tuzatilgan kodlar</div>
          <div className="text-lg font-bold text-gray-900">{summaryStats.correctedCount}</div>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-gray-600 mb-2">Top 5 juftliklar</h4>
        <div className="space-y-1.5">
          {summaryStats.top5.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-[#F1F5F9] rounded px-2.5 py-1.5">
              <span className="text-[10px] font-mono text-gray-700">{formatHs(p.source)} <span className="text-blue-700">{'\u2192'}</span> {formatHs(p.target)}</span>
              <span className="text-[10px] font-semibold text-blue-700">{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Node detail panel
  const NodeDetail = ({ data }) => (
    <div className="space-y-4">
      <div>
        <div className="text-[10px] text-gray-500 mb-1">TIF TN kod</div>
        <h3 className="text-lg font-bold font-mono text-gray-900">{formatHs(data.id)}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Chiquvchi tuzatishlar</div>
          <div className="text-base font-bold text-blue-700">{data.outCount}</div>
        </div>
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Kiruvchi tuzatishlar</div>
          <div className="text-base font-bold text-blue-700">{data.inCount}</div>
        </div>
      </div>
      <div className="bg-[#F1F5F9] rounded-lg p-3">
        <div className="text-[10px] text-gray-500 mb-1">Jami to'lov summasi</div>
        <div className="text-base font-bold text-blue-700">{formatCurrency(data.totalTax)}</div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-gray-600 mb-2">Eng ko'p bog'langan kodlar</h4>
        <div className="space-y-1.5">
          {data.top5.map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-[#F1F5F9] rounded px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-blue-700">{c.dir}</span>
                <span className="text-[10px] font-mono text-gray-700">{formatHs(c.code)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-gray-900">{c.count}</span>
                <span className="text-[10px] text-gray-500 ml-2">{formatCurrency(c.tax)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Edge detail panel
  const EdgeDetail = ({ data }) => (
    <div className="space-y-4">
      <div>
        <div className="text-[10px] text-gray-500 mb-1">Tuzatish yo'nalishi</div>
        <h3 className="text-sm font-bold font-mono text-gray-900">{formatHs(data.source)} <span className="text-blue-700">{'\u2192'}</span> {formatHs(data.target)}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Chastota</div>
          <div className="text-base font-bold text-blue-700">{data.frequency}</div>
        </div>
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">To'lov summasi</div>
          <div className="text-base font-bold text-blue-700">{formatCurrency(data.tax)}</div>
        </div>
      </div>
      <div className="bg-[#F1F5F9] rounded-lg p-3">
        <div className="text-[10px] text-gray-500 mb-1">Importyorlar soni</div>
        <div className="text-base font-bold text-gray-900">{data.importerCount}</div>
      </div>
      {data.rate !== null && (
        <div className="bg-[#F1F5F9] rounded-lg p-3">
          <div className="text-[10px] text-gray-500 mb-1">Tuzatish darajasi</div>
          <div className="text-base font-bold text-amber-600">{(data.rate * 100).toFixed(1)}%</div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{animation:'fadeInUp 0.4s ease'}}>
      {/* Controls */}
      <div className="glass rounded-xl p-4 mb-4 flex items-center gap-5 flex-wrap" style={{animation:'fadeInUp 0.3s ease'}}>
        {/* HS level */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">TIF TN daraja:</span>
          <ToggleBtn active={hsLevel==='6'} onClick={() => setHsLevel('6')}>6 xona</ToggleBtn>
          <ToggleBtn active={hsLevel==='10'} onClick={() => setHsLevel('10')}>10 xona</ToggleBtn>
        </div>

        <div className="w-px h-6 bg-gray-300"/>

        {/* Period */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Davr:</span>
          <ToggleBtn active={period==='1y'} onClick={() => setPeriod('1y')}>1 yil</ToggleBtn>
          <ToggleBtn active={period==='3m'} onClick={() => setPeriod('3m')}>3 oy</ToggleBtn>
        </div>

        <div className="w-px h-6 bg-gray-300"/>

        {/* Weight metric */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Bog'lanish og'irligi:</span>
          <ToggleBtn active={weightMetric==='frequency'} onClick={() => setWeightMetric('frequency')}>Chastota</ToggleBtn>
          <ToggleBtn active={weightMetric==='tax'} onClick={() => setWeightMetric('tax')}>To'lov summasi</ToggleBtn>
          <ToggleBtn active={weightMetric==='rate'} onClick={() => setWeightMetric('rate')}>Tuzatish darajasi</ToggleBtn>
        </div>

        <div className="w-px h-6 bg-gray-300"/>

        {/* Node color */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Tugun rangi:</span>
          <ToggleBtn active={nodeColor==='uniform'} onClick={() => setNodeColor('uniform')}>Bir xil</ToggleBtn>
          <ToggleBtn active={nodeColor==='chapter'} onClick={() => setNodeColor('chapter')}>Guruh</ToggleBtn>
        </div>

        <div className="w-px h-6 bg-gray-300"/>

        {/* Node size */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Tugun o'lchami:</span>
          <ToggleBtn active={nodeSize==='uniform'} onClick={() => setNodeSize('uniform')}>Bir xil</ToggleBtn>
          <ToggleBtn active={nodeSize==='volume'} onClick={() => setNodeSize('volume')}>Hajm bo'yicha</ToggleBtn>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-3 mb-4 flex items-center gap-5 flex-wrap" style={{animation:'fadeInUp 0.35s ease'}}>
        <Icon name="filter" size={13} className="text-gray-500"/>
        {hasImporterData && (
          <div className="flex items-center gap-2">
            <select value={importerFilter} onChange={e => { setImporterFilter(e.target.value); setSelected(null); }}
              className="rule-builder-field text-xs py-1 px-2 rounded bg-[#F1F5F9] border border-gray-300 text-gray-700">
              <option value="all">Barcha importyorlar</option>
              {uniqueImporters.map(imp => <option key={imp} value={imp}>{imp}</option>)}
            </select>
          </div>
        )}

        {hasCountryData && (
          <div className="flex items-center gap-2">
            <select value={countryFilter} onChange={e => { setCountryFilter(e.target.value); setSelected(null); }}
              className="rule-builder-field text-xs py-1 px-2 rounded bg-[#F1F5F9] border border-gray-300 text-gray-700">
              <option value="all">Barcha mamlakatlar</option>
              {uniqueCountries.map(c => <option key={c} value={c}>{COUNTRY_NAMES[c] || c} ({c})</option>)}
            </select>
          </div>
        )}

        {/* Chapter (2-digit HS) filter */}
        {chapterStats.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500">Guruh:</span>
            <select value={chapterFilter} onChange={e => { setChapterFilter(e.target.value); setSelected(null); }}
              className="rule-builder-field text-xs py-1 px-2 rounded bg-[#F1F5F9] border border-gray-300 text-gray-700">
              <option value="all">Barchasi ({chapterStats.length})</option>
              {chapterStats.map(([ch, n]) => (
                <option key={ch} value={ch}>{ch} — {n} ta</option>
              ))}
            </select>
          </div>
        )}

        {/* Top-N edges */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Eng yuqori:</span>
          {[20, 50, 100, 200, 'all'].map(n => (
            <ToggleBtn key={n} active={topN === n} onClick={() => setTopN(n)}>
              {n === 'all' ? 'Barchasi' : n}
            </ToggleBtn>
          ))}
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="search" size={12} className="text-gray-500 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"/>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="TIF TN kod qidirish..."
              className="text-xs py-1 pl-7 pr-7 rounded bg-[#F1F5F9] border border-gray-300 text-gray-700 placeholder-gray-400 w-40 focus:outline-none focus:border-blue-500/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Icon name="x" size={12}/>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Minimal uchrashish soni:</span>
          <input type="range" min="1" max={Math.max(maxEdgeCount, 2)} step="1" value={minEdge}
            onChange={e => setMinEdge(Number(e.target.value))}
            className="w-24 accent-blue-600"/>
          <span className="text-xs font-mono text-blue-700 w-6 text-center">{minEdge}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Tugunlar:</span>
          <span className="text-xs font-semibold text-gray-900">{nodeElements.length}</span>
          <span className="text-[10px] text-gray-500 ml-2">Bog'lanishlar:</span>
          <span className="text-xs font-semibold text-gray-900">
            {edgeElements.length}
            {totalCandidates > edgeElements.length && (
              <span className="text-gray-500 font-normal"> / {totalCandidates}</span>
            )}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-4" style={{animation:'fadeInUp 0.4s ease'}}>
        {/* Graph */}
        <div className="glass rounded-xl p-3 relative" style={{width:'73%'}}>
          <div ref={containerRef}
            style={{width:'100%', height:'580px', background:'#FFFFFF', borderRadius:'8px'}}/>

          {/* Zoom & Export controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-1.5" style={{zIndex:10}}>
            <button
              onClick={handleExport}
              title="PNG eksport"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-500/50 transition-all backdrop-blur-sm"
            >
              <Icon name="download" size={14}/>
            </button>
            <div className="w-full h-px bg-gray-300/50 my-0.5"/>
            <button
              onClick={handleZoomIn}
              title="Kattalashtirish"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-500/50 transition-all backdrop-blur-sm"
            >
              <Icon name="plus" size={14}/>
            </button>
            <button
              onClick={handleZoomOut}
              title="Kichiklashtirish"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-500/50 transition-all backdrop-blur-sm"
            >
              <Icon name="minus" size={14}/>
            </button>
            <button
              onClick={handleFit}
              title="Ekranga moslashtirish"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-500/50 transition-all backdrop-blur-sm"
            >
              <Icon name="maximize" size={14}/>
            </button>
          </div>
        </div>

        {/* Detail panel */}
        <div className="glass rounded-xl p-4 overflow-y-auto" style={{width:'27%', maxHeight:'620px'}}>
          {!selected && <SummaryPanel/>}
          {selected?.type === 'node' && <NodeDetail data={selected.data}/>}
          {selected?.type === 'edge' && <EdgeDetail data={selected.data}/>}
        </div>
      </div>
    </div>
  );
};
