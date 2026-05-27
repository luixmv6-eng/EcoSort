// Genera íconos PNG válidos para la PWA usando solo Node.js built-ins
import { writeFileSync, mkdirSync } from 'fs';
import { deflateSync } from 'zlib';

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n);
  return b;
}

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const payload = Buffer.concat([t, data]);
  return Buffer.concat([u32(data.length), payload, u32(crc32(payload))]);
}

// Paleta: fondo verde #16a34a, circulo interno blanco + ♻ simplificado como texto
function createPNG(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = chunk('IHDR', Buffer.concat([
    u32(size), u32(size),
    Buffer.from([8, 2, 0, 0, 0])  // 8-bit RGB truecolor
  ]));

  // Dibuja pixel por pixel: círculo verde con ♻ simplificado
  const cx = size / 2, cy = size / 2, r = size / 2;
  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = [0]; // filtro None
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > r) {
        // Transparente (fuera del círculo) → blanco para PNG-24
        row.push(0xf0, 0xfd, 0xf4);
      } else {
        // Fondo verde
        let pr = 0x16, pg = 0xa3, pb = 0x4a;

        // Símbolo ♻ simplificado: 3 flechas curvas aproximadas con manchas blancas
        const nx = dx / r, ny = dy / r;
        const angle = Math.atan2(ny, nx);
        const nd = dist / r;

        // Anillo blanco (símbolo reciclaje)
        if (nd > 0.28 && nd < 0.62) {
          const arc = (angle + Math.PI * 2) % (Math.PI * 2 / 3);
          if (arc > 0.2 && arc < 1.5) {
            pr = 0xff; pg = 0xff; pb = 0xff;
          }
        }
        // Puntas de flecha (triángulos pequeños)
        for (let a = 0; a < 3; a++) {
          const ta = (a * Math.PI * 2) / 3 - Math.PI / 6;
          const ax = Math.cos(ta) * 0.45, ay = Math.sin(ta) * 0.45;
          const d2 = Math.sqrt((nx - ax) ** 2 + (ny - ay) ** 2);
          if (d2 < 0.13) { pr = 0xff; pg = 0xff; pb = 0xff; }
        }

        row.push(pr, pg, pb);
      }
    }
    rows.push(Buffer.from(row));
  }

  const rawData = Buffer.concat(rows);
  const compressed = deflateSync(rawData, { level: 9 });
  const idat = chunk('IDAT', compressed);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

mkdirSync('public', { recursive: true });
writeFileSync('public/icon-192.png',        createPNG(192));
writeFileSync('public/icon-512.png',        createPNG(512));
writeFileSync('public/apple-touch-icon.png', createPNG(180));
console.log('✅ Íconos generados: icon-192.png, icon-512.png, apple-touch-icon.png');
