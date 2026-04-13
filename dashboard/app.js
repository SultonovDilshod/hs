const { useState } = React;

const App = () => {
  const [page, setPage] = useState('overview');

  const pages = [
    {id:'overview',label:'Umumiy ko\'rinish',icon:'home'},
    {id:'discovery',label:'Statistik tahlil',icon:'search'},
    {id:'monitoring',label:'Monitoring',icon:'activity'},
    {id:'rules',label:'Qoidalar boshqaruvi',icon:'settings'},
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-surface-300/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-3 mr-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg,#06B6D4,#0891B2)'}}>
                <Icon name="shield" size={16} className="text-white"/>
              </div>
              <div>
                <h1 className="text-sm font-bold text-txt-primary tracking-tight">HS Risk Analytics</h1>
                <p className="text-[10px] text-txt-dim -mt-0.5">Misclassification Detection System</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center h-full">
              {pages.map(p => (
                <button key={p.id} onClick={() => setPage(p.id)}
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
        {page === 'discovery' && <DiscoveryPage/>}
        {page === 'monitoring' && <MonitoringPage/>}
        {page === 'rules' && <RuleManagementPage/>}
      </main>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
