import { useEffect, useState } from 'react';
import { CaliBar } from './UI/DesignAtoms';

export default function SplashScreen({ onDone }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 2200);
    const t2 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#F4F0E8',
        transition: 'opacity 0.7s ease',
        opacity: fade ? 0 : 1,
        pointerEvents: 'none',
      }}
    >
      {/* Diagonal stripe decoration */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(-45deg, #1B3A6B 0, #1B3A6B 1px, transparent 0, transparent 50%)',
        backgroundSize: '18px 18px',
      }} />

      {/* Logo mark */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 28,
            background: '#1B3A6B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(27,58,107,0.28)',
          }}>
            <span style={{ fontSize: 46 }}>🌿</span>
          </div>
          <div style={{
            position: 'absolute', bottom: -6, right: -6,
            width: 28, height: 28, borderRadius: 14,
            background: '#2D7A4A',
            border: '2.5px solid #F4F0E8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>
            ♻️
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: -1.5,
            color: '#1B3A6B',
            lineHeight: 1,
            margin: 0,
          }}>
            EcoSort
          </h1>
          <p style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 11,
            color: '#6B7080',
            marginTop: 8,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
          }}>
            Cali · Valle del Cauca
          </p>
        </div>

        <CaliBar height={3} style={{ width: 64, opacity: 0.6 }} />
      </div>

      {/* Loading */}
      <div style={{
        position: 'absolute', bottom: 56,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        width: '100%', paddingLeft: 48, paddingRight: 48,
      }}>
        <div style={{ width: '100%', height: 2, background: '#D4CEBC', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: '#1B3A6B', borderRadius: 99,
            width: '70%', animation: 'caliSlideUp 0s',
          }} />
        </div>
        <p style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 10, color: '#8B8F9C', letterSpacing: 0.8,
        }}>
          Iniciando...
        </p>
      </div>
    </div>
  );
}
