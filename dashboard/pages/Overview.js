const { useMemo, useState } = React;
const { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } = Recharts;

const OV_PERIODS = [
  {id:'1y', label:"So'nggi 1 yil", months:12},
  {id:'6m', label:"So'nggi 6 oy",  months:6},
  {id:'3m', label:"So'nggi 3 oy",  months:3},
  {id:'1m', label:"So'nggi 1 oy",  months:1},
];

window.OverviewPage = () => {
  const [period, setPeriod] = useState('1y');
  const [distMode, setDistMode] = useState('type');     // 'type' | 'corridor'
  const [signalDetail, setSignalDetail] = useState(null);
  const months = OV_PERIODS.find(p => p.id === period).months;

  // All page metrics are derived from the selected time window.
  const data = useMemo(() => {
    const win = MOCK.monthlyTrend.slice(-months);
    const sum = k => win.reduce((s,r) => s + (r[k]||0), 0);
    const frac = months / 12;
    const inspectRatio = MOCK.summary.totalInspected / MOCK.summary.totalDeclarations;
    const jami = sum('declarations');
    const inspected = Math.round(jami * inspectRatio);
    const misclass = sum('misclass');
    const revenue = sum('revenue');
    const avgHit = win.length ? +(win.reduce((s,r)=>s+(r.hitRate||0),0)/win.length).toFixed(1) : 0;

    // Pattern → corridor aggregates (scaled to the window).
    const corr = { red:{inspected:0,detected:0,revenue:0,count:0}, yellow:{inspected:0,detected:0,revenue:0,count:0} };
    (MOCK.patterns||[]).forEach(p => {
      const k = assessCorridor(p).key;
      if (!corr[k]) return;
      corr[k].inspected += (p.totalCases||0);
      corr[k].detected  += (p.misclassCases||0);
      corr[k].revenue   += (p.revenueImpact||0);
      corr[k].count++;
    });
    ['red','yellow'].forEach(k => {
      corr[k].inspected = Math.round(corr[k].inspected * frac);
      corr[k].detected  = Math.round(corr[k].detected  * frac);
      corr[k].revenue   = Math.round(corr[k].revenue   * frac);
    });

    // Monthly split of detected cases into red / yellow lanes for the trend.
    const totDet = corr.red.detected + corr.yellow.detected || 1;
    const redShare = corr.red.detected / totDet;
    const trend = win.map(m => {
      const red = Math.round((m.misclass||0) * redShare);
      return { ...m, redCases: red, yellowCases: Math.max(0, (m.misclass||0) - red) };
    });

    // Active rules by corridor.
    const ruleCorr = { red:0, yellow:0 };
    (MOCK.rules||[]).forEach(r => {
      if (r.status !== 'active') return;
      const k = assessCorridor({hitRate:r.hitRate, revenueRecovered:r.revenueRecovered}).key;
      ruleCorr[k] = (ruleCorr[k]||0) + 1;
    });

    // "This week" figures derived from the latest month.
    const last = MOCK.monthlyTrend[MOCK.monthlyTrend.length-1] || {};
    const week = {
      inspected: Math.round((last.declarations||0) * inspectRatio / 4.3),
      detected:  Math.round((last.misclass||0) / 4.3),
      revenue:   Math.round((last.revenue||0) / 4.3),
    };

    return { inspected, jami, misclass, revenue, avgHit, corr, trend, ruleCorr, week };
  }, [months]);

  const cards = [
    {label:'Tekshirilgan deklaratsiyalar',value:formatNumber(data.inspected),icon:'shield',color:'#1D4ED8',sub:`Jami: ${formatNumber(data.jami)}`},
    {label:'Aniqlangan noto\'g\'ri tasniflashlar',value:formatNumber(data.misclass),icon:'alertTriangle',color:'#D97706',sub:`${data.inspected?((data.misclass/data.inspected)*100).toFixed(1):0}% ulush`},
    {label:'Faol qoidalar',value:MOCK.summary.activeRules,icon:'layers',color:'#1D4ED8',sub:`${data.ruleCorr.red||0} qizil · ${data.ruleCorr.yellow||0} sariq`},
    {label:'Qo\'shimcha bojxona to\'lovi',value:formatCurrency(data.revenue),icon:'dollarSign',color:'#059669',sub:OV_PERIODS.find(p=>p.id===period).label},
    {label:'O\'rtacha tasdiqlanish foizi',value:data.avgHit+'%',icon:'target',color:'#1D4ED8',sub:'davr o\'rtachasi'},
  ];

  // Rule distribution pie data depending on the selected mode.
  const distData = distMode === 'type'
    ? MOCK.ruleTypeDistribution.map(d => ({ name:d.name, value:d.value, color: d.name==='Statistik' ? '#1D4ED8' : '#93C5FD' }))
    : [
        {name:"Qizil yo'lak", value:data.ruleCorr.red||0, color:CORRIDOR_META.red.color},
        {name:"Sariq yo'lak", value:data.ruleCorr.yellow||0, color:CORRIDOR_META.yellow.color},
      ];

  // Pattern matched to the opened risk signal (for its rule content).
  const sigPattern = signalDetail ? (MOCK.patterns.find(p => String(p.hsCode).startsWith(String(signalDetail.hs6))) || null) : null;
  const sigCorridor = signalDetail ? assessCorridor({ hitRate: signalDetail.hitRate, revenueImpact: signalDetail.revenue }) : null;

  return (
    <div className="animate-fade">
      {/* Header + time range selector */}
      <div className="flex items-center justify-between mb-5 animate-in stagger-1">
        <div>
          <h2 className="text-base font-bold text-txt-primary">Umumiy ko'rinish</h2>
          <p className="text-xs text-txt-muted">{OV_PERIODS.find(p=>p.id===period).label} bo'yicha ko'rsatkichlar</p>
        </div>
        <div className="flex items-center gap-1 glass rounded-lg p-1">
          <Icon name="clock" size={14} className="text-txt-muted ml-1.5 mr-0.5"/>
          {OV_PERIODS.map(p => (
            <button key={p.id} onClick={() => setPeriod(p.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period===p.id ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-txt-muted hover:text-txt-secondary'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {cards.map((c,i) => (
          <div key={i} className={`glass rounded-xl p-5 stat-card card-glow animate-in stagger-${i+1}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-txt-secondary text-xs font-medium uppercase tracking-wider">{c.label}</span>
              <span style={{color:c.color}} className="opacity-70"><Icon name={c.icon} size={18}/></span>
            </div>
            <div className="text-2xl font-bold mb-1" style={{color:c.color}}>{c.value}</div>
            <div className="text-xs text-txt-muted">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Risk corridor doughnuts (qizil & sariq) */}
      <div className="glass rounded-xl p-5 mb-6 animate-in stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-txt-primary">Xavf yo'laklari bo'yicha shablonlar</h3>
          <span className="text-[11px] text-txt-muted">Qoida faqat sariq yoki qizil yo'lakka yo'naltiradi</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CorridorDoughnut corridorKey="red" inspected={data.corr.red.inspected} detected={data.corr.red.detected} revenue={data.corr.red.revenue}/>
          <CorridorDoughnut corridorKey="yellow" inspected={data.corr.yellow.inspected} detected={data.corr.yellow.detected} revenue={data.corr.yellow.revenue}/>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Main Trend Chart */}
        <div className="col-span-2 glass rounded-xl p-5 animate-in stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary">Noto'g'ri tasniflash trendi</h3>
            <div className="flex gap-3 text-xs text-txt-muted flex-wrap">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-cyan inline-block"/>Holatlar</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{background:CORRIDOR_META.red.color}}/>Qizil</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{background:CORRIDOR_META.yellow.color}}/>Sariq</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-green inline-block"/>To'lov</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={data.trend}>
              <defs>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
              <XAxis dataKey="month" tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="left" tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="right" orientation="right" tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>formatCurrency(v)}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area yAxisId="left" type="monotone" dataKey="misclass" fill="url(#gradCyan)" stroke="#1D4ED8" strokeWidth={2} name="Holatlar"/>
              <Line yAxisId="left" type="monotone" dataKey="redCases" stroke={CORRIDOR_META.red.color} strokeWidth={2} dot={false} name="Qizil yo'lak"/>
              <Line yAxisId="left" type="monotone" dataKey="yellowCases" stroke={CORRIDOR_META.yellow.color} strokeWidth={2} dot={false} name="Sariq yo'lak"/>
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} dot={false} name="Bojxona to'lovi"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Report Summary */}
        <div className="glass rounded-xl p-5 animate-in stagger-3">
          <h3 className="text-sm font-semibold text-txt-primary mb-3">Haftalik hisobot</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              {l:'Tekshirildi',v:formatNumber(data.week.inspected),c:'text-txt-primary'},
              {l:'Aniqlandi',v:formatNumber(data.week.detected),c:'text-status-amber'},
              {l:'To\'lov',v:formatCurrency(data.week.revenue),c:'text-status-green'},
            ].map((s,i) => (
              <div key={i} className="bg-surface-200 rounded-lg p-2.5 text-center">
                <div className="text-[10px] text-txt-muted mb-0.5">{s.l}</div>
                <div className={`text-sm font-bold ${s.c}`}>{s.v}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20">
              <div className="flex items-center gap-2">
                <Icon name="zap" size={14} className="text-accent-cyan"/>
                <span className="text-xs font-semibold text-accent-cyan">Yangi shablonlar</span>
                <span className="ml-auto text-lg font-bold text-accent-cyan">{MOCK.summary.weeklyNewPatterns}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-status-green/5 border border-status-green/20">
              <div className="flex items-center gap-2">
                <Icon name="trendUp" size={14} className="text-status-green"/>
                <span className="text-xs font-semibold text-status-green">Kuchaygan</span>
                <span className="ml-auto text-lg font-bold text-status-green">{MOCK.summary.weeklyStrengthened}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-status-amber/5 border border-status-amber/20">
              <div className="flex items-center gap-2">
                <Icon name="trendDown" size={14} className="text-status-amber"/>
                <span className="text-xs font-semibold text-status-amber">Susaygan</span>
                <span className="ml-auto text-lg font-bold text-status-amber">{MOCK.summary.weeklyWeakened}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Top Risk Signals */}
        <div className="col-span-2 glass rounded-xl p-5 animate-in stagger-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary">Yuqori xavf signallari</h3>
            <span className="text-xs text-txt-muted">Batafsil uchun bosing</span>
          </div>
          <div className="space-y-2">
            {MOCK.topSignals.map((s,i) => {
              const c = assessCorridor({ hitRate:s.hitRate, revenueImpact:s.revenue });
              return (
                <div key={s.id} onClick={() => setSignalDetail(s)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-200/50 transition-colors cursor-pointer">
                  <span className="text-lg font-bold text-txt-dim w-6 text-center">{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-accent-cyan">HS {s.hs6}</span>
                      <span className="text-xs text-txt-muted">·</span>
                      <span className="text-xs text-txt-secondary">{s.country}</span>
                      <CorridorBadge c={c}/>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="progress-bar flex-1 max-w-[200px]">
                        <div className="progress-fill" style={{width:`${s.hitRate}%`,background:`linear-gradient(90deg,#1D4ED8,#2563EB)`}}/>
                      </div>
                      <span className="text-xs font-semibold text-txt-primary">{s.hitRate}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-status-green">{formatCurrency(s.revenue)}</div>
                    <div className={`text-xs flex items-center gap-1 justify-end ${s.trend==='up'?'text-status-green':'text-status-amber'}`}>
                      <Icon name={s.trend==='up'?'trendUp':'trendDown'} size={12}/>{s.change}
                    </div>
                  </div>
                  <Icon name="chevDown" size={14} className="text-txt-dim -rotate-90"/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rule Distribution */}
        <div className="glass rounded-xl p-5 animate-in stagger-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-txt-primary">Qoidalar taqsimoti</h3>
            <div className="flex items-center gap-1 bg-surface-200 rounded-lg p-0.5">
              {[{id:'type',label:'Tur'},{id:'corridor',label:'Yo\'lak'}].map(m => (
                <button key={m.id} onClick={() => setDistMode(m.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${distMode===m.id ? 'bg-surface-100 text-accent-cyan shadow-sm' : 'text-txt-muted'}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={distData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4} stroke="none">
                {distData.map((d,i) => <Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-5 mt-2 flex-wrap">
            {distData.map((d,i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{background:d.color}}/>
                <span className="text-xs text-txt-secondary">{d.name}: <span className="font-semibold text-txt-primary">{d.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk signal detail modal */}
      {signalDetail && (
        <div className="modal-overlay animate-fade" onClick={() => setSignalDetail(null)}>
          <div className="modal-content p-6 animate-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-bold font-mono text-txt-primary">HS {signalDetail.hs6}</h2>
                  <CorridorBadge c={sigCorridor}/>
                  <span className="text-xs text-txt-secondary">{signalDetail.country}</span>
                </div>
                <p className="font-mono text-sm text-accent-cyan">{sigPattern ? sigPattern.conditions : `HS6 = ${signalDetail.hs6}`}</p>
              </div>
              <button onClick={() => setSignalDetail(null)} className="text-txt-muted hover:text-txt-primary transition-colors p-1">
                <Icon name="x" size={20}/>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-5">
              {[
                {l:'Tasdiqlanish foizi',v:signalDetail.hitRate+'%',c:'text-accent-cyan'},
                {l:'Aniqlangan holatlar',v:signalDetail.cases ?? (sigPattern?.misclassCases ?? '—'),c:'text-status-amber'},
                {l:'Qo\'shimcha to\'lov',v:formatCurrency(signalDetail.revenue),c:'text-status-green'},
                {l:'O\'zgarish',v:signalDetail.change,c:signalDetail.trend==='up'?'text-status-green':'text-status-amber'},
              ].map((s,i) => (
                <div key={i} className="bg-surface-200 rounded-lg p-3">
                  <div className="text-xs text-txt-muted mb-1">{s.l}</div>
                  <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 mb-5 border" style={{background:sigCorridor.color+'0D', borderColor:sigCorridor.color+'33'}}>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-semibold text-txt-primary">Tavsiya etilgan xavf yo'lagi</h4>
                <CorridorBadge c={sigCorridor}/>
                <span className="ml-auto text-xs text-txt-muted">Xavf bali: <span className="font-bold" style={{color:sigCorridor.color}}>{sigCorridor.risk}</span></span>
              </div>
              <p className="text-xs text-txt-secondary">{sigCorridor.control} — {sigCorridor.key==='red' ? "to'liq jismoniy ko'rik tavsiya etiladi." : 'hujjat tekshiruvi tavsiya etiladi.'}</p>
            </div>

            {sigPattern && sigPattern.actualCodes && (
              <>
                <h4 className="text-sm font-semibold text-txt-primary mb-3">Mumkin bo'lgan haqiqiy TIF TN kodlar</h4>
                <div className="space-y-2">
                  {sigPattern.actualCodes.map((ac,i) => (
                    <div key={i} className="flex items-center gap-3 bg-surface-200 rounded-lg p-3">
                      <span className="font-mono text-sm font-semibold text-accent-cyan">{ac.code}</span>
                      <div className="progress-bar flex-1">
                        <div className="progress-fill" style={{width:`${ac.pct}%`,background:'linear-gradient(90deg,#1D4ED8,#2563EB)'}}/>
                      </div>
                      <span className="text-sm font-semibold text-txt-primary w-12 text-right">{ac.pct}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
