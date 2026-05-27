import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    emoji: '👋',
    title: '¡Bienvenido a EcoSort!',
    desc: 'Tu guía inteligente para separar correctamente los residuos en Cali. Con IA y tu cámara, nunca más tendrás dudas sobre dónde va cada cosa.',
    img: null,
  },
  {
    emoji: '📷',
    title: 'Escáner de Residuos',
    desc: 'Apunta tu cámara a cualquier objeto y EcoSort identifica automáticamente si es plástico, vidrio, papel, metal, cartón o basura no reciclable.',
    hint: 'Toca "Escanear" en el menú inferior',
  },
  {
    emoji: '♻️',
    title: 'Guía de Residuos',
    desc: 'Consulta cada categoría de residuo: qué ejemplos incluye, qué NO va, consejos para prepararlo y su impacto ambiental.',
    hint: 'Toca "Guía" en el menú inferior',
  },
  {
    emoji: '🗑️',
    title: 'Colores de las Canecas',
    desc: 'Cali usa 3 colores según la Resolución 2184 de 2019:\n• ⬜ Blanca – Reciclables\n• 🟢 Verde – Orgánicos\n• ⬛ Negra – No aprovechables',
    hint: 'Toca "Canecas" en el menú inferior',
  },
  {
    emoji: '📍',
    title: 'Puntos Especiales',
    desc: 'Pilas, medicamentos, aceite y electrónicos NO van en ninguna caneca normal. Te mostramos los puntos de recolección especial en Cali.',
    hint: 'En la sección "Info" encontrarás los puntos',
  },
  {
    emoji: '🌱',
    title: '¡Todo listo!',
    desc: 'Cali genera ~1,500 ton de basura al día y solo recicla el 8%. Con EcoSort puedes ser parte del cambio. ¡Empieza a escanear!',
    hint: null,
  },
];

export default function TourGuide({ onFinish }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const next = () => {
    if (isLast) { onFinish(); return; }
    setStep((s) => s + 1);
  };

  const skip = () => onFinish();

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center" onClick={skip}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-primary-500' : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{current.emoji}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{current.title}</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{current.desc}</p>
            {current.hint && (
              <div className="mt-3 bg-primary-50 rounded-xl px-4 py-2 inline-block">
                <p className="text-primary-700 text-sm font-medium">💡 {current.hint}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!isLast && (
              <button
                onClick={skip}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm btn-press"
              >
                Saltar tour
              </button>
            )}
            <button
              onClick={next}
              className="flex-[2] py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-base shadow-lg btn-press"
            >
              {isLast ? '¡Empezar! 🚀' : 'Siguiente →'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
