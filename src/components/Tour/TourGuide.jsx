import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaliBar } from '../UI/DesignAtoms';

const STEPS = [
  {
    emoji: '🌿',
    title: '¡Bienvenido a EcoSort!',
    desc: 'La app caleña con inteligencia artificial para separar residuos. Nuestra ciudad nos lo da todo — ¡le devolvemos el cuidado!',
    accent: '#1B3A6B',
  },
  {
    emoji: '📷',
    title: 'Escáner con IA',
    desc: 'Apunta la cámara a cualquier residuo y EcoSort lo clasifica al instante: plástico, vidrio, papel, metal, cartón o basura no reciclable.',
    hint: 'Toca "Escanear" en el menú inferior',
    accent: '#1B3A6B',
  },
  {
    emoji: '♻️',
    title: 'Guía de Residuos',
    desc: 'Consulta cada categoría con ejemplos, qué va y qué NO va, consejos prácticos y el impacto ambiental. Toda la info de Cali.',
    hint: 'Toca "Guía" en el menú inferior',
    accent: '#2D7A4A',
  },
  {
    emoji: '🗑️',
    title: 'Las 3 Canecas de Cali',
    desc: 'Desde 2021 la ley colombiana exige 3 colores:\n⬜ Blanca — Reciclables\n🟢 Verde — Orgánicos\n⬛ Negra — No aprovechables',
    hint: 'Toca "Canecas" en el menú inferior',
    accent: '#1B3A6B',
  },
  {
    emoji: '🏔️',
    title: 'Cuida los Farallones',
    desc: 'El Parque Natural Farallones de Cali es uno de los ecosistemas más ricos del mundo. Reciclar bien protege nuestras montañas.',
    accent: '#2D7A4A',
  },
  {
    emoji: '✦',
    title: '¡Bacano! Ya estás listo',
    desc: 'Cali genera ~1,500 toneladas de basura por día y recicla apenas el 8%. Con EcoSort somos parte del cambio. ¡Pa\'lante, caleño!',
    accent: '#1B3A6B',
  },
];

export default function TourGuide({ onFinish }) {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(26,31,46,0.55)' }}
      onClick={onFinish}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          style={{
            width: '100%', maxWidth: 440,
            background: '#FFFFFF',
            borderRadius: '28px 28px 0 0',
            padding: '20px 24px 40px',
            overflow: 'hidden',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <CaliBar height={3} style={{ marginBottom: 20, opacity: 0.7 }} />

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: 5, borderRadius: 99,
                width: i === step ? 24 : 6,
                background: i === step ? cur.accent : '#D4CEBC',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>

          {/* Content */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{cur.emoji}</div>
            <h2 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 22, fontWeight: 800,
              color: '#1A1F2E', margin: '0 0 8px',
            }}>
              {cur.title}
            </h2>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              color: '#6B7080', lineHeight: 1.55,
              whiteSpace: 'pre-line', fontSize: 14, margin: 0,
            }}>
              {cur.desc}
            </p>
            {cur.hint && (
              <div style={{
                display: 'inline-block',
                marginTop: 12, padding: '6px 14px',
                borderRadius: 99, fontSize: 12, fontWeight: 600,
                background: cur.accent + '12',
                color: cur.accent,
                border: `1px solid ${cur.accent}30`,
              }}>
                💡 {cur.hint}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            {!isLast && (
              <button onClick={onFinish}
                className="btn-press"
                style={{
                  flex: 1, padding: '12px 0',
                  borderRadius: 99,
                  border: '1px solid #D4CEBC',
                  background: 'transparent',
                  color: '#6B7080', fontWeight: 600, fontSize: 14,
                  cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                }}>
                Saltar
              </button>
            )}
            <button
              onClick={() => isLast ? onFinish() : setStep(s => s + 1)}
              className="btn-press"
              style={{
                flex: 2, padding: '12px 0',
                borderRadius: 99,
                background: cur.accent,
                color: '#fff',
                fontWeight: 700, fontSize: 15,
                cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                border: 'none',
                boxShadow: `0 4px 14px ${cur.accent}40`,
              }}>
              {isLast ? '¡A reciclar, Cali! 🌿' : 'Siguiente →'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
