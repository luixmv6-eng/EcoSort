import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BINS, WASTE_CATEGORIES, SPECIAL_POINTS } from '../data/wasteData';
import { CaliBar, BinGlyph, LandmarkPlaceholder, SectionTitle } from '../components/UI/DesignAtoms';

const BIN_CONFIG = {
  blanco: {
    tab:        'Blanca',
    emoji:      '⬜',
    accent:     '#1B3A6B',
    bg:         '#F4F0E8',
    headerBg:   '#EEF1F8',
    chipBg:     '#EEF1F8',
    chipText:   '#1B3A6B',
    badge:      'RECICLABLES',
    tone:       'blue',
  },
  verde: {
    tab:        'Verde',
    emoji:      '🟢',
    accent:     '#2D7A4A',
    bg:         '#F0F7F2',
    headerBg:   '#E8F5ED',
    chipBg:     '#E8F5ED',
    chipText:   '#2D7A4A',
    badge:      'ORGÁNICOS',
    tone:       'green',
  },
  negro: {
    tab:        'Negra',
    emoji:      '⬛',
    accent:     '#2A2F3D',
    bg:         '#F2F2F2',
    headerBg:   '#E8E8E8',
    chipBg:     '#E8E8E8',
    chipText:   '#2A2F3D',
    badge:      'NO APROVE.',
    tone:       'dusk',
  },
};

const BIN_KEYS = ['blanco', 'verde', 'negro'];

