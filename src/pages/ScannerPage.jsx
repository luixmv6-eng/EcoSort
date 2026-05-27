import { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCamera } from '../hooks/useCamera';
import { useTeachableMachine } from '../hooks/useTeachableMachine';
import { WASTE_CATEGORIES, BINS } from '../data/wasteData';
import { IS_CONFIGURED } from '../config';
import { WASTE_ICON_MAP } from '../components/Icons/WasteIcons';
import { CaliBar, BinGlyph } from '../components/UI/DesignAtoms';

const BIN_STYLE = {
  blanco: { bg: '#EEF1F8', accent: '#1B3A6B', label: 'Reciclable',      binColor: '#1B3A6B' },
  verde:  { bg: '#E8F5ED', accent: '#2D7A4A', label: 'Orgánico',        binColor: '#2D7A4A' },
  negro:  { bg: '#EBEBEB', accent: '#2A2F3D', label: 'No aprovechable', binColor: '#2A2F3D' },
};

function ResultSheet({ result, uploadedImage, onRetry, onLearnMore }) {
  const cat = WASTE_CATEGORIES[result.label] || WASTE_CATEGORIES['Basura Varia'];
  const bin = BINS[cat.bin];
  const bs = BIN_STYLE[cat.bin] || BIN_STYLE.negro;
  const Icon = WASTE_ICON_MAP[result.label] || WASTE_ICON_MAP['Basura Varia'];

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#FFFFFF',
        borderRadius: '24px 24px 0 0',
        zIndex: 10,
        padding: '16px 20px 40px',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.22)',
        maxHeight: '82vh',
        overflow: 'hidden auto',
      }}
    >
      <div style={{ width: 44, height: 4, background: '#D4CEBC', borderRadius: 99, margin: '0 auto 16px' }} />
      <CaliBar height={2.5} style={{ marginBottom: 16, opacity: 0.6 }} />

      {/* Si viene de imagen subida, mostrar preview */}
      {uploadedImage && (
        <div style={{ marginBottom: 14, borderRadius: 14, overflow: 'hidden', height: 140, position: 'relative' }}>
          <img src={uploadedImage} alt="Residuo analizado"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(45,122,74,0.88)', backdropFilter: 'blur(8px)',
            borderRadius: 99, padding: '3px 10px',
          }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#fff', letterSpacing: 0.8 }}>
              📁 IMAGEN SUBIDA
            </span>
          </div>
        </div>
      )}

      {/* Category header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: bs.bg, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon color={bs.accent} className="w-7 h-7" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: '#8B8F9C', letterSpacing: 0.8, textTransform: 'uppercase', margin: 0 }}>
            OBJETO DETECTADO
          </p>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 17, margin: '2px 0 0' }}>
            {cat.label}
          </p>
        </div>
        <span style={{
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, fontWeight: 600,
          color: bs.accent, background: bs.bg,
          padding: '4px 10px', borderRadius: 99, flexShrink: 0,
        }}>
          {bs.label}
        </span>
      </div>

      {/* Bin card */}
      <div style={{
        background: bs.bg, borderRadius: 14,
        padding: '14px 16px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <BinGlyph color={bs.binColor} size={32} stroke="rgba(255,255,255,0.5)" />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: bs.accent, fontSize: 13, margin: 0 }}>
            {bin.name}
          </p>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: bs.accent, opacity: 0.75, margin: '2px 0 0', lineHeight: 1.4 }}>
            {cat.caliInstruction || cat.tips[0]}
          </p>
        </div>
      </div>

      {/* Confidence bar */}
      {result.confidence < 100 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 3, background: '#E8E3D8', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: bs.accent, borderRadius: 99, width: `${result.confidence}%`, transition: 'width 0.7s' }} />
          </div>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8B8F9C', width: 32, textAlign: 'right' }}>
            {result.confidence}%
          </span>
        </div>
      )}

      {/* Tips */}
      <div style={{ marginBottom: 16 }}>
        {cat.tips.slice(0, 2).map((tip, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fontWeight: 700, color: bs.accent, flexShrink: 0, marginTop: 1 }}>
              {i + 1}.
            </span>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: '#6B7080', margin: 0, lineHeight: 1.45 }}>
              {tip}
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={onRetry} className="btn-press" style={{
          padding: '13px 0', borderRadius: 99,
          background: '#F4F0E8', border: '1px solid #D4CEBC',
          fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#1A1F2E', fontSize: 13,
          cursor: 'pointer',
        }}>
          {uploadedImage ? 'Subir otra' : 'Escanear otro'}
        </button>
        <button onClick={onLearnMore} className="btn-press" style={{
          padding: '13px 0', borderRadius: 99,
          background: '#1B3A6B', border: 'none',
          fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#fff', fontSize: 13,
          cursor: 'pointer', boxShadow: '0 4px 12px rgba(27,58,107,0.3)',
        }}>
          Ver en guía
        </button>
      </div>
    </motion.div>
  );
}

