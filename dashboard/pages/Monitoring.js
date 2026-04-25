const { useState } = React;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

window.MonitoringPage = () => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const activeRules = MOCK.rules.filter(r => {
    if (filterType === 'all') return r.status === 'active';
    return r.status === 'active' && r.type === filterType;
  });

  const activeForKpi = MOCK.rules.filter(r => r.status === 'active' && r.hitRate != null);
  const avgHit = activeForKpi.length ? (activeForKpi.reduce((s,r) => s+r.hitRate, 0) / activeForKpi.length).toFixed(1) : '0.0';
  const avgFp = activeForKpi.length ? (activeForKpi.reduce((s,r) => s+r.falsePositive, 0) / activeForKpi.length).toFixed(1) : '0.0';
  const totalCov = activeForKpi.reduce((s,r) => s+(r.coverage||0), 0).toFixed(1);
  const totalRev = activeForKpi.reduce((s,r) => s+(r.revenueRecovered||0), 0);

  const kpis = [
    {label:'O\'rtacha tasdiqlanish foizi',value:avgHit+'%',change:'+3.2%',up:true,icon:'target',color:'#06B6D4'},
    {label:'O\'rtacha noto\'g\'ri signal',value:avgFp+'%',change:'-2.1%',up:false,icon:'alertTriangle',color:'#F59E0B'},
    {label:'Jami qamrov',value:totalCov+'%',change:'+1.8%',up:true,icon:'layers',color:'#06B6D4'},
    {label:'Qo\'shimcha bojxona to\'lovi',value:formatCurrency(totalRev),change:'+12.4%',up:true,icon:'dollarSign',color:'#10B981'},
  ];

  // alerts for declining rules
  const decliningRules = MOCK.rules.filter(r => r.status === 'active' && r.hitRateTrend.length >= 2 && r.hitRateTrend[r.hitRateTrend.length-1] < r.hitRateTrend[0]);

  return (
    <div className="animate-fade">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k,i) => (
          <div key={i} className={`glass rounded-xl p-5 stat-card card-glow animate-in stagger-${i+1}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-txt-secondary font-medium uppercase tracking-wider">{k.label}</span>
              <span style={{color:k.color}} className="opacity-60"><Icon name={k.icon} size={16}/></span>
            </div>
            <div className="text-2xl font-bold mb-1" style={{color:k.color}}>{k.value}</div>
            <div className={`text-xs flex items-center gap-1 ${k.up?'text-status-green':'text-status-green'}`}>
              <Icon name={k.up?'trendUp':'trendDown'} size={12}/>{k.change} so'nggi oyga nisbatan
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {decliningRules.length > 0 && (
        <div className="bg-status-amber/5 border border-status-amber/20 rounded-xl p-4 mb-5 animate-in stagger-2">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="alertTriangle" size={16} className="text-status-amber"/>
            <span className="text-sm font-semibold text-status-amber">Ogohlantirish: samaradorligi pasaygan qoidalar</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {decliningRules.map(r => (
              <span key={r.id} className="tag bg-status-amber/10 text-status-amber border border-status-amber/20 text-xs">
                {r.name} — {r.hitRate}% (↓)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter + Table */}
      <div className="glass rounded-xl animate-in stagger-3">
        <div className="flex items-center gap-4 p-4 border-b border-surface-300/50">
          <h3 className="text-sm font-semibold text-txt-primary">Faol qoidalar monitoringi</h3>
          <div className="ml-auto flex gap-2">
            {['all','statistical','business'].map(v => (
              <button key={v} onClick={() => setFilterType(v)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${filterType===v ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' : 'bg-surface-200 text-txt-muted border border-transparent hover:text-txt-secondary'}`}>
                {v==='all'?'Barchasi':v==='statistical'?'Statistik':'Biznes'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-surface-300/50">
                {['Nomi','Turi','Tasd. foizi','Trend','Noto\'g\'ri','Qamrov','Bojxona to\'lovi','Yoshi',''].map((h,i) => (
                  <th key={i} className="px-4 py-3 text-left text-txt-muted font-medium uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeRules.map((r,i) => {
                const ageMonths = r.activeSince ? Math.round((new Date('2025-03-15') - new Date(r.activeSince)) / (1000*60*60*24*30)) : 0;
                const trendUp = r.hitRateTrend.length >= 2 && r.hitRateTrend[r.hitRateTrend.length-1] >= r.hitRateTrend[0];
                return (
                  <tr key={r.id} className="pattern-row border-b border-surface-300/30 last:border-0" onClick={() => setSelectedRule(selectedRule?.id === r.id ? null : r)}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-txt-primary text-sm">{r.name}</div>
                      <div className="font-mono text-[10px] text-txt-dim mt-0.5">{r.id}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`tag border text-[10px] ${r.type==='statistical'?'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20':'bg-accent-cyan/5 text-accent-cyan/70 border-accent-cyan/15'}`}>
                        {r.type==='statistical'?'Statistik':'Biznes'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-accent-cyan">{r.hitRate}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <MiniSparkline data={r.hitRateTrend} color={trendUp?'#10B981':'#F59E0B'}/>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold ${r.falsePositive > 30 ? 'text-status-amber' : r.falsePositive > 20 ? 'text-status-amber' : 'text-status-green'}`}>
                        {r.falsePositive}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-txt-secondary">{r.coverage}%</td>
                    <td className="px-4 py-3 text-sm font-semibold text-status-green">{formatCurrency(r.revenueRecovered)}</td>
                    <td className="px-4 py-3 text-sm text-txt-secondary">{ageMonths} oy</td>
                    <td className="px-4 py-3">
                      <button className="text-txt-muted hover:text-accent-cyan transition-colors"><Icon name="eye" size={14}/></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Rule Detail */}
      {selectedRule && (
        <div className="glass rounded-xl p-5 mt-5 animate-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary">{selectedRule.name} — batafsil</h3>
            <button onClick={() => setSelectedRule(null)} className="text-txt-muted hover:text-txt-primary"><Icon name="x" size={16}/></button>
          </div>
          <div className="font-mono text-xs text-txt-secondary bg-surface-50/50 rounded px-3 py-2 mb-4 border border-surface-300/50">
            {selectedRule.condition}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-txt-secondary mb-3">Tasdiqlanish foizi trendi</h4>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={selectedRule.hitRateTrend.map((v,i) => ({week:`Hafta ${i+1}`,rate:v}))}>
                  <defs>
                    <linearGradient id="gradTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2740" vertical={false}/>
                  <XAxis dataKey="week" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis domain={['dataMin-5','dataMax+5']} tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Area type="monotone" dataKey="rate" stroke="#06B6D4" fill="url(#gradTrend)" strokeWidth={2} name="Tasdiqlanish foizi"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {l:'Jami belgilangan',v:selectedRule.flagged,c:'text-txt-primary'},
                {l:'Tasdiqlangan',v:selectedRule.confirmed,c:'text-status-green'},
                {l:'Noto\'g\'ri signal',v:selectedRule.flagged - selectedRule.confirmed,c:'text-status-amber'},
                {l:'Oxirgi ishga tushdi',v:selectedRule.lastTriggered?.slice(5)||'—',c:'text-txt-secondary'},
              ].map((s,i) => (
                <div key={i} className="bg-surface-200 rounded-lg p-3">
                  <div className="text-[10px] text-txt-muted mb-1">{s.l}</div>
                  <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
