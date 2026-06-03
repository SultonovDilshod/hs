const { useState, useMemo } = React;

// Map the field tokens used in a pattern's `conditions` string onto the
// indicator values understood by the rule builder in RuleManagement.
const PATTERN_FIELD_TO_INDICATOR = {
  HS6:'hs6', HS10:'hs10', COUNTRY:'country', IMPORTER:'importer',
  DECLARANT:'declarant', EXPORTER:'exporter', DESCRIPTION:'description',
};

// Parse a pattern (e.g. conditions = "HS10=7304399309 AND Importer=306764904
// AND Country=156") into the structured condition rows the builder expects.
function patternToConditions(p) {
  if (!p) return [];
  const rows = [];
  String(p.conditions || '').split(/\s+AND\s+/i).forEach(clause => {
    const m = clause.trim().match(/^([A-Za-z0-9]+)\s*(!=|>=|<=|=|STARTS WITH|CONTAINS|IN)\s*(.+)$/i);
    if (!m) return;
    const indicator = PATTERN_FIELD_TO_INDICATOR[m[1].toUpperCase()];
    if (!indicator) return;
    rows.push({ indicator, operator: m[2].toUpperCase() === '=' ? '=' : m[2].toUpperCase(), value: m[3].trim() });
  });
  // Fall back to the bare HS code if the conditions string couldn't be parsed.
  if (rows.length === 0 && p.hsCode) {
    rows.push({ indicator: p.level === 6 ? 'hs6' : 'hs10', operator: '=', value: p.hsCode });
  }
  return rows;
}

