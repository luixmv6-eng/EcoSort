import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BINS, CALI_FACTS } from '../data/wasteData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

function BinChip({ bin }) {
  const colors = {
    blanco: 'bg-slate-100 text-slate-700 border border-slate-200',
    verde:  'bg-green-100 text-green-700 border border-green-200',
    negro:  'bg-slate-800 text-white border border-slate-700',
  };
  return (
    <div className={`rounded-xl px-3 py-2 flex items-center gap-2 ${colors[bin.id]}`}>
      <span className="text-lg">{bin.icon}</span>
      <div>
        <p className="font-bold text-xs">{bin.name}</p>
        <p className="text-[10px] opacity-70">{bin.accepts.slice(0, 2).join(', ')}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-full scrollable no-scrollbar pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-400 px-5 pt-12 pb-8 relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute top-16 -right-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">♻️</span>
            <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">EcoSort</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">
            Separa bien,<br />vive mejor.
          </h1>
          <p className="text-primary-100 text-sm mb-6">
            Guía de separación de residuos para Cali, Valle del Cauca 🌿
          </p>

          <button
            onClick={() => navigate('/scanner')}
            className="btn-press flex items-center gap-3 bg-white text-primary-700 font-bold px-6 py-3.5 rounded-2xl shadow-xl text-base"
          >
            <span className="text-2xl">📷</span>
            Escanear un residuo
          </button>
        </motion.div>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Stats Cali */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h2 variants={item} className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">
            Cali en cifras
          </motion.h2>
          <div className="grid grid-cols-2 gap-2">
            {CALI_FACTS.slice(0, 4).map((f) => (
              <motion.div key={f.label} variants={item}
                className="bg-white rounded-2xl p-3 card-shadow flex items-start gap-2">
                <span className="text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="text-primary-600 font-extrabold text-lg leading-none">{f.stat}</p>
                  <p className="text-slate-500 text-xs leading-tight mt-0.5">{f.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Canecas rápidas */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Código de Canecas (Res. 2184/2019)</h2>
          <div className="flex flex-col gap-2">
            {Object.values(BINS).map((bin) => (
              <button key={bin.id} onClick={() => navigate('/bins')} className="btn-press text-left">
                <BinChip bin={bin} />
              </button>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-2 text-center">Toca una caneca para ver qué acepta →</p>
        </motion.div>

        {/* CTA recicladores */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌟</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">¿Sabías que en Cali hay recicladores de oficio?</p>
              <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                Más de 3,000 familias dependen del reciclaje. Separar bien en tu casa les facilita el trabajo y les genera ingresos dignos.
              </p>
              <button onClick={() => navigate('/info')}
                className="mt-2 text-amber-700 font-bold text-xs underline">Conoce más →</button>
            </div>
          </div>
        </motion.div>

        {/* Tour botón */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={() => { localStorage.removeItem('ecosort_tour_seen'); window.location.reload(); }}
          className="btn-press w-full bg-white border-2 border-primary-200 text-primary-700 font-semibold py-3 rounded-2xl text-sm card-shadow"
        >
          🗺️ Ver tour de la app
        </motion.button>
      </div>
    </div>
  );
}
