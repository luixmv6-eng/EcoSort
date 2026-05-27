import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/',        label: 'Inicio',   icon: (a) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={a ? '#1B3A6B' : 'none'}
      stroke={a ? '#1B3A6B' : '#8B8F9C'} strokeWidth="2" strokeLinecap="round">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  )},
  { to: '/scanner', label: 'Escanear', icon: (a) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke={a ? '#1B3A6B' : '#8B8F9C'} strokeWidth="2" strokeLinecap="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )},
  { to: '/guide',   label: 'Guía',     icon: (a) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke={a ? '#1B3A6B' : '#8B8F9C'} strokeWidth="2" strokeLinecap="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )},
  { to: '/bins',    label: 'Canecas',  icon: (a) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke={a ? '#1B3A6B' : '#8B8F9C'} strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  )},
  { to: '/info',    label: 'Info',     icon: (a) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke={a ? '#1B3A6B' : '#8B8F9C'} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )},
];

export default function Navigation() {
  return (
    <nav style={{
      position: 'fixed',
      left: 12,
      right: 12,
      bottom: 24,
      zIndex: 40,
      borderRadius: 28,
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: '0 8px 24px rgba(27,58,107,0.12), 0 1px 0 rgba(255,255,255,0.6) inset',
      border: '0.5px solid rgba(27,58,107,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 8px 10px' }}>
        {TABS.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={{ textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}>
            {({ isActive }) => (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '6px 14px', borderRadius: 20,
                background: isActive ? 'rgba(27,58,107,0.08)' : 'transparent',
                transition: 'background 0.15s',
                minWidth: 52,
              }}>
                {icon(isActive)}
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1B3A6B' : '#8B8F9C',
                  letterSpacing: 0.2,
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: 1,
                }}>
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
