import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BINS, WASTE_CATEGORIES } from '../data/wasteData';

function BinCard({ bin }) {
  const [open, setOpen] = useState(false);

  // Categorías que van en esta caneca
  const categories = Object.values(WASTE_CATEGORIES).filter((c) => c.bin === bin.id);

  const headerStyle = {
    blanco: { bg: 'bg-white',      text: 'text-slate-800',  border: 'border-gray-200',  btn: 'text-slate-700' },
    verde:  { bg: 'bg-green-600',   text: 'text-white',      border: 'border-green-700', btn: 'text-white' },
    negro:  { bg: 'bg-slate-800',   text: 'text-white',      border: 'border-slate-700', btn: 'text-white' },
  }[bin.id];

  return (
    <motion.div layout className="rounded-3xl overflow-hidden card-shadow border-2"
      style={{ borderColor: bin.borderColor }}>
      {/* Visual bin header */}
      <div className={`${headerStyle.bg} px-5 py-5`}>
        <div className="flex items-center gap-4">
          {/* Bin illustration */}
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-16 rounded-b-xl rounded-t-lg border-4 flex flex-col items-center justify-end pb-1"
              style={{ borderColor: bin.borderColor, backgroundColor: bin.bgColor }}
            >
              <span className="text-xl">{bin.icon}</span>
            </div>
            {/* lid */}
            <div className="absolute -top-2 left-0 right-0 h-3 rounded-t-lg"
              style={{ backgroundColor: bin.bgColor, border: `3px solid ${bin.borderColor}` }} />
          </div>

          <div className="flex-1">
            <h2 className={`text-xl font-extrabold ${headerStyle.text}`}>{bin.name}</h2>
            <p className={`text-sm ${headerStyle.text} opacity-70`}>{bin.subtitle}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((c) => (
                <span key={c.id} className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${
                  bin.id === 'blanco'
                    ? 'bg-primary-50 text-primary-700 border-primary-200'
                    : bin.id === 'verde'
                    ? 'bg-green-700 text-white border-green-800'
                    : 'bg-slate-700 text-white border-slate-600'
                }`}>
                  {c.emoji} {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`btn-press mt-4 w-full py-2.5 rounded-2xl text-sm font-bold border-2 ${headerStyle.border} ${headerStyle.btn} ${
            bin.id === 'blanco' ? 'bg-gray-100' : 'bg-white/10'
          } transition-all`}
        >
          {open ? 'Ver menos ↑' : 'Ver detalles ↓'}
        </button>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white"
          >
            <div className="px-5 py-4 space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">{bin.description}</p>

              {/* Acepta */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">✅ Acepta</p>
                <ul className="space-y-1">
                  {bin.accepts.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">💡 Consejos</p>
                <ul className="space-y-1">
                  {bin.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">🗓 Recolección en Cali</p>
                <p className="text-blue-700 text-xs leading-relaxed">{bin.schedule}</p>
              </div>

              {/* Regulation */}
              <p className="text-slate-400 text-xs text-center">{bin.regulation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BinsPage() {
  return (
    <div className="h-full flex flex-col bg-primary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-5 pt-12 pb-5 safe-top">
        <h1 className="text-white font-extrabold text-2xl">Canecas</h1>
        <p className="text-primary-100 text-sm mt-0.5">
          Sistema de 3 colores · Resolución 2184 de 2019
        </p>
      </div>

      <div className="flex-1 scrollable no-scrollbar px-4 pt-4 pb-28 space-y-4">
        {/* Aviso importante */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-2">
          <span className="text-xl">📢</span>
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>Obligatorio en Colombia:</strong> Desde enero 2021 todas las ciudades deben usar el código de
            tres colores. En Cali lo refuerzan los Promotores <em>"Mi Cali Bella"</em> y la campaña{' '}
            <strong>"Residuos que valen ORO"</strong>.
          </p>
        </div>

        {Object.values(BINS).map((bin) => (
          <BinCard key={bin.id} bin={bin} />
        ))}

        {/* Residuos especiales */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-4">
          <h3 className="font-bold text-red-800 text-sm mb-2">🚨 Residuos Especiales (NO van en canecas)</h3>
          <div className="space-y-1.5">
            {[
              ['🔋', 'Pilas/baterías', 'Éxito, Jumbo, Homecenter'],
              ['💊', 'Medicamentos', 'Farmacias autorizadas'],
              ['🛢️', 'Aceite de cocina', 'Puntos Verdes Lito'],
              ['📱', 'Electrónicos', 'Almacenes de cadena (RAEE)'],
              ['💡', 'Bombillos ahorradores', 'Ferreterías participantes'],
            ].map(([emoji, name, where]) => (
              <div key={name} className="flex items-center gap-2">
                <span className="text-base">{emoji}</span>
                <span className="text-red-700 text-xs font-semibold">{name}:</span>
                <span className="text-red-600 text-xs">{where}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
