tailwind.config = {
  theme: {
    extend: {
      colors: {
        surface: { 50:'#0B1120', 100:'#101829', 200:'#151F35', 300:'#1A2740', 400:'#1F2F4D' },
        accent: { cyan:'#06B6D4' },
        status: { green:'#10B981', amber:'#F59E0B' },
        txt: { primary:'#F1F5F9', secondary:'#94A3B8', muted:'#64748B', dim:'#475569' }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  }
}
