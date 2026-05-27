import { useNavigate } from 'react-router-dom';
import { CALI_FACTS, ECO_TIPS, RECYCLING_EVENTS } from '../data/wasteData';
import { LandmarkPlaceholder, CaliBar, BinGlyph, SectionTitle } from '../components/UI/DesignAtoms';

const todayTip = ECO_TIPS[new Date().getDay() % ECO_TIPS.length];

const DAYS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

function getDateLabel() {
  const d = new Date();
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`.toUpperCase();
}

const S = {
  page:    { height: '100%', overflow: 'hidden auto', background: '#F4F0E8', WebkitOverflowScrolling: 'touch' },
  header:  { padding: '56px 20px 20px', borderBottom: '1px solid #E2DDD4' },
  section: { padding: '0 16px', marginBottom: 20 },
  card:    { background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2DDD4', overflow: 'hidden', boxShadow: '0 1px 4px rgba(27,58,107,0.07)' },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={S.page} className="no-scrollbar">

      {/* ── Header ── */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8B8F9C', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
              {getDateLabel()}
            </p>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, color: '#1A1F2E', margin: 0, lineHeight: 1.2 }}>
              {getGreeting()},<br />
              <span style={{ color: '#1B3A6B' }}>Caleño. 👋</span>
            </h1>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: '#1B3A6B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
            boxShadow: '0 2px 8px rgba(27,58,107,0.2)',
          }}>
            🌿
          </div>
        </div>

        <CaliBar height={3} style={{ marginBottom: 18, opacity: 0.6 }} />

        {/* Stat strip */}
        <div style={{ display: 'flex', gap: 10 }}>
          {CALI_FACTS.slice(0, 3).map(f => (
            <div key={f.label} style={{
              flex: 1, background: '#fff', borderRadius: 12,
              border: '1px solid #E2DDD4', padding: '10px 10px 8px',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 17, fontWeight: 600, color: '#1B3A6B', margin: 0, lineHeight: 1 }}>
                {f.stat}
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 9.5, color: '#8B8F9C', marginTop: 3, lineHeight: 1.2 }}>
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px 120px' }}>

        {/* ── Landmark hero ── */}
        <div style={{ ...S.card, marginBottom: 16 }}>
          <LandmarkPlaceholder name="Cristo Rey · Cali" code="CLO-001" tone="blue" height={140} />
          <div style={{ padding: '14px 16px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 600,
                color: '#2D7A4A', letterSpacing: 1, textTransform: 'uppercase',
                background: '#E8F5ED', padding: '3px 8px', borderRadius: 99,
              }}>
                TIP DEL DÍA
              </span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8B8F9C' }}>
                {todayTip?.icon}
              </span>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#1A1F2E', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
              "{todayTip?.tip}"
            </p>
          </div>
        </div>

        {/* ── Action tiles ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <button className="btn-press" onClick={() => navigate('/scanner')} style={{
            background: '#1B3A6B', borderRadius: 16, padding: '20px 16px',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 14px rgba(27,58,107,0.28)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📷</div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 15, margin: 0 }}>
              Escanear
            </p>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
              IA · TIEMPO REAL
            </p>
          </button>
          <button className="btn-press" onClick={() => navigate('/bins')} style={{
            background: '#2D7A4A', borderRadius: 16, padding: '20px 16px',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 4px 14px rgba(45,122,74,0.25)',
          }}>
            <BinGlyph color="#fff" size={28} stroke="rgba(255,255,255,0.4)" />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 15, margin: '10px 0 0' }}>
              Canecas
            </p>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
              3 COLORES
            </p>
          </button>
        </div>

        {/* ── Zonas / Cifras ── */}
        <div style={{ marginBottom: 20 }}>
          <SectionTitle right="VER TODO →">Cali en cifras</SectionTitle>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {CALI_FACTS.map(f => (
              <div key={f.label} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #E2DDD4',
                padding: '14px 14px 12px', minWidth: 110, flexShrink: 0,
                boxShadow: '0 1px 3px rgba(27,58,107,0.06)',
              }}>
                <span style={{ fontSize: 22 }}>{f.icon}</span>
                <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600, color: '#1B3A6B', fontSize: 20, margin: '6px 0 2px', lineHeight: 1 }}>
                  {f.stat}
                </p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, color: '#8B8F9C', lineHeight: 1.3 }}>
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Próximos eventos ── */}
        {RECYCLING_EVENTS?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionTitle right={`${RECYCLING_EVENTS.length} EVENTOS`}>Próximos eventos</SectionTitle>
            <div style={S.card}>
              <div style={{ height: 2, background: '#2D7A4A' }} />
              {RECYCLING_EVENTS.map((ev, i) => (
                <div key={ev.title} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  borderBottom: i < RECYCLING_EVENTS.length - 1 ? '1px solid #F0EDE6' : 'none',
                }}>
                  <div style={{
                    background: '#EEF1F8', borderRadius: 10,
                    padding: '8px 10px', textAlign: 'center', flexShrink: 0, minWidth: 44,
                  }}>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: '#1B3A6B', fontSize: 18, margin: 0, lineHeight: 1 }}>
                      {ev.date}
                    </p>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 8.5, color: '#8B8F9C', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {ev.month}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>
                      {ev.title}
                    </p>
                    <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: '#8B8F9C', marginTop: 2 }}>
                      {ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Recicladores ── */}
        <div style={{ ...S.card, padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: '#E8F5ED', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>🤝</div>
            <div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>
                Los recicladores de oficio
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', marginTop: 4, lineHeight: 1.5 }}>
                Más de <strong style={{ color: '#2D7A4A' }}>3,000 familias caleñas</strong> viven del reciclaje. Separar bien facilita su trabajo.
              </p>
              <button onClick={() => navigate('/info')}
                className="btn-press"
                style={{
                  marginTop: 8, background: 'none', border: 'none', padding: 0,
                  fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1B3A6B', fontSize: 12, cursor: 'pointer',
                }}>
                Saber más →
              </button>
            </div>
          </div>
        </div>

        {/* ── Tour ── */}
        <button
          className="btn-press"
          onClick={() => { localStorage.removeItem('ecosort_tour_seen'); window.location.reload(); }}
          style={{
            width: '100%', padding: '13px 0',
            borderRadius: 99, border: '1px solid #D4CEBC',
            background: 'transparent',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#6B7080', fontSize: 13,
            cursor: 'pointer',
          }}>
          🗺️ Ver tour de la app
        </button>
      </div>
    </div>
  );
}
