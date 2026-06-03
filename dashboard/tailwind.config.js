tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Light theme surface scale: 50 = page background (lightest),
        // increasing numbers get slightly darker for elevation/borders.
        surface: { 50:'#F8FAFC', 100:'#FFFFFF', 200:'#F1F5F9', 300:'#E2E8F0', 400:'#CBD5E1' },
        accent: { cyan:'#1D4ED8' },
        status: { green:'#059669', amber:'#D97706' },
        txt: { primary:'#0F172A', secondary:'#475569', muted:'#64748B', dim:'#94A3B8' }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  }
}