function ManualPicker({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#FFFFFF',
        borderRadius: '24px 24px 0 0',
        zIndex: 20,
        padding: '16px 20px 40px',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{ width: 44, height: 4, background: '#D4CEBC', borderRadius: 99, margin: '0 auto 16px' }} />
      <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 17, margin: '0 0 16px' }}>
        ¿Qué es este residuo?
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {Object.entries(WASTE_CATEGORIES).map(([key, cat]) => {
          const Icon = WASTE_ICON_MAP[key] || WASTE_ICON_MAP['Basura Varia'];
          return (
            <button key={key}
              onClick={() => onSelect({ label: key, confidence: 100, all: [] })}
              className="btn-press"
              style={{
                background: '#F4F0E8', border: '1px solid #E2DDD4',
                borderRadius: 14, padding: '14px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: 'pointer',
              }}>
              <div style={{ width: 36, height: 36 }}><Icon color={cat.color} /></div>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 600, color: '#1A1F2E', textAlign: 'center', lineHeight: 1.2 }}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={onClose} className="btn-press" style={{
        marginTop: 14, width: '100%', padding: '13px 0',
        borderRadius: 99, border: '1px solid #D4CEBC',
        background: 'transparent',
        fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#6B7080', fontSize: 13,
        cursor: 'pointer',
      }}>
        Cancelar
      </button>
    </motion.div>
  );
}

