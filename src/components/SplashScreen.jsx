import { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1800);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-primary-400"
      style={{ transition: 'opacity 0.6s', opacity: fade ? 0 : 1, pointerEvents: 'none' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center shadow-xl animate-bounce-slow">
          <span className="text-5xl">♻️</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">EcoSort</h1>
          <p className="text-primary-100 text-sm mt-1">Separación de Residuos • Cali</p>
        </div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0,1,2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              style={{ animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }}
            />
          ))}
        </div>
        <p className="text-white/70 text-xs">Cargando...</p>
      </div>
    </div>
  );
}
