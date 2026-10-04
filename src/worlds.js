/* Koko worlds: cut-paper dioramas. Backgrounds are soft, pale and outline-free so the things being learned
   (and Koko) are the only vivid, outlined shapes on screen. 1000x1000, anchored to the bottom:
   phones see roughly x 270-730, tablets see the full width from about y 320 down. */

let WID = 0;
const wid = p => p + (++WID);
const layer = (d, c, dy = 9, op = 0.14) => `<path d="${d}" fill="#22305C" opacity="${op}" transform="translate(0 ${dy})"/><path d="${d}" fill="${c}"/>`;
function skyFill(a, b) { const id = wid('sky'); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1000" height="1000" fill="url(#${id})"/>`; }
function sunGlow(x, y, r = 70, c = '#FFE27A') { const id = wid('sun'); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#FFF6CF" stop-opacity=".9"/><stop offset="1" stop-color="#FFF6CF" stop-opacity="0"/></radialGradient></defs><g class="sun"><circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="url(#${id})"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/></g>`; }
const cloud = (x, y, s = 1, op = 1) => `<g class="cloud" style="--dx:${Math.round(30 + s * 30)}px" opacity="${op}"><g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-90 20 Q-96 -6 -64 -10 Q-56 -44 -18 -38 Q4 -66 40 -44 Q78 -50 82 -14 Q108 -8 100 20Z" fill="#22305C" opacity=".08" transform="translate(0 8)"/>` +
  `<path d="M-90 20 Q-96 -6 -64 -10 Q-56 -44 -18 -38 Q4 -66 40 -44 Q78 -50 82 -14 Q108 -8 100 20Z" fill="#FFFFFF"/></g></g>`;
function tree(x, y, s = 1, c1 = '#8CCB86', c2 = '#77BC74', trunk = '#B98A62') {
  return `<g transform="translate(${x} ${y}) scale(${s})">` + layer('M-14 0 Q-12 -70 -8 -110 H8 Q12 -70 14 0Z', trunk, 6) +
    layer('M-96 -110 Q-110 -170 -60 -190 Q-60 -250 0 -256 Q60 -250 62 -192 Q112 -170 98 -110 Q90 -78 50 -84 Q20 -64 -14 -80 Q-56 -66 -78 -84 Q-94 -92 -96 -110Z', c2, 10) +
    `<path d="M-70 -150 Q-64 -200 -10 -214 Q40 -220 56 -182 Q20 -196 -16 -186 Q-52 -176 -70 -150Z" fill="${c1}"/></g>`;
}
const bush = (x, y, s = 1, c = '#8ACB7E') => `<g transform="translate(${x} ${y}) scale(${s})">` + layer('M-70 0 Q-80 -40 -44 -46 Q-34 -80 4 -72 Q36 -86 54 -52 Q84 -48 78 0Z', c, 7) + `</g>`;
const flower = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V30" stroke="#6FAE6C" stroke-width="5" stroke-linecap="round"/><g fill="${c}"><circle cx="0" cy="-11" r="8"/><circle cx="10" cy="-3" r="8"/><circle cx="6" cy="9" r="8"/><circle cx="-6" cy="9" r="8"/><circle cx="-10" cy="-3" r="8"/></g><circle r="6" fill="#FFE27A"/></g>`;
const fence = (y, x0 = 0, x1 = 1000, c = '#E3CBA8') => `<g fill="${c}">${Array.from({ length: Math.ceil((x1 - x0) / 56) }, (_, i) => `<rect x="${x0 + i * 56}" y="${y - 70}" width="18" height="78" rx="8"/>`).join('')}<rect x="${x0}" y="${y - 52}" width="${x1 - x0}" height="12" rx="6"/><rect x="${x0}" y="${y - 22}" width="${x1 - x0}" height="12" rx="6"/></g>`;
const grassTufts = (y, c = '#8CC97F', n = 14) => `<g fill="${c}">${Array.from({ length: n }, (_, i) => `<path d="M${i * (1000 / n) + 24} ${y} l8 -26 6 26 7 -18 5 18Z"/>`).join('')}</g>`;
const hills = (far, mid, near, y = 640) =>
  layer(`M0 ${y} Q180 ${y - 80} 380 ${y - 30} Q580 ${y + 10} 760 ${y - 60} Q900 ${y - 90} 1000 ${y - 50} V1000 H0Z`, far, 10, 0.08) +
  layer(`M0 ${y + 70} Q240 ${y + 10} 520 ${y + 50} Q780 ${y + 90} 1000 ${y + 30} V1000 H0Z`, mid, 10, 0.1) +
  layer(`M0 ${y + 150} Q260 ${y + 120} 500 ${y + 140} Q760 ${y + 160} 1000 ${y + 130} V1000 H0Z`, near, 10, 0.12);

const WORLDS = {
  /* start screen: Koko's tree house */
  home: () => skyFill('#B9E1EE', '#EEF8F1') + sunGlow(620, 380, 62) + cloud(380, 420, 0.8) + cloud(760, 300, 1) + cloud(220, 560, 0.6, 0.9) +
    hills('#D3EAD8', '#BCDDC3', '#A9D3AE', 650) +
    `<g transform="translate(800 840) scale(.8)">` + layer('M-60 0 Q-50 -160 -40 -330 H40 Q50 -160 60 0Z', '#B98A62', 8) +
    layer('M-210 -300 Q-230 -400 -140 -430 Q-130 -540 -10 -550 Q120 -548 140 -440 Q230 -410 210 -300 Q190 -240 110 -256 Q50 -220 -20 -248 Q-110 -222 -160 -256 Q-206 -262 -210 -300Z', '#86C37F', 12) +
    `<path d="M-150 -380 Q-130 -470 -20 -490 Q80 -500 110 -440 Q30 -470 -40 -452 Q-110 -432 -150 -380Z" fill="#9AD293"/>` +
    layer('M-26 -150 Q-26 -196 0 -196 Q26 -196 26 -150 V-96 H-26Z', '#7A5434', 5) + `<circle cx="14" cy="-128" r="4" fill="#E8C27A"/>` +
    layer('M-24 -260 a24 24 0 1 1 48 0 a24 24 0 1 1 -48 0Z', '#FFE9B0', 5) + `<path d="M0 -284 V-236 M-24 -260 H24" stroke="#B98A62" stroke-width="5"/></g>` +
    flower(330, 880, '#FFB7C9', 0.9) + flower(400, 920, '#FFFFFF', 0.8) + flower(610, 900, '#FFD36B', 0.85) + flower(560, 950, '#C7B5FF', 0.8),

  farm: () => skyFill('#C1E5F0', '#FFF5E2') + sunGlow(360, 400, 58) + cloud(620, 330, 0.9) + cloud(250, 470, 0.6, 0.9) +
    layer('M0 640 Q200 580 420 620 Q620 660 800 600 Q920 570 1000 590 V1000 H0Z', '#D6EBC8', 10, 0.08) +
    `<g transform="translate(560 470)">` + layer('M0 90 L100 14 L200 90 V260 H0Z', '#E58A73', 8) + `<path d="M-16 96 L100 4 L216 96" fill="none" stroke="#B9584A" stroke-width="20" stroke-linejoin="round"/>` +
    `<rect x="62" y="150" width="76" height="110" fill="#FFF3E2"/><path d="M62 150 L138 260 M138 150 L62 260" stroke="#E58A73" stroke-width="9"/><rect x="80" y="76" width="40" height="36" rx="5" fill="#FFF3E2"/></g>` +
    `<g transform="translate(830 520)">` + layer('M0 0 H74 V210 H0Z M-6 34 Q37 -30 80 34Z', '#CFDAE2', 8) + `<path d="M0 64 H74 M0 116 H74 M0 168 H74" stroke="#B8C6D0" stroke-width="5"/><path d="M-6 34 Q37 -30 80 34Z" fill="#B9584A"/></g>` +
    layer('M0 720 Q260 670 520 706 Q780 742 1000 690 V1000 H0Z', '#BCDEA6', 10, 0.1) +
    `<g transform="translate(250 730)">` + layer('M-74 40 Q-64 -40 0 -46 Q64 -40 74 40Z', '#F2D17A', 6) + `<path d="M-40 0 Q0 -14 40 0 M-52 22 Q0 6 52 22" stroke="#E0B95C" stroke-width="5" fill="none"/></g>` +
    fence(780, 0, 1000, '#EBD5B4') +
    layer('M0 800 Q260 770 500 786 Q760 802 1000 774 V1000 H0Z', '#A7D592', 8, 0.12) + grassTufts(860, '#93C882') +
    flower(330, 880, '#FFFFFF', 0.8) + flower(690, 900, '#FFD36B', 0.8),

  bedroom: () => `<rect width="1000" height="1000" fill="#E9E3F6"/>` +
    `<g fill="#DCD2F0">${Array.from({ length: 48 }, (_, i) => `<circle cx="${(i % 8) * 130 + (Math.floor(i / 8) % 2 ? 65 : 0) + 20}" cy="${Math.floor(i / 8) * 130 + 40}" r="9"/>`).join('')}</g>` +
    `<g transform="translate(300 230)">` + layer('M-16 -16 H226 V236 H-16Z', '#FFFFFF', 8) + `<rect width="210" height="220" rx="8" fill="#C4E6F2"/>` + cloud(120, 120, 0.5) +
    `<path d="M105 0 V220 M0 110 H210" stroke="#fff" stroke-width="12"/>` + layer('M-46 -34 Q-12 100 -40 270 H22 Q42 100 22 -34Z', '#F6B6C6', 6) + layer('M256 -34 Q222 100 250 270 H188 Q168 100 188 -34Z', '#F6B6C6', 6) +
    `<rect x="-60" y="-48" width="330" height="18" rx="9" fill="#C69A72"/></g>` +
    `<g transform="translate(690 380)">` + layer('M0 0 H200 V420 H0Z', '#D9AD82', 10) + `<rect x="14" y="16" width="80" height="360" rx="8" fill="#E5BE96"/><rect x="106" y="16" width="80" height="360" rx="8" fill="#E5BE96"/><circle cx="82" cy="200" r="8" fill="#9C6B43"/><circle cx="118" cy="200" r="8" fill="#9C6B43"/></g>` +
    `<g transform="translate(110 600)">` + layer('M0 0 H160 V200 H0Z', '#A7D3EC', 8) + `<rect x="12" y="18" width="136" height="50" rx="6" fill="#BCE0F2"/><rect x="12" y="80" width="136" height="50" rx="6" fill="#BCE0F2"/><rect x="12" y="142" width="136" height="46" rx="6" fill="#BCE0F2"/></g>` +
    `<rect y="790" width="1000" height="210" fill="#EED5B6"/><g stroke="#E2C59F" stroke-width="5">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 120 + 40} 790 V1000"/>`).join('')}</g>` +
    layer('M180 900 A320 66 0 1 0 820 900 A320 66 0 1 0 180 900Z', '#F6C3CF', 6, 0.1) + `<ellipse cx="500" cy="900" rx="250" ry="46" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="20 18" opacity=".7"/>`,

  kitchen: () => `<rect width="1000" height="1000" fill="#DCF1E8"/>` +
    `<g opacity=".8"><rect y="470" width="1000" height="230" fill="#F2FAF6"/><g stroke="#D3EBE0" stroke-width="4">${Array.from({ length: 17 }, (_, i) => `<path d="M${i * 60} 470 V700"/>`).join('')}${Array.from({ length: 4 }, (_, i) => `<path d="M0 ${470 + i * 60} H1000"/>`).join('')}</g></g>` +
    `<g transform="translate(320 200)">` + layer('M-12 -12 H192 V182 H-12Z', '#FFFFFF', 8) + `<rect width="180" height="170" rx="8" fill="#BFE5F3"/>` + sunGlow(130, 56, 22) + `<path d="M90 0 V170 M0 85 H180" stroke="#fff" stroke-width="10"/><rect x="-24" y="172" width="228" height="16" rx="8" fill="#C69A72"/></g>` +
    `<g transform="translate(560 330)"><rect x="0" y="0" width="300" height="14" rx="7" fill="#C69A72"/>` +
    `<rect x="24" y="-62" width="48" height="62" rx="10" fill="#FFE1A3"/><rect x="20" y="-74" width="56" height="14" rx="6" fill="#F4A6A6"/>` +
    `<rect x="100" y="-78" width="54" height="78" rx="12" fill="#C9DEFF"/><rect x="96" y="-90" width="62" height="16" rx="6" fill="#9DBEF5"/>` +
    `<rect x="186" y="-54" width="46" height="54" rx="10" fill="#FFD2DE"/><rect x="182" y="-66" width="54" height="14" rx="6" fill="#CFB8F2"/></g>` +
    `<g transform="translate(150 260)"><circle r="56" fill="#fff"/><circle r="46" fill="#FFF8E8"/><path d="M0 -28 V0 L22 14" stroke="#5F7880" stroke-width="7" stroke-linecap="round" fill="none"/></g>` +
    layer('M0 700 H1000 V790 H0Z', '#E6C392', 8, 0.12) + `<rect y="690" width="1000" height="20" rx="6" fill="#F3DCB4"/>` +
    `<g stroke="#D7B07E" stroke-width="5">${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 180 + 90} 712 V790"/>`).join('')}</g>` +
    `<rect y="790" width="1000" height="210" fill="#F7EBD3"/><g fill="#F0DFC0">${Array.from({ length: 20 }, (_, i) => `<rect x="${(i % 10) * 100 + (Math.floor(i / 10) ? 50 : 0)}" y="${790 + Math.floor(i / 10) * 100}" width="50" height="100"/>`).join('')}</g>`,

  garden: () => skyFill('#B8E2F1', '#F3FBF0') + sunGlow(700, 360, 54) + cloud(320, 330, 0.7) +
    `<g fill="none" stroke-width="34" opacity=".28" transform="translate(500 820)">${['#F2545B', '#FF9F1C', '#FFD43B', '#3DB760', '#3A86FF', '#9B5DE5'].map((c, i) => `<path d="M${-(420 - i * 34)} 0 A${420 - i * 34} ${420 - i * 34} 0 0 1 ${420 - i * 34} 0" stroke="${c}"/>`).join('')}</g>` +
    layer('M0 720 Q220 664 480 700 Q760 738 1000 690 V1000 H0Z', '#C2E5B2', 10, 0.1) +
    bush(150, 760, 1.1, '#9FD493') + bush(860, 760, 1.2, '#9FD493') +
    layer('M0 800 Q260 776 500 790 Q760 806 1000 780 V1000 H0Z', '#A9D99A', 8, 0.12) +
    flower(300, 830, '#FF9FAA') + flower(360, 878, '#FFE07A', 0.9) + flower(650, 850, '#B7A2FF') + flower(710, 896, '#FFB37A', 0.9) + flower(520, 940, '#FFFFFF', 0.8),

  meadow: () => skyFill('#A9DCF2', '#F5FBEA') + sunGlow(660, 380, 78) + cloud(330, 360, 0.8) + cloud(560, 250, 0.5, 0.9) +
    layer('M0 660 Q300 590 560 640 Q800 690 1000 620 V1000 H0Z', '#C7EAB5', 10, 0.08) +
    tree(150, 760, 1.15) + tree(880, 740, 1.05) +
    layer('M0 780 Q300 744 520 772 Q780 800 1000 760 V1000 H0Z', '#ABDC97', 8, 0.12) + grassTufts(870, '#96CE84', 16) +
    `<g class="butterfly" transform="translate(380 540)"><path d="M0 0 Q-30 -34 -36 -6 Q-30 14 0 0 Q30 14 36 -6 Q30 -34 0 0Z" fill="#FFB7D5"/><path d="M0 -10 V12" stroke="#7A6A7E" stroke-width="4" stroke-linecap="round"/></g>` +
    `<g class="butterfly b2" transform="translate(640 500) scale(.8)"><path d="M0 0 Q-30 -34 -36 -6 Q-30 14 0 0 Q30 14 36 -6 Q30 -34 0 0Z" fill="#FFE07A"/><path d="M0 -10 V12" stroke="#7A6A7E" stroke-width="4" stroke-linecap="round"/></g>`,

  /* food: a picnic in the park */
  park: () => skyFill('#B6E0F0', '#F4FAEC') + sunGlow(340, 380, 56) + cloud(640, 320, 0.8) +
    layer('M0 650 Q240 600 500 630 Q760 660 1000 610 V1000 H0Z', '#CBE8BA', 10, 0.08) +
    tree(200, 720, 1.1, '#93CF8A', '#7FC27A') + tree(820, 700, 1.25, '#93CF8A', '#7FC27A') +
    layer('M560 690 A120 26 0 1 0 800 690 A120 26 0 1 0 560 690Z', '#A9DCF0', 4, 0.1) +
    layer('M0 760 Q280 730 520 752 Q780 772 1000 742 V1000 H0Z', '#B3DDA0', 8, 0.12) +
    `<g transform="translate(500 900) skewX(-18)">` + layer('M-230 -60 H230 V60 H-230Z', '#FFF3EA', 6) +
    `<g fill="#F7B9B9" opacity=".75">${Array.from({ length: 6 }, (_, i) => `<rect x="${-230 + i * 80}" y="-60" width="40" height="120"/>`).join('')}${Array.from({ length: 3 }, (_, i) => `<rect x="-230" y="${-60 + i * 40}" width="460" height="20"/>`).join('')}</g></g>` +
    flower(130, 880, '#FFFFFF', 0.8) + flower(880, 900, '#FFD36B', 0.8),

  /* things that go: a small town street */
  town: () => skyFill('#BEE3F1', '#F2F8F4') + sunGlow(700, 360, 52) + cloud(340, 340, 0.75) +
    `<g opacity=".9">` + [[60, 560, 130, 170, '#F4D3C4'], [200, 520, 110, 210, '#D8E4F6'], [320, 580, 120, 150, '#FCE7B6'], [450, 540, 100, 190, '#E3D7F4'], [560, 590, 130, 140, '#CFEAD9'], [700, 530, 110, 200, '#F6D2DA'], [820, 570, 140, 160, '#D9E8F4']].map(([x, y, w, h, c]) =>
      layer(`M${x} ${y} H${x + w} V${y + h} H${x}Z`, c, 8, 0.08) + `<g fill="#FFFFFF" opacity=".7">${Array.from({ length: Math.floor(h / 60) }, (_, r) => `<rect x="${x + 18}" y="${y + 22 + r * 56}" width="${w / 2 - 26}" height="32" rx="5"/><rect x="${x + w / 2 + 8}" y="${y + 22 + r * 56}" width="${w / 2 - 26}" height="32" rx="5"/>`).join('')}</g>`).join('') + `</g>` +
    tree(140, 760, 0.7, '#97D18D', '#84C47D') + tree(880, 760, 0.75, '#97D18D', '#84C47D') +
    layer('M0 740 H1000 V780 H0Z', '#E8E4DC', 6, 0.1) +
    layer('M0 780 H1000 V900 H0Z', '#A9B2BE', 6, 0.1) + `<g fill="#F4F1E8">${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 120 + 20}" y="836" width="64" height="9" rx="4.5"/>`).join('')}</g>` +
    layer('M0 900 H1000 V1000 H0Z', '#E8E4DC', 0, 0) +
    `<g transform="translate(250 600)"><rect x="-7" y="0" width="14" height="150" fill="#8E98A6"/>` + layer('M-26 -96 H26 V8 H-26Z', '#5B6574', 5) + `<circle cy="-72" r="13" fill="#F28B86"/><circle cy="-44" r="13" fill="#FFE08A"/><circle cy="-16" r="13" fill="#9BE0A4"/></g>`,

  /* feelings: a playground */
  playground: () => skyFill('#BCE3F2', '#FFF4EC') + sunGlow(620, 360, 58) + cloud(330, 320, 0.8) + cloud(780, 450, 0.6, 0.9) +
    layer('M0 660 Q260 610 520 640 Q780 670 1000 630 V1000 H0Z', '#CBE9BC', 10, 0.08) +
    tree(130, 730, 1, '#97D18D', '#84C47D') +
    `<g transform="translate(700 520)" stroke-linecap="round">` + `<path d="M0 260 L60 0 L120 260 M220 260 L280 0 L340 260 M50 10 H290" stroke="#E7A6A0" stroke-width="16" fill="none"/>` +
    `<path d="M150 14 V170 M190 14 V170" stroke="#B9B2A8" stroke-width="4"/>` + layer('M138 170 H202 V184 H138Z', '#F5C37A', 4) + `</g>` +
    `<g transform="translate(330 560)">` + `<path d="M0 230 V40 M60 230 V40" stroke="#9FC1E8" stroke-width="12"/><path d="M0 70 H60 M0 110 H60 M0 150 H60 M0 190 H60" stroke="#9FC1E8" stroke-width="7"/>` +
    layer('M-10 30 H70 V48 H-10Z', '#F2C46D', 4) + layer('M60 40 Q120 60 170 170 Q190 216 240 230 L240 250 Q170 250 150 196 Q110 90 60 70Z', '#F7D88A', 6) + `</g>` +
    layer('M0 790 Q260 760 500 776 Q760 794 1000 770 V1000 H0Z', '#B3DDA0', 8, 0.12) +
    layer('M120 900 A150 40 0 1 0 420 900 A150 40 0 1 0 120 900Z', '#F3E1B5', 4, 0.1) + flower(780, 880, '#FFB7C9', 0.85),

  /* body: up in Koko's tree */
  treetop: () => skyFill('#A8DDF4', '#E9F7F2') + sunGlow(500, 300, 50) + cloud(300, 420, 0.7) + cloud(700, 380, 0.8) +
    `<g>${[[40, 420, 160], [160, 300, 120], [920, 380, 170], [820, 260, 110], [80, 640, 150], [940, 640, 160]].map(([x, y, r]) => layer(`M${x - r} ${y} a${r} ${r * 0.8} 0 1 0 ${2 * r} 0a${r} ${r * 0.8} 0 1 0 ${-2 * r} 0Z`, '#9BD28F', 10, 0.1)).join('')}</g>` +
    layer('M-20 760 Q200 720 420 760 Q620 800 1020 740 L1020 800 Q620 850 420 812 Q200 774 -20 812Z', '#C59B70', 8, 0.12) +
    `<g>${[[150, 790, 90], [880, 780, 100], [520, 860, 60]].map(([x, y, r]) => layer(`M${x - r} ${y} a${r} ${r * 0.7} 0 1 0 ${2 * r} 0a${r} ${r * 0.7} 0 1 0 ${-2 * r} 0Z`, '#86C47E', 8, 0.12)).join('')}</g>` +
    layer('M0 880 Q260 860 500 874 Q760 890 1000 866 V1000 H0Z', '#9AD18A', 8, 0.1),

  /* recall: a calm sky */
  sky: () => skyFill('#B4DFF1', '#FFF3DE') + sunGlow(500, 470, 80, '#FFE59A') + cloud(300, 380, 0.9) + cloud(720, 330, 1) + cloud(560, 560, 0.6, 0.8) +
    layer('M0 760 Q250 700 500 740 Q750 780 1000 730 V1000 H0Z', '#D4EBD9', 10, 0.08) + layer('M0 840 Q260 810 500 830 Q760 850 1000 820 V1000 H0Z', '#BEE0C6', 8, 0.1),

  night: () => skyFill('#1D2A57', '#40508F') +
    `<g fill="#fff">${[[120, 140, 3], [260, 90, 2], [380, 210, 3.5], [520, 120, 2.5], [600, 330, 2], [760, 110, 3], [880, 220, 2.5], [940, 80, 2], [180, 330, 2.5], [450, 400, 2], [820, 420, 3], [300, 470, 2], [680, 520, 2.5], [90, 520, 2], [560, 40, 2]].map(([x, y, r], i) => `<circle class="star" style="animation-delay:${(i % 5) * 0.7}s" cx="${x}" cy="${y}" r="${r * 1.6}"/>`).join('')}</g>` +
    `<g transform="translate(640 330)"><circle r="130" fill="#FFF6C8" opacity=".1"/><circle r="72" fill="#FFF1B0"/><circle cx="-30" cy="-14" r="68" fill="#2B3A73"/></g>` +
    layer('M0 700 Q240 620 480 680 Q720 740 1000 650 V1000 H0Z', '#2A3C70', 10, 0.2) +
    tree(130, 740, 1.05, '#34507A', '#2D4669', '#3C4A70') + tree(890, 760, 0.95, '#34507A', '#2D4669', '#3C4A70') +
    layer('M0 800 Q260 770 500 790 Q760 810 1000 780 V1000 H0Z', '#21305E', 8, 0.2) +
    `<g fill="#FFE98A">${[[300, 760], [620, 720], [760, 840], [420, 880]].map(([x, y], i) => `<circle class="firefly" style="animation-delay:${i * 1.1}s" cx="${x}" cy="${y}" r="6"/>`).join('')}</g>`
};

if (typeof module !== 'undefined') module.exports = { WORLDS };
