const { useState } = React;

const App = () => {
  const [page, setPage] = useState('overview');
  // Draft handed off from the Discovery page when the user converts a
  // statistical pattern into a rule. RuleManagement reads it on mount to
  // pre-fill the "Yangi qoida yaratish" builder.
  const [ruleDraft, setRuleDraft] = useState(null);

  // Manual navigation clears any pending draft so an old pattern doesn't
  // re-populate the builder when the user simply browses to the page.
  const navigate = (id) => { setRuleDraft(null); setPage(id); };

  // Called from Discovery's "Qoidaga aylantirish" button.
  const convertToRule = (draft) => { setRuleDraft(draft); setPage('rules'); };

  const pages = [
    {id:'overview',label:'Umumiy ko\'rinish',icon:'home'},
    {id:'discovery',label:'Statistik tahlil',icon:'search'},
    {id:'monitoring',label:'Monitoring',icon:'activity'},
    {id:'rules',label:'Qoidalar boshqaruvi',icon:'settings'},
    {id:'network',label:'Tarmoq tahlili',icon:'share-2'},
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-surface-300/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-3 mr-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg,#1D4ED8,#2563EB)'}}>
                <Icon name="shield" size={16} className="text-white"/>
              </div>
              <div>
                <h1 className="text-sm font-bold text-txt-primary tracking-tight">Tovar kodi moduli</h1>
                <p className="text-[10px] text-txt-dim -mt-0.5">Noto'g'ri tasniflashni aniqlash tizimi</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center h-full">
              {pages.map(p => (
                <button key={p.id} onClick={() => navigate(p.id)}
                  className={`nav-item flex items-center gap-2 px-4 h-full text-xs font-medium transition-all ${page===p.id ? 'active text-accent-cyan' : 'text-txt-muted hover:text-txt-secondary'}`}>
                  <Icon name={p.icon} size={15}/>{p.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="glow-dot bg-status-green"/>
                <span className="text-[10px] text-txt-muted">Tizim faol</span>
              </div>
              <span className="text-[10px] text-txt-dim">Oxirgi yangilanish: 2025-03-15</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-5">
        {page === 'overview' && <OverviewPage/>}
        {page === 'discovery' && <DiscoveryPage onConvertToRule={convertToRule}/>}
        {page === 'monitoring' && <MonitoringPage/>}
        {page === 'rules' && <RuleManagementPage draft={ruleDraft}/>}
        {page === 'network' && <NetworkAnalysisPage/>}
      </main>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
