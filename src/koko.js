/* Koko, rigged. Separate parts (eyes, lids, pupils, brows, beak, wings, crest, tail) so the game can make him
   look at what he talks about, point with a wing, blink, breathe and change his face. */

const KOKO = {
  vb: '-40 -20 480 560',
  green: '#2FB872',
  head: [200, 178],
  shoulderL: [134, 262], shoulderR: [266, 262], restL: 101.8, restR: 78.2,
  // tap targets for the body round, in Koko's own units
  zones: {
    head: [{ x: 200, y: 128, rx: 78, ry: 62 }],
    eyes: [{ x: 200, y: 168, rx: 80, ry: 36 }],
    wings: [{ x: 104, y: 348, rx: 46, ry: 70 }, { x: 296, y: 348, rx: 46, ry: 70 }],
    feet: [{ x: 200, y: 452, rx: 70, ry: 26 }],
    tail: [{ x: 152, y: 494, rx: 50, ry: 32 }]
  },
  // where worn and held things sit: centre x, y, size (100 = one symbol), rotation
  place: {
    sock: { head: { x: 200, y: 58, s: 118, r: -12 }, foot: { x: 232, y: 442, s: 96, r: 0 } },
    hat: { foot: { x: 236, y: 428, s: 124, r: 6 }, head: { x: 200, y: 66, s: 160, r: -4 } },
    shoe: { hand: { x: 330, y: 404, s: 120, r: -26 }, foot: { x: 236, y: 448, s: 106, r: 0 } },
    mitten: { foot: { x: 236, y: 440, s: 102, r: 0 }, hand: { x: 328, y: 404, s: 114, r: -20 } },
    glasses: { foot: { x: 236, y: 448, s: 124, r: 0 }, eyes: { x: 200, y: 166, s: 190, r: 0 } },
    mouth: { x: 276, y: 240, s: 120, r: 0 },
    wing: { x: 358, y: 366, s: 136, r: -8 },
    wingL: { x: 42, y: 366, s: 136, r: 8 },
    feet: { x: 200, y: 432, s: 330, r: 0 },
    bowl: { x: 56, y: 410, s: 130, r: 0 },
    balloon: { x: 352, y: 300, s: 170, r: 10 },
    ground: { x: 262, y: 516, s: 96, r: 0 }
  }
};

