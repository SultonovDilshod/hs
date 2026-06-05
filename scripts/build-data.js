#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'dashboard', 'data');
const MOCK_FILE = path.join(ROOT, 'dashboard', 'data.js');
const OUT_FILE = path.join(ROOT, 'dashboard', 'data.generated.js');

const INDICATOR_LABELS = {
  g33: "TIF TN kod",
  g8code2: "Importyor",
  g15: "Jo'natuvchi davlat",
  g34: "Mamlakat",
  g14code1: "Broker",
  g54regcode: "Deklarant",
};

function detectDelimiter(line) {
  const counts = { ';': 0, '\t': 0, ',': 0 };
  let inQuotes = false;
  for (const c of line) {
    if (c === '"') inQuotes = !inQuotes;
    else if (!inQuotes && counts.hasOwnProperty(c)) counts[c]++;
  }
  let best = ',', max = 0;
  for (const d of [';', '\t', ',']) {
    if (counts[d] > max) { max = counts[d]; best = d; }
  }
  return best;
}

function parseCSV(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  const delim = detectDelimiter(firstLine);
  const rows = [];
  let i = 0, field = '', row = [], inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i+1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQuotes = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === delim) { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const header = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).filter(r => r.some(v => v && v.trim() !== '')).map(r => {
    const o = {};
    header.forEach((h, idx) => { o[h] = (r[idx] ?? '').trim(); });
    return o;
  });
}

function readCSV(name) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) {
    console.warn(`[build-data] WARN: ${name} not found, skipping`);
    return null;
  }
  return parseCSV(fs.readFileSync(p, 'utf8'));
}

// ---- Minimal .xlsx reader (zip of XML) using only Node built-ins ----
function unzip(buf) {
  // Locate End Of Central Directory record.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip file');
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const entries = {};
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) break;
    const method = buf.readUInt16LE(off + 10);
    const compSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commLen = buf.readUInt16LE(off + 32);
    const lho = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);
    const lhNameLen = buf.readUInt16LE(lho + 26);
    const lhExtraLen = buf.readUInt16LE(lho + 28);
    const dataStart = lho + 30 + lhNameLen + lhExtraLen;
    const comp = buf.slice(dataStart, dataStart + compSize);
    entries[name] = method === 0 ? comp : zlib.inflateRawSync(comp);
    off += 46 + nameLen + extraLen + commLen;
  }
  return entries;
}

function decodeXml(s) {
  return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
          .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
          .replace(/&amp;/g, '&');
}

function colToIdx(ref) {
  const m = ref.match(/^[A-Za-z]+/);
  if (!m) return 0;
  let idx = 0;
  for (const ch of m[0].toUpperCase()) idx = idx * 26 + (ch.charCodeAt(0) - 64);
  return Math.max(idx - 1, 0);
}

function parseXLSX(buf) {
  const z = unzip(buf);
  const dec = k => (z[k] ? z[k].toString('utf8') : null);
  const shared = [];
  const ss = dec('xl/sharedStrings.xml');
  if (ss) {
    const reSi = /<si>([\s\S]*?)<\/si>/g; let m;
    while ((m = reSi.exec(ss))) {
      const reT = /<t[^>]*>([\s\S]*?)<\/t>/g; let tm, acc = '';
      while ((tm = reT.exec(m[1]))) acc += decodeXml(tm[1]);
      shared.push(acc);
    }
  }
  const sheetKey = Object.keys(z).filter(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort()[0];
  if (!sheetKey) return [];
  const xml = z[sheetKey].toString('utf8');
  const grid = [];
  const reRow = /<row[^>]*>([\s\S]*?)<\/row>/g; let rm;
  while ((rm = reRow.exec(xml))) {
    const cells = {}; let maxc = -1;
    const reC = /<c\s+([^>]*?)(\/>|>([\s\S]*?)<\/c>)/g; let cm;
    while ((cm = reC.exec(rm[1]))) {
      const attrs = cm[1]; const inner = cm[3] || '';
      const rref = (attrs.match(/r="([^"]+)"/) || [])[1] || '';
      const ci = rref ? colToIdx(rref) : 0;
      const t = (attrs.match(/t="([^"]+)"/) || [])[1];
      let val = '';
      if (t === 's') {
        const v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        val = v != null ? (shared[+v] ?? '') : '';
      } else if (t === 'inlineStr') {
        const reT = /<t[^>]*>([\s\S]*?)<\/t>/g; let tm;
        while ((tm = reT.exec(inner))) val += decodeXml(tm[1]);
      } else {
        const v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        val = v != null ? decodeXml(v) : '';
      }
      cells[ci] = val; maxc = Math.max(maxc, ci);
    }
    const arr = [];
    for (let i = 0; i <= maxc; i++) arr.push(String(cells[i] ?? '').trim());
    grid.push(arr);
  }
  const rows = grid.filter(r => r.some(v => v !== ''));
  if (!rows.length) return [];
  const header = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).map(r => {
    const o = {};
    header.forEach((h, idx) => { o[h] = (r[idx] ?? '').trim(); });
    return o;
  });
}

