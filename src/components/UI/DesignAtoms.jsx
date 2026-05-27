/* Shared design atoms for Cali Recicla */

export function LandmarkPlaceholder({ name, code, tone = 'blue', height = 160, label = true }) {
  const tones = {
    blue:  { bg: '#1B3A6B', stripe: 'rgba(255,255,255,0.06)' },
    green: { bg: '#2D7A4A', stripe: 'rgba(255,255,255,0.07)' },
    red:   { bg: '#C8392E', stripe: 'rgba(255,255,255,0.08)' },
    dusk:  { bg: '#2A2F3D', stripe: 'rgba(255,255,255,0.05)' },
    sand:  { bg: '#D4C9A8', stripe: 'rgba(0,0,0,0.04)' },
  };
  const t = tones[tone] || tones.blue;

  return (
    <div style={{
      height,
      background: t.bg,
      borderRadius: 14,
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        ${t.stripe} 0,
        ${t.stripe} 1px,
        transparent 0,
        transparent 50%
      )`,
      backgroundSize: '14px 14px',
    }}>
      {label && (
        <div style={{
          position: 'absolute', bottom: 10, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
            {name?.toUpperCase()}
          </span>
          {code && (
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.5 }}>
              {code}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function CaliBar({ height = 3, opacity = 1, style }) {
  return (
    <div style={{ display: 'flex', height, opacity, borderRadius: 99, overflow: 'hidden', ...style }}>
      <div style={{ flex: 1, background: '#1B3A6B' }} />
      <div style={{ flex: 1, background: '#F4F0E8' }} />
      <div style={{ flex: 1, background: '#C8392E' }} />
      <div style={{ flex: 1, background: '#2D7A4A' }} />
    </div>
  );
}

export function BinGlyph({ color = '#1B3A6B', size = 28, stroke = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="5" y="4" width="18" height="2.4" rx="1" fill={color} />
      <path d="M6.5 7h15l-1.4 17.5a1.5 1.5 0 01-1.5 1.4H9.4a1.5 1.5 0 01-1.5-1.4L6.5 7z" fill={color} />
      <path d="M11 11.5v10.5M14 11.5v10.5M17 11.5v10.5"
        stroke={stroke} strokeOpacity="0.45" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function SectionTitle({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <h2 style={{
        margin: 0,
        fontSize: 11,
        fontWeight: 700,
        color: '#1A1F2E',
        textTransform: 'uppercase',
        letterSpacing: 1.3,
        fontFamily: 'IBM Plex Mono, monospace',
      }}>
        {children}
      </h2>
      {right && (
        <span style={{
          fontSize: 10.5,
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#8B8F9C',
          letterSpacing: 0.5,
        }}>
          {right}
        </span>
      )}
    </div>
  );
}
