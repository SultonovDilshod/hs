const { useState } = React;

// Map the field tokens in a rule's stored `condition` string onto the
// indicator values understood by the builder, so an existing rule can be
// loaded back into the editor.
const RULE_FIELD_TO_INDICATOR = {
  HS6:'hs6', HS10:'hs10', COUNTRY:'country', IMPORTER:'importer',
  DECLARANT:'declarant', EXPORTER:'exporter', DESCRIPTION:'description',
};
function conditionToRows(cond) {
  const rows = [];
  String(cond || '').split(/\s+AND\s+/i).forEach(clause => {
    const m = clause.trim().match(/^([A-Za-z0-9]+)\s*(!=|>=|<=|=|STARTS WITH|CONTAINS|IN)\s*(.+)$/i);
    if (!m) return;
    const ind = RULE_FIELD_TO_INDICATOR[m[1].toUpperCase()];
    if (!ind) return;
    rows.push({ indicator: ind, operator: m[2].toUpperCase() === '=' ? '=' : m[2].toUpperCase(), value: m[3].trim() });
  });
  return rows.length ? rows : [{indicator:'hs6',operator:'=',value:''}];
}

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
  // The existing rule currently being edited (only for draft/archived rules).
  const [editingRule, setEditingRule] = useState(null);
  // An active rule opened in read-only view.
  const [viewRule, setViewRule] = useState(null);

  const filteredRules = MOCK.rules.filter(r => statusFilter === 'all' || r.status === statusFilter);

  // Reset the builder to a blank new rule.
  const startNewRule = () => {
    setEditingRule(null);
    setRuleName('');
    setBuilderConditions([{indicator:'hs6',operator:'=',value:''}]);
    setTestResult(null);
  };

  // Clicking a rule in the list. Active rules are read-only (view); draft and
  // archived rules open in the builder so they can be edited.
  const openRule = (r) => {
    if (r.status === 'active') {
      setViewRule(r);
      return;
    }
    setEditingRule(r);
    setRuleName(r.name);
    setBuilderConditions(conditionToRows(r.condition));
    setTestResult(null);
    setShowBuilder(true);
    setActiveTab('builder');
  };

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
    const affected = Math.floor(Math.random()*200)+50;
    const hitRate = +(Math.random()*40+50).toFixed(1);
    const revenue = Math.floor(Math.random()*500000)+100000;
    const seed = editingRule?.id || ruleName || 'sinov';
    const base = { affected, hitRate, revenue };
    const assessment = assessCorridor({ hitRate, revenueImpact: revenue });
    const plans = {
      red: corridorPlan('red', base),
      yellow: corridorPlan('yellow', base),
      green: corridorPlan('green', base),
    };
    setTestResult({
      totalAffected: affected,
      estimatedHitRate: hitRate.toFixed(1),
      estimatedRevenue: revenue,
      assessment,
      plans,
      posts: distributeByPost(affected, seed),
      legal: legalImpact(base),
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
          <button key={t.id} onClick={() => {if(t.id==='builder'){startNewRule(); setShowBuilder(true);} setActiveTab(t.id);}}
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
            {filteredRules.map((r,i) => {
              const canEdit = r.status !== 'active';
              return (
              <div key={r.id} onClick={() => openRule(r)}
                className="glass rounded-xl p-4 hover:border-accent-cyan/20 transition-all card-glow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-txt-primary">{r.name}</span>
                      <StatusBadge status={r.status}/>
                      <span className={`tag border text-[10px] ${r.type==='statistical'?'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20':'bg-accent-cyan/5 text-accent-cyan/70 border-accent-cyan/15'}`}>
                        {r.type==='statistical'?'Statistik':'Biznes'}
                      </span>
                      <span className={`tag border text-[10px] ${canEdit?'bg-status-amber/10 text-status-amber border-status-amber/20':'bg-surface-300 text-txt-muted border-surface-400/40'}`}>
                        {canEdit ? 'Tahrirlanadi' : 'Faqat ko\'rish'}
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
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    {canEdit ? (
                      <button onClick={() => openRule(r)} className="p-2 rounded-lg hover:bg-surface-200 text-txt-muted hover:text-accent-cyan transition-colors" title="Tahrirlash">
                        <Icon name="settings" size={15}/>
                      </button>
                    ) : (
                      <button onClick={() => openRule(r)} className="p-2 rounded-lg hover:bg-surface-200 text-txt-muted hover:text-accent-cyan transition-colors" title="Ko'rish">
                        <Icon name="eye" size={15}/>
                      </button>
                    )}
                    {r.status !== 'archived' && (
                      <button className="p-2 rounded-lg hover:bg-surface-200 text-txt-muted hover:text-status-amber transition-colors" title="Arxivlash">
                        <Icon name="archive" size={15}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );})}
          </div>
        </>
      )}

      {activeTab === 'builder' && (<>
        <div className="grid grid-cols-5 gap-5">
          {/* Builder */}
          <div className="col-span-3 glass rounded-xl p-5 animate-in stagger-2">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">{editingRule ? 'Qoidani tahrirlash' : 'Qoida konstruktori'}</h3>
            <p className="text-xs text-txt-muted mb-4">Indikatorlarni tanlang va qiymatlarini belgilang</p>

            {editingRule && (
              <div className="flex items-center gap-2 bg-status-amber/5 border border-status-amber/20 rounded-lg px-3 py-2 mb-4">
                <Icon name="settings" size={13} className="text-status-amber"/>
                <span className="text-xs text-status-amber">
                  <span className="font-mono font-semibold">{editingRule.id}</span> ({editingRule.status==='draft'?'qoralama':'arxiv'}) tahrirlanmoqda
                </span>
              </div>
            )}

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
              <div className="flex gap-2 flex-wrap">
                <button onClick={runTest} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                  <Icon name="play" size={14}/> Sinov o'tkazish
                </button>
                {editingRule ? (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                      <Icon name="check" size={14}/> O'zgarishlarni saqlash
                    </button>
                    {editingRule.status === 'archived' && (
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-status-green/15 text-status-green text-sm font-medium hover:bg-status-green/25 transition-colors border border-status-green/30">
                        <Icon name="trendUp" size={14}/> Tiklash va faollashtirish
                      </button>
                    )}
                    <button onClick={() => {startNewRule(); setActiveTab('list');}} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300 text-txt-secondary text-sm font-medium hover:bg-surface-400 transition-colors">
                      <Icon name="x" size={14}/> Bekor qilish
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/20 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/30 transition-colors border border-accent-cyan/30">
                      <Icon name="check" size={14}/> Saqlash va faollashtirish
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300 text-txt-secondary text-sm font-medium hover:bg-surface-400 transition-colors">
                      Qoralama sifatida saqlash
                    </button>
                  </>
                )}
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

        {/* ── Deep analysis: risk corridors + impact ──────────────────── */}
        {testResult && (
          <div className="mt-5 space-y-5 animate-fade">
            {/* Corridor recommendation */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-txt-primary">Xavf yo'lagi tavsiyasi</h3>
                <CorridorBadge c={testResult.assessment}/>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="rounded-xl p-4 border" style={{background:testResult.assessment.color+'12', borderColor:testResult.assessment.color+'40'}}>
                  <div className="text-[10px] uppercase tracking-wider mb-1" style={{color:testResult.assessment.color}}>Tavsiya etilgan yo'lak</div>
                  <div className="text-xl font-bold" style={{color:testResult.assessment.color}}>{testResult.assessment.label}</div>
                  <div className="text-xs text-txt-muted mt-1">{testResult.assessment.control}</div>
                </div>
                {[
                  {l:'Xavf bali',v:testResult.assessment.risk,c:'text-txt-primary'},
                  {l:'Ishonchlilik',v:testResult.assessment.confidence+'%',c:'text-accent-cyan'},
                  {l:'Fiskal ta\'sir',v:testResult.assessment.severity+'%',c:'text-status-green'},
                ].map((s,i) => (
                  <div key={i} className="bg-surface-200 rounded-xl p-4">
                    <div className="text-[10px] text-txt-muted uppercase tracking-wider mb-1">{s.l}</div>
                    <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-txt-muted mt-3">
                Izoh: {testResult.assessment.key==='red'
                  ? "Yuqori ishonchlilik va sezilarli fiskal ta'sir — to'liq jismoniy ko'rik (qizil yo'lak) tavsiya etiladi."
                  : testResult.assessment.key==='yellow'
                  ? "O'rtacha xavf — hujjatlarni tekshirish (sariq yo'lak) maqbul, jismoniy ko'rik tanlamali o'tkaziladi."
                  : "Past xavf — avtomatik rasmiylashtirish va kuzatuvda saqlash kifoya."}
              </p>
              <div className="mt-4 pt-3 border-t border-surface-300/50">
                <div className="text-[11px] text-txt-muted mb-2 font-medium uppercase tracking-wider">Qoida ta'siri — yo'lak eskalatsiyasi</div>
                <p className="text-xs text-txt-muted mb-3">Bu qoida deklaratsiyani faqat yuqori yo'lakka ko'taradi; yashil yo'lakka hech qachon tushirmaydi.</p>
                <EscalationMatrix ruleKey={testResult.assessment.key}/>
              </div>
            </div>

            {/* Corridor comparison — what to expect in each lane */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-txt-primary mb-1">Yo'laklar bo'yicha kutilayotgan natijalar</h3>
              <p className="text-xs text-txt-muted mb-4">{testResult.totalAffected} ta deklaratsiya har bir yo'lakdan o'tkazilganda kutiladigan ko'rsatkichlar.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-surface-300/50">
                      <th className="px-3 py-2 text-left text-txt-muted font-medium uppercase tracking-wider text-[10px]">Ko'rsatkich</th>
                      {['red','yellow','green'].map(k => (
                        <th key={k} className="px-3 py-2 text-right font-semibold text-[11px]" style={{color:CORRIDOR_META[k].color}}>{CORRIDOR_META[k].short}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {l:'Tekshiruv qamrovi', f:p=>p.inspectionRate+'%'},
                      {l:'Jismoniy ko\'rik', f:p=>p.physicalRate+'%'},
                      {l:'Aniqlash darajasi', f:p=>p.detectionRate+'%'},
                      {l:'Aniqlangan holatlar', f:p=>p.detected},
                      {l:'E\'tibordan chetda', f:p=>p.missed},
                      {l:'Qaytariladigan daromad', f:p=>`${formatCurrency(p.revenue)} (${p.revenueShare}%)`},
                      {l:'Rasmiylashtirish kechikishi', f:p=>p.clearanceDelay+' soat'},
                      {l:'Inspektor ish-soati', f:p=>p.inspectorHours+' s'},
                    ].map((row,i) => (
                      <tr key={i} className="border-b border-surface-300/30 last:border-0">
                        <td className="px-3 py-2 text-txt-secondary">{row.l}</td>
                        <td className="px-3 py-2 text-right font-medium text-txt-primary">{row.f(testResult.plans.red)}</td>
                        <td className="px-3 py-2 text-right font-medium text-txt-primary">{row.f(testResult.plans.yellow)}</td>
                        <td className="px-3 py-2 text-right font-medium text-txt-primary">{row.f(testResult.plans.green)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Yellow corridor expectations */}
            <div className="glass rounded-xl p-5 border-l-4" style={{borderLeftColor:CORRIDOR_META.yellow.color}}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:CORRIDOR_META.yellow.color}}/>
                <h3 className="text-sm font-semibold text-txt-primary">Sariq yo'lakda sinov — kutilmalar</h3>
              </div>
              <p className="text-xs text-txt-muted mb-4">Agar qoida sariq yo'lakka (faqat hujjat tekshiruvi) qo'yilsa, quyidagilar kutiladi.</p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  {l:'Aniqlash darajasi',v:testResult.plans.yellow.detectionRate+'%',c:'text-status-amber'},
                  {l:'Aniqlanadigan holatlar',v:testResult.plans.yellow.detected,c:'text-status-green'},
                  {l:'E\'tibordan chetda qolishi',v:testResult.plans.yellow.missed,c:'text-status-amber'},
                  {l:'Qaytariladigan daromad',v:formatCurrency(testResult.plans.yellow.revenue),c:'text-status-green'},
                  {l:'O\'rtacha kechikish',v:testResult.plans.yellow.clearanceDelay+' soat',c:'text-txt-primary'},
                  {l:'Inspektor ish-soati',v:testResult.plans.yellow.inspectorHours+' soat',c:'text-txt-primary'},
                ].map((s,i) => (
                  <div key={i} className="bg-surface-200 rounded-lg p-3">
                    <div className="text-[10px] text-txt-muted mb-1">{s.l}</div>
                    <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-txt-secondary bg-surface-50 rounded-lg px-3 py-2 border border-surface-300/50">
                Qizil yo'lakka nisbatan: daromad <span className="font-semibold text-status-amber">{formatCurrency(testResult.plans.red.revenue - testResult.plans.yellow.revenue)}</span> kam qaytadi,
                lekin <span className="font-semibold text-status-green">{testResult.plans.red.clearanceDelay - testResult.plans.yellow.clearanceDelay} soat</span> tezroq rasmiylashtiriladi va inspektor yuki <span className="font-semibold text-accent-cyan">{Math.max(0, testResult.plans.red.inspectorHours - testResult.plans.yellow.inspectorHours)} soat</span> kamayadi.
              </div>
            </div>

            {/* Impact: customs posts + legal */}
            <div className="grid grid-cols-2 gap-5">
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-txt-primary mb-1">Postlarga ta'sir</h3>
                <p className="text-xs text-txt-muted mb-4">Ta'sirlangan deklaratsiyalarning bojxona postlari bo'yicha taqsimoti.</p>
                <div className="space-y-2">
                  {testResult.posts.map((p,i) => {
                    const max = testResult.posts[0]?.count || 1;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-txt-secondary w-32 truncate">{p.post}</span>
                        <div className="progress-bar flex-1">
                          <div className="progress-fill" style={{width:`${(p.count/max)*100}%`,background:'linear-gradient(90deg,#1D4ED8,#2563EB)'}}/>
                        </div>
                        <span className="text-xs font-semibold text-txt-primary w-8 text-right">{p.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-txt-primary mb-1">Huquqiy ta'sir</h3>
                <p className="text-xs text-txt-muted mb-4">Aniqlangan noto'g'ri tasniflash bo'yicha ehtimoliy huquqiy oqibatlar.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {l:'Ehtimoliy huquqbuzarlik',v:testResult.legal.violations,c:'text-status-amber'},
                    {l:'Ma\'muriy ish',v:testResult.legal.administrative,c:'text-txt-primary'},
                    {l:'Jinoiy belgilar',v:testResult.legal.criminal,c:'text-status-red'},
                    {l:'Kam to\'langan boj',v:formatCurrency(testResult.legal.underpaidDuty),c:'text-status-green'},
                    {l:'Taxminiy jarima',v:formatCurrency(testResult.legal.penalty),c:'text-status-green'},
                  ].map((s,i) => (
                    <div key={i} className="bg-surface-200 rounded-lg p-3">
                      <div className="text-[10px] text-txt-muted mb-1">{s.l}</div>
                      <div className={`text-base font-bold ${s.c}`}>{s.v}</div>
                    </div>
                  ))}
                  <div className="bg-surface-200 rounded-lg p-3 flex flex-col justify-center">
                    <div className="text-[10px] text-txt-muted mb-1">Asosiy modda</div>
                    <div className="text-[11px] font-semibold text-txt-secondary leading-tight">{testResult.legal.article}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>)}

      {/* Read-only view for active rules */}
      {viewRule && (
        <div className="modal-overlay animate-fade" onClick={() => setViewRule(null)}>
          <div className="modal-content p-6 animate-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold text-txt-primary">{viewRule.name}</h2>
                  <StatusBadge status={viewRule.status}/>
                  <span className={`tag border text-[10px] ${viewRule.type==='statistical'?'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20':'bg-accent-cyan/5 text-accent-cyan/70 border-accent-cyan/15'}`}>
                    {viewRule.type==='statistical'?'Statistik':'Biznes'}
                  </span>
                </div>
                <p className="font-mono text-xs text-accent-cyan">{viewRule.condition}</p>
              </div>
              <button onClick={() => setViewRule(null)} className="text-txt-muted hover:text-txt-primary transition-colors p-1">
                <Icon name="x" size={20}/>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg px-3 py-2 mb-5">
              <Icon name="eye" size={13} className="text-accent-cyan"/>
              <span className="text-xs text-accent-cyan">Faol qoidalar faqat ko'rish uchun. O'zgartirish uchun avval qoidani arxivlang.</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                {l:'Tasdiqlanish foizi',v:viewRule.hitRate+'%',c:'text-accent-cyan'},
                {l:'Noto\'g\'ri signal',v:viewRule.falsePositive+'%',c:'text-status-amber'},
                {l:'Qamrov',v:viewRule.coverage+'%',c:'text-txt-primary'},
                {l:'Jami belgilangan',v:viewRule.flagged,c:'text-txt-primary'},
                {l:'Tasdiqlangan',v:viewRule.confirmed,c:'text-status-green'},
                {l:'Qo\'shimcha bojxona to\'lovi',v:formatCurrency(viewRule.revenueRecovered),c:'text-status-green'},
              ].map((s,i) => (
                <div key={i} className="bg-surface-200 rounded-lg p-3">
                  <div className="text-xs text-txt-muted mb-1">{s.l}</div>
                  <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>

            <div className="bg-surface-200 rounded-lg p-4 flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-txt-secondary font-semibold mb-0.5">Tasdiqlanish foizi trendi</div>
                <div className="text-[11px] text-txt-dim">Oxirgi {viewRule.hitRateTrend.length} hafta · faollik: {viewRule.activeSince || '—'}</div>
              </div>
              <MiniSparkline data={viewRule.hitRateTrend} width={140} height={40}
                color={viewRule.hitRateTrend[viewRule.hitRateTrend.length-1] >= viewRule.hitRateTrend[0] ? '#059669' : '#D97706'}/>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setViewRule(null)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-300 text-txt-secondary text-sm font-medium hover:bg-surface-400 transition-colors">
                Yopish
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-status-amber/15 text-status-amber text-sm font-medium hover:bg-status-amber/25 transition-colors border border-status-amber/30">
                <Icon name="archive" size={14}/> Arxivlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
