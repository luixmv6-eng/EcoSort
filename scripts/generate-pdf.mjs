import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import puppeteer from 'puppeteer-core';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// ── Leer markdown ────────────────────────────────────────────
const md = readFileSync(resolve(__dir, '../DOCUMENTO_TECNICO.md'), 'utf8');

marked.setOptions({ gfm: true, breaks: false });
const body = marked.parse(md);

// ── Plantilla HTML ───────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>Documento Técnico — EcoSort</title>
<style>
  /* ── Fuentes y reset ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --green:       #16a34a;
    --green-light: #f0fdf4;
    --green-mid:   #dcfce7;
    --green-dark:  #14532d;
    --slate:       #1e293b;
    --slate-mid:   #475569;
    --slate-light: #94a3b8;
    --border:      #e2e8f0;
    --code-bg:     #f8fafc;
    --white:       #ffffff;
  }
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: var(--slate);
    background: #fff;
    padding: 0;
    margin: 0;
  }

  /* ── Portada ── */
  .cover {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 72px 80px;
    background: linear-gradient(145deg, #14532d 0%, #16a34a 55%, #4ade80 100%);
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -80px; left: 120px;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }
  .cover-icon {
    font-size: 64pt;
    margin-bottom: 32px;
    display: block;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3));
  }
  .cover-badge {
    background: rgba(255,255,255,0.18);
    color: #fff;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.3);
    margin-bottom: 24px;
    display: inline-block;
  }
  .cover h1 {
    font-size: 38pt;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: -1px;
  }
  .cover-sub {
    font-size: 13pt;
    color: rgba(255,255,255,0.85);
    margin-bottom: 48px;
    max-width: 560px;
    line-height: 1.5;
  }
  .cover-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.25);
    width: 100%;
  }
  .cover-meta-row {
    display: flex;
    gap: 32px;
  }
  .cover-meta-item { color: rgba(255,255,255,0.75); font-size: 8.5pt; }
  .cover-meta-item strong { color: #fff; display: block; font-size: 9.5pt; }

  /* ── Contenido principal ── */
  .content {
    padding: 60px 80px 80px;
    max-width: 100%;
  }

  /* ── Headings ── */
  h1 { display: none; } /* Ya está en portada */
  h2 {
    font-size: 17pt;
    font-weight: 800;
    color: var(--green-dark);
    border-bottom: 3px solid var(--green);
    padding-bottom: 8px;
    margin: 48px 0 20px;
    page-break-after: avoid;
    letter-spacing: -0.3px;
  }
  h2:first-of-type { margin-top: 0; }
  h3 {
    font-size: 12pt;
    font-weight: 700;
    color: var(--slate);
    margin: 28px 0 10px;
    page-break-after: avoid;
  }
  h3::before {
    content: '';
    display: inline-block;
    width: 4px; height: 14px;
    background: var(--green);
    border-radius: 2px;
    margin-right: 8px;
    vertical-align: middle;
    position: relative; top: -1px;
  }
  h4 {
    font-size: 10.5pt;
    font-weight: 700;
    color: var(--slate-mid);
    margin: 20px 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 8.5pt;
  }

  /* ── Párrafos ── */
  p { margin-bottom: 12px; color: var(--slate); }
  p strong { color: var(--green-dark); }

  /* ── Blockquotes ── */
  blockquote {
    border-left: 4px solid var(--green);
    background: var(--green-light);
    padding: 12px 16px;
    margin: 16px 0;
    border-radius: 0 8px 8px 0;
  }
  blockquote p { margin: 0; color: #15803d; font-size: 9.5pt; }

  /* ── Listas ── */
  ul, ol {
    margin: 10px 0 14px 20px;
    padding-left: 4px;
  }
  li {
    margin-bottom: 5px;
    color: var(--slate);
  }
  li::marker { color: var(--green); }

  /* ── Tablas ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 24px;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  thead tr {
    background: var(--green);
    color: #fff;
  }
  thead th {
    padding: 10px 14px;
    text-align: left;
    font-weight: 700;
    font-size: 8.5pt;
    letter-spacing: 0.3px;
  }
  tbody tr:nth-child(even) { background: var(--green-light); }
  tbody tr:nth-child(odd)  { background: #fff; }
  tbody td {
    padding: 9px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
    line-height: 1.5;
  }
  tbody tr:hover { background: var(--green-mid); }

  /* ── Código ── */
  code {
    font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
    font-size: 8.5pt;
    background: var(--code-bg);
    border: 1px solid var(--border);
    padding: 1px 5px;
    border-radius: 4px;
    color: #0f766e;
  }
  pre {
    background: #0f172a;
    border-radius: 10px;
    padding: 20px 22px;
    margin: 14px 0 20px;
    overflow: hidden;
    page-break-inside: avoid;
  }
  pre code {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 8.5pt;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
    padding: 0;
  }

  /* ── Separadores ── */
  hr {
    border: none;
    border-top: 2px solid var(--border);
    margin: 36px 0;
  }

  /* ── TOC ── */
  .toc {
    background: var(--green-light);
    border: 2px solid var(--green-mid);
    border-radius: 12px;
    padding: 24px 28px;
    margin: 0 0 40px;
    page-break-inside: avoid;
  }
  .toc-title {
    font-size: 10pt;
    font-weight: 800;
    color: var(--green-dark);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .toc ol { margin: 0; padding-left: 20px; }
  .toc li {
    font-size: 9.5pt;
    color: var(--green-dark);
    margin-bottom: 4px;
    font-weight: 500;
  }
  .toc li span { color: var(--slate-light); font-size: 8.5pt; margin-left: 4px; font-weight: 400; }

  /* ── Pie de página ── */
  @page {
    size: A4;
    margin: 18mm 16mm 22mm;
    @bottom-center {
      content: "EcoSort · Documento Técnico v1.0.0 · " counter(page) " / " counter(pages);
      font-size: 8pt;
      color: #94a3b8;
      font-family: 'Segoe UI', sans-serif;
    }
  }
  @page :first { @bottom-center { content: ''; } margin: 0; }

  /* ── Saltos de página ── */
  .page-break { page-break-before: always; }
  h2 { page-break-before: auto; }
  h2.no-break { page-break-before: avoid; }

  /* ── Print ── */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .cover { min-height: 100vh; }
    a { color: inherit; text-decoration: none; }
  }
</style>
</head>
<body>

<!-- ═══════════════ PORTADA ═══════════════ -->
<div class="cover">
  <span class="cover-icon">♻️</span>
  <span class="cover-badge">Documento Técnico</span>
  <h1 style="display:block; font-size:38pt; font-weight:800; color:#fff; line-height:1.1; margin-bottom:12px; letter-spacing:-1px;">
    EcoSort
  </h1>
  <p class="cover-sub">
    Aplicación Web Progresiva de Separación de Residuos con Inteligencia Artificial<br/>
    para la ciudad de Cali, Valle del Cauca, Colombia
  </p>
  <div class="cover-meta">
    <div class="cover-meta-row">
      <div class="cover-meta-item"><strong>Versión</strong>1.0.0</div>
      <div class="cover-meta-item"><strong>Fecha</strong>Mayo 2026</div>
      <div class="cover-meta-item"><strong>Plataforma</strong>Web · PWA</div>
      <div class="cover-meta-item"><strong>Ciudad</strong>Cali, Colombia</div>
    </div>
    <div class="cover-meta-row">
      <div class="cover-meta-item"><strong>Framework</strong>React 18.3 + Vite 5.4</div>
      <div class="cover-meta-item"><strong>IA</strong>Google Teachable Machine + TensorFlow.js</div>
      <div class="cover-meta-item"><strong>Despliegue</strong>Vercel</div>
    </div>
  </div>
</div>

<!-- ═══════════════ CONTENIDO ═══════════════ -->
<div class="content">

<!-- Tabla de contenido -->
<div class="toc">
  <div class="toc-title">📋 Tabla de Contenido</div>
  <ol>
    <li>Descripción General <span>— Propósito y alcance de la aplicación</span></li>
    <li>Stack Tecnológico <span>— Librerías, versiones y roles</span></li>
    <li>Arquitectura de la Aplicación <span>— Estructura, árbol de archivos y flujo</span></li>
    <li>Motor de Reconocimiento de Residuos <span>— IA, MobileNet v2, pipeline de inferencia</span></li>
    <li>Capa de Datos <span>— Dataset estático y estructura</span></li>
    <li>Custom Hooks <span>— useCamera y useTeachableMachine</span></li>
    <li>Progressive Web App (PWA) <span>— Service Worker, caché, capacidades offline</span></li>
    <li>Interfaz de Usuario <span>— Sistema de diseño y animaciones</span></li>
    <li>Contexto Normativo (Cali) <span>— Marco legal y fuentes oficiales</span></li>
    <li>Seguridad y Privacidad <span>— Headers, HTTPS, procesamiento local</span></li>
    <li>Rendimiento <span>— Métricas del build de producción</span></li>
    <li>Actualización del Modelo de IA <span>— Proceso de reentrenamiento</span></li>
  </ol>
</div>

${body}

</div>
</body>
</html>`;

// ── Generar PDF ──────────────────────────────────────────────
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });

const outputPath = resolve(__dir, '../EcoSort_Documento_Tecnico.pdf');
await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '18mm', right: '16mm', bottom: '22mm', left: '16mm' },
  displayHeaderFooter: true,
  headerTemplate: `<div style="width:100%;font-size:7pt;font-family:Segoe UI,sans-serif;color:#94a3b8;padding:0 16mm;display:flex;justify-content:space-between;">
    <span>EcoSort – Documento Técnico</span><span>Cali, Colombia · 2026</span></div>`,
  footerTemplate: `<div style="width:100%;font-size:7pt;font-family:Segoe UI,sans-serif;color:#94a3b8;padding:0 16mm;display:flex;justify-content:space-between;align-items:center;">
    <span>Versión 1.0.0</span>
    <span style="color:#16a34a;font-weight:700;">♻ EcoSort</span>
    <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
  </div>`,
});

await browser.close();
console.log(`\n✅ PDF generado: EcoSort_Documento_Tecnico.pdf\n`);