window.DiscoveryPage = ({ onConvertToRule }) => {
  const [hsLevel, setHsLevel] = useState('all');
  const [minHitRate, setMinHitRate] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [sortBy, setSortBy] = useState('revenue');

  const filtered = useMemo(() => {
    let items = [...MOCK.patterns];
    if (hsLevel !== 'all') items = items.filter(p => p.level === parseInt(hsLevel));
    if (statusFilter !== 'all') items = items.filter(p => p.status === statusFilter);
    items = items.filter(p => (p.hitRate ?? 0) >= minHitRate);
    if (sortBy === 'revenue') items.sort((a,b) => b.revenueImpact - a.revenueImpact);
    else if (sortBy === 'hitRate') items.sort((a,b) => (b.hitRate ?? 0) - (a.hitRate ?? 0));
    else if (sortBy === 'cases') items.sort((a,b) => (b.misclassCases ?? 0) - (a.misclassCases ?? 0));
    else if (sortBy === 'lift') items.sort((a,b) => (b.lift ?? 0) - (a.lift ?? 0));
    return items;
  }, [hsLevel, minHitRate, statusFilter, sortBy]);

  return (
    <div className="animate-fade">
      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-5 flex items-center gap-4 flex-wrap animate-in stagger-1">
        <div className="flex items-center gap-2">
          <Icon name="filter" size={14} className="text-txt-muted"/>
          <span className="text-xs font-medium text-txt-secondary">Filtrlar:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-txt-muted">TIF TN daraja:</span>
          {['all','6','10'].map(v => (
            <button key={v} onClick={() => setHsLevel(v)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${hsLevel===v ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' : 'bg-surface-200 text-txt-muted border border-transparent hover:text-txt-secondary'}`}>
              {v==='all'?'Barchasi':`${v} xona`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-txt-muted">Status:</span>
          {['all','new','strengthened','weakened'].map(v => (
            <button key={v} onClick={() => setStatusFilter(v)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${statusFilter===v ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' : 'bg-surface-200 text-txt-muted border border-transparent hover:text-txt-secondary'}`}>
              {v==='all'?'Barchasi':v==='new'?'Yangi':v==='strengthened'?'Kuchaygan':'Susaygan'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-txt-muted">Min. tasdiqlanish foizi:</span>
          <input type="range" min="0" max="90" step="5" value={minHitRate} onChange={e=>setMinHitRate(Number(e.target.value))} className="w-24 accent-blue-600"/>
          <span className="text-xs font-mono text-accent-cyan w-8">{minHitRate}%</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-txt-muted">Saralash:</span>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="rule-builder-field text-xs py-1">
            <option value="revenue">Qo'shimcha bojxona to'lovi</option>
            <option value="hitRate">Tasdiqlanish foizi</option>
            <option value="cases">Holatlar soni</option>
            <option value="lift">Lift</option>
          </select>
        </div>
      </div>

      {/* Patterns Table */}
      <div className="glass rounded-xl overflow-hidden mb-5 animate-in stagger-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-300">
              <th className="px-4 py-3 text-left text-xs font-medium text-txt-muted">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-txt-muted">TIF TN kod</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-txt-muted">Shart</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-txt-muted">Indikatorlar</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-txt-muted">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-txt-muted">Tasdiqlanish foizi</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-txt-muted">Lift</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-txt-muted">Holatlar</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-txt-muted">Bojxona to'lovi</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-txt-muted">Haqiqiy kodlar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i) => (
              <tr key={p.id} className="border-b border-surface-300/50 last:border-0 cursor-pointer hover:bg-surface-200/50 transition-colors"
                onClick={() => setSelectedPattern(p)}>
                <td className="px-4 py-3 text-xs text-txt-dim">{p.id}</td>
                <td className="px-4 py-3">
                  <span className="font-mono font-semibold text-accent-cyan">{p.hsCode}</span>
                  <span className="ml-2 text-[11px] text-txt-muted">{p.level} xona</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-txt-secondary">{p.conditions}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {p.indicators.map((ind,j) => (
                      <span key={j} className="tag bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 text-[10px]">{ind}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={p.status}/></td>
                <td className="px-4 py-3 text-right font-semibold text-accent-cyan">
                  {p.hitRate != null ? `${p.hitRate}%` : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {p.lift != null ? (
                    <span className="tag bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 text-[10px] font-mono">{p.lift.toFixed(1)}x</span>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {p.misclassCases != null && p.totalCases != null ? (
                    <>
                      <span className="font-semibold text-txt-primary">{p.misclassCases}</span>
                      <span className="text-xs text-txt-muted">/{p.totalCases}</span>
                    </>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-status-green">{formatCurrency(p.revenueImpact)}</td>
                <td className="px-4 py-3 text-right text-accent-cyan font-semibold">{p.actualCodes.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-xl p-12 text-center animate-fade">
          <Icon name="search" size={32} className="text-txt-dim mx-auto mb-3 block"/>
          <p className="text-txt-muted">Filtrlarga mos shablon topilmadi</p>
        </div>
      )}

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <div className="modal-overlay animate-fade" onClick={() => setSelectedPattern(null)}>
          <div className="modal-content p-6 animate-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold text-txt-primary">Shablon {selectedPattern.id}</h2>
                  <StatusBadge status={selectedPattern.status}/>
                </div>
                <p className="font-mono text-sm text-accent-cyan">{selectedPattern.conditions}</p>
              </div>
              <button onClick={() => setSelectedPattern(null)} className="text-txt-muted hover:text-txt-primary transition-colors p-1">
                <Icon name="x" size={20}/>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-5">
              {[
                {l:'Tasdiqlanish foizi',v:selectedPattern.hitRate != null ? selectedPattern.hitRate+'%' : '—',c:'text-accent-cyan'},
                {l:'Lift',v:selectedPattern.lift != null ? selectedPattern.lift.toFixed(2)+'x' : '—',c:'text-accent-cyan'},
                {l:'Jami holatlar',v:selectedPattern.totalCases ?? '—',c:'text-txt-primary'},
                {l:'Noto\'g\'ri tasniflash',v:selectedPattern.misclassCases ?? '—',c:'text-status-amber'},
                {l:'Qo\'shimcha bojxona to\'lovi',v:formatCurrency(selectedPattern.revenueImpact),c:'text-status-green'},
              ].map((s,i) => (
                <div key={i} className="bg-surface-200 rounded-lg p-3">
                  <div className="text-xs text-txt-muted mb-1">{s.l}</div>
                  <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Actual Codes */}
            <h4 className="text-sm font-semibold text-txt-primary mb-3">Mumkin bo'lgan haqiqiy TIF TN kodlar</h4>
            <div className="space-y-2 mb-5">
              {selectedPattern.actualCodes.map((ac,i) => (
                <div key={i} className="flex items-center gap-3 bg-surface-200 rounded-lg p-3">
                  <span className="font-mono text-sm font-semibold text-accent-cyan">{ac.code}</span>
                  <div className="progress-bar flex-1">
                    <div className="progress-fill" style={{width:`${ac.pct}%`,background:'linear-gradient(90deg,#1D4ED8,#2563EB)'}}/>
                  </div>
                  <span className="text-sm font-semibold text-txt-primary w-12 text-right">{ac.pct}%</span>
                  <span className="text-xs text-txt-muted">({ac.cases} holat)</span>
                </div>
              ))}
            </div>

            {/* Example Declarations */}
            {selectedPattern.examples && selectedPattern.examples.length > 0 && (
              <>
                <h4 className="text-sm font-semibold text-txt-primary mb-3">Misol deklaratsiyalar</h4>
                <div className="bg-surface-50 rounded-lg border border-surface-300 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-surface-300">
                        <th className="px-3 py-2 text-left text-txt-muted font-medium">Deklaratsiya</th>
                        <th className="px-3 py-2 text-left text-txt-muted font-medium">Eski kod</th>
                        <th className="px-3 py-2 text-left text-txt-muted font-medium">Yangi kod</th>
                        <th className="px-3 py-2 text-left text-txt-muted font-medium">Importyor</th>
                        <th className="px-3 py-2 text-right text-txt-muted font-medium">Bojxona to'lovi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPattern.examples.map((ex,i) => (
                        <tr key={i} className="border-b border-surface-300/50 last:border-0">
                          <td className="px-3 py-2 font-mono text-accent-cyan">{ex.declId}</td>
                          <td className="px-3 py-2 font-mono text-status-amber">{ex.oldHs}</td>
                          <td className="px-3 py-2 font-mono text-status-green">{ex.newHs}</td>
                          <td className="px-3 py-2 text-txt-secondary">{ex.importer}</td>
                          <td className="px-3 py-2 text-right font-semibold text-status-green">{formatCurrency(ex.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  onConvertToRule && onConvertToRule({
                    conditions: patternToConditions(selectedPattern),
                    name: `${selectedPattern.hsCode} — shablon ${selectedPattern.id}`,
                    source: selectedPattern.id,
                  });
                  setSelectedPattern(null);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                <Icon name="check" size={14}/> Qoidaga aylantirish
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300 text-txt-secondary text-sm font-medium hover:bg-surface-400 transition-colors">
                <Icon name="x" size={14}/> Rad etish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
