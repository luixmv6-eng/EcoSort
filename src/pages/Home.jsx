import { useNavigate } from 'react-router-dom';
import { CALI_FACTS, ECO_TIPS, RECYCLING_EVENTS } from '../data/wasteData';
import { CaliBar, BinGlyph, SectionTitle } from '../components/UI/DesignAtoms';

const todayTip = ECO_TIPS[new Date().getDay() % ECO_TIPS.length];

const DAYS   = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100%', overflow: 'hidden auto', background: '#F4F0E8' }} className="no-scrollbar">

      {/* ── Header ── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2DDD4', padding: '52px 20px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8B8F9C', letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 4px' }}>
              {getDateLabel()}
            </p>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 26, fontWeight: 800, color: '#1A1F2E', margin: 0, lineHeight: 1.2 }}>
              {getGreeting()},<br />
              <span style={{ color: '#1B3A6B' }}>Caleño. 👋</span>
            </h1>
          </div>
          {/* Avatar verde ecológico */}
          <div style={{
            width: 46, height: 46, borderRadius: 23,
            background: 'linear-gradient(135deg, #2D7A4A, #3A9B5E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
            boxShadow: '0 3px 10px rgba(45,122,74,0.35)',
          }}>
            🌿
          </div>
        </div>

        {/* CaliBar con verde dominante */}
        <div style={{ display: 'flex', height: 4, borderRadius: 99, overflow: 'hidden', marginBottom: 16, opacity: 0.75 }}>
          <div style={{ flex: 1, background: '#1B3A6B' }} />
          <div style={{ flex: 2, background: '#2D7A4A' }} />
          <div style={{ flex: 1, background: '#C8392E' }} />
          <div style={{ flex: 2, background: '#3A9B5E' }} />
        </div>

        {/* Stat strip */}
        <div style={{ display: 'flex', gap: 8 }}>
          {CALI_FACTS.slice(0, 3).map(f => (
            <div key={f.label} style={{
              flex: 1, background: '#F4F0E8', borderRadius: 12,
              border: '1px solid #E2DDD4', padding: '10px 10px 8px', textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 17, fontWeight: 700, color: '#1B3A6B', margin: 0, lineHeight: 1 }}>
                {f.stat}
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 9.5, color: '#8B8F9C', marginTop: 3, lineHeight: 1.2 }}>
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 16px 120px' }}>

        {/* ── Cristo Rey hero con foto real ── */}
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid #E2DDD4',
          boxShadow: '0 4px 20px rgba(27,58,107,0.12)',
          marginBottom: 16, position: 'relative',
        }}>
          {/* Foto */}
          <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
            <img
              src="/cristo-rey.jpg"
              alt="Cristo Rey, Cali"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            {/* Gradiente para legibilidad */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(27,58,107,0.15) 0%, rgba(0,0,0,0.0) 40%, rgba(27,58,107,0.55) 100%)',
            }} />
            {/* Badge superior izquierdo */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'rgba(45,122,74,0.88)', backdropFilter: 'blur(8px)',
              borderRadius: 99, padding: '4px 11px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: '#7EF5A0', boxShadow: '0 0 5px #7EF5A0', flexShrink: 0 }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#fff', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                TIP DEL DÍA
              </span>
            </div>
            {/* Label inferior */}
            <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 16, margin: 0, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                Cristo Rey · Cali
              </p>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}>
                CLO-001
              </span>
            </div>
          </div>

          {/* Cuerpo del tip */}
          <div style={{ background: '#FFFFFF', padding: '14px 16px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{todayTip?.icon}</span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13.5, color: '#1A1F2E', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>
                "{todayTip?.tip}"
              </p>
            </div>
            {/* Mini barra verde ecológica */}
            <div style={{ display: 'flex', gap: 3, marginTop: 12 }}>
              <div style={{ flex: 3, height: 3, borderRadius: 99, background: '#2D7A4A', opacity: 0.8 }} />
              <div style={{ flex: 1, height: 3, borderRadius: 99, background: '#3A9B5E', opacity: 0.5 }} />
              <div style={{ flex: 1, height: 3, borderRadius: 99, background: '#7EF5A0', opacity: 0.4 }} />
            </div>
          </div>
        </div>

        {/* ── Acción principal: escanear (verde + azul) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          <button className="btn-press" onClick={() => navigate('/scanner')} style={{
            background: 'linear-gradient(145deg, #1B3A6B, #234F8F)',
            borderRadius: 18, padding: '20px 16px',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 5px 18px rgba(27,58,107,0.30)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📷</div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 15, margin: 0 }}>
              Escanear
            </p>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
              IA · TIEMPO REAL
            </p>
          </button>
          <button className="btn-press" onClick={() => navigate('/bins')} style={{
            background: 'linear-gradient(145deg, #2D7A4A, #3A9B5E)',
            borderRadius: 18, padding: '20px 16px',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 5px 18px rgba(45,122,74,0.30)',
          }}>
            <BinGlyph color="#fff" size={28} stroke="rgba(255,255,255,0.35)" />
            <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#fff', fontSize: 15, margin: '10px 0 0' }}>
              Canecas
            </p>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
              3 COLORES
            </p>
          </button>
        </div>

        {/* ── Eco-tip destacado verde ── */}
        <div style={{
          background: 'linear-gradient(135deg, #2D7A4A 0%, #1B3A6B 100%)',
          borderRadius: 16, padding: '16px',
          marginBottom: 18,
          boxShadow: '0 4px 16px rgba(45,122,74,0.20)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7EF5A0', boxShadow: '0 0 7px #7EF5A0' }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'rgba(255,255,255,0.65)', letterSpacing: 1, textTransform: 'uppercase' }}>
              Eco-tip de hoy
            </span>
          </div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.55 }}>
            ¿Sabías que reciclar <strong style={{ color: '#7EF5A0' }}>1 tonelada de papel</strong> salva 17 árboles y 26.000 litros de agua?
          </p>
        </div>

        {/* ── Cifras con acento verde ── */}
        <div style={{ marginBottom: 18 }}>
          <SectionTitle right="CALI · DATOS">Cali en cifras</SectionTitle>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {CALI_FACTS.map((f, i) => (
              <div key={f.label} style={{
                background: '#FFFFFF', borderRadius: 14,
                border: `1px solid ${i % 2 === 0 ? '#C3DEC9' : '#E2DDD4'}`,
                padding: '14px 14px 12px', minWidth: 110, flexShrink: 0,
                boxShadow: '0 1px 4px rgba(27,58,107,0.06)',
                borderTop: `3px solid ${i % 2 === 0 ? '#2D7A4A' : '#1B3A6B'}`,
              }}>
                <span style={{ fontSize: 22 }}>{f.icon}</span>
                <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: i % 2 === 0 ? '#2D7A4A' : '#1B3A6B', fontSize: 20, margin: '6px 0 2px', lineHeight: 1 }}>
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
          <div style={{ marginBottom: 18 }}>
            <SectionTitle right={`${RECYCLING_EVENTS.length} EVENTOS`}>Próximos eventos</SectionTitle>
            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2DDD4', overflow: 'hidden', boxShadow: '0 1px 4px rgba(27,58,107,0.07)' }}>
              {/* Barra verde */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #2D7A4A, #1B3A6B)' }} />
              {RECYCLING_EVENTS.map((ev, i) => (
                <div key={ev.title} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px',
                  borderBottom: i < RECYCLING_EVENTS.length - 1 ? '1px solid #F0EDE6' : 'none',
                }}>
                  <div style={{
                    background: '#EEF6F1', borderRadius: 10,
                    padding: '8px 10px', textAlign: 'center', flexShrink: 0, minWidth: 44,
                    border: '1px solid #C3DEC9',
                  }}>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: '#2D7A4A', fontSize: 18, margin: 0, lineHeight: 1 }}>
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
                  <span style={{ fontSize: 16, flexShrink: 0 }}>♻️</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Recicladores de oficio ── */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #C3DEC9',
          borderLeft: '4px solid #2D7A4A',
          padding: '16px', marginBottom: 16,
          boxShadow: '0 1px 4px rgba(45,122,74,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 13,
              background: 'linear-gradient(135deg, #E8F5ED, #C3DEC9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0,
            }}>🤝</div>
            <div>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13, margin: 0 }}>
                Los recicladores de oficio
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#6B7080', marginTop: 4, lineHeight: 1.5 }}>
                Más de <strong style={{ color: '#2D7A4A' }}>3,000 familias caleñas</strong> viven del reciclaje. Separar bien facilita su trabajo y genera ingresos dignos.
              </p>
              <button onClick={() => navigate('/info')}
                className="btn-press"
                style={{
                  marginTop: 8, background: 'none', border: 'none', padding: 0,
                  fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#2D7A4A', fontSize: 12, cursor: 'pointer',
                }}>
                Saber más →
              </button>
            </div>
          </div>
        </div>

        {/* ── Por qué reciclar — strip verde ── */}
        <div style={{
          background: '#EEF6F1', borderRadius: 14, padding: '14px 16px',
          border: '1px solid #C3DEC9', marginBottom: 16,
        }}>
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 700, color: '#2D7A4A', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
            🌱 ¿Por qué separar?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { ico: '🏔️', t: 'Protege los Farallones', c: '#1B3A6B' },
              { ico: '💰', t: 'Economía circular caleña', c: '#2D7A4A' },
              { ico: '🌊', t: 'Cuida el Río Cali', c: '#1B3A6B' },
            ].map(({ ico, t, c }) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: 16 }}>{ico}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 600, color: c }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tour ── */}
        <button
          className="btn-press"
          onClick={() => { localStorage.removeItem('ecosort_tour_seen'); window.location.reload(); }}
          style={{
            width: '100%', padding: '13px 0',
            borderRadius: 99, border: '1.5px solid #C3DEC9',
            background: 'transparent',
            fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#2D7A4A', fontSize: 13,
            cursor: 'pointer',
          }}>
          🗺️ Ver tour de la app
        </button>
      </div>
    </div>
  );
}
