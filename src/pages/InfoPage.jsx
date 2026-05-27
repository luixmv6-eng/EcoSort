import { motion } from 'framer-motion';
import { CALI_FACTS, SPECIAL_POINTS } from '../data/wasteData';
import { CaliBar, LandmarkPlaceholder, SectionTitle } from '../components/UI/DesignAtoms';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const S = {
  card: {
    background: '#FFFFFF', borderRadius: 16,
    border: '1px solid #E2DDD4',
    boxShadow: '0 1px 4px rgba(27,58,107,0.07)',
    overflow: 'hidden',
  },
};

const LANDMARKS = [
  { emoji: '🏔️', name: 'Farallones de Cali', tone: 'blue',  code: 'CLO-003', desc: 'Parque Natural con más de 600 especies de aves. Reciclar protege este ecosistema único.' },
  { emoji: '✝️',  name: 'Cristo Rey',         tone: 'dusk',  code: 'CLO-001', desc: 'Desde los cerros tutela una ciudad que crece verde. 145 metros de símbolo y naturaleza.' },
  { emoji: '🌊', name: 'Río Cali',            tone: 'green', code: 'CLO-004', desc: 'Nace en los Farallones y cruza la ciudad. La contaminación por residuos lo afecta directamente.' },
  { emoji: '🌺', name: 'Guayacán Amarillo',   tone: 'sand',  code: 'CLO-006', desc: 'Árbol emblemático que florece en el verano caleño. Símbolo de la identidad del Valle.' },
];