export default function BinsPage() {
  const [active, setActive] = useState('blanco');
  const cfg = BIN_CONFIG[active];
  const bin = BINS[active];
  const cats = Object.values(WASTE_CATEGORIES).filter(c => c.bin === active);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: cfg.bg, transition: 'background 0.35s' }}>

      {/* Header */}
      <div style={{ background: cfg.headerBg, borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '48px 20px 16px', transition: 'background 0.35s' }}>
        <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#8B8F9C', letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 4px' }}>
          Cultura Ciudadana
        </p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 24, margin: '0 0 4px' }}>
          Guía de Canecas
        </h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', margin: '0 0 14px' }}>
          Sistema de 3 colores · Resolución 2184 de 2019
        </p>

        <CaliBar height={2.5} style={{ marginBottom: 14, opacity: 0.55 }} />

        {/* 3-tab pill selector */}
        <div style={{
          display: 'flex', gap: 6,
          background: 'rgba(0,0,0,0.06)', borderRadius: 99,
          padding: 4,
        }}>
          {BIN_KEYS.map(k => (
            <button key={k} onClick={() => setActive(k)}
              className="btn-press"
              style={{
                flex: 1, padding: '8px 0',
                borderRadius: 99, border: 'none',
                fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', transition: 'all 0.2s',
                background: active === k ? '#FFFFFF' : 'transparent',
                color: active === k ? BIN_CONFIG[k].accent : '#6B7080',
                boxShadow: active === k ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
              }}>
              {BIN_CONFIG[k].emoji} {BIN_CONFIG[k].tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden auto', padding: '16px 16px 120px' }} className="no-scrollbar">

        {/* Landmark */}
        <div style={{ marginBottom: 16 }}>
          <LandmarkPlaceholder
            name={active === 'blanco' ? 'Farallones de Cali' : active === 'verde' ? 'Río Cali · Valle' : 'Ciudad de Cali'}
            code={active === 'blanco' ? 'CLO-003' : active === 'verde' ? 'CLO-004' : 'CLO-005'}
            tone={cfg.tone}
            height={120}
          />
        </div>

        {/* Bin identity card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E2DDD4', marginBottom: 14,
          overflow: 'hidden', boxShadow: '0 1px 4px rgba(27,58,107,0.07)',
        }}>
          <div style={{ height: 4, background: cfg.accent }} />
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <BinGlyph color={cfg.accent} size={36} stroke="rgba(255,255,255,0.45)" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: cfg.accent, fontSize: 18, margin: 0 }}>
                    {bin.name}
                  </p>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 600,
                    color: cfg.chipText, background: cfg.chipBg,
                    padding: '3px 9px', borderRadius: 99,
                  }}>
                    {cfg.badge}
                  </span>
                </div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', margin: '2px 0 0' }}>
                  {bin.subtitle}
                </p>
              </div>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', lineHeight: 1.55, margin: 0 }}>
              {bin.description}
            </p>
            {/* Category chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {cats.map(c => (
                <span key={c.label} style={{
                  fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 600,
                  padding: '4px 10px', borderRadius: 99,
                  background: cfg.chipBg, color: cfg.chipText,
                }}>
                  {c.emoji} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SÍ / NO lists */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2DDD4', padding: '14px 14px 12px', boxShadow: '0 1px 3px rgba(27,58,107,0.05)' }}>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#2D7A4A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
              ✅ Acepta
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {bin.accepts.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#1A1F2E', lineHeight: 1.35 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2DDD4', padding: '14px 14px 12px', boxShadow: '0 1px 3px rgba(27,58,107,0.05)' }}>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#C8392E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
              ✦ Consejos
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {bin.tips.slice(0, 4).map(tip => (
                <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 6 }}>
                  <span style={{ color: cfg.accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>•</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: '#6B7080', lineHeight: 1.4 }}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Schedule */}
        <div style={{
          background: '#EEF1F8', borderRadius: 14,
          border: '1px solid #C6D0E8', padding: '14px 16px',
          marginBottom: 14,
        }}>
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#1B3A6B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            🗓 Recolección en Cali
          </p>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#1B3A6B', margin: 0, lineHeight: 1.5 }}>
            {bin.schedule}
          </p>
        </div>

        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#8B8F9C', textAlign: 'center', marginBottom: 20, lineHeight: 1.4 }}>
          {bin.regulation}
        </p>

        {/* Obligatorio */}
        <div style={{
          background: '#E8F5ED', borderRadius: 14, border: '1px solid #B3D9BF',
          padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10,
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>📢</span>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#1A5C2F', margin: 0, lineHeight: 1.55 }}>
            <strong>Obligatorio en Colombia desde 2021.</strong>{' '}
            En Cali la campaña <strong>"Residuos que valen ORO"</strong> refuerza el uso correcto de las tres canecas puerta a puerta.
          </p>
        </div>

        {/* Residuos especiales */}
        <div style={{ marginBottom: 14 }}>
          <SectionTitle>Residuos Especiales</SectionTitle>
          <div style={{
            background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2DDD4',
            overflow: 'hidden', boxShadow: '0 1px 4px rgba(27,58,107,0.07)',
          }}>
            <div style={{ height: 4, background: '#C8392E' }} />
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: '0 0 10px' }}>
                🚨 NO van en ninguna caneca — requieren punto especial
              </p>
              {[
                ['🔋','Pilas / baterías','Éxito, Jumbo, Homecenter'],
                ['💊','Medicamentos','Farmacias autorizadas'],
                ['🛢️','Aceite de cocina','Puntos Verdes Lito'],
                ['📱','Electrónicos (RAEE)','Almacenes de cadena'],
                ['💡','Bombillos ahorradores','Ferreterías participantes'],
              ].map(([e, n, w]) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 17, width: 24, flexShrink: 0 }}>{e}</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 12, color: '#1A1F2E' }}>{n}:</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dónde encontrarla */}
        <SectionTitle>Puntos de Recolección</SectionTitle>
        <div style={{
          background: '#1B3A6B', borderRadius: 16, padding: '20px 18px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 15, margin: '0 0 6px' }}>
            ¿Dudas con un residuo?
          </p>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px', lineHeight: 1.5 }}>
            Usa nuestro escáner IA para identificarlo al instante.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: '#2D7A4A', borderRadius: 99,
            padding: '9px 18px',
          }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              📞 Línea 015 · EMCALI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
