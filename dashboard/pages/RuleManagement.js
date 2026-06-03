const { useState } = React;

window.RuleManagementPage = ({ draft }) => {
  // When arriving via Discovery's "Qoidaga aylantirish", `draft` carries the
  // pre-parsed conditions and a suggested name. The component remounts on each
  // navigation, so initialising state from the prop is enough to pre-fill.
  const [activeTab, setActiveTab] = useState(draft ? 'builder' : 'list');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showBuilder, setShowBuilder] = useState(!!draft);
  const [builderConditions, setBuilderConditions] = useState(
    draft && draft.conditions && draft.conditions.length
      ? draft.conditions
      : [{indicator:'hs6',operator:'=',value:''}]
  );
  const [ruleName, setRuleName] = useState(draft?.name || '');
  const [testResult, setTestResult] = useState(null);
  const fromPattern = draft?.source || null;

  const filteredRules = MOCK.rules.filter(r => statusFilter === 'all' || r.status === statusFilter);

  const addCondition = () => {
    setBuilderConditions([...builderConditions, {indicator:'country',operator:'=',value:''}]);
  };
  const removeCondition = (i) => {
    setBuilderConditions(builderConditions.filter((_,j) => j !== i));
  };
  const updateCondition = (i, field, val) => {
    const nc = [...builderConditions];
    nc[i] = {...nc[i], [field]: val};
    setBuilderConditions(nc);
  };

  const runTest = () => {
    setTestResult({
      totalAffected: Math.floor(Math.random()*200)+50,
      estimatedHitRate: (Math.random()*40+50).toFixed(1),
      estimatedRevenue: Math.floor(Math.random()*500000)+100000,
      sampleMatches: [
        {id:'DEC-2025-00142',hs:'8704210000',importer:'IMP-0284',country:'Xitoy (156)'},
        {id:'DEC-2025-00187',hs:'8704210000',importer:'IMP-0156',country:'Xitoy (156)'},
        {id:'DEC-2025-00203',hs:'8704210000',importer:'IMP-0342',country:'Xitoy (156)'},
      ]
    });
  };

  const indicators = [
    {value:'hs6',label:'TIF TN kod (6 xona)'},
    {value:'hs10',label:'TIF TN kod (10 xona)'},
    {value:'country',label:'Kelib chiqish mamlakati'},
    {value:'importer',label:'Importyor ID'},
    {value:'declarant',label:'Deklarant ID'},
    {value:'exporter',label:'Eksportyor ID'},
    {value:'description',label:'Tovar tavsifi'},
  ];

  const operators = {
    hs6: ['=','!=','STARTS WITH','IN'],
    hs10: ['=','!=','IN'],
    country: ['=','!=','IN'],
    importer: ['=','!=','IN'],
    declarant: ['=','!=','IN'],
    exporter: ['=','!=','IN'],
    description: ['CONTAINS','='],
  };

  return (
    <div className="animate-fade">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-5 animate-in stagger-1">
        {[{id:'list',label:'Qoidalar ro\'yxati',icon:'layers'},{id:'builder',label:'Yangi qoida yaratish',icon:'plus'}].map(t => (
          <button key={t.id} onClick={() => {setActiveTab(t.id); if(t.id==='builder') setShowBuilder(true);}}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab===t.id ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30' : 'bg-surface-100 text-txt-muted hover:text-txt-secondary border border-transparent'}`}>
            <Icon name={t.icon} size={15}/>{t.label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <>
          {/* Status Filter */}
          <div className="flex gap-2 mb-4 animate-in stagger-2">
            {['all','active','draft','archived'].map(s => {
              const count = s==='all' ? MOCK.rules.length : MOCK.rules.filter(r=>r.status===s).length;
              return (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${statusFilter===s ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' : 'bg-surface-100 text-txt-muted border border-transparent hover:text-txt-secondary'}`}>
                  {s==='all'?'Barchasi':s==='active'?'Faol':s==='draft'?'Qoralama':'Arxiv'}
                  <span className="bg-surface-300 text-txt-dim rounded-full px-1.5 py-0.5 text-[10px]">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Rules List */}
          <div className="space-y-3 animate-in stagger-3">
            {filteredRules.map((r,i) => (
              <div key={r.id} className="glass rounded-xl p-4 hover:border-accent-cyan/20 transition-all card-glow">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-txt-primary">{r.name}</span>
                      <StatusBadge status={r.status}/>
                      <span className={`tag border text-[10px] ${r.type==='statistical'?'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20':'bg-accent-cyan/5 text-accent-cyan/70 border-accent-cyan/15'}`}>
                        {r.type==='statistical'?'Statistik':'Biznes'}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-txt-dim">{r.condition}</div>
                  </div>
                  {r.status === 'active' && (
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-txt-muted mb-0.5">Tasdiqlanish foizi</div>
                        <div className="text-sm font-bold text-accent-cyan flex items-center gap-1">
                          {r.hitRate}%
                          <MiniSparkline data={r.hitRateTrend} width={40} height={16} color={r.hitRateTrend[r.hitRateTrend.length-1] >= r.hitRateTrend[0] ? '#10B981' : '#F59E0B'}/>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-txt-muted mb-0.5">Bojxona to'lovi</div>
                        <div className="text-sm font-bold text-status-green">{formatCurrency(r.revenueRecovered)}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-surface-200 text-txt-muted hover:text-accent-cyan transition-colors" title="Ko'rish">
                      <Icon name="eye" size={15}/>
                    </button>
                    {r.status !== 'archived' && (
                      <button className="p-2 rounded-lg hover:bg-surface-200 text-txt-muted hover:text-status-amber transition-colors" title="Arxivlash">
                        <Icon name="archive" size={15}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'builder' && (
        <div className="grid grid-cols-5 gap-5">
          {/* Builder */}
          <div className="col-span-3 glass rounded-xl p-5 animate-in stagger-2">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Qoida konstruktori</h3>
            <p className="text-xs text-txt-muted mb-4">Indikatorlarni tanlang va qiymatlarini belgilang</p>

            {fromPattern && (
              <div className="flex items-center gap-2 bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg px-3 py-2 mb-4">
                <Icon name="zap" size={13} className="text-accent-cyan"/>
                <span className="text-xs text-accent-cyan">
                  <span className="font-mono font-semibold">{fromPattern}</span> shabloni asosida avtomatik to'ldirildi
                </span>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[11px] text-txt-muted mb-1">Qoida nomi</label>
              <input type="text" value={ruleName} onChange={e => setRuleName(e.target.value)}
                placeholder="Masalan: Po'lat quvurlar — Xitoy"
                className="rule-builder-field text-xs w-full"/>
            </div>

            <div className="space-y-3 mb-4">
              {builderConditions.map((cond,i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="tag bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 text-[10px] font-bold">AND</span>}
                  {i === 0 && <span className="w-[42px]"/>}
                  <select value={cond.indicator} onChange={e => updateCondition(i,'indicator',e.target.value)}
                    className="rule-builder-field text-xs flex-1">
                    {indicators.map(ind => <option key={ind.value} value={ind.value}>{ind.label}</option>)}
                  </select>
                  <select value={cond.operator} onChange={e => updateCondition(i,'operator',e.target.value)}
                    className="rule-builder-field text-xs w-32">
                    {(operators[cond.indicator]||['=']).map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <input type="text" value={cond.value} onChange={e => updateCondition(i,'value',e.target.value)}
                    placeholder="Qiymat..."
                    className="rule-builder-field text-xs flex-1 font-mono"/>
                  {i > 0 && (
                    <button onClick={() => removeCondition(i)} className="p-1.5 rounded hover:bg-status-amber/10 text-txt-muted hover:text-status-amber transition-colors">
                      <Icon name="x" size={14}/>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={addCondition} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-300 text-txt-secondary text-xs font-medium hover:bg-surface-400 transition-colors">
                <Icon name="plus" size={14}/> Shart qo'shish
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-surface-300/50">
              <div className="font-mono text-xs text-accent-cyan bg-surface-50 rounded-lg px-3 py-2 mb-4 border border-surface-300/50">
                {builderConditions.map((c,i) => `${i>0?' AND ':''}${c.indicator.toUpperCase()} ${c.operator} ${c.value||'?'}`).join('')}
              </div>
              <div className="flex gap-2">
                <button onClick={runTest} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                  <Icon name="play" size={14}/> Sinov o'tkazish
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                  <Icon name="check" size={14}/> Saqlash va faollashtirish
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300 text-txt-secondary text-sm font-medium hover:bg-surface-400 transition-colors">
                  Qoralama sifatida saqlash
                </button>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="col-span-2 glass rounded-xl p-5 animate-in stagger-3">
            <h3 className="text-sm font-semibold text-txt-primary mb-4">Sinov natijalari</h3>
            {testResult ? (
              <div className="animate-fade">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface-200 rounded-lg p-3">
                    <div className="text-[10px] text-txt-muted mb-1">Ta'sirlangan deklaratsiyalar</div>
                    <div className="text-xl font-bold text-accent-cyan">{testResult.totalAffected}</div>
                  </div>
                  <div className="bg-surface-200 rounded-lg p-3">
                    <div className="text-[10px] text-txt-muted mb-1">Taxminiy tasdiqlanish foizi</div>
                    <div className="text-xl font-bold text-accent-cyan">{testResult.estimatedHitRate}%</div>
                  </div>
                  <div className="col-span-2 bg-surface-200 rounded-lg p-3">
                    <div className="text-[10px] text-txt-muted mb-1">Taxminiy qo'shimcha bojxona to'lovi</div>
                    <div className="text-xl font-bold text-status-green">{formatCurrency(testResult.estimatedRevenue)}</div>
                  </div>
                </div>

                <h4 className="text-xs font-semibold text-txt-secondary mb-2">Mos deklaratsiya namunalari</h4>
                <div className="space-y-2">
                  {testResult.sampleMatches.map((m,i) => (
                    <div key={i} className="bg-surface-50 rounded-lg p-2.5 border border-surface-300/50 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-accent-cyan">{m.id}</span>
                        <span className="text-txt-muted">{m.country}</span>
                      </div>
                      <div className="font-mono text-txt-dim mt-1">HS: {m.hs} · {m.importer}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center mb-3">
                  <Icon name="play" size={20} className="text-txt-dim"/>
                </div>
                <p className="text-sm text-txt-muted mb-1">Hali sinov o'tkazilmagan</p>
                <p className="text-xs text-txt-dim">Qoidani to'ldiring va "Sinov o'tkazish" tugmasini bosing</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
