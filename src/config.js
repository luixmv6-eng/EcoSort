// ============================================================
// CONFIGURACIÓN DEL MODELO TEACHABLE MACHINE
// ============================================================
// Cuando exportes tu modelo de Teachable Machine:
//   1. Haz clic en "Export Model" dentro de Teachable Machine
//   2. Selecciona "TensorFlow.js" → "Upload (shareable link)"
//   3. Copia la URL y pégala en MODEL_URL abajo
//   4. Cambia IS_CONFIGURED a true
// ============================================================

export const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/LEjxSJqtn/';
export const IS_CONFIGURED = true;

// Clases del modelo (deben coincidir EXACTAMENTE con las de Teachable Machine)
export const CLASS_NAMES = ['Plastico', 'Vidrios', 'Papel', 'Metal', 'Carton', 'Basura Varia'];