const KOKO_PARTS = (() => {
  const G = KOKO.green, SW = 4.5, OFF = [-12, -14];
  const T1 = 'M178 392 Q140 440 114 506 Q128 518 142 506 Q170 454 198 404Z';
  const T2 = 'M192 398 Q168 452 148 518 Q164 526 174 512 Q192 458 210 404Z';
  const T3 = 'M208 400 Q198 452 186 510 Q200 518 208 502 Q218 452 226 404Z';
  const tail = `<g class="tail">` + sh(T1, '#F2545B', { sw: 4, off: [-8, -8] }) + sh(T2, '#3A86FF', { sw: 4, off: [-8, -8] }) + sh(T3, '#FFC93C', { sw: 4, off: [-8, -8] }) +
    ink('M186 404 Q160 452 130 506 M200 406 Q180 458 160 516 M216 406 Q206 456 196 508', 2.4, '#fff', 0.45) + `</g>`;
  /* Koko's own little perch stand, so he looks at home in every world */
  const branch = `<g class="branch">` + ground(200, 540, 200, 14) +
    sh('M84 458 L54 532 Q52 538 60 538 L74 538 L102 462Z', '#8A5E3B', { sw: 3.5, off: [-4, -4] }) +
    sh('M316 458 L346 532 Q348 538 340 538 L326 538 L298 462Z', '#8A5E3B', { sw: 3.5, off: [-4, -4] }) +
    sh(E(56, 538, 26, 7), '#7A5234', { sw: 3, off: [-3, -3] }) + sh(E(344, 538, 26, 7), '#7A5234', { sw: 3, off: [-3, -3] }) +
    sh('M24 446 Q200 434 376 446 Q384 456 376 466 Q200 474 24 466 Q16 456 24 446Z', '#A87148', { sw: 4, off: [-6, -8],
      inner: ink('M60 455 Q120 450 170 455 M240 458 Q300 454 350 457', 2.4, '#7A4E2C', 0.55) }) +
    sh(E(24, 456, 7, 10), '#E2B98C', { sw: 3, off: [-2, -2], inner: `<ellipse cx="24" cy="456" rx="3" ry="5" fill="none" stroke="#B98A5E" stroke-width="1.6"/>` }) +
    sh(E(376, 456, 7, 10), '#E2B98C', { sw: 3, off: [-2, -2], inner: `<ellipse cx="376" cy="456" rx="3" ry="5" fill="none" stroke="#B98A5E" stroke-width="1.6"/>` }) +
    sh(E(64, 436, 22, 10, -28), '#6CC46B', { sw: 3.5, off: [-5, -5] }) + sh(E(334, 434, 22, 10, 24), '#6CC46B', { sw: 3.5, off: [-5, -5] }) + `</g>`;
  const WING = 'M134 258 Q80 296 84 372 Q88 422 122 432 Q142 406 150 360 Q158 298 134 258Z';
  const PRIM = 'M66 378 Q94 434 126 444 L160 366 Q118 386 66 378Z';
  const wingL = `<g class="wing wing-l">` + sh(WING, '#22A866', { sw: SW, off: [-8, -10], inner: flat(PRIM, '#3A86FF') + ink('M104 390 Q112 412 122 426 M118 380 Q126 400 132 416', 3, '#fff', 0.35) }) + `</g>`;
  const wingR = `<g class="wing wing-r">` + sh(mirror(WING, 200), '#22A866', { sw: SW, off: [-8, -10], inner: flat(mirror(PRIM, 200), '#3A86FF') + ink(mirror('M104 390 Q112 412 122 426 M118 380 Q126 400 132 416', 200), 3, '#fff', 0.35) }) + `</g>`;
  const FOOT = 'M148 452 Q148 436 172 434 Q196 436 198 452 Q192 464 172 462 Q154 464 148 452Z';
  const feet = `<g class="feet">` + sh(FOOT, '#FFA94D', { sw: 3.5, off: [-4, -5] }) + sh(mirror(FOOT, 200), '#FFA94D', { sw: 3.5, off: [-4, -5] }) +
    ink('M165 451 V460 M180 451 V460 M220 451 V460 M235 451 V460', 2.6, tone('#FFA94D').line) + `</g>`;
  const body = sh(E(200, 330, 92, 104), G, { sw: SW, off: OFF }) +
    sh(E(200, 358, 60, 74), '#FFE59A', { sw: 0, off: [-8, -10], inner: ink('M168 326 q16 12 32 0 q16 12 32 0 M174 358 q13 10 26 0 q13 10 26 0 M182 390 q9 8 18 0 q9 8 18 0', 4, tone('#FFE59A').shade, 0.8) });
  const crest = `<g class="crest">` + sh('M188 104 Q148 62 150 20 Q178 38 206 96Z', '#F2545B', { sw: 4, off: [-6, -6] }) +
    sh('M196 100 Q188 42 214 6 Q228 50 216 100Z', '#FF9F1C', { sw: 4, off: [-6, -6] }) + sh('M208 104 Q240 58 272 44 Q258 86 224 110Z', '#FFC93C', { sw: 4, off: [-6, -6] }) + `</g>`;
  PAINT.defs.push(`<clipPath id="kk-l"><circle cx="162" cy="166" r="27"/></clipPath><clipPath id="kk-r"><circle cx="238" cy="166" r="27"/></clipPath>`);
  const eyeOf = (x, side) => `<g class="eye eye-${side}">` +
    `<g class="e-open">` + sh(C(x, 166, 28), '#FFFFFF', { sw: 3.5, off: [-4, -5] }) +
    `<g class="pup"><circle cx="${x}" cy="168" r="16" fill="#3B2A1E"/><circle cx="${x}" cy="168" r="8.5" fill="#120C08"/><circle cx="${x - 5.5}" cy="161.5" r="5.4" fill="#fff"/><circle cx="${x + 5}" cy="174" r="2.3" fill="#fff"/></g>` +
    `<g clip-path="url(#kk-${side})"><rect class="lid lid-${side}" x="${x - 30}" y="137" width="60" height="60" fill="#25A262"/></g></g>` +
    `<g class="e-happy">${ink(`M${x - 24} 172 Q${x} 146 ${x + 24} 172`, 7)}</g>` +
    `<g class="e-shut">${ink(`M${x - 24} 164 Q${x} 182 ${x + 24} 164`, 6)}</g></g>`;
  const head = `<g class="head"><g class="hb">` + crest +
    sh(C(200, 178, 90), G, { sw: SW, off: OFF, inner: flat(E(200, 198, 74, 58), '#7BE2B0', 0.42) }) +
    blush(126, 214, 17, 11.5) + blush(274, 214, 17, 11.5) +
    `<g class="brow brow-l">${ink('M138 126 Q160 113 184 122', 7, '#16784C')}</g><g class="brow brow-r">${ink('M262 126 Q240 113 216 122', 7, '#16784C')}</g>` +
    eyeOf(162, 'l') + eyeOf(238, 'r') +
    `<path class="mouth" d="${E(203, 242, 19, 15)}" fill="#7A2E2E"/>` +
    `<g class="jaw">` + sh('M180 232 Q200 224 220 232 Q216 258 200 265 Q184 258 180 232Z', '#F08A24', { sw: 3.5, off: [-4, -5] }) + `</g>` +
    sh('M172 206 C174 190 226 190 228 206 C232 232 218 256 204 270 C201 258 198 250 190 244 C178 236 171 222 172 206Z', '#FFB238',
      { sw: 3.5, off: [-6, -7], inner: gloss(188, 204, 9, 4.5, -18, 0.55) + `<circle cx="190" cy="214" r="2.6" fill="#B36A18"/><circle cx="210" cy="214" r="2.6" fill="#B36A18"/>` }) +
    `<path class="tear" d="M126 196 Q118 214 124 222 Q132 214 126 196Z" fill="#8FD3F5" stroke="#4E8FB8" stroke-width="2"/>` +
    `</g></g>`;
  const marks = `<g class="qmarks" fill="${INK}" style="font-family:var(--display);font-weight:700" direction="ltr"><text x="290" y="70" font-size="64">?</text><text x="336" y="30" font-size="42">?</text></g>` +
    `<g class="zzz" fill="#7C8FC4" stroke="#fff" stroke-width="6" paint-order="stroke" stroke-linejoin="round" style="font-family:var(--display);font-weight:700" direction="ltr"><text x="286" y="66" font-size="46">Z</text><text x="322" y="30" font-size="34">z</text><text x="350" y="0" font-size="24">z</text></g>`;
  const zones = `<g class="zones">` + Object.entries(KOKO.zones).map(([k, list]) => list.map(z =>
    `<ellipse class="zone" data-zone="${k}" cx="${z.x}" cy="${z.y}" rx="${z.rx}" ry="${z.ry}"/>`).join('')).join('') + `</g>`;
  return {
    zones,
    back: `<g class="act"><g class="breath"><g class="wear-back"></g>${tail}</g></g>`,
    branch,
    front: `<g class="act"><g class="breath">${body}${feet}${wingL}${wingR}${head}<g class="wear"></g>${marks}</g></g>`
  };
})();

function kokoMarkup() {
  return `<svg class="koko" viewBox="${KOKO.vb}" preserveAspectRatio="xMidYMax meet" data-mood="idle" aria-hidden="true" focusable="false">${KOKO_PARTS.back}${KOKO_PARTS.branch}${KOKO_PARTS.front}${KOKO_PARTS.zones}</svg>`;
}