// Try <base>.xlsx first, then <base>.csv.
function readTable(base) {
  const xlsx = path.join(DATA_DIR, base + '.xlsx');
  if (fs.existsSync(xlsx)) return parseXLSX(fs.readFileSync(xlsx));
  const csv = path.join(DATA_DIR, base + '.csv');
  if (fs.existsSync(csv)) return parseCSV(fs.readFileSync(csv, 'utf8'));
  console.warn(`[build-data] WARN: ${base}.xlsx/.csv not found, skipping`);
  return null;
}

function num(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function nonEmpty(v) {
  return v !== '' && v != null ? v : null;
}

function loadMock() {
  const src = fs.readFileSync(MOCK_FILE, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.window.MOCK;
}

function buildIndicators(row) {
  const out = [INDICATOR_LABELS.g33];
  ['g8code2', 'g15', 'g34', 'g14code1', 'g54regcode'].forEach(k => {
    if (nonEmpty(row[k])) out.push(INDICATOR_LABELS[k]);
  });
  return out;
}

function buildConditions(row, level) {
  const parts = [`HS${level}=${row.g33}`];
  if (nonEmpty(row.g8code2))    parts.push(`Importer=${row.g8code2}`);
  if (nonEmpty(row.g15))        parts.push(`Departure=${row.g15}`);
  if (nonEmpty(row.g34))        parts.push(`Country=${row.g34}`);
  if (nonEmpty(row.g14code1))   parts.push(`Broker=${row.g14code1}`);
  if (nonEmpty(row.g54regcode)) parts.push(`Declarant=${row.g54regcode}`);
  return parts.join(' AND ');
}

function buildCorrectionsByHs(correctionRows) {
  // Group by first_hs_code, compute pct from counts within each group, return top 5.
  const by = {};
  (correctionRows || []).forEach(r => {
    const key = r.first_hs_code;
    if (!key) return;
    if (!by[key]) by[key] = [];
    by[key].push({
      code: r.corrected_hs_code,
      cases: num(r.count) ?? 0,
      tax: num(r.tax_amount) ?? 0,
    });
  });
  Object.keys(by).forEach(k => {
    const arr = by[k];
    const total = arr.reduce((a, x) => a + x.cases, 0) || 1;
    arr.forEach(x => { x.pct = +(x.cases * 100 / total).toFixed(1); });
    arr.sort((a, b) => b.cases - a.cases);
    by[k] = arr.slice(0, 5);
  });
  return by;
}

function buildPatterns(patternRows, correctionsByHs) {
  let probWarnings = 0;
  const patterns = (patternRows || []).map(r => {
    const level = num(r.hs_level) ?? 10;
    let prob = num(r.conditional_probability);
    let hitRate = null;
    if (prob != null) {
      if (prob > 1) {
        probWarnings++;
        hitRate = null;
      } else {
        hitRate = +(prob * 100).toFixed(1);
      }
    }
    return {
      id: r.pattern_id,
      level,
      hsCode: r.g33,
      indicators: buildIndicators(r),
      conditions: buildConditions(r, level),
      totalCases: num(r.support),
      misclassCases: num(r.misclass_cases),
      hitRate,
      misclassRate: hitRate,
      revenueImpact: num(r.extra_revenue) ?? 0,
      lift: num(r.lift),
      period: '2024-2025',
      status: 'new',
      actualCodes: correctionsByHs[r.g33] || [],
      examples: [],
    };
  });
  if (probWarnings > 0) {
    console.warn(`[build-data] WARN: ${probWarnings} pattern(s) had conditional_probability > 1; hitRate set to null. Fix the analysis (probability must be 0-1).`);
  }
  return patterns;
}

function buildTopSignals(patterns) {
  return [...patterns]
    .sort((a, b) => b.revenueImpact - a.revenueImpact)
    .slice(0, 5)
    .map((p, i) => ({
      id: i + 1,
      hs6: p.hsCode.slice(0, 6),
      country: nonEmpty(p.indicators.includes("Mamlakat") ? "—" : "—") || "—",
      hitRate: p.hitRate ?? 0,
      revenue: p.revenueImpact,
      cases: p.totalCases ?? 0,
      change: '—',
      trend: 'up',
    }));
}

function buildAmendments(correctionRows, hsLen) {
  // Aggregate at the requested HS length. Importer/country unknown → use empty string.
  const map = {};
  (correctionRows || []).forEach(r => {
    const first = (r.first_hs_code || '').slice(0, hsLen);
    const corr  = (r.corrected_hs_code || '').slice(0, hsLen);
    if (!first || !corr) return;
    const key = `${first}|${corr}`;
    if (!map[key]) {
      map[key] = {
        first_hs_code: first,
        corrected_hs_code: corr,
        importer: '',
        country_of_origin: '',
        count: 0,
        tax_amount: 0,
      };
    }
    map[key].count += num(r.count) ?? 0;
    map[key].tax_amount += num(r.tax_amount) ?? 0;
  });
  return Object.values(map);
}

function buildDeclarations(allHsRows, hsLen) {
  // Aggregate counts to the requested HS length.
  const map = {};
  (allHsRows || []).forEach(r => {
    const code = (r.hs_code || '').slice(0, hsLen);
    if (!code) return;
    if (!map[code]) {
      map[code] = { hs_code: code, importer: '', country_of_origin: '', count: 0 };
    }
    map[code].count += num(r.count) ?? 0;
  });
  return Object.values(map);
}

function buildMonthly(rows) {
  return (rows || []).map(r => ({
    month: r.month || '',
    declarations: num(r.declarations) ?? 0,
    misclass: num(r.misclass) ?? 0,
    revenue: num(r.revenue) ?? 0,
    hitRate: num(r.hit_rate) ?? 0,
  }));
}

function buildRules(rows) {
  return (rows || []).map(r => {
    let trend = String(r.hit_rate_trend || '').split(/[,;]/).map(x => num(x)).filter(x => x != null);
    if (!trend.length) trend = [0];
    return {
      id: r.id || r.rule_id || '',
      name: r.name || '',
      type: r.type || 'statistical',
      status: r.status || 'active',
      indicators: [],
      condition: r.condition || '',
      hitRate: num(r.hit_rate) ?? 0,
      hitRateTrend: trend,
      falsePositive: num(r.false_positive) ?? 0,
      coverage: num(r.coverage) ?? 0,
      revenueRecovered: num(r.revenue_recovered) ?? 0,
      activeSince: nonEmpty(r.active_since),
      lastTriggered: nonEmpty(r.last_triggered),
      flagged: num(r.flagged) ?? 0,
      confirmed: num(r.confirmed) ?? 0,
    };
  });
}

function serialize(value, indent = 2, depth = 0) {
  const pad = ' '.repeat(indent * depth);
  const padIn = ' '.repeat(indent * (depth + 1));
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    const items = value.map(v => padIn + serialize(v, indent, depth + 1));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (!keys.length) return '{}';
    const items = keys.map(k => {
      const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return padIn + safeKey + ': ' + serialize(value[k], indent, depth + 1);
    });
    return '{\n' + items.join(',\n') + '\n' + pad + '}';
  }
  return 'null';
}

function main() {
  if (!fs.existsSync(MOCK_FILE)) {
    console.error(`[build-data] ERROR: ${MOCK_FILE} missing`);
    process.exit(1);
  }
  const mock = loadMock();
  if (!mock) {
    console.error('[build-data] ERROR: could not load window.MOCK from data.js');
    process.exit(1);
  }

  const patternRows    = readTable('patterns');
  const correctionRows = readTable('possible_corrections');
  const summaryRows    = readTable('pattern_summary');
  const allHsRows      = readTable('all_hs');
  const monthlyRows    = readTable('monthly_trend');
  const ruleRows       = readTable('rules');

  if (!patternRows && !correctionRows && !allHsRows && !monthlyRows && !ruleRows) {
    console.warn('[build-data] No real data found; writing data.generated.js identical to mock');
    const out = 'window.MOCK = ' + serialize(mock) + ';\n';
    fs.writeFileSync(OUT_FILE, out);
    return;
  }

  // Discovery patterns
  const correctionsByHs = buildCorrectionsByHs(correctionRows);
  const patterns = buildPatterns(patternRows, correctionsByHs);
  mock.patterns = patterns;
  mock.topSignals = buildTopSignals(patterns);
  mock.ruleTypeDistribution = [
    { name: 'Statistik', value: patterns.length, color: '#06B6D4' },
  ];

  // Summary overrides
  if (summaryRows && summaryRows.length) {
    const s = summaryRows[0];
    const colMap = {
      total_patterns: 'activeRules',
      total_extra_revenue: 'revenueImpact',
      total_declarations: 'totalDeclarations',
      total_inspected: 'totalInspected',
      misclassifications: 'misclassifications',
      avg_hit_rate: 'avgHitRate',
    };
    for (const [col, key] of Object.entries(colMap)) {
      if (s[col] !== undefined && s[col] !== '') mock.summary[key] = num(s[col]);
    }
  } else {
    mock.summary.activeRules = patterns.length;
    mock.summary.revenueImpact = patterns.reduce((a, p) => a + p.revenueImpact, 0);
  }
  mock.summary.weeklyNewPatterns = 0;
  mock.summary.weeklyStrengthened = 0;
  mock.summary.weeklyWeakened = 0;

  // Optional real monthly trend and rules (drive Overview & Monitoring).
  if (monthlyRows) mock.monthlyTrend = buildMonthly(monthlyRows);
  if (ruleRows) {
    mock.rules = buildRules(ruleRows);
    const noSummaryRules = !(summaryRows && summaryRows.length && summaryRows[0].total_patterns);
    if (noSummaryRules) mock.summary.activeRules = mock.rules.filter(r => r.status === 'active').length;
  }

  // Network — real data only covers HS10/3m. Aggregate to HS6/3m for the toggle.
  // Wipe 1y windows so the UI doesn't mix real and mock data (empty arrays render as "no data").
  if (!mock.network) mock.network = {};
  mock.network.amendments_10_3m   = buildAmendments(correctionRows, 10);
  mock.network.amendments_6_3m    = buildAmendments(correctionRows, 6);
  mock.network.declarations_10_3m = buildDeclarations(allHsRows, 10);
  mock.network.declarations_6_3m  = buildDeclarations(allHsRows, 6);
  mock.network.amendments_10_1y   = [];
  mock.network.amendments_6_1y    = [];
  mock.network.declarations_10_1y = [];
  mock.network.declarations_6_1y  = [];

  const out = '// AUTO-GENERATED — do not edit; run `node scripts/build-data.js`\n' +
              'window.MOCK = ' + serialize(mock) + ';\n';
  fs.writeFileSync(OUT_FILE, out);

  console.log(`[build-data] OK: ${patterns.length} patterns, ` +
              `${(correctionRows || []).length} corrections, ` +
              `${mock.network.amendments_10_3m.length} HS10/3m edges, ` +
              `${mock.network.declarations_10_3m.length} HS10/3m nodes, ` +
              `${(mock.rules || []).length} mock rules (unchanged).`);
}

main();
