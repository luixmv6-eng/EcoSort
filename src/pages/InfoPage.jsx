import { motion } from 'framer-motion';
import { CALI_FACTS, SPECIAL_POINTS } from '../data/wasteData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function Section({ title, children }) {
  return (
    <motion.div variants={item} className="space-y-3">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h2>
      {children}
    </motion.div>
  );
}

export default function InfoPage() {
  const restartTour = () => {
    localStorage.removeItem('ecosort_tour_seen');
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col bg-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-500 px-5 pt-12 pb-5 safe-top">
        <h1 className="text-white font-extrabold text-2xl">Información</h1>
        <p className="text-primary-100 text-sm mt-0.5">Cali y la separación de residuos</p>
      </div>

      <motion.div
        variants={container} initial="hidden" animate="show"
        className="flex-1 scrollable no-scrollbar px-4 pt-5 pb-28 space-y-6"
      >
        {/* ¿Por qué separar? */}
        <Section title="¿Por qué separar los residuos?">
          <div className="bg-white rounded-2xl p-4 card-shadow space-y-3">
            {[
              { emoji: '🌍', title: 'Protege el medio ambiente', desc: 'Reduce la contaminación del suelo, agua y aire causada por el relleno sanitario.' },
              { emoji: '💰', title: 'Genera economía circular', desc: 'Los materiales reciclables tienen valor económico y generan empleos para los recicladores de oficio de Cali.' },
              { emoji: '⚡', title: 'Ahorra energía', desc: 'Reciclar consume hasta 95% menos energía que producir desde materia prima (aluminio).' },
              { emoji: '🌱', title: 'Reduce el CO₂', desc: 'Menos residuos en el relleno = menos gas metano y CO₂ en la atmósfera.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Cifras de Cali */}
        <Section title="Cali en cifras">
          <div className="grid grid-cols-2 gap-2">
            {CALI_FACTS.map((f) => (
              <div key={f.label} className="bg-white rounded-2xl p-3 card-shadow flex items-start gap-2">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-primary-600 font-extrabold text-lg leading-none">{f.stat}</p>
                  <p className="text-slate-500 text-xs leading-tight mt-0.5">{f.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Relleno sanitario */}
        <Section title="Relleno Sanitario de Cali">
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🏭</span>
              <div>
                <p className="font-bold text-slate-800">Colomba – El Guabal (Yumbo)</p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Es el relleno sanitario regional que recibe los residuos de Cali y municipios vecinos.
                  Recibe ~1,500 ton/día. El PGIRS 2024 busca reducir esa cifra con mayor aprovechamiento
                  de orgánicos y reciclables.
                </p>
                <div className="mt-2 bg-red-50 rounded-xl px-3 py-2">
                  <p className="text-red-700 text-xs">
                    ⏳ Si no cambiamos nuestros hábitos, este relleno podría copar su capacidad en pocos años.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Iniciativas de Cali */}
        <Section title="Iniciativas de la Ciudad">
          <div className="space-y-2">
            {[
              {
                emoji: '🌟', title: '"Residuos que valen ORO"',
                desc: 'Programa de la Alcaldía 2024–2027 que busca duplicar la tasa de reciclaje al 15%, con pedagogía puerta a puerta.',
              },
              {
                emoji: '🤝', title: 'Recicladores de Oficio',
                desc: 'Más de 3,000 familias en Cali dependen del reciclaje. Muchos hacen recolección diferenciada los días de reciclables.',
              },
              {
                emoji: '🤖', title: 'Chatbot de IA (2025–2026)',
                desc: 'La Alcaldía anunció un chatbot con IA para responder preguntas sobre gestión de residuos.',
              },
              {
                emoji: '🟢', title: 'Puntos Verdes Lito',
                desc: 'Red de puntos de reciclaje y aceite usado dispersos por la ciudad, operada por Fundación Puntos Verdes.',
              },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-4 card-shadow flex items-start gap-3">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Puntos especiales */}
        <Section title="Puntos de Recolección Especial en Cali">
          <div className="bg-white rounded-2xl p-4 card-shadow space-y-3">
            {SPECIAL_POINTS.map((sp) => (
              <div key={sp.name} className="flex items-start gap-3 pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                <span className="text-2xl">{sp.emoji}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{sp.name}</p>
                  <p className="text-slate-500 text-xs">{sp.where}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Marco legal */}
        <Section title="Marco Legal (Colombia)">
          <div className="bg-white rounded-2xl p-4 card-shadow space-y-2">
            {[
              ['📜', 'Resolución 2184 de 2019', 'Código de 3 colores para separación de residuos'],
              ['📜', 'Decreto 1077 de 2015', 'Regula el servicio público de aseo y el PGIRS'],
              ['📜', 'Ley 1259 de 2008', 'Comparendo ambiental por inadecuada disposición de residuos'],
              ['📜', 'Decreto 670 de 2025', 'Actualización normativa de aseo urbano'],
            ].map(([emoji, norm, desc]) => (
              <div key={norm} className="flex items-start gap-2">
                <span>{emoji}</span>
                <div>
                  <p className="font-semibold text-slate-700 text-xs">{norm}</p>
                  <p className="text-slate-400 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* About EcoSort */}
        <Section title="Sobre EcoSort">
          <div className="bg-gradient-to-br from-primary-600 to-primary-400 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">♻️</span>
              <div>
                <h3 className="font-extrabold text-xl">EcoSort v1.0</h3>
                <p className="text-primary-100 text-xs">Separación de Residuos · Cali, Colombia</p>
              </div>
            </div>
            <p className="text-primary-100 text-sm leading-relaxed mb-4">
              App educativa que usa inteligencia artificial (Teachable Machine de Google) para ayudarte a
              clasificar residuos correctamente. Datos basados en el PGIRS de Cali y la normativa colombiana vigente.
            </p>
            <button
              onClick={restartTour}
              className="btn-press w-full bg-white text-primary-700 font-bold py-3 rounded-2xl text-sm"
            >
              🗺️ Ver tour de la app de nuevo
            </button>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}
