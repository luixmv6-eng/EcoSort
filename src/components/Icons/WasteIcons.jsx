// Íconos SVG dibujados a mano para cada categoría de residuo
// Estética artesanal, con trazo orgánico — identidad caleña

const base = "w-full h-full";

export function PlasticIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tapa */}
      <rect x="14" y="4" width="12" height="5" rx="2" fill={color} opacity="0.9"/>
      {/* Cuello */}
      <rect x="16" y="9" width="8" height="3" fill={color} opacity="0.7"/>
      {/* Cuerpo botella */}
      <path d="M11 12 Q9 16 9 22 Q9 33 11 35 Q15 37 20 37 Q25 37 29 35 Q31 33 31 22 Q31 16 29 12 Z"
        fill={color} opacity="0.18" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Línea etiqueta */}
      <path d="M12 21 Q20 19 28 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M13 25 Q20 23 27 25" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function GlassIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tapa del frasco */}
      <rect x="11" y="5" width="18" height="6" rx="3" fill={color} opacity="0.85"/>
      {/* Cuello */}
      <rect x="13" y="11" width="14" height="2.5" fill={color} opacity="0.6"/>
      {/* Cuerpo frasco */}
      <path d="M9 14 Q8 18 8 26 Q8 35 20 35 Q32 35 32 26 Q32 18 31 14 Z"
        fill={color} opacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Reflejo vidrio */}
      <path d="M12 18 Q13 26 12 30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      {/* Línea de nivel */}
      <path d="M10 22 Q20 20 30 22" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function PaperIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hoja con esquina doblada */}
      <path d="M8 5 H27 L32 10 V36 Q32 37 31 37 H9 Q8 37 8 36 Z"
        fill={color} opacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Esquina doblada */}
      <path d="M27 5 L27 10 L32 10" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" opacity="0.7"/>
      {/* Líneas de texto */}
      <line x1="13" y1="17" x2="27" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="13" y1="22" x2="27" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="13" y1="27" x2="22" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function MetalIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tapa superior */}
      <ellipse cx="20" cy="8" rx="10" ry="3.5" fill={color} opacity="0.85"/>
      {/* Cuerpo lata */}
      <rect x="10" y="8" width="20" height="25" fill={color} opacity="0.15" stroke={color} strokeWidth="1.8"/>
      {/* Tapa inferior */}
      <ellipse cx="20" cy="33" rx="10" ry="3.5" fill={color} opacity="0.4" stroke={color} strokeWidth="1.5"/>
      {/* Reflejo lateral */}
      <path d="M13 12 L13 30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      {/* Línea de etiqueta superior */}
      <line x1="10" y1="14" x2="30" y2="14" stroke={color} strokeWidth="1.2" opacity="0.5"/>
      <line x1="10" y1="27" x2="30" y2="27" stroke={color} strokeWidth="1.2" opacity="0.5"/>
    </svg>
  );
}

export function CardboardIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cuerpo caja */}
      <path d="M6 16 L20 10 L34 16 L34 35 L6 35 Z"
        fill={color} opacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Tapa izquierda */}
      <path d="M6 16 L13 12 L20 16" fill={color} opacity="0.3" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      {/* Tapa derecha */}
      <path d="M20 16 L27 12 L34 16" fill={color} opacity="0.2" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      {/* Línea central caja */}
      <line x1="20" y1="16" x2="20" y2="35" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Corrugado (líneas internas) */}
      <path d="M10 24 Q12 22 14 24 Q16 26 18 24" stroke={color} strokeWidth="1" opacity="0.4" fill="none"/>
    </svg>
  );
}

export function OrganicIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hoja principal */}
      <path d="M20 34 Q8 28 8 16 Q8 6 20 6 Q32 6 32 16 Q32 28 20 34 Z"
        fill={color} opacity="0.2" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Nervio central */}
      <path d="M20 34 Q18 24 20 6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Nervios laterales */}
      <path d="M20 14 Q14 12 10 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <path d="M20 14 Q26 12 30 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <path d="M20 20 Q13 18 9 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      <path d="M20 20 Q27 18 31 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      <path d="M20 26 Q15 25 12 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M20 26 Q25 25 28 27" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function MixedWasteIcon({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bolsa atada */}
      <path d="M14 12 Q12 8 20 6 Q28 8 26 12 L28 34 Q28 36 20 36 Q12 36 12 34 Z"
        fill={color} opacity="0.18" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Nudo bolsa */}
      <path d="M14 12 Q17 9 20 10 Q23 9 26 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Lazos del nudo */}
      <path d="M18 8 Q16 4 14 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M22 8 Q24 4 26 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Pliegues bolsa */}
      <path d="M15 20 Q17 18 15 26" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M25 20 Q23 18 25 26" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// Flor de guayacán como elemento decorativo
export function GuayacanFlower({ className = "w-8 h-8", color = "#fbbf24" }) {
  return (
    <svg className={`${base} ${className}`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0,72,144,216,288].map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180;
        const x = 20 + 11 * Math.cos(rad);
        const y = 20 + 11 * Math.sin(rad);
        return (
          <ellipse key={i}
            cx={x} cy={y} rx="5" ry="7"
            fill={color} opacity="0.85"
            transform={`rotate(${angle}, ${x}, ${y})`}
          />
        );
      })}
      <circle cx="20" cy="20" r="5" fill="#d97706"/>
      <circle cx="20" cy="20" r="2.5" fill="#fef3c7"/>
    </svg>
  );
}

// Mapa de iconos por categoría
export const WASTE_ICON_MAP = {
  Plastico:      PlasticIcon,
  Vidrios:       GlassIcon,
  Papel:         PaperIcon,
  Metal:         MetalIcon,
  Carton:        CardboardIcon,
  Organicos:     OrganicIcon,
  'Basura Varia': MixedWasteIcon,
};
