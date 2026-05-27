import { useRef, useState, useCallback } from 'react';
import { MODEL_URL, IS_CONFIGURED } from '../config';

export function useTeachableMachine() {
  const modelRef = useRef(null);
  const [modelState, setModelState] = useState('idle'); // idle | loading | ready | error | not-configured
  const [modelError, setModelError] = useState('');

  const loadModel = useCallback(async () => {
    if (!IS_CONFIGURED) {
      setModelState('not-configured');
      return;
    }
    if (modelRef.current) { setModelState('ready'); return; }
    setModelState('loading');
    setModelError('');
    try {
      // tmImage es cargado desde CDN en index.html y está disponible en window
      const tmImage = window.tmImage;
      if (!tmImage) throw new Error('Librería Teachable Machine no disponible. Verifica tu conexión.');
      const modelURL = MODEL_URL.endsWith('/') ? MODEL_URL : MODEL_URL + '/';
      const model = await tmImage.load(modelURL + 'model.json', modelURL + 'metadata.json');
      modelRef.current = model;
      setModelState('ready');
    } catch (err) {
      setModelError('No se pudo cargar el modelo: ' + err.message);
      setModelState('error');
    }
  }, []);

  const predict = useCallback(async (imageElement) => {
    if (!modelRef.current || modelState !== 'ready') return null;
    try {
      const predictions = await modelRef.current.predict(imageElement);
      // Devuelve la predicción con mayor probabilidad
      const best = predictions.reduce((a, b) => (a.probability > b.probability ? a : b));
      return {
        label: best.className,
        confidence: Math.round(best.probability * 100),
        all: predictions.map((p) => ({ label: p.className, confidence: Math.round(p.probability * 100) })),
      };
    } catch (err) {
      return null;
    }
  }, [modelState]);

  return { modelState, modelError, loadModel, predict };
}
