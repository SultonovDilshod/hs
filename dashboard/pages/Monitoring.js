const { useState, useMemo } = React;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, ReferenceLine, BarChart, Bar, Legend, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line } = Recharts;

// Composite health score weighting for a single rule (0–100).
const scoreRule = (r, maxRev) => {
  const precision = r.flagged ? (r.confirmed / r.flagged) * 100 : 0;
  const normRev = maxRev ? (r.revenueRecovered / maxRev) * 100 : 0;
  return 0.40 * r.hitRate + 0.25 * (100 - r.falsePositive) + 0.20 * precision + 0.15 * normRev;
};
const scoreColor = (s) => s >= 75 ? '#059669' : s >= 55 ? '#1D4ED8' : '#D97706';

const TYPE_COLORS = { statistical:'#2563EB', business:'#8B5CF6' };

window.MonitoringPage = () => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [view, setView] = useState('table');

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
    {label:'O\'rtacha tasdiqlanish foizi',value:avgHit+'%',change:'+3.2%',up:true,icon:'target',color:'#1D4ED8'},
    {label:'O\'rtacha noto\'g\'ri signal',value:avgFp+'%',change:'-2.1%',up:false,icon:'alertTriangle',color:'#F59E0B'},
    {label:'Jami qamrov',value:totalCov+'%',change:'+1.8%',up:true,icon:'layers',color:'#1D4ED8'},
    {label:'Qo\'shimcha bojxona to\'lovi',value:formatCurrency(totalRev),change:'+12.4%',up:true,icon:'dollarSign',color:'#10B981'},
  ];

  // alerts for declining rules
  const decliningRules = MOCK.rules.filter(r => r.status === 'active' && r.hitRateTrend.length >= 2 && r.hitRateTrend[r.hitRateTrend.length-1] < r.hitRateTrend[0]);

  // ── Advanced analytics (computed once per data change) ──────────────────
  const analytics = useMemo(() => {
    const rules = MOCK.rules.filter(r => r.status === 'active' && r.hitRate != null);
    const avgHitNum = rules.length ? rules.reduce((s,r)=>s+r.hitRate,0)/rules.length : 0;
    const avgFpNum = rules.length ? rules.reduce((s,r)=>s+r.falsePositive,0)/rules.length : 0;

    // 1. Effectiveness quadrant — false-positive (x) vs hit-rate (y),
    //    bubble sized by recovered revenue, split by rule type.
    const toPoint = r => ({ x:r.falsePositive, y:r.hitRate, z:r.revenueRecovered||0,
      name:r.name, id:r.id, type:r.type, coverage:r.coverage });
    const scatterStat = rules.filter(r=>r.type==='statistical').map(toPoint);
    const scatterBiz  = rules.filter(r=>r.type==='business').map(toPoint);

    // 2. Detection precision — confirmed vs false signals per rule.
    const precision = [...rules].sort((a,b)=>b.flagged-a.flagged).map(r => ({
      id:r.id, name:r.name,
      confirmed:r.confirmed,
      falsePos:Math.max((r.flagged||0)-(r.confirmed||0),0),
    }));

    // 3. Type comparison radar — normalised profile of each rule type.
    const aggr = t => {
      const rs = rules.filter(r=>r.type===t);
      if (!rs.length) return null;
      const avg = f => rs.reduce((s,r)=>s+f(r),0)/rs.length;
      return {
        hit: avg(r=>r.hitRate),
        precision: avg(r=> r.flagged ? (r.confirmed/r.flagged)*100 : 0),
        lowFp: 100 - avg(r=>r.falsePositive),
        coverage: avg(r=>r.coverage||0),
        revenue: rs.reduce((s,r)=>s+(r.revenueRecovered||0),0),
      };
    };
    const aStat = aggr('statistical'), aBiz = aggr('business');
    const maxCov = Math.max(aStat?.coverage||0, aBiz?.coverage||0, 1);
    const maxRev = Math.max(aStat?.revenue||0, aBiz?.revenue||0, 1);
    const norm = (v,max) => +(((v||0)/max)*100).toFixed(0);
    const radar = [
      {metric:'Tasdiqlanish', Statistik:+(aStat?.hit||0).toFixed(0), Biznes:+(aBiz?.hit||0).toFixed(0)},
      {metric:'Aniqlik',      Statistik:+(aStat?.precision||0).toFixed(0), Biznes:+(aBiz?.precision||0).toFixed(0)},
      {metric:'Past xato',    Statistik:+(aStat?.lowFp||0).toFixed(0), Biznes:+(aBiz?.lowFp||0).toFixed(0)},
      {metric:'Qamrov',       Statistik:norm(aStat?.coverage,maxCov), Biznes:norm(aBiz?.coverage,maxCov)},
      {metric:'Daromad',      Statistik:norm(aStat?.revenue,maxRev), Biznes:norm(aBiz?.revenue,maxRev)},
    ];

    // 4. Revenue Pareto — rules sorted by recovered revenue with a running
    //    cumulative share, to surface the 80/20 concentration.
    const totalRevAll = rules.reduce((s,r)=>s+(r.revenueRecovered||0),0) || 1;
    let cum = 0;
    const pareto = [...rules].sort((a,b)=>(b.revenueRecovered||0)-(a.revenueRecovered||0)).map(r => {
      cum += (r.revenueRecovered||0);
      return { id:r.id, name:r.name, revenue:r.revenueRecovered||0, cumPct:+(cum/totalRevAll*100).toFixed(1) };
    });

    // 5. Program-wide weekly trend — average hit-rate across all rules per week.
    const trendLen = rules.reduce((m,r)=>Math.max(m, r.hitRateTrend?.length||0), 0);
    const programTrend = Array.from({length:trendLen}, (_,i) => {
      const vals = rules.map(r=>r.hitRateTrend?.[i]).filter(v=>v!=null);
      const avg = vals.length ? vals.reduce((s,v)=>s+v,0)/vals.length : 0;
      const best = vals.length ? Math.max(...vals) : 0;
      const worst = vals.length ? Math.min(...vals) : 0;
      return { week:`Hafta ${i+1}`, avg:+avg.toFixed(1), best, worst };
    });

    // 6. Composite ranking — health score per rule.
    const maxRevRule = Math.max(...rules.map(r=>r.revenueRecovered||0), 1);
    const ranking = [...rules]
      .map(r => ({ id:r.id, name:r.name, type:r.type, hitRate:r.hitRate, falsePositive:r.falsePositive,
        coverage:r.coverage, revenue:r.revenueRecovered||0,
        precision:r.flagged?Math.round(r.confirmed/r.flagged*100):0,
        score:+scoreRule(r, maxRevRule).toFixed(1) }))
      .sort((a,b)=>b.score-a.score);

    // Portfolio summary metrics.
    const totalFlagged = rules.reduce((s,r)=>s+(r.flagged||0),0);
    const totalConfirmed = rules.reduce((s,r)=>s+(r.confirmed||0),0);
    const totalFalse = Math.max(totalFlagged-totalConfirmed,0);
    const summary = {
      ruleCount: rules.length,
      avgPrecision: totalFlagged ? Math.round(totalConfirmed/totalFlagged*100) : 0,
      totalFlagged, totalConfirmed, totalFalse,
      signalToNoise: totalFalse ? +(totalConfirmed/totalFalse).toFixed(1) : totalConfirmed,
      best: ranking[0] || null,
      worst: ranking[ranking.length-1] || null,
      avgScore: ranking.length ? Math.round(ranking.reduce((s,r)=>s+r.score,0)/ranking.length) : 0,
    };

    return { avgHitNum, avgFpNum, scatterStat, scatterBiz, precision, radar, hasBiz:!!aBiz,
      pareto, programTrend, ranking, summary };
  }, []);

  // Tooltip for the effectiveness quadrant.
  const QuadrantTooltip = ({active, payload}) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs" style={{border:'1px solid #E2E8F0'}}>
        <p className="font-semibold text-txt-primary mb-1">{d.name}</p>
        <p className="text-txt-secondary">Tasdiqlanish: <span className="font-semibold text-accent-cyan">{d.y}%</span></p>
        <p className="text-txt-secondary">Noto'g'ri signal: <span className="font-semibold text-status-amber">{d.x}%</span></p>
        <p className="text-txt-secondary">Bojxona to'lovi: <span className="font-semibold text-status-green">{formatCurrency(d.z)}</span></p>
      </div>
    );
  };

  // Tooltip for the revenue Pareto.
  const ParetoTooltip = ({active, payload}) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs" style={{border:'1px solid #E2E8F0'}}>
        <p className="font-semibold text-txt-primary mb-1">{d.name}</p>
        <p className="text-txt-secondary">Bojxona to'lovi: <span className="font-semibold text-status-green">{formatCurrency(d.revenue)}</span></p>
        <p className="text-txt-secondary">Yig'indi ulush: <span className="font-semibold text-accent-cyan">{d.cumPct}%</span></p>
      </div>
    );
  };

  // Tooltip for the precision bars.
  const PrecisionTooltip = ({active, payload}) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const total = d.confirmed + d.falsePos;
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs" style={{border:'1px solid #E2E8F0'}}>
        <p className="font-semibold text-txt-primary mb-1">{d.name}</p>
        <p className="text-txt-secondary">Tasdiqlangan: <span className="font-semibold text-status-green">{d.confirmed}</span></p>
        <p className="text-txt-secondary">Noto'g'ri signal: <span className="font-semibold text-status-amber">{d.falsePos}</span></p>
        <p className="text-txt-secondary">Aniqlik: <span className="font-semibold text-accent-cyan">{total?Math.round(d.confirmed/total*100):0}%</span></p>
      </div>
    );
  };

  return (
    <div className="animate-fade">
      {/* Demo data banner */}
      <div className="bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl p-3 mb-5 animate-in stagger-1 flex items-center gap-2">
        <Icon name="alertTriangle" size={14} className="text-accent-cyan"/>
        <span className="text-xs text-accent-cyan">
          Demo ma'lumot — qoidalar hali ishlab chiqarishga chiqarilmagan, ko'rsatilgan ko'rsatkichlar shartli.
        </span>
      </div>

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

      {/* View switcher: classic table vs. advanced analytics */}
      <div className="flex items-center gap-2 mb-4 animate-in stagger-2">
        {[{id:'table',label:'Jadval monitoringi',icon:'layers'},{id:'analytics',label:'Chuqur tahlil',icon:'barChart'}].map(v => (
          <button key={v.id} onClick={() => setView(v.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${view===v.id ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30' : 'bg-surface-100 text-txt-muted hover:text-txt-secondary border border-transparent'}`}>
            <Icon name={v.icon} size={15}/>{v.label}
          </button>
        ))}
      </div>

      {view === 'analytics' && (
      <div className="space-y-5 animate-fade">
        {/* Portfolio summary strip */}
        <div className="grid grid-cols-6 gap-3">
          {[
            {l:'Faol qoidalar',v:analytics.summary.ruleCount,c:'text-txt-primary',icon:'layers'},
            {l:'O\'rtacha aniqlik',v:analytics.summary.avgPrecision+'%',c:'text-accent-cyan',icon:'target'},
            {l:'Signal/shovqin',v:analytics.summary.signalToNoise+'×',c:'text-accent-cyan',icon:'activity'},
            {l:'Tasdiqlangan / jami',v:`${analytics.summary.totalConfirmed}/${analytics.summary.totalFlagged}`,c:'text-status-green',icon:'check'},
            {l:'O\'rtacha ball',v:analytics.summary.avgScore,c:'text-accent-cyan',icon:'barChart'},
            {l:'Noto\'g\'ri signal',v:analytics.summary.totalFalse,c:'text-status-amber',icon:'alertTriangle'},
          ].map((m,i) => (
            <div key={i} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-txt-muted uppercase tracking-wider leading-tight">{m.l}</span>
                <Icon name={m.icon} size={13} className="text-txt-dim shrink-0"/>
              </div>
              <div className={`text-xl font-bold ${m.c}`}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Best / worst performer highlight */}
        {analytics.summary.best && analytics.summary.worst && (
          <div className="grid grid-cols-2 gap-5">
            <div className="glass rounded-xl p-4 flex items-center gap-3 border-l-4" style={{borderLeftColor:'#059669'}}>
              <div className="w-9 h-9 rounded-lg bg-status-green/10 flex items-center justify-center shrink-0">
                <Icon name="trendUp" size={18} className="text-status-green"/>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-txt-muted uppercase tracking-wider">Eng samarali qoida</div>
                <div className="text-sm font-semibold text-txt-primary truncate">{analytics.summary.best.name}</div>
                <div className="text-xs text-txt-muted">Ball: <span className="font-semibold text-status-green">{analytics.summary.best.score}</span> · {analytics.summary.best.hitRate}% tasdiqlanish</div>
              </div>
            </div>
            <div className="glass rounded-xl p-4 flex items-center gap-3 border-l-4" style={{borderLeftColor:'#D97706'}}>
              <div className="w-9 h-9 rounded-lg bg-status-amber/10 flex items-center justify-center shrink-0">
                <Icon name="alertTriangle" size={18} className="text-status-amber"/>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-txt-muted uppercase tracking-wider">E'tibor talab qiladi</div>
                <div className="text-sm font-semibold text-txt-primary truncate">{analytics.summary.worst.name}</div>
                <div className="text-xs text-txt-muted">Ball: <span className="font-semibold text-status-amber">{analytics.summary.worst.score}</span> · {analytics.summary.worst.falsePositive}% noto'g'ri signal</div>
              </div>
            </div>
          </div>
        )}

        {/* Effectiveness quadrant */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-txt-primary">Samaradorlik kvadranti</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] text-txt-muted"><span className="w-2.5 h-2.5 rounded-full" style={{background:TYPE_COLORS.statistical}}/>Statistik</span>
              <span className="flex items-center gap-1.5 text-[11px] text-txt-muted"><span className="w-2.5 h-2.5 rounded-full" style={{background:TYPE_COLORS.business}}/>Biznes</span>
            </div>
          </div>
          <p className="text-xs text-txt-muted mb-4">Noto'g'ri signal (X) ⟷ tasdiqlanish (Y). Pufak hajmi — qo'shimcha bojxona to'lovi. Yuqori-chap burchak eng samarali zona.</p>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{top:10,right:20,bottom:20,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0"/>
              <XAxis type="number" dataKey="x" name="Noto'g'ri signal" unit="%" domain={[0,'dataMax+5']}
                tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false}
                label={{value:"Noto'g'ri signal %", position:'insideBottom', offset:-10, fill:'#94A3B8', fontSize:11}}/>
              <YAxis type="number" dataKey="y" name="Tasdiqlanish" unit="%" domain={[0,100]}
                tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false}
                label={{value:'Tasdiqlanish %', angle:-90, position:'insideLeft', fill:'#94A3B8', fontSize:11}}/>
              <ZAxis type="number" dataKey="z" range={[60,600]} name="Bojxona to'lovi"/>
              <ReferenceLine y={analytics.avgHitNum} stroke="#94A3B8" strokeDasharray="4 4"/>
              <ReferenceLine x={analytics.avgFpNum} stroke="#94A3B8" strokeDasharray="4 4"/>
              <Tooltip content={<QuadrantTooltip/>} cursor={{strokeDasharray:'3 3'}}/>
              <Scatter name="Statistik" data={analytics.scatterStat} fill={TYPE_COLORS.statistical} fillOpacity={0.7}/>
              <Scatter name="Biznes" data={analytics.scatterBiz} fill={TYPE_COLORS.business} fillOpacity={0.7}/>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Detection precision */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Aniqlik tahlili</h3>
            <p className="text-xs text-txt-muted mb-4">Har bir qoida bo'yicha tasdiqlangan va noto'g'ri signallar nisbati.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.precision} margin={{top:5,right:10,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="id" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" height={50}/>
                <YAxis tick={{fill:'#64748B',fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip content={<PrecisionTooltip/>} cursor={{fill:'rgba(29,78,216,0.05)'}}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="confirmed" stackId="a" fill="#059669" name="Tasdiqlangan" radius={[0,0,0,0]}/>
                <Bar dataKey="falsePos" stackId="a" fill="#D97706" name="Noto'g'ri signal" radius={[3,3,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Type comparison radar */}
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Qoida turlari profili</h3>
            <p className="text-xs text-txt-muted mb-4">Statistik va biznes qoidalarining normallashtirilgan ko'rsatkichlari (0–100).</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={analytics.radar} outerRadius={100}>
                <PolarGrid stroke="#E2E8F0"/>
                <PolarAngleAxis dataKey="metric" tick={{fill:'#475569',fontSize:11}}/>
                <PolarRadiusAxis domain={[0,100]} tick={{fill:'#94A3B8',fontSize:9}} axisLine={false}/>
                <Radar name="Statistik" dataKey="Statistik" stroke={TYPE_COLORS.statistical} fill={TYPE_COLORS.statistical} fillOpacity={0.25}/>
                {analytics.hasBiz && <Radar name="Biznes" dataKey="Biznes" stroke={TYPE_COLORS.business} fill={TYPE_COLORS.business} fillOpacity={0.25}/>}
                <Legend wrapperStyle={{fontSize:11}}/>
                <Tooltip content={<CustomTooltip/>}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Pareto + program-wide trend */}
        <div className="grid grid-cols-2 gap-5">
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Daromad Pareto tahlili</h3>
            <p className="text-xs text-txt-muted mb-4">Qoidalar bo'yicha qo'shimcha bojxona to'lovi va yig'indi ulush (80/20 qoidasi).</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={analytics.pareto} margin={{top:5,right:6,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="id" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" height={50}/>
                <YAxis yAxisId="left" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>formatCurrency(v)} width={46}/>
                <YAxis yAxisId="right" orientation="right" domain={[0,100]} tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} unit="%" width={34}/>
                <Tooltip content={<ParetoTooltip/>} cursor={{fill:'rgba(29,78,216,0.05)'}}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar yAxisId="left" dataKey="revenue" fill="#1D4ED8" name="Bojxona to'lovi" radius={[3,3,0,0]} maxBarSize={34}/>
                <Line yAxisId="right" type="monotone" dataKey="cumPct" stroke="#D97706" strokeWidth={2} dot={{r:2}} name="Yig'indi %"/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-txt-primary mb-1">Dastur bo'yicha tasdiqlanish dinamikasi</h3>
            <p className="text-xs text-txt-muted mb-4">Barcha faol qoidalar bo'yicha haftalik o'rtacha, eng yuqori va eng past tasdiqlanish.</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={analytics.programTrend} margin={{top:5,right:10,bottom:5,left:0}}>
                <defs>
                  <linearGradient id="gradProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.25}/>
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
                <XAxis dataKey="week" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis domain={[0,100]} tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} width={28}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Area type="monotone" dataKey="avg" stroke="#1D4ED8" fill="url(#gradProg)" strokeWidth={2} name="O'rtacha"/>
                <Line type="monotone" dataKey="best" stroke="#059669" strokeWidth={1.5} dot={false} name="Eng yuqori"/>
                <Line type="monotone" dataKey="worst" stroke="#D97706" strokeWidth={1.5} dot={false} name="Eng past"/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composite ranking table */}
        <div className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-txt-primary mb-1">Qoidalar reytingi — kompozit ball</h3>
          <p className="text-xs text-txt-muted mb-4">Salomatlik bali: 40% tasdiqlanish + 25% past xato + 20% aniqlik + 15% daromad.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-surface-300/50">
                  {['#','Qoida','Turi','Ball','Tasd.','Noto\'g\'ri','Aniqlik','Qamrov','Bojxona to\'lovi'].map((h,i) => (
                    <th key={i} className={`px-3 py-2 text-txt-muted font-medium uppercase tracking-wider text-[10px] ${i>=4?'text-right':'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analytics.ranking.map((r,i) => (
                  <tr key={r.id} className="border-b border-surface-300/30 last:border-0 hover:bg-surface-200/50 transition-colors">
                    <td className="px-3 py-2 text-txt-dim">{i+1}</td>
                    <td className="px-3 py-2">
                      <div className="font-medium text-txt-primary">{r.name}</div>
                      <div className="font-mono text-[10px] text-txt-dim">{r.id}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`tag border text-[10px] ${r.type==='statistical'?'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20':'bg-accent-cyan/5 text-accent-cyan/70 border-accent-cyan/15'}`}>
                        {r.type==='statistical'?'Statistik':'Biznes'}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="flex-1 max-w-[70px] h-1.5 rounded-full bg-surface-300 overflow-hidden">
                          <div className="h-full rounded-full" style={{width:`${r.score}%`,background:scoreColor(r.score)}}/>
                        </div>
                        <span className="font-bold w-7 text-right" style={{color:scoreColor(r.score)}}>{r.score}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-accent-cyan">{r.hitRate}%</td>
                    <td className="px-3 py-2 text-right text-status-amber">{r.falsePositive}%</td>
                    <td className="px-3 py-2 text-right text-txt-secondary">{r.precision}%</td>
                    <td className="px-3 py-2 text-right text-txt-secondary">{r.coverage}%</td>
                    <td className="px-3 py-2 text-right font-semibold text-status-green">{formatCurrency(r.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}

      {view === 'table' && (
      <div className="flex gap-5 items-start animate-fade">
      {/* Left column: filter + table */}
      <div className={selectedRule ? 'flex-1 min-w-0' : 'w-full'}>
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
      </div>

      {/* Right column: selected rule detail */}
      {selectedRule && (
        <div className="w-[380px] shrink-0 glass rounded-xl p-5 animate-slide sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-txt-primary truncate pr-2">{selectedRule.name}</h3>
            <button onClick={() => setSelectedRule(null)} className="text-txt-muted hover:text-txt-primary shrink-0"><Icon name="x" size={16}/></button>
          </div>
          <div className="text-[10px] text-txt-muted uppercase tracking-wider mb-1">Batafsil</div>
          <div className="font-mono text-xs text-txt-secondary bg-surface-50/50 rounded px-3 py-2 mb-4 border border-surface-300/50 break-all">
            {selectedRule.condition}
          </div>
          <h4 className="text-xs font-semibold text-txt-secondary mb-2">Tasdiqlanish foizi trendi</h4>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={selectedRule.hitRateTrend.map((v,i) => ({week:`H${i+1}`,rate:v}))}>
              <defs>
                <linearGradient id="gradTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false}/>
              <XAxis dataKey="week" tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis domain={['dataMin-5','dataMax+5']} tick={{fill:'#64748B',fontSize:10}} axisLine={false} tickLine={false} width={28}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="rate" stroke="#1D4ED8" fill="url(#gradTrend)" strokeWidth={2} name="Tasdiqlanish foizi"/>
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
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
      )}
      </div>
      )}
    </div>
  );
};
