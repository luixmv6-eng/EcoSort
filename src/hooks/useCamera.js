import { useRef, useState, useCallback, useEffect } from 'react';

export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraState, setCameraState] = useState('idle'); // idle | requesting | active | error
  const [errorMsg, setErrorMsg] = useState('');

  const startCamera = useCallback(async () => {
    setCameraState('requesting');
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState('active');
    } catch (err) {
      const msg =
        err.name === 'NotAllowedError'
          ? 'Permiso de cámara denegado. Permite el acceso en la configuración de tu navegador.'
          : err.name === 'NotFoundError'
          ? 'No se encontró ninguna cámara en este dispositivo.'
          : 'Error al iniciar la cámara: ' + err.message;
      setErrorMsg(msg);
      setCameraState('error');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraState('idle');
  }, []);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || cameraState !== 'active') return null;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas;
  }, [cameraState]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return { videoRef, cameraState, errorMsg, startCamera, stopCamera, captureFrame };
}
