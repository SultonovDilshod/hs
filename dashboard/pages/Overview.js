const { useMemo } = React;
const { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } = Recharts;

window.OverviewPage = () => {
  const cards = [
    {label:'Tekshirilgan deklaratsiyalar',value:formatNumber(MOCK.summary.totalInspected),icon:'shield',color:'#1D4ED8',sub:`Jami: ${formatNumber(MOCK.summary.totalDeclarations)}`},
    {label:'Aniqlangan noto\'g\'ri tasniflashlar',value:formatNumber(MOCK.summary.misclassifications),icon:'alertTriangle',color:'#F59E0B',sub:`${((MOCK.summary.misclassifications/MOCK.summary.totalInspected)*100).toFixed(1)}% tasdiqlanish foizi`},
    {label:'Faol qoidalar',value:MOCK.summary.activeRules,icon:'layers',color:'#1D4ED8',sub:MOCK.ruleTypeDistribution.map(d=>d.value+' '+d.name.toLowerCase()).join(' · ')},
    {label:'Qo\'shimcha bojxona to\'lovi',value:formatCurrency(MOCK.summary.revenueImpact),icon:'dollarSign',color:'#10B981',sub:'So\'nggi 12 oy'},
    {label:'O\'rtacha tasdiqlanish foizi',value:MOCK.summary.avgHitRate+'%',icon:'target',color:'#1D4ED8',sub:'+6.4% o\'sish'},
  ];

  // Aniqlangan shablonlarni xavf yo'laklari bo'yicha taqsimlash.
  const corridorDist = useMemo(() => {
    const agg = { red:{count:0,revenue:0}, yellow:{count:0,revenue:0}, green:{count:0,revenue:0} };
    (MOCK.patterns || []).forEach(p => {
      const a = assessCorridor(p);
      agg[a.key].count++;
      agg[a.key].revenue += p.revenueImpact || 0;
    });
    const total = agg.red.count + agg.yellow.count + agg.green.count || 1;
    return { agg, total };
  }, []);

  return (
    <div className="animate-fade">
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

      {/* Risk corridor distribution */}
      <div className="glass rounded-xl p-5 mb-6 animate-in stagger-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-txt-primary">Xavf yo'laklari bo'yicha shablonlar</h3>
          <div className="flex items-center gap-3">
            {['red','yellow','green'].map(k => (
              <span key={k} className="flex items-center gap-1.5 text-[11px] text-txt-muted">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:CORRIDOR_META[k].color}}/>{CORRIDOR_META[k].short}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {['red','yellow','green'].map(k => {
            const c = CORRIDOR_META[k], d = corridorDist.agg[k];
            return (
              <div key={k} className="rounded-xl p-4 border" style={{background:c.color+'0D', borderColor:c.color+'33'}}>
                <div className="text-[10px] uppercase tracking-wider mb-1" style={{color:c.color}}>{c.label}</div>
                <div className="text-2xl font-bold text-txt-primary">{d.count} <span className="text-sm font-medium text-txt-muted">shablon</span></div>
                <div className="text-xs text-txt-secondary mt-1">{formatCurrency(d.revenue)} · {Math.round(d.count/corridorDist.total*100)}%</div>
              </div>
            );
          })}
        </div>
        <div className="flex h-3 rounded-full overflow-hidden">
          {['red','yellow','green'].map(k => {
            const d = corridorDist.agg[k];
            return d.count > 0 ? <div key={k} style={{width:`${d.count/corridorDist.total*100}%`, background:CORRIDOR_META[k].color}}/> : null;
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Main Trend Chart */}
        <div className="col-span-2 glass rounded-xl p-5 animate-in stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary">Noto'g'ri tasniflash trendi</h3>
            <div className="flex gap-4 text-xs text-txt-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-cyan inline-block"/>Holatlar</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-green inline-block"/>Bojxona to'lovi</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={MOCK.monthlyTrend}>
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
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={false} name="Bojxona to'lovi"/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Report Summary */}
        <div className="glass rounded-xl p-5 animate-in stagger-3">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Haftalik hisobot</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="zap" size={14} className="text-accent-cyan"/>
                <span className="text-xs font-semibold text-accent-cyan">Yangi shablonlar</span>
                <span className="ml-auto text-lg font-bold text-accent-cyan">{MOCK.summary.weeklyNewPatterns}</span>
              </div>
              <p className="text-xs text-txt-muted">Bu hafta yangi aniqlangan shablonlar</p>
            </div>
            <div className="p-3 rounded-lg bg-status-green/5 border border-status-green/20">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="trendUp" size={14} className="text-status-green"/>
                <span className="text-xs font-semibold text-status-green">Kuchaygan</span>
                <span className="ml-auto text-lg font-bold text-status-green">{MOCK.summary.weeklyStrengthened}</span>
              </div>
              <p className="text-xs text-txt-muted">Ko'rsatkichlari oshgan shablonlar</p>
            </div>
            <div className="p-3 rounded-lg bg-status-amber/5 border border-status-amber/20">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="trendDown" size={14} className="text-status-amber"/>
                <span className="text-xs font-semibold text-status-amber">Susaygan</span>
                <span className="ml-auto text-lg font-bold text-status-amber">{MOCK.summary.weeklyWeakened}</span>
              </div>
              <p className="text-xs text-txt-muted">Ko'rsatkichlari pasaygan shablonlar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Top Risk Signals */}
        <div className="col-span-2 glass rounded-xl p-5 animate-in stagger-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary">Yuqori xavf signallari</h3>
            <span className="text-xs text-txt-muted">Top 5 shablon — qo'shimcha bojxona to'lovi bo'yicha</span>
          </div>
          <div className="space-y-2">
            {MOCK.topSignals.map((s,i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-200/50 transition-colors">
                <span className="text-lg font-bold text-txt-dim w-6 text-center">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold text-accent-cyan">HS {s.hs6}</span>
                    <span className="text-xs text-txt-muted">·</span>
                    <span className="text-xs text-txt-secondary">{s.country}</span>
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
              </div>
            ))}
          </div>
        </div>

        {/* Rule Distribution */}
        <div className="glass rounded-xl p-5 animate-in stagger-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-4">Qoidalar taqsimoti</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={MOCK.ruleTypeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4} stroke="none">
                {MOCK.ruleTypeDistribution.map((d,i) => <Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {MOCK.ruleTypeDistribution.map((d,i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{background:d.color}}/>
                <span className="text-xs text-txt-secondary">{d.name}: <span className="font-semibold text-txt-primary">{d.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
