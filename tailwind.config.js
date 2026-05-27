/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Cali Recicla palette ──
        'primary':          '#1B3A6B',
        'primary-dark':     '#0F2347',
        'green':            '#2D7A4A',
        'green-light':      '#3A9B5E',
        'red':              '#C8392E',
        'cream':            '#F4F0E8',
        'cream-dark':       '#EAE5DB',
        'scanner-bg':       '#0E1420',
        'surface':          '#F4F0E8',
        'surface-card':     '#FFFFFF',
        'on-surface':       '#1A1F2E',
        'on-surface-dim':   '#6B7080',
        'outline':          '#D4CEBC',
        'outline-light':    '#E8E3D8',
        // kept for any remaining references
        'secondary':        '#2D7A4A',
        'secondary-container': '#C8F7D4',
        'on-secondary-container': '#1A5C2F',
        'surface-container-lowest': '#FFFFFF',
        'surface-container': '#EAE5DB',
        'on-surface-variant': '#6B7080',
        'outline-variant':  '#D4CEBC',
        'primary-fixed-dim':'#A8B8D8',
        'on-primary':       '#FFFFFF',
        'error':            '#C8392E',
        'error-container':  '#FFE4E1',
        'on-error-container':'#8B1A12',
      },
      fontFamily: {
        sans:    ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'card':    '0 1px 4px rgba(27,58,107,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 16px rgba(27,58,107,0.12)',
        'nav':     '0 8px 24px rgba(27,58,107,0.12), 0 1px 0 rgba(255,255,255,0.6) inset',
        'sheet':   '0 -8px 32px rgba(0,0,0,0.16)',
        'btn':     '0 4px 12px rgba(27,58,107,0.30)',
        'btn-sec': '0 4px 12px rgba(45,122,74,0.28)',
      },
    },
  },
  plugins: [],
};
