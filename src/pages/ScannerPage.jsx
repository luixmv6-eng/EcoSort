import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCamera } from '../hooks/useCamera';
import { useTeachableMachine } from '../hooks/useTeachableMachine';
import { WASTE_CATEGORIES, BINS } from '../data/wasteData';
import { IS_CONFIGURED } from '../config';

// ── Componente de resultado ──────────────────────────────────
function ResultSheet({ result, onRetry, onLearnMore }) {
  const cat = WASTE_CATEGORIES[result.label] || WASTE_CATEGORIES['Basura Varia'];
  const bin = BINS[cat.bin];
  const isRecyclable = cat.bin !== 'negro';

  const binColors = {
    blanco: 'bg-slate-100 text-slate-800 border-slate-300',
    verde:  'bg-green-500 text-white border-green-600',
    negro:  'bg-slate-800 text-white border-slate-900',
  };

  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-10 px-5 pt-5 pb-10"
    >
      {/* Handle */}
      <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ backgroundColor: cat.lightColor }}>
          {cat.emoji}
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Detectado</p>
          <h2 className="text-2xl font-extrabold text-slate-800">{cat.label}</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-1.5 rounded-full bg-gray-200 flex-1 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full transition-all duration-700"
                style={{ width: `${result.confidence}%` }} />
            </div>
            <span className="text-xs text-slate-500 font-semibold">{result.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Bin */}
      <div className={`rounded-2xl border-2 px-4 py-3 mb-4 ${binColors[cat.bin]}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{bin.icon}</span>
          <div>
            <p className="font-bold text-base">{bin.name}</p>
            <p className="text-xs opacity-80">{bin.subtitle}</p>
          </div>
          {isRecyclable && (
            <span className="ml-auto bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
              ♻️ Recicla
            </span>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-primary-50 rounded-xl p-3 mb-4">
        <p className="text-primary-800 text-sm leading-relaxed">
          💡 {cat.tips[0]}
        </p>
      </div>

      {/* Confidence bars all classes */}
      {result.all && result.all.length > 1 && (
        <div className="mb-4">
          <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">Análisis completo</p>
          <div className="space-y-1">
            {result.all.sort((a, b) => b.confidence - a.confidence).map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-xs text-slate-600 w-24 truncate">{r.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-primary-400 transition-all"
                    style={{ width: `${r.confidence}%` }} />
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">{r.confidence}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onRetry}
          className="btn-press flex-1 py-3 rounded-2xl border-2 border-primary-200 text-primary-700 font-bold text-sm">
          📷 Escanear de nuevo
        </button>
        <button onClick={onLearnMore}
          className="btn-press flex-[1.5] py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold text-sm shadow-lg">
          Aprender más →
        </button>
      </div>
    </motion.div>
  );
}

// ── Pantalla sin modelo configurado ────────────────────────
function NotConfiguredBanner({ onManual }) {
  return (
    <div className="absolute inset-x-4 bottom-28 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 z-10">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-bold text-amber-800 text-sm">Modelo de IA no configurado</p>
          <p className="text-amber-700 text-xs mt-1 leading-relaxed">
            Exporta tu modelo de Teachable Machine y pega la URL en{' '}
            <code className="bg-amber-100 px-1 rounded">src/config.js</code>.
            Por ahora puedes usar la selección manual.
          </p>
          <button onClick={onManual}
            className="mt-2 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg btn-press">
            Selección manual →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Selección manual ────────────────────────────────────────
function ManualPicker({ onSelect, onClose }) {
  return (
    <motion.div
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20 px-5 pt-5 pb-10"
    >
      <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
      <h3 className="text-lg font-bold text-slate-800 mb-4">¿Qué tipo de residuo es?</h3>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(WASTE_CATEGORIES).map(([key, cat]) => (
          <button key={key} onClick={() => onSelect({ label: key, confidence: 100, all: [] })}
            className="btn-press bg-white border-2 border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-1 hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>
      <button onClick={onClose} className="mt-4 w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm btn-press">
        Cancelar
      </button>
    </motion.div>
  );
}

// ── Página principal ────────────────────────────────────────
export default function ScannerPage() {
  const navigate = useNavigate();
  const { videoRef, cameraState, errorMsg, startCamera, stopCamera, captureFrame } = useCamera();
  const { modelState, modelError, loadModel, predict } = useTeachableMachine();
  const [phase, setPhase] = useState('idle');   // idle | ready | scanning | result | manual
  const [result, setResult] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const canvasRef = useRef(null);

  // Inicia cámara + modelo al montar
  useEffect(() => {
    startCamera().then(() => {
      if (IS_CONFIGURED) loadModel();
    });
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (cameraState === 'active') setPhase('ready');
  }, [cameraState]);

  const handleCapture = useCallback(async () => {
    if (phase !== 'ready') return;

    if (!IS_CONFIGURED) {
      setShowManual(true);
      return;
    }

    setPhase('scanning');
    const canvas = captureFrame();
    if (!canvas) { setPhase('ready'); return; }

    // Dibuja preview en el canvas overlay
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = canvas.width;
      canvasRef.current.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);
    }

    const res = await predict(canvas);
    if (res) {
      setResult(res);
      setPhase('result');
    } else {
      setPhase('ready');
    }
  }, [phase, captureFrame, predict]);

  const handleRetry = () => {
    setResult(null);
    setPhase('ready');
    setShowManual(false);
  };

  const handleLearnMore = () => {
    navigate('/guide', { state: { highlight: result?.label } });
  };

  const handleManualSelect = (fakeResult) => {
    setResult(fakeResult);
    setShowManual(false);
    setPhase('result');
  };

  return (
    <div className="h-full relative bg-black flex flex-col">
      {/* ── Cámara ── */}
      <video
        ref={videoRef}
        playsInline muted autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: cameraState === 'active' ? 'block' : 'none' }}
      />

      {/* ── Overlay cuando no hay cámara ── */}
      {cameraState !== 'active' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-4 px-8 text-center">
          {cameraState === 'requesting' && (
            <>
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white font-semibold">Iniciando cámara...</p>
            </>
          )}
          {cameraState === 'error' && (
            <>
              <span className="text-5xl">📷</span>
              <p className="text-white font-bold text-lg">Sin acceso a la cámara</p>
              <p className="text-slate-400 text-sm">{errorMsg}</p>
              <button onClick={startCamera}
                className="btn-press bg-primary-500 text-white font-bold px-6 py-3 rounded-2xl">
                Reintentar
              </button>
              <button onClick={() => setShowManual(true)}
                className="btn-press bg-white/10 text-white font-semibold px-6 py-3 rounded-2xl">
                Selección manual
              </button>
            </>
          )}
          {cameraState === 'idle' && (
            <>
              <span className="text-5xl">📷</span>
              <p className="text-white font-semibold">Toca para activar la cámara</p>
              <button onClick={startCamera}
                className="btn-press bg-primary-500 text-white font-bold px-6 py-3 rounded-2xl">
                Activar cámara
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Visor / crosshair ── */}
      {cameraState === 'active' && phase !== 'result' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-56 h-56">
            {/* Esquinas del visor */}
            {['top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl',
              'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl',
              'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl',
              'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl'].map((cls, i) => (
              <div key={i} className={`absolute w-8 h-8 border-white ${cls}`} />
            ))}
            {/* Línea de escaneo */}
            {phase === 'scanning' && (
              <div className="absolute left-0 right-0 h-0.5 bg-primary-400 animate-scan-line" />
            )}
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="absolute top-0 left-0 right-0 safe-top px-4 pt-4 pb-2">
        <div className="glass rounded-2xl px-4 py-2 flex items-center justify-between">
          <h1 className="text-slate-800 font-bold text-sm">📷 Escáner de Residuos</h1>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${
              IS_CONFIGURED
                ? modelState === 'ready' ? 'bg-green-500' : 'bg-amber-400 animate-pulse'
                : 'bg-red-400'
            }`} />
            <span className="text-xs text-slate-500">
              {IS_CONFIGURED
                ? modelState === 'ready' ? 'IA lista' : 'Cargando IA...'
                : 'Sin modelo IA'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Instrucción ── */}
      {cameraState === 'active' && phase === 'ready' && (
        <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none">
          <div className="glass rounded-full px-4 py-2">
            <p className="text-slate-700 text-xs font-semibold">
              {IS_CONFIGURED ? 'Apunta al residuo y toca el botón' : 'Toca el botón para seleccionar manualmente'}
            </p>
          </div>
        </div>
      )}

      {/* ── Botón captura ── */}
      {cameraState === 'active' && phase !== 'result' && !showManual && (
        <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-3 pb-2">
          <button
            onClick={handleCapture}
            disabled={phase === 'scanning'}
            className="btn-press w-18 h-18 rounded-full border-4 border-white shadow-2xl flex items-center justify-center"
            style={{ width: '72px', height: '72px' }}
          >
            <div className={`w-14 h-14 rounded-full transition-all duration-200 flex items-center justify-center ${
              phase === 'scanning'
                ? 'bg-amber-400 animate-pulse'
                : 'bg-primary-500 hover:bg-primary-400'
            }`}>
              <span className="text-2xl">{phase === 'scanning' ? '⏳' : IS_CONFIGURED ? '📸' : '✋'}</span>
            </div>
          </button>
          {phase === 'scanning' && (
            <p className="text-white text-xs font-semibold animate-pulse">Analizando...</p>
          )}
        </div>
      )}

      {/* ── Banner sin modelo ── */}
      {IS_CONFIGURED === false && cameraState === 'active' && phase === 'ready' && !showManual && (
        <NotConfiguredBanner onManual={() => setShowManual(true)} />
      )}

      {/* ── Sheets ── */}
      <AnimatePresence>
        {phase === 'result' && result && (
          <ResultSheet result={result} onRetry={handleRetry} onLearnMore={handleLearnMore} />
        )}
        {showManual && (
          <ManualPicker onSelect={handleManualSelect} onClose={() => setShowManual(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