function InfoCard({ children, accent }) {
  return (
    <motion.div variants={fadeUp} style={S.card}>
      {accent && <div style={{ height: 3, background: accent }} />}
      <div style={{ padding: '16px' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function InfoPage() {
  const restartTour = () => { localStorage.removeItem('ecosort_tour_seen'); window.location.reload(); };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F4F0E8' }}>

      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2DDD4', padding: '48px 20px 16px' }}>
        <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#8B8F9C', letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 4px' }}>
          Información
        </p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1B3A6B', fontSize: 24, margin: '0 0 2px' }}>
          Cali y sus Residuos
        </h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', margin: '0 0 12px' }}>
          La Sucursal del Cielo cuida lo suyo
        </p>
        <CaliBar height={2.5} style={{ opacity: 0.55 }} />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show"
        style={{ flex: 1, overflow: 'hidden auto', padding: '16px 16px 120px' }}
        className="no-scrollbar">

        {/* ¿Por qué separar? */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>¿Por qué separar los residuos?</SectionTitle>
          <div style={S.card}>
            <div style={{ padding: '16px' }}>
              {[
                { emoji: '🌿', t: 'Protege nuestros Farallones',  d: 'Menos basura en el relleno = menos contaminación que llega al agua y ecosistemas del Parque Natural.' },
                { emoji: '💰', t: 'Economía circular caleña',      d: 'El reciclaje genera ingresos dignos para más de 3,000 familias caleñas que viven del oficio.' },
                { emoji: '⚡', t: 'Ahorra energía',                d: 'Reciclar aluminio consume 95% menos energía que producirlo desde cero.' },
                { emoji: '🌊', t: 'Cuida el Río Cali',             d: 'La basura mal dispuesta termina en los ríos. Separar bien reduce la contaminación hídrica.' },
              ].map(({ emoji, t, d }) => (
                <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: '#E8F5ED', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 16, flexShrink: 0,
                  }}>
                    {emoji}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>{t}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', marginTop: 3, lineHeight: 1.5 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cifras */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Cali en cifras</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CALI_FACTS.map(f => (
              <div key={f.label} style={{ ...S.card, padding: '14px' }}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: '#1B3A6B', fontSize: 22, margin: '6px 0 2px', lineHeight: 1 }}>
                  {f.stat}
                </p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#8B8F9C', margin: 0, lineHeight: 1.3 }}>
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Landmarks */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Cali que cuidamos</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LANDMARKS.map(({ emoji, name, tone, code, desc }) => (
              <div key={name} style={S.card}>
                <LandmarkPlaceholder name={name} code={code} tone={tone} height={90} />
                <div style={{ padding: '12px 16px' }}>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 13, margin: 0 }}>
                    {emoji} {name}
                  </p>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', marginTop: 4, lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Relleno sanitario */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Relleno Sanitario de Cali</SectionTitle>
          <div style={S.card}>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  🏭
                </div>
                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 14, margin: 0 }}>
                    Colomba – El Guabal (Yumbo)
                  </p>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#6B7080', marginTop: 4, lineHeight: 1.5 }}>
                    Recibe ~1,500 ton/día de Cali y municipios vecinos. El PGIRS 2024 busca reducir esa cifra con mayor aprovechamiento de orgánicos y reciclables.
                  </p>
                  <div style={{ marginTop: 10, background: '#FFF0EF', borderRadius: 10, padding: '9px 12px', border: '1px solid #FFDAD6' }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#C8392E', margin: 0 }}>
                      ⏳ Si no cambiamos hábitos, el relleno podría copar capacidad en pocos años.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Iniciativas */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Iniciativas de la Ciudad</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { e: '🌟', t: '"Residuos que valen ORO"',   d: 'Programa 2024–2027 que busca duplicar la tasa de reciclaje al 15%, con pedagogía puerta a puerta.' },
              { e: '🤝', t: 'Recicladores de oficio',      d: 'Más de 3,000 familias caleñas viven del reciclaje y hacen recolección diferenciada.' },
              { e: '🤖', t: 'Chatbot de IA (en desarrollo)',d: 'La Alcaldía anunció un chatbot con IA para orientar a ciudadanos sobre gestión de residuos.' },
              { e: '🟢', t: 'Puntos Verdes Lito',          d: 'Red de puntos de reciclaje y aceite usado por toda Cali, operada por Fundación Puntos Verdes.' },
            ].map(({ e, t, d }) => (
              <div key={t} style={{ ...S.card, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {e}
                </div>
                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>{t}</p>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', marginTop: 3, lineHeight: 1.5 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Puntos especiales */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Puntos de Recolección Especial</SectionTitle>
          <div style={S.card}>
            <div style={{ padding: '16px' }}>
              {SPECIAL_POINTS.map((sp, i) => (
                <div key={sp.name} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  paddingBottom: i < SPECIAL_POINTS.length - 1 ? 12 : 0,
                  marginBottom: i < SPECIAL_POINTS.length - 1 ? 12 : 0,
                  borderBottom: i < SPECIAL_POINTS.length - 1 ? '1px solid #F0EDE6' : 'none',
                }}>
                  <span style={{ fontSize: 22 }}>{sp.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>{sp.name}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#8B8F9C', marginTop: 2 }}>{sp.where}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Marco legal */}
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <SectionTitle>Marco Legal Colombia</SectionTitle>
          <div style={S.card}>
            <div style={{ padding: '16px' }}>
              {[
                ['Resolución 2184 de 2019', 'Código de 3 colores para separación de residuos'],
                ['Decreto 1077 de 2015',    'Servicio público de aseo y PGIRS municipal'],
                ['Ley 1259 de 2008',        'Comparendo ambiental por mala disposición'],
                ['Decreto 670 de 2025',     'Actualización normativa de aseo urbano'],
              ].map(([n, d], i, arr) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  paddingBottom: i < arr.length - 1 ? 10 : 0,
                  marginBottom: i < arr.length - 1 ? 10 : 0,
                  borderBottom: i < arr.length - 1 ? '1px solid #F0EDE6' : 'none',
                }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, flexShrink: 0, marginTop: 1 }}>📜</span>
                  <div>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 12, margin: 0 }}>{n}</p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: '#6B7080', marginTop: 2 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sobre EcoSort */}
        <motion.div variants={fadeUp} style={{ marginBottom: 8 }}>
          <SectionTitle>Sobre EcoSort</SectionTitle>
          <div style={{ background: '#1B3A6B', borderRadius: 16, overflow: 'hidden' }}>
            <CaliBar height={3} style={{ opacity: 0.5 }} />
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: '#2D7A4A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  🌿
                </div>
                <div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 20, margin: 0 }}>EcoSort v1.0</p>
                  <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: 0.5 }}>
                    Cali, Valle del Cauca · Colombia
                  </p>
                </div>
              </div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: '0 0 16px' }}>
                App educativa con inteligencia artificial (Google Teachable Machine) para clasificar residuos. Datos basados en el PGIRS de Cali y la normativa colombiana vigente.
              </p>
              <button onClick={restartTour}
                className="btn-press"
                style={{
                  width: '100%', padding: '13px 0', borderRadius: 99,
                  background: '#2D7A4A', border: 'none', cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#fff', fontSize: 14,
                  boxShadow: '0 4px 12px rgba(45,122,74,0.3)',
                }}>
                🗺️ Ver tour de la app
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
