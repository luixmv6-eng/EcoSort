import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { WASTE_CATEGORIES, BINS } from '../data/wasteData';
import { WASTE_ICON_MAP } from '../components/Icons/WasteIcons';
import { CaliBar, SectionTitle, LandmarkPlaceholder } from '../components/UI/DesignAtoms';

const FILTERS = [
  { key: 'all',    label: 'Todos',       emoji: '📋' },
  { key: 'blanco', label: 'Reciclables', emoji: '♻️' },
  { key: 'verde',  label: 'Orgánicos',   emoji: '🌿' },
  { key: 'negro',  label: 'No aprove.',  emoji: '🗑️' },
];

const BIN_CHIP = {
  blanco: { bg: '#EEF1F8', text: '#1B3A6B', border: '#C6D0E8' },
  verde:  { bg: '#E8F5ED', text: '#2D7A4A', border: '#B3D9BF' },
  negro:  { bg: '#EBEBEB', text: '#2A2F3D', border: '#C5C5C5' },
};

function WasteCard({ catKey, cat, isOpen, onToggle }) {
  const bin = BINS[cat.bin];
  const Icon = WASTE_ICON_MAP[catKey] || WASTE_ICON_MAP['Basura Varia'];
  const bc = BIN_CHIP[cat.bin] || BIN_CHIP.negro;

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2DDD4',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(27,58,107,0.07)',
      marginBottom: 10,
    }}>
      <button onClick={onToggle} className="btn-press"
        style={{ width: '100%', textAlign: 'left', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: cat.lightColor || '#F4F0E8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon color={cat.color} className="w-7 h-7" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 15, margin: 0 }}>
            {cat.label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 600,
              padding: '3px 9px', borderRadius: 99,
              background: bc.bg, color: bc.text, border: `1px solid ${bc.border}`,
            }}>
              {bin.icon} {bin.name}
            </span>
            {cat.badge && (
              <span style={{
                fontFamily: 'Manrope, sans-serif', fontSize: 10.5, fontWeight: 600,
                padding: '3px 9px', borderRadius: 99,
                background: cat.badgeColor === 'green' ? '#E8F5ED' : '#EBEBEB',
                color: cat.badgeColor === 'green' ? '#2D7A4A' : '#2A2F3D',
              }}>
                {cat.badge}
              </span>
            )}
          </div>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ color: '#8B8F9C', fontSize: 18, flexShrink: 0 }}>
          ⌄
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '4px 16px 18px', borderTop: '1px solid #F0EDE6' }}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', lineHeight: 1.55, margin: '12px 0 14px' }}>
                {cat.description}
              </p>

              {/* Qué va */}
              <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#6B7080', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>
                ✅ Qué va aquí
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {cat.examples.map(ex => (
                  <span key={ex} style={{
                    fontFamily: 'Manrope, sans-serif', fontSize: 11.5,
                    padding: '5px 10px', borderRadius: 99,
                    background: '#F4F0E8', border: '1px solid #E2DDD4', color: '#1A1F2E',
                  }}>
                    {ex}
                  </span>
                ))}
              </div>

              {/* Qué NO va */}
              {cat.notAccepted && (
                <>
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#6B7080', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>
                    ❌ Qué NO va aquí
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {cat.notAccepted.map(ex => (
                      <span key={ex} style={{
                        fontFamily: 'Manrope, sans-serif', fontSize: 11.5,
                        padding: '5px 10px', borderRadius: 99,
                        background: '#FFF0EF', border: '1px solid #FFDAD6', color: '#C8392E',
                      }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Consejos */}
              <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#6B7080', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>
                ✦ Consejos
              </p>
              <ul style={{ listStyle: 'none', margin: '0 0 14px', padding: 0 }}>
                {cat.tips.map((tip, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: '#2D7A4A', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>•</span>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#6B7080', lineHeight: 1.45 }}>{tip}</span>
                  </li>
                ))}
              </ul>

              {/* Compostaje */}
              {cat.composting && (
                <div style={{
                  background: '#F4F0E8', borderRadius: 12, padding: '12px 14px',
                  border: '1px solid #B3D9BF', marginBottom: 12,
                }}>
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#2D7A4A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                    🪴 {cat.composting.title}
                  </p>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {cat.composting.steps.map((step, i) => (
                      <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: '#2D7A4A', fontSize: 10, flexShrink: 0 }}>{i + 1}.</span>
                        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080' }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Impacto */}
              <div style={{ background: '#F4F0E8', borderRadius: 12, padding: '10px 14px', marginBottom: 8 }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', margin: 0, lineHeight: 1.5 }}>
                  🌍 <strong style={{ color: '#1A1F2E' }}>Impacto:</strong> {cat.impact}
                </p>
              </div>

              {/* Dato curioso */}
              <div style={{ background: '#EEF1F8', borderRadius: 12, padding: '10px 14px', border: '1px solid #C6D0E8' }}>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', margin: 0, lineHeight: 1.5 }}>
                  🌿 <strong style={{ color: '#1B3A6B' }}>¿Lo sabías?</strong> {cat.fact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GuidePage() {
  const location = useLocation();
  const [openKey, setOpenKey] = useState(location.state?.highlight || null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = Object.entries(WASTE_CATEGORIES).filter(([key, cat]) => {
    const matchBin = filter === 'all' || cat.bin === filter;
    const matchSearch = !search || cat.label.toLowerCase().includes(search.toLowerCase()) ||
      cat.examples?.some(e => e.toLowerCase().includes(search.toLowerCase()));
    return matchBin && matchSearch;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F4F0E8' }}>
      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2DDD4', padding: '48px 20px 16px' }}>
        <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#8B8F9C', letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 4px' }}>
          Separación de residuos
        </p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1B3A6B', fontSize: 24, margin: '0 0 4px' }}>
          Guía de Residuos
        </h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', margin: '0 0 12px' }}>
          ¿Dónde va cada cosa en Cali?
        </p>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#F4F0E8', borderRadius: 12,
          border: '1px solid #E2DDD4', padding: '9px 14px', marginBottom: 12,
        }}>
          <span style={{ fontSize: 14, color: '#8B8F9C' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar residuo…"
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#1A1F2E',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B8F9C', fontSize: 14 }}>✕</button>
          )}
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2 }} className="no-scrollbar">
          {FILTERS.map(({ key, label, emoji }) => (
            <button key={key} onClick={() => setFilter(key)}
              className="btn-press"
              style={{
                flexShrink: 0, padding: '6px 14px', borderRadius: 99,
                fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                background: filter === key ? '#1B3A6B' : '#F4F0E8',
                color: filter === key ? '#fff' : '#6B7080',
                border: filter === key ? '1px solid #1B3A6B' : '1px solid #D4CEBC',
              }}>
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden auto', padding: '16px 16px 120px' }} className="no-scrollbar">

        {/* Featured hero */}
        <div style={{ marginBottom: 20 }}>
          <SectionTitle right="DESTACADO">Lectura recomendada</SectionTitle>
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2DDD4', overflow: 'hidden', boxShadow: '0 1px 4px rgba(27,58,107,0.07)' }}>
            <LandmarkPlaceholder name="Gato del Río · Cali" code="CLO-002" tone="green" height={110} />
            <div style={{ padding: '14px 16px' }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#2D7A4A', background: '#E8F5ED', padding: '3px 8px', borderRadius: 99, letterSpacing: 0.8 }}>
                PGIRS 2024
              </span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 15, margin: '8px 0 4px', lineHeight: 1.3 }}>
                Nuevas normas de recolección en Cali
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#6B7080', margin: 0, lineHeight: 1.5 }}>
                El PGIRS 2024 amplía los puntos de recolección diferenciada a más comunas.
              </p>
            </div>
          </div>
        </div>

        {/* Category list */}
        <SectionTitle right={`${filtered.length} CATEGORÍAS`}>Categorías</SectionTitle>
        {filtered.map(([key, cat]) => (
          <WasteCard key={key} catKey={key} cat={cat}
            isOpen={openKey === key}
            onToggle={() => setOpenKey(openKey === key ? null : key)} />
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8B8F9C', fontFamily: 'Manrope, sans-serif', fontSize: 14 }}>
            Sin resultados para "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
