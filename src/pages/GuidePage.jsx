import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { WASTE_CATEGORIES, BINS } from '../data/wasteData';

const BIN_BADGE = {
  blanco: 'bg-slate-100 text-slate-700 border border-slate-200',
  verde:  'bg-green-100 text-green-700 border border-green-200',
  negro:  'bg-slate-700 text-white',
};

function WasteCard({ catKey, cat, isOpen, onToggle }) {
  const bin = BINS[cat.bin];
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl card-shadow overflow-hidden"
    >
      {/* Header */}
      <button onClick={onToggle} className="btn-press w-full text-left px-4 py-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: cat.lightColor }}>
          {cat.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-base">{cat.label}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${BIN_BADGE[cat.bin]}`}>
              {bin.icon} {bin.name}
            </span>
          </div>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-400 text-lg flex-shrink-0">
          ⌄
        </motion.span>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-3">
              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed">{cat.description}</p>

              {/* Examples */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">✅ Qué va aquí</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.examples.map((ex) => (
                    <span key={ex} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-lg">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Not accepted */}
              {cat.notAccepted && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">❌ Qué NO va aquí</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.notAccepted.map((ex) => (
                      <span key={ex} className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-lg">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">💡 Consejos</p>
                <ul className="space-y-1">
                  {cat.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="bg-primary-50 rounded-xl p-3">
                <p className="text-primary-700 text-xs leading-relaxed">
                  🌍 <strong>Impacto:</strong> {cat.impact}
                </p>
              </div>

              {/* Fun fact */}
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-amber-700 text-xs leading-relaxed">
                  🌟 <strong>¿Sabías que?</strong> {cat.fact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GuidePage() {
  const location = useLocation();
  const highlighted = location.state?.highlight;
  const [openKey, setOpenKey] = useState(highlighted || null);
  const [filter, setFilter] = useState('all');

  const filtered = Object.entries(WASTE_CATEGORIES).filter(([, cat]) => {
    if (filter === 'all') return true;
    return cat.bin === filter;
  });

  return (
    <div className="h-full flex flex-col bg-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-5 pt-12 pb-4 safe-top">
        <h1 className="text-white font-extrabold text-2xl">Guía de Residuos</h1>
        <p className="text-primary-100 text-sm mt-0.5">Aprende qué va en cada caneca</p>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {[
            { key: 'all', label: 'Todos', emoji: '📋' },
            { key: 'blanco', label: 'Reciclables', emoji: '♻️' },
            { key: 'verde', label: 'Orgánicos', emoji: '🌿' },
            { key: 'negro', label: 'No aprovechables', emoji: '🗑️' },
          ].map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`btn-press flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                filter === key
                  ? 'bg-white text-primary-700 border-white shadow'
                  : 'bg-primary-700/30 text-primary-100 border-primary-400/30'
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 scrollable no-scrollbar px-4 pt-4 pb-28 space-y-3">
        {filtered.map(([key, cat]) => (
          <WasteCard
            key={key}
            catKey={key}
            cat={cat}
            isOpen={openKey === key}
            onToggle={() => setOpenKey(openKey === key ? null : key)}
          />
        ))}
      </div>
    </div>
  );
}