export default function ScannerPage() {
  const navigate = useNavigate();
  const { videoRef, cameraState, errorMsg, startCamera, stopCamera, captureFrame } = useCamera();
  const { modelState, loadModel, predict } = useTeachableMachine();
  const [phase, setPhase] = useState('idle');
  const [result, setResult] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // data URL para preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    startCamera().then(() => { if (IS_CONFIGURED) loadModel(); });
    return () => stopCamera();
  }, []);

  useEffect(() => { if (cameraState === 'active') setPhase('ready'); }, [cameraState]);

  // ── Captura desde cámara ──────────────────────────────────
  const handleCapture = useCallback(async () => {
    if (phase !== 'ready') return;
    if (!IS_CONFIGURED) { setShowManual(true); return; }
    setPhase('scanning');
    const canvas = captureFrame();
    if (!canvas) { setPhase('ready'); return; }
    const res = await predict(canvas);
    if (res) { setUploadedImage(null); setResult(res); setPhase('result'); }
    else setPhase('ready');
  }, [phase, captureFrame, predict]);

  // ── Carga desde galería / archivo ────────────────────────
  const handleFileSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';           // permite seleccionar el mismo archivo de nuevo
    if (!file) return;

    setPhase('scanning');

    // Convertir a data URL para el preview
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target.result);
      reader.readAsDataURL(file);
    });

    // Crear elemento img y esperar que cargue
    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => { img.onload = resolve; });

    // Aseguramos que el modelo esté cargado
    if (IS_CONFIGURED && modelState !== 'ready') {
      await loadModel();
      // Esperar brevemente a que el estado se propague
      await new Promise(r => setTimeout(r, 300));
    }

    if (!IS_CONFIGURED) {
      // Sin modelo: abrir selector manual con la imagen de preview
      setUploadedImage(dataUrl);
      setPhase('ready');
      setShowManual(true);
      return;
    }

    const res = await predict(img);
    if (res) {
      setUploadedImage(dataUrl);
      setResult(res);
      setPhase('result');
    } else {
      setPhase('ready');
    }
  }, [predict, loadModel, modelState]);

  const handleRetry = () => {
    setResult(null);
    setUploadedImage(null);
    setPhase(cameraState === 'active' ? 'ready' : 'idle');
    setShowManual(false);
  };

  return (
    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', background: '#0E1420' }}>

      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* ── Video ── */}
      <video ref={videoRef} playsInline muted autoPlay
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          display: cameraState === 'active' && !uploadedImage ? 'block' : 'none',
        }} />

      {/* ── Preview imagen subida ── */}
      {uploadedImage && phase !== 'result' && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={uploadedImage} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0E1420' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,20,32,0.35)' }} />
        </div>
      )}

      {/* ── Sin cámara ── */}
      {cameraState !== 'active' && !uploadedImage && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 20, padding: '0 32px', textAlign: 'center',
          background: '#F4F0E8',
        }}>
          {cameraState === 'requesting' && (
            <>
              <div style={{ width: 52, height: 52, border: '3px solid #1B3A6B', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#1A1F2E' }}>Iniciando cámara...</p>
            </>
          )}
          {cameraState === 'error' && (
            <>
              <span style={{ fontSize: 48 }}>📷</span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#1A1F2E', fontSize: 18, margin: 0 }}>Sin acceso a la cámara</p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7080', margin: 0 }}>{errorMsg}</p>
              <button onClick={startCamera} className="btn-press" style={{
                background: '#1B3A6B', color: '#fff', fontFamily: 'Manrope, sans-serif',
                fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 99, border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(27,58,107,0.28)',
              }}>
                Reintentar cámara
              </button>
              {/* Subir imagen como alternativa principal cuando no hay cámara */}
              <button onClick={() => fileInputRef.current?.click()} className="btn-press" style={{
                background: '#2D7A4A', color: '#fff', fontFamily: 'Manrope, sans-serif',
                fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 99, border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(45,122,74,0.28)',
              }}>
                📁 Subir foto de la galería
              </button>
              <button onClick={() => setShowManual(true)} className="btn-press" style={{
                background: 'transparent', color: '#6B7080', fontFamily: 'Manrope, sans-serif',
                fontWeight: 600, fontSize: 13, padding: '12px 28px', borderRadius: 99,
                border: '1px solid #D4CEBC', cursor: 'pointer',
              }}>
                Selección manual
              </button>
            </>
          )}
          {cameraState === 'idle' && (
            <>
              <span style={{ fontSize: 48 }}>📷</span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, color: '#1A1F2E', margin: 0 }}>Activa la cámara para escanear</p>
              <button onClick={startCamera} className="btn-press" style={{
                background: '#1B3A6B', color: '#fff', fontFamily: 'Manrope, sans-serif',
                fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 99, border: 'none', cursor: 'pointer',
              }}>
                Activar cámara
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="btn-press" style={{
                background: '#2D7A4A', color: '#fff', fontFamily: 'Manrope, sans-serif',
                fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 99, border: 'none', cursor: 'pointer',
              }}>
                📁 Subir foto
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Header overlay ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5, paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0' }}>
          <button onClick={() => navigate(-1)} className="btn-press" style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, cursor: 'pointer',
          }}>
            ‹
          </button>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.5, margin: 0 }}>
              ESCÁNER · IA
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 2 }}>
              <div style={{
                width: 6, height: 6, borderRadius: 3,
                background: IS_CONFIGURED
                  ? modelState === 'ready' ? '#4ADE80' : '#FBBF24'
                  : '#F87171',
                boxShadow: IS_CONFIGURED && modelState === 'ready' ? '0 0 6px #4ADE80' : 'none',
              }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
                {IS_CONFIGURED ? modelState === 'ready' ? 'IA ACTIVA' : 'CARGANDO…' : 'MANUAL'}
              </span>
            </div>
          </div>
          <button onClick={() => setShowManual(true)} className="btn-press" style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)',
            border: '0.5px solid rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, cursor: 'pointer',
          }}>
            ⋯
          </button>
        </div>
      </div>

      {/* ── Viewfinder (solo con cámara activa, sin imagen subida) ── */}
      {cameraState === 'active' && phase !== 'result' && !uploadedImage && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{ position: 'relative', width: 280, height: 280 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 20, boxShadow: '0 0 0 9999px rgba(14,20,32,0.52)' }} />
            {[
              { top: 0, left: 0, borderTop: '2.5px solid #fff', borderLeft: '2.5px solid #fff', borderRadius: '10px 0 0 0' },
              { top: 0, right: 0, borderTop: '2.5px solid #fff', borderRight: '2.5px solid #fff', borderRadius: '0 10px 0 0' },
              { bottom: 0, left: 0, borderBottom: '2.5px solid #fff', borderLeft: '2.5px solid #fff', borderRadius: '0 0 0 10px' },
              { bottom: 0, right: 0, borderBottom: '2.5px solid #fff', borderRight: '2.5px solid #fff', borderRadius: '0 0 10px 0' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 32, height: 32, ...s }} />
            ))}
            {phase === 'scanning' && (
              <div style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
                boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                animation: 'caliScan 2.2s ease-in-out infinite alternate',
              }} />
            )}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
              borderRadius: 99, padding: '6px 14px',
              border: '0.5px solid rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: 3, flexShrink: 0,
                background: phase === 'scanning' ? '#4ADE80' : '#fff',
                boxShadow: phase === 'scanning' ? '0 0 6px #4ADE80' : 'none',
              }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#fff', letterSpacing: 0.5 }}>
                {phase === 'scanning' ? 'Analizando…' : 'Encuadra el objeto'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Indicador "Analizando imagen…" cuando se subió foto ── */}
      {phase === 'scanning' && uploadedImage && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(14,20,32,0.75)', backdropFilter: 'blur(12px)',
          borderRadius: 16, padding: '20px 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          zIndex: 5,
        }}>
          <div style={{ width: 36, height: 36, border: '3px solid #4ADE80', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#fff', margin: 0, letterSpacing: 0.8 }}>
            Analizando imagen…
          </p>
        </div>
      )}

      {/* ── Botones inferiores: captura + subir foto ── */}
      {(cameraState === 'active' || uploadedImage) && phase !== 'result' && !showManual && (
        <div style={{
          position: 'absolute', bottom: 90, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24,
        }}>
          {/* Botón subir foto (izquierdo) */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={phase === 'scanning'}
            className="btn-press"
            style={{
              width: 50, height: 50, borderRadius: 25,
              background: 'rgba(45,122,74,0.85)', backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 2,
            }}
            title="Subir foto de la galería"
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>📁</span>
          </button>

          {/* Botón captura (central, solo si hay cámara activa) */}
          {cameraState === 'active' && (
            <button
              onClick={handleCapture}
              disabled={phase === 'scanning'}
              className="btn-press"
              style={{
                width: 72, height: 72, borderRadius: 36,
                border: '3px solid rgba(255,255,255,0.5)',
                background: phase === 'scanning' ? '#2D7A4A' : '#1B3A6B',
                boxShadow: '0 4px 24px rgba(27,58,107,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {phase === 'scanning'
                ? <div style={{ width: 28, height: 28, border: '3px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
                : <span style={{ fontSize: 24 }}>{IS_CONFIGURED ? '📸' : '✋'}</span>
              }
            </button>
          )}

          {/* Botón manual (derecho) */}
          <button
            onClick={() => setShowManual(true)}
            disabled={phase === 'scanning'}
            className="btn-press"
            style={{
              width: 50, height: 50, borderRadius: 25,
              background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 18,
            }}
            title="Selección manual"
          >
            ✋
          </button>
        </div>
      )}

      {/* ── Label explicativo debajo de los botones ── */}
      {cameraState === 'active' && phase === 'ready' && !showManual && (
        <div style={{
          position: 'absolute', bottom: 60, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 32,
        }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.5 }}>
            GALERÍA
          </span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.5 }}>
            CAPTURAR
          </span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 8.5, color: 'rgba(255,255,255,0.38)', letterSpacing: 0.5 }}>
            MANUAL
          </span>
        </div>
      )}

      {/* ── Sheets ── */}
      <AnimatePresence>
        {phase === 'result' && result && (
          <ResultSheet
            result={result}
            uploadedImage={uploadedImage}
            onRetry={handleRetry}
            onLearnMore={() => navigate('/guide', { state: { highlight: result.label } })}
          />
        )}
        {showManual && (
          <ManualPicker
            onSelect={(r) => { setResult(r); setShowManual(false); setPhase('result'); }}
            onClose={() => setShowManual(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
