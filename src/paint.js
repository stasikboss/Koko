/* Koko paint: a tiny illustration engine.
   Every shape gets the same light from the top-left, a cool shadow, a soft gradient and an outline in a darker
   shade of its own colour. That is what makes 50 drawings read as one hand-made picture book. */

const INK = '#1E2B33';
const PAINT = { defs: [], grads: {}, n: 0 };
const f2 = n => +(+n).toFixed(2);

function hexRgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.replace(/./g, c => c + c); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbHex(c) { return '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
function mix(a, b, t) { const x = hexRgb(a), y = hexRgb(b); return rgbHex(x.map((v, i) => v + (y[i] - v) * t)); }

const TONES = {};
function tone(c) {
  if (TONES[c]) return TONES[c];
  const shade = mix(c, '#3F4A8C', 0.24);                 // shadows lean cool, like gouache on paper
  return (TONES[c] = { base: c, shade, light: mix(c, '#FFFDF4', 0.42), line: mix(shade, '#2A1E3A', 0.55) });
}
function grad(c) {
  if (PAINT.grads[c]) return PAINT.grads[c];
  const id = 'g' + (++PAINT.n).toString(36), t = tone(c);
  PAINT.defs.push(`<linearGradient id="${id}" x1="0" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="${t.light}"/><stop offset=".62" stop-color="${t.base}"/></linearGradient>`);
  return (PAINT.grads[c] = id);
}

/* A shaded shape. o.off: where the lit copy sits (bigger = deeper shadow), o.sw: outline width,
   o.inner: markup painted inside the shape (spots, stripes, windows), o.line: outline colour. */
function sh(d, c, o = {}) {
  const t = tone(c), id = 'p' + (++PAINT.n).toString(36), off = o.off || [-5, -6], sw = o.sw == null ? 2.6 : o.sw;
  PAINT.defs.push(`<clipPath id="${id}"><path d="${d}"/></clipPath>`);
  return `<g${o.cls ? ` class="${o.cls}"` : ''}${o.attrs || ''}><path d="${d}" fill="${t.shade}"/>` +
    `<g clip-path="url(#${id})"><path d="${d}" fill="url(#${grad(c)})" transform="translate(${off[0]} ${off[1]})"/>${o.inner || ''}</g>` +
    (sw ? `<path d="${d}" fill="none" stroke="${o.line || t.line}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>` : '') + '</g>';
}
const flat = (d, c, op) => `<path d="${d}" fill="${c}"${op != null ? ` opacity="${op}"` : ''}/>`;
const ink = (d, w = 2.4, c = INK, op) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${op != null ? ` opacity="${op}"` : ''}/>`;
const eye = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${INK}"/><circle cx="${f2(cx + r * 0.34)}" cy="${f2(cy - r * 0.36)}" r="${f2(r * 0.4)}" fill="#fff"/>`;
const blush = (cx, cy, rx = 5, ry = 3.4) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#FF8FA3" opacity=".55"/>`;
const gloss = (cx, cy, rx, ry, rot = 0, op = 0.55) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const ground = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gsh)"/>`;

/* Path builders */
function C(cx, cy, r) { return `M${f2(cx - r)} ${cy}a${r} ${r} 0 1 0 ${f2(2 * r)} 0a${r} ${r} 0 1 0 ${f2(-2 * r)} 0Z`; }
function E(cx, cy, rx, ry, rot = 0) {
  if (!rot) return `M${f2(cx - rx)} ${cy}a${rx} ${ry} 0 1 0 ${f2(2 * rx)} 0a${rx} ${ry} 0 1 0 ${f2(-2 * rx)} 0Z`;
  const a = rot * Math.PI / 180, dx = rx * Math.cos(a), dy = rx * Math.sin(a);
  return `M${f2(cx - dx)} ${f2(cy - dy)}A${rx} ${ry} ${rot} 1 0 ${f2(cx + dx)} ${f2(cy + dy)}A${rx} ${ry} ${rot} 1 0 ${f2(cx - dx)} ${f2(cy - dy)}Z`;
}
function R(x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); return `M${f2(x + r)} ${y}h${f2(w - 2 * r)}a${r} ${r} 0 0 1 ${r} ${r}v${f2(h - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${r}h${f2(-(w - 2 * r))}a${r} ${r} 0 0 1 ${-r} ${-r}v${f2(-(h - 2 * r))}a${r} ${r} 0 0 1 ${r} ${-r}Z`; }
/* Mirror a path left-right around x = cx (only absolute M L Q C H V Z commands with numbers). */
function mirror(d, cx = 50) {
  return d.replace(/([MLQCTSHVZ])([^MLQCTSHVZ]*)/gi, (m, cmd, args) => {
    const nums = (args.match(/-?\d*\.?\d+/g) || []).map(Number);
    if (cmd === 'H') return 'H' + nums.map(x => f2(2 * cx - x)).join(' ');
    if (cmd === 'V' || cmd === 'Z' || cmd === 'z') return cmd + nums.join(' ');
    return cmd + nums.map((v, i) => (i % 2 === 0 ? f2(2 * cx - v) : v)).join(' ');
  });
}

/* Symbols are registered here and assembled into one hidden sprite. */
const SYMS = [];
function sym(id, body, vb = '0 0 100 100') { SYMS.push(`<symbol id="${id}" viewBox="${vb}">${body}</symbol>`); }
function spriteMarkup() {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>` +
    `<radialGradient id="gsh"><stop offset="0" stop-color="#1B2440" stop-opacity=".26"/><stop offset="1" stop-color="#1B2440" stop-opacity="0"/></radialGradient>` +
    PAINT.defs.join('') + SYMS.join('') + `</defs></svg>`;
}

if (typeof module !== 'undefined') module.exports = { tone, mix, sh, flat, ink, eye, C, E, R, mirror, sym, spriteMarkup, PAINT, SYMS };
