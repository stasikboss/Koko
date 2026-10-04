/* Koko symbols: every animal, object and icon in the game, drawn with the paint engine.
   Learning targets are drawn true to life in colour and proportion (toddlers carry words from realistic
   pictures to real things better than from cartoon icons); only Koko himself is a cartoon. */

const SKIN = '#F4C29C', WOOD = '#B47A48', METAL = '#C5D3DD', DARK = '#3D3A46';
const COLORS = { yellow: '#FFD43B', blue: '#3A86FF', red: '#F2545B', purple: '#9B5DE5', green: '#3DB760', pink: '#FF8FC7', orange: '#FF9632', white: '#FFFFFF', brown: '#9C6B43' };

/* ---------- interface icons (flat, used small) ---------- */
sym('s-gear', `<path fill="currentColor" d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7 7 0 0 0 1.7-1l2.4 1 2-3.4zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>`, '0 0 24 24');
sym('s-home', `<path fill="currentColor" d="M3 11.2 12 3.8l9 7.4V20a1 1 0 0 1-1 1h-5.2v-6.2H9.2V21H4a1 1 0 0 1-1-1z"/>`, '0 0 24 24');
sym('s-feather', `<path d="M7 35 C8 20 16 9 33 5 C34 20 25 31 9 34 Z" fill="currentColor" stroke="rgba(30,43,51,.55)" stroke-width="2.2" stroke-linejoin="round"/><path d="M8 34 Q18 22 27 13" stroke="rgba(30,43,51,.45)" stroke-width="1.8" fill="none" stroke-linecap="round"/>`, '0 0 40 40');

/* ---------- panel icons ---------- */
sym('s-talk', sh('M10 24 Q10 12 22 12 H58 Q70 12 70 24 V44 Q70 56 58 56 H36 L22 68 V56 Q10 56 10 44Z', '#FFC93C') +
  sh('M38 52 Q38 40 50 40 H80 Q92 40 92 52 V68 Q92 80 80 80 H78 V92 L64 80 H50 Q38 80 38 68Z', '#7CC8F0') +
  `<circle cx="54" cy="60" r="4" fill="${INK}"/><circle cx="65" cy="60" r="4" fill="${INK}"/><circle cx="76" cy="60" r="4" fill="${INK}"/>`);
sym('s-think', sh(C(20, 84, 7), '#FFC93C', { sw: 2.4 }) + sh(C(9, 95, 4), '#FFC93C', { sw: 2 }) + sh(C(56, 44, 36), '#FFC93C') +
  ink('M45 34 Q45 22 56 22 Q67 22 67 32 Q67 40 57 44 V51', 6) + `<circle cx="57" cy="63" r="4.5" fill="${INK}"/>`);
sym('s-move', ground(50, 94, 30, 4) + sh('M40 92 C24 92 22 72 27 58 C32 44 32 34 44 31 C58 28 70 38 69 56 C68 74 58 92 40 92Z', SKIN) +
  sh(E(34, 18, 9.5, 10.5), SKIN, { sw: 2.2 }) + sh(C(49.5, 13, 6.8), SKIN, { sw: 2 }) + sh(C(60.5, 16, 5.8), SKIN, { sw: 2 }) + sh(C(68.5, 23.5, 5.1), SKIN, { sw: 2 }) + sh(C(73.5, 32.5, 4.6), SKIN, { sw: 2 }));

/* ---------- farm animals ---------- */
const hoof = (x, y) => sh(R(x, y, 9.5, 6.5, 3), '#4A4550', { sw: 2, off: [-1.5, -2] });
sym('s-cow', ground(54, 93, 38, 5) +
  ink('M84 54 Q93 64 88 78', 2.6, tone('#FFFFFF').line) + sh(E(87.5, 80, 4, 5.5), DARK, { sw: 1.6, off: [-1, -1] }) +
  sh(R(64, 64, 9.5, 26, 4.5), '#FFFFFF') + sh(R(37, 64, 9.5, 26, 4.5), '#FFFFFF') + hoof(64, 85) + hoof(37, 85) +
  sh(E(58, 56, 31, 19), '#FFFFFF', { inner: flat(E(68, 50, 9, 6.5, 20), DARK) + flat(E(49, 63, 6.5, 4.5, -10), DARK) + flat(E(81, 61, 5, 4), DARK) }) +
  sh(E(60, 74, 6.5, 4.2), '#FFB8C6', { sw: 2 }) +
  sh(R(45, 68, 9.5, 24, 4.5), '#FFFFFF') + sh(R(72, 68, 9.5, 24, 4.5), '#FFFFFF') + hoof(45, 87) + hoof(72, 87) +
  sh(E(12, 35, 9, 5, -22), '#FFFFFF', { sw: 2.2, inner: flat(E(13, 35.5, 5, 2.4, -22), '#FFB8C6') }) +
  sh(E(46, 33, 9, 5, 22), '#FFFFFF', { sw: 2.2, inner: flat(E(45, 33.5, 5, 2.4, 22), '#FFB8C6') }) +
  sh('M20 28 Q14 18 21 12 Q26 20 26 28Z', '#F2E3C4', { sw: 2 }) + sh('M38 28 Q44 18 37 12 Q32 20 32 28Z', '#F2E3C4', { sw: 2 }) +
  sh(R(14, 24, 30, 34, 14), '#FFFFFF', { inner: flat(E(21, 30, 7, 5, -15), DARK) }) +
  sh(E(29, 53, 15.5, 10), '#FFB8C6') + flat(E(23.5, 53, 2.2, 3.2), '#A2546A') + flat(E(34.5, 53, 2.2, 3.2), '#A2546A') +
  eye(23, 39, 3.2) + eye(35, 39, 3.2));

sym('s-dog', ground(50, 93, 30, 5) +
  sh('M66 80 Q86 80 86 62 Q90 62 91 70 Q92 90 68 88Z', '#D9965A', { sw: 2.2 }) +
  sh(E(50, 72, 22, 20), '#E3A564', { inner: flat(E(50, 80, 12, 13), '#FFF1DC') }) +
  sh(R(38, 74, 9, 18, 4.5), '#E3A564') + sh(R(53, 74, 9, 18, 4.5), '#E3A564') +
  sh(E(42.5, 91, 6.5, 3.6), '#FFF1DC', { sw: 2, off: [-1, -1.5] }) + sh(E(57.5, 91, 6.5, 3.6), '#FFF1DC', { sw: 2, off: [-1, -1.5] }) +
  sh(C(50, 40, 22), '#E3A564') + sh(E(50, 50, 13, 10), '#FFF1DC') +
  sh('M31 24 Q17 26 17 44 Q19 57 28 55 Q35 44 37 30Z', '#8E5A2E') + sh(mirror('M31 24 Q17 26 17 44 Q19 57 28 55 Q35 44 37 30Z'), '#8E5A2E') +
  sh(E(50, 45, 5.5, 4), '#2E2630', { sw: 1.6, off: [-1.5, -1.5] }) + gloss(48.4, 43.8, 1.7, 1) +
  ink('M50 49 V53 M44 53 Q50 58 56 53', 2.2) + sh('M47 55 Q50 63 53 55Z', '#FF8FA3', { sw: 1.4, off: [-1, -1] }) +
  eye(42, 37, 3.4) + eye(58, 37, 3.4));

sym('s-cat', ground(50, 93, 28, 5) +
  sh('M64 88 Q86 88 84 68 Q83 56 75 55 Q80 66 76 74 Q72 81 62 81Z', '#F2A04A', { sw: 2.2 }) +
  sh(E(50, 72, 19, 19), '#F2A04A', { inner: flat(E(50, 80, 10, 11), '#FFE8CC') }) +
  sh(R(40, 76, 8, 16, 4), '#F2A04A') + sh(R(52, 76, 8, 16, 4), '#F2A04A') +
  sh(E(44, 91, 5.6, 3), '#FFE8CC', { sw: 2, off: [-1, -1] }) + sh(E(56, 91, 5.6, 3), '#FFE8CC', { sw: 2, off: [-1, -1] }) +
  sh('M31 32 Q26 16 29 9 Q38 13 46 24Z', '#F2A04A', { inner: flat('M32 26 Q30 18 31 15 Q36 18 40 23Z', '#FFB3C1') }) +
  sh(mirror('M31 32 Q26 16 29 9 Q38 13 46 24Z'), '#F2A04A', { inner: flat(mirror('M32 26 Q30 18 31 15 Q36 18 40 23Z'), '#FFB3C1') }) +
  sh(E(50, 40, 22, 19), '#F2A04A', { inner: flat(E(50, 49, 11, 7.5), '#FFE8CC') + ink('M44 23 L46 30 M50 22 V30 M56 23 L54 30', 2.4, '#C9772C') }) +
  sh(E(41, 39, 4.6, 5.4), '#A3D86E', { sw: 1.6, off: [-1, -1] }) + flat(E(41, 39, 1.5, 4.4), INK) + `<circle cx="42.4" cy="37" r="1.2" fill="#fff"/>` +
  sh(E(59, 39, 4.6, 5.4), '#A3D86E', { sw: 1.6, off: [-1, -1] }) + flat(E(59, 39, 1.5, 4.4), INK) + `<circle cx="60.4" cy="37" r="1.2" fill="#fff"/>` +
  sh('M47 45 H53 L50 48.5Z', '#FF8FA3', { sw: 1.4, off: [0, -0.5] }) + ink('M50 48.5 Q47 52 44 50.5 M50 48.5 Q53 52 56 50.5', 2) +
  ink('M34 46 L21 44 M34 50 L21 52 M66 46 L79 44 M66 50 L79 52', 1.4, '#9A7A65'));

sym('s-duck', ground(54, 93, 26, 4.5) +
  ink('M50 79 V88 M60 79 V88', 3, '#E8892A') +
  sh('M41 90 Q49 85 56 90 Q49 93 41 90Z', '#FF9F1C', { sw: 1.6, off: [-1, -1] }) + sh('M53 90 Q61 85 68 90 Q61 93 53 90Z', '#FF9F1C', { sw: 1.6, off: [-1, -1] }) +
  sh('M28 60 Q30 44 52 46 Q72 46 87 37 Q93 56 83 70 Q70 83 50 83 Q30 81 28 60Z', '#FFD43B') +
  sh('M47 60 Q62 50 77 58 Q67 72 50 67Z', '#F5C126', { sw: 2 }) +
  sh(C(34, 34, 15), '#FFD43B') + sh('M20 34 Q7 31 5 40 Q11 46 22 42Z', '#FF9F1C', { sw: 2 }) +
  eye(31, 30, 2.8) + blush(38, 39, 4, 2.6));

sym('s-sheep', ground(55, 93, 33, 5) +
  sh(R(36, 66, 7, 24, 3.5), '#4F4A58') + sh(R(74, 66, 7, 24, 3.5), '#4F4A58') +
  [[40, 52, 13], [54, 43, 14], [70, 47, 13], [81, 59, 12], [67, 69, 13], [51, 69, 13], [37, 64, 12]].map(([x, y, r]) => sh(C(x, y, r), '#FFFFFF', { sw: 2.4, off: [-3, -4] })).join('') +
  sh(C(58, 57, 19), '#FFFFFF', { sw: 0, off: [-5, -6] }) +
  sh(R(48, 70, 7, 21, 3.5), '#4F4A58') + sh(R(62, 70, 7, 21, 3.5), '#4F4A58') +
  sh(E(17, 44, 7.5, 3.6, -30), '#4F4A58', { sw: 2 }) + sh(E(39, 42, 7.5, 3.6, 30), '#4F4A58', { sw: 2 }) +
  sh(E(28, 51, 11, 13.5, 8), '#4F4A58') +
  sh(C(28, 38, 7), '#FFFFFF', { sw: 2, off: [-2, -2] }) + sh(C(21.5, 41, 5), '#FFFFFF', { sw: 2, off: [-2, -2] }) + sh(C(34.5, 40.5, 5), '#FFFFFF', { sw: 2, off: [-2, -2] }) +
  `<circle cx="23.5" cy="50" r="3.4" fill="#fff"/><circle cx="24" cy="50.6" r="2" fill="${INK}"/><circle cx="32.5" cy="50" r="3.4" fill="#fff"/><circle cx="33" cy="50.6" r="2" fill="${INK}"/>` +
  ink('M25.5 58.5 Q28 60.5 30.5 58.5', 1.6, '#D9D3E2'));

sym('s-frog', ground(50, 93, 33, 5) +
  sh(E(23, 80, 15, 9, -12), '#58B84E') + sh(E(77, 80, 15, 9, 12), '#58B84E') +
  sh(E(50, 70, 28, 20), '#6CCB5F', { inner: flat(E(50, 78, 18, 11), '#CDF0A4') }) +
  sh(E(50, 52, 30, 18), '#6CCB5F') +
  sh(C(34, 37, 10.5), '#6CCB5F') + sh(C(66, 37, 10.5), '#6CCB5F') +
  `<circle cx="34" cy="37" r="7" fill="#fff"/><circle cx="66" cy="37" r="7" fill="#fff"/>` + eye(35, 38, 3.6) + eye(65, 38, 3.6) +
  ink('M33 57 Q50 67 67 57', 2.4) + blush(27, 56) + blush(73, 56) +
  sh(E(38, 89, 8.5, 4), '#6CCB5F', { sw: 2, off: [-1, -1] }) + sh(E(62, 89, 8.5, 4), '#6CCB5F', { sw: 2, off: [-1, -1] }));

sym('s-rooster', ground(50, 93, 26, 4.5) +
  ink('M44 79 V90 M54 79 V90', 3.2, '#E8A52A') + ink('M38 91 H48 M50 91 H60', 2.6, '#E8A52A') +
  sh('M60 60 Q66 30 86 23 Q80 40 93 44 Q80 52 91 62 Q76 62 72 72Z', '#2DA866') +
  sh('M64 58 Q74 40 84 46 Q76 54 78 66Z', '#3A86FF', { sw: 2 }) + sh('M66 64 Q82 58 88 70 Q76 70 70 76Z', '#F2545B', { sw: 2 }) +
  sh('M24 62 Q22 42 40 42 Q48 52 60 52 Q76 56 72 74 Q66 88 46 88 Q28 86 24 62Z', '#FFF6E6') +
  sh('M40 62 Q54 56 64 66 Q54 76 42 70Z', '#F1E0C2', { sw: 2 }) +
  sh('M24 53 Q15 30 29 21 Q44 17 46 34 Q46 46 38 53Z', '#FFF6E6') +
  sh('M24 22 Q19 10 28 12 Q30 3 37 10 Q44 5 44 16 Q38 20 26 24Z', '#F2545B', { sw: 2 }) +
  sh('M20 29 L7 34 L20 38Z', '#FFC93C', { sw: 1.8, off: [-1, -1] }) + sh('M21 40 Q15 49 24 48 Q26 44 24 40Z', '#F2545B', { sw: 1.8, off: [-1, -1] }) +
  eye(30, 29.5, 2.7));

sym('s-rabbit', ground(51, 93, 28, 5) +
  sh(C(71, 78, 6.5), '#FFFFFF', { sw: 2, off: [-2, -2] }) +
  sh(E(52, 72, 20, 19), '#D8CBBE', { inner: flat(E(46, 78, 10, 11), '#F6F0EA') }) +
  sh(E(40, 90, 9, 3.8), '#D8CBBE', { sw: 2, off: [-1, -1] }) + sh(E(59, 90, 9, 3.8), '#D8CBBE', { sw: 2, off: [-1, -1] }) +
  sh(E(40, 19, 6.2, 17, -10), '#D8CBBE', { inner: flat(E(40, 20, 2.8, 12, -10), '#FFB3C1') }) +
  sh(E(57, 17, 6.2, 17, 12), '#D8CBBE', { inner: flat(E(57, 18, 2.8, 12, 12), '#FFB3C1') }) +
  sh(E(48, 44, 17, 15), '#D8CBBE', { inner: flat(E(48, 52, 9, 6), '#F6F0EA') }) +
  sh('M45.6 47 H50.4 L48 49.6Z', '#FF8FA3', { sw: 1.2, off: [0, -0.4] }) +
  ink('M48 49.6 V52.4 M44.6 52.6 Q48 55.4 51.4 52.6', 1.6) + `<rect x="46.6" y="52.8" width="2.8" height="3.2" rx=".8" fill="#fff" stroke="${tone('#D8CBBE').line}" stroke-width=".8"/>` +
  eye(42, 42, 2.8) + eye(54, 42, 2.8) + blush(38.5, 48, 3.6, 2.4) + blush(57.5, 48, 3.6, 2.4));

sym('s-monkey', ground(50, 93, 28, 5) +
  sh('M66 84 Q88 84 86 66 Q84 54 74 57 Q80 62 80 68 Q80 78 64 78Z', '#9C6B43', { sw: 2.2 }) +
  sh(E(50, 72, 18, 18), '#9C6B43', { inner: flat(E(50, 77, 10, 11), '#E9C49A') }) +
  sh(R(29, 60, 8.5, 26, 4.2), '#9C6B43') + sh(R(62.5, 60, 8.5, 26, 4.2), '#9C6B43') +
  sh(E(33, 87, 5.4, 4), '#E9C49A', { sw: 2, off: [-1, -1] }) + sh(E(67, 87, 5.4, 4), '#E9C49A', { sw: 2, off: [-1, -1] }) +
  sh(E(42, 91, 7, 3.4), '#E9C49A', { sw: 2, off: [-1, -1] }) + sh(E(58, 91, 7, 3.4), '#E9C49A', { sw: 2, off: [-1, -1] }) +
  sh(C(26, 40, 8), '#9C6B43', { inner: flat(C(26.5, 40.5, 4.6), '#E9C49A') }) + sh(C(74, 40, 8), '#9C6B43', { inner: flat(C(73.5, 40.5, 4.6), '#E9C49A') }) +
  sh(C(50, 40, 20), '#9C6B43') +
  sh('M50 30 Q42 23 37 29 Q31 37 36 46 Q40 57 50 57 Q60 57 64 46 Q69 37 63 29 Q58 23 50 30Z', '#E9C49A', { sw: 2 }) +
  eye(43, 38, 2.8) + eye(57, 38, 2.8) + flat(E(48, 46, 1.2, 1.7), '#6B4A33') + flat(E(52, 46, 1.2, 1.7), '#6B4A33') + ink('M44 50 Q50 54.5 56 50', 1.8));

sym('s-mouse', ground(52, 93, 28, 4.5) +
  ink('M70 84 Q91 87 92 72 Q93 60 84 58', 2.6, '#E8A3B5') +
  sh('M30 85 Q25 60 46 54 Q66 50 72 70 Q74 86 58 88 Q40 90 30 85Z', '#B9BACB', { inner: flat(E(45, 80, 10, 7), '#E6E6F0') }) +
  sh(C(46, 33, 12.5), '#B9BACB', { inner: flat(C(46.5, 33.5, 8), '#FFB3C1') }) +
  sh(C(28, 40, 9.5), '#B9BACB', { inner: flat(C(28.5, 40.5, 6), '#FFB3C1') }) +
  sh('M13 62 Q13 46 30 44 Q46 44 48 58 Q46 71 32 71 Q19 71 13 62Z', '#B9BACB') +
  sh(C(13, 61, 3.4), '#FF8FA3', { sw: 1.4, off: [-1, -1] }) + eye(28, 55, 2.8) +
  ink('M18 62 L6 58 M18 64.5 L6 67', 1.3, '#7B7B8E') +
  flat(E(37, 89.5, 5, 2.4), '#FFB3C1') + flat(E(55, 89.5, 5, 2.4), '#FFB3C1'));

/* ---------- food ---------- */
sym('s-bone', ground(50, 76, 34, 4) +
  `<g transform="rotate(-18 50 50)">` + sh('M68 46A9 9 0 1 1 80.1 50A9 9 0 1 1 68 54H32A9 9 0 1 1 19.9 50A9 9 0 1 1 32 46Z', '#F2E6CF', { off: [-3, -4] }) + `</g>`);
sym('s-cheese', ground(50, 84, 36, 4.5) +
  sh('M12 50 L88 38 L88 70 L12 80Z', '#F7B733', { inner: flat(E(32, 64, 5.5, 4.5), '#D58F26') + flat(E(58, 58, 6.5, 5.2), '#D58F26') + flat(E(77, 64, 3.6, 3), '#D58F26') + flat(E(22, 72, 3, 2.4), '#D58F26') }) +
  sh('M12 50 L60 21 L88 38Z', '#FFD45C', { off: [-3, -3], inner: flat(E(56, 33, 4.4, 2.4), '#E7A53A') + flat(E(38, 40, 3, 1.6), '#E7A53A') }));
sym('s-fish', ground(50, 86, 32, 4) +
  sh('M74 50 L95 33 Q90 50 95 67Z', '#5AA2D6') +
  sh('M42 35 Q54 21 66 35Z', '#5AA2D6', { sw: 2 }) + sh('M47 65 Q56 77 63 64Z', '#5AA2D6', { sw: 2 }) +
  sh(E(46, 50, 31, 18), '#86C5EC', { inner: flat(E(46, 59, 25, 8), '#DDF1FB') + ink('M58 36 Q62 50 58 64 M66 40 Q69 50 66 60', 1.6, '#6AAEDC') }) +
  ink('M29 41 Q25 50 29 59', 2, '#3E7FAE') + `<circle cx="21" cy="46" r="4.6" fill="#fff"/>` + eye(21.6, 46.4, 2.6) + ink('M14 54 Q17.5 56.5 21 54', 1.6));

function carrot(c) { return sh('M58 22 Q51 6 59 1 Q66 11 64 23Z', '#3DB760', { sw: 2 }) + sh('M62 24 Q72 7 85 9 Q79 22 66 28Z', '#3DB760', { sw: 2 }) + sh('M64 29 Q81 24 89 33 Q78 39 66 33Z', '#3DB760', { sw: 2 }) +
  sh('M56 23 Q71 25 72 38 Q72 47 64 54 L24 93 Q13 93 13 82 L48 32 Q50 23 56 23Z', c, { inner: ink('M45 43 L54 48 M37 57 L44 61 M29 71 L35 74', 2, tone(c).shade) }); }
function banana(c) { return sh('M22 27 Q11 71 52 87 Q81 95 95 76 Q72 78 54 66 Q36 54 34 27Z', c, { inner: ink('M28 40 Q31 65 56 78', 2.4, tone(c).light, 0.8) }) +
  sh(R(22, 13, 12, 15, 3), '#8B5A2B', { sw: 2, off: [-1, -1] }) + flat(E(93, 77, 3, 2), '#6B4A2A'); }
function strawberry(c) { return sh('M50 93 Q15 75 17 46 Q19 30 36 30 Q44 30 50 34 Q56 30 64 30 Q81 30 83 46 Q85 75 50 93Z', c,
  { inner: [[34, 48], [50, 46], [66, 48], [42, 61], [58, 61], [49, 76], [29, 59], [71, 59]].map(([x, y]) => flat(E(x, y, 2, 3), '#FFF3B0')).join('') }) +
  ink('M50 29 V13', 3, '#2E8B4E') + sh('M29 32 Q38 17 50 28 Q62 17 71 32 Q62 39 50 32 Q38 39 29 32Z', '#3DB760', { sw: 2 }); }
function leaf(c) { return ink('M11 95 L28 78', 3.4, tone(c).line) +
  sh('M20 85 Q11 29 70 13 Q93 7 89 22 Q84 75 32 85Z', c, { inner: ink('M28 78 Q52 52 81 21 M42 64 L38 47 M54 50 L50 33 M48 58 L67 58 M62 44 L77 44', 2.2, tone(c).light, 0.85) }); }
function milk(c) { return ground(50, 96, 26, 3.5) +
  sh('M23 11 H77 L71 90 Q70 95 64 95 H36 Q30 95 29 90Z', '#E4F0F6', { sw: 2.4, off: [-3, -3], inner:
    sh('M25 33 H75 L70.4 89.5 Q69.6 93.6 64 93.6 H36 Q30.4 93.6 29.6 89.5Z', c, { sw: 0, off: [-4, -3] }) + flat(E(50, 33, 25, 3.8), tone(c).light) +
    ink('M33 18 L37 85', 4, '#fff', 0.7) }); }
const VARIANT_FN = { banana, strawberry, leaf, carrot, milk };
sym('s-carrot', carrot('#FF9632'));
sym('s-banana', banana('#FFD43B'));
sym('s-strawberry', strawberry('#F2545B'));
sym('s-leaf', leaf('#3DB760'));
sym('s-milk', milk('#FFFFFF'));
/* Colour variants used by the colours round: s-banana--blue etc. */
const VARIANTS = { banana: ['blue', 'red', 'yellow'], strawberry: ['purple', 'red', 'yellow'], leaf: ['pink', 'green', 'blue'], carrot: ['blue', 'orange', 'green'], milk: ['green', 'white', 'pink'] };
Object.entries(VARIANTS).forEach(([k, cs]) => cs.forEach(c => sym(`s-${k}--${c}`, VARIANT_FN[k](COLORS[c]))));

/* ---------- body (people) ---------- */
sym('s-foot', ground(46, 96, 26, 3.5) + sh('M40 95 C24 95 22 75 27 61 C32 47 32 37 44 34 C58 31 70 41 69 59 C68 77 58 95 40 95Z', SKIN) +
  sh(E(34, 21, 9.5, 10.5), SKIN, { sw: 2.2, off: [-2.5, -3] }) + sh(C(49.5, 16, 6.8), SKIN, { sw: 2, off: [-2, -2] }) + sh(C(60.5, 19, 5.8), SKIN, { sw: 2, off: [-2, -2] }) +
  sh(C(68.5, 26.5, 5.1), SKIN, { sw: 2, off: [-1.5, -1.5] }) + sh(C(73.5, 35.5, 4.6), SKIN, { sw: 2, off: [-1.5, -1.5] }));
sym('s-head', sh(C(18, 58, 7.5), SKIN, { sw: 2.2, off: [-2, -2] }) + sh(C(82, 58, 7.5), SKIN, { sw: 2.2, off: [-2, -2] }) +
  sh(C(50, 56, 33), SKIN) + sh('M17 54 Q15 18 50 18 Q85 18 83 54 Q77 38 62 36 Q56 45 44 41 Q30 39 17 54Z', '#6B4226') +
  eye(39, 59, 4) + eye(61, 59, 4) + blush(30, 69, 5.5, 3.6) + blush(70, 69, 5.5, 3.6) + ink('M42 73 Q50 80 58 73', 2.6));
sym('s-hand', sh('M33 92 Q24 92 25 80 L26 58 Q22 52 14 48 Q8 42 15 38 Q22 36 30 46 L30 24 Q30 17 36 17 Q42 17 42 24 L42 40 L43 15 Q43 8 49 8 Q55 8 55 15 L55 40 L57 18 Q57 11 63 11 Q69 12 68 19 L67 42 L71 28 Q73 21 79 23 Q84 25 82 32 L76 62 Q73 82 66 92Z', SKIN, { off: [-4, -5] }) +
  ink('M42 40 V50 M55 40 V50 M67 42 L66 50', 1.6, tone(SKIN).shade));
sym('s-eyes', sh(R(2, 27, 96, 46, 23), SKIN, { off: [-3, -4] }) +
  `<path d="M10 50 Q27 33 44 50 Q27 67 10 50Z M56 50 Q73 33 90 50 Q73 67 56 50Z" fill="#fff" stroke="${tone(SKIN).line}" stroke-width="2.2"/>` +
  `<circle cx="27" cy="50" r="8.5" fill="#5B8DEF"/><circle cx="73" cy="50" r="8.5" fill="#5B8DEF"/>` + eye(27, 50, 4.6) + eye(73, 50, 4.6) +
  ink('M14 40 l-4 -6 M22 36 l-2 -7 M32 36 l2 -7 M40 40 l4 -6 M60 40 l-4 -6 M68 36 l-2 -7 M78 36 l2 -7 M86 40 l4 -6', 2.4, '#5A3A2A'));

/* ---------- clothes ---------- */
sym('s-sock', sh('M34 8 H64 V54 Q64 62 72 66 L84 72 Q96 80 88 90 Q82 97 66 92 L42 84 Q30 80 32 66 L34 54Z', '#FF7A90',
  { inner: flat(R(30, 28, 40, 6.5, 0), '#FFFFFF') + flat(R(30, 43, 40, 6.5, 0), '#FFFFFF') + flat('M78 70 Q96 78 88 89 Q83 95 71 92 Q80 82 78 70Z', '#FFC93C') + flat('M30 66 Q42 62 48 74 Q44 86 30 84Z', '#FFC93C') }) +
  sh(R(30.5, 3.5, 37, 13, 4.5), '#FFFFFF', { sw: 2.4, off: [-3, -3] }));
sym('s-hat', sh('M18 72 Q16 25 50 25 Q84 25 82 72Z', '#3A86FF', { inner: ink('M34 34 Q31 52 33 64 M50 28 V64 M66 34 Q69 52 67 64', 3, '#2C6FD6', 0.7) }) +
  sh(R(11, 64, 78, 19, 8), '#8FBEFF') + sh(C(50, 17, 10.5), '#FFC93C', { sw: 2.2, off: [-3, -3] }));
sym('s-shoe', ground(52, 88, 44, 4) +
  sh('M12 70 Q12 50 24 46 L42 42 Q48 26 58 26 L66 28 Q68 44 80 50 Q94 56 92 70Z', '#F2545B', { inner: flat('M18 60 Q30 54 46 60 Q34 66 18 66Z', '#FFFFFF', 0.85) }) +
  sh('M8 70 H96 Q97 84 86 84 H18 Q7 84 8 70Z', '#FFFFFF', { off: [-2, -3] }) + ink('M46 45 L57 40 M48 53 L61 47', 3.4, '#fff') + ink('M8 77 H96', 1.6, '#D7DCE6'));
sym('s-mitten', sh('M32 76 L30 40 Q30 12 52 12 Q74 12 74 38 L74 50 Q86 38 91 50 Q94 60 76 74 L74 76Z', '#9B5DE5', { inner: ink('M42 25 V62 M53 21 V62 M64 25 V62', 3, '#B98CF0', 0.85) }) +
  sh(R(26, 71, 54, 21, 7), '#FFFFFF', { off: [-3, -3], inner: `<circle cx="39" cy="81" r="2.6" fill="#9B5DE5"/><circle cx="53" cy="81" r="2.6" fill="#9B5DE5"/><circle cx="67" cy="81" r="2.6" fill="#9B5DE5"/>` }));
sym('s-glasses', ink('M4 42 L13 46 M96 42 L87 46', 5, '#B33A40') + ink('M42 48 Q50 40 58 48', 5.5, '#E04850') +
  sh(C(30, 50, 18), '#F2545B', { off: [-3, -3], inner: sh(C(30, 50, 11.5), '#CDE7FF', { sw: 0, off: [-2, -2] }) }) +
  sh(C(70, 50, 18), '#F2545B', { off: [-3, -3], inner: sh(C(70, 50, 11.5), '#CDE7FF', { sw: 0, off: [-2, -2] }) }) +
  `<circle cx="30" cy="50" r="11.5" fill="none" stroke="${tone('#F2545B').line}" stroke-width="2"/><circle cx="70" cy="50" r="11.5" fill="none" stroke="${tone('#F2545B').line}" stroke-width="2"/>` +
  ink('M24 46 L29 41 M64 46 L69 41', 3, '#fff'));

/* ---------- at home ---------- */
sym('s-toothbrush', `<g transform="rotate(-35 50 50)">` + sh(R(4, 53, 68, 11, 5.5), '#36BBD6') + sh(R(66, 50, 29, 16, 5), '#36BBD6') +
  sh(R(68, 31, 25, 20, 3), '#FFFFFF', { off: [-2, -2], inner: ink('M74 34 V48 M80.5 34 V48 M87 34 V48', 2.4, '#A6DCEA') }) +
  sh('M66 31 Q70 20 80 23 Q88 18 94 28 Q90 33 80 31Z', '#9FE3F0', { sw: 2, off: [-2, -2] }) + `</g>`);
sym('s-hairbrush', `<g transform="rotate(-35 50 50)">` + sh(R(2, 44, 46, 13, 6.5), WOOD) + sh(E(70, 50, 27, 21), WOOD) +
  sh(E(71, 50, 20, 14), '#F3D2B3', { sw: 2, off: [-2, -2] }) +
  [[60, 45], [67, 42], [75, 42], [82, 45], [57, 52], [64, 50], [71, 50], [78, 50], [85, 52], [62, 57], [70, 58], [78, 57]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${INK}"/>`).join('') + `</g>`);
sym('s-cup', ground(48, 94, 28, 3.5) + ink('M70 41 Q91 40 88 58 Q86 75 66 73', 8.5, tone('#FFC93C').line) + ink('M70 41 Q91 40 88 58 Q86 75 66 73', 4, '#FFC93C') +
  sh('M20 26 H76 L70 86 Q69 92 62 92 H34 Q27 92 26 86Z', '#FFC93C', { inner: ink('M30 45 Q48 51 66 45', 3.6, '#fff', 0.55) }) +
  sh(E(48, 26, 28, 7), '#8FD3F5', { sw: 2.4, off: [-2, -2] }));
sym('s-spoon', `<g transform="rotate(32 50 50)">` + sh(R(45, 44, 10, 53, 5), METAL) + sh(E(50, 26, 15.5, 21), METAL, { inner: gloss(45, 20, 4.4, 9, 0, 0.8) }) + `</g>`);
sym('s-fork', `<g transform="rotate(32 50 50)">` + sh(R(45, 44, 10, 53, 5), METAL) +
  sh('M34 30 V8 Q34 5 37 5 Q40 5 40 8 V28 H44 V8 Q44 5 47 5 Q50 5 50 8 V28 H50 H54 V8 Q54 5 57 5 Q60 5 60 8 V28 H60 V8 Q60 5 63 5 Q66 5 66 8 V30 Q66 50 50 51 Q34 50 34 30Z', METAL) + `</g>`);
sym('s-bowl', ink('M36 32 q-6 -8 0 -16 M50 30 q-6 -8 0 -16 M64 32 q-6 -8 0 -16', 3, '#9FB7C2') +
  sh(E(50, 48, 40, 10), '#FFB347', { off: [-2, -2] }) + sh('M10 48 Q12 88 50 90 Q88 88 90 48 Q70 58 50 58 Q30 58 10 48Z', '#F2545B', { inner: ink('M20 66 Q50 78 80 66', 3.6, '#fff', 0.5) }));
sym('s-bed', ground(50, 92, 46, 4) +
  sh(R(8, 22, 18, 68, 8), WOOD) + sh(R(76, 44, 17, 46, 8), WOOD) + sh(R(18, 62, 68, 17, 4), WOOD) +
  sh('M22 64 Q22 46 36 46 H80 Q88 46 88 54 V68 H22Z', '#7CC8F0', { inner: ink('M46 54 H78 M52 60 H72', 3, '#fff', 0.6) }) +
  sh(E(36, 47, 13, 7.5), '#FFFFFF', { off: [-2, -2] }));
sym('s-bath', sh(C(30, 42, 8), '#E8F6FF', { sw: 2, off: [-2, -2] }) + sh(C(45, 37, 10), '#E8F6FF', { sw: 2, off: [-2, -2] }) + sh(C(62, 41, 8), '#E8F6FF', { sw: 2, off: [-2, -2] }) + sh(C(76, 38, 9), '#E8F6FF', { sw: 2, off: [-2, -2] }) +
  ink('M14 48 V26 Q14 16 24 16 Q32 16 32 24', 3.2, '#8A97A6') + ink('M22 82 L18 92 M78 82 L82 92', 4, '#8A97A6') +
  sh('M6 48 H94 V58 Q94 82 70 82 H30 Q6 82 6 58Z', '#FFFFFF', { inner: ink('M16 60 Q18 72 30 74', 4, '#BFDFFF') }));
sym('s-soap', sh(R(14, 48, 72, 36, 14), '#FF8FC7', { inner: flat(R(26, 56, 48, 14, 7), '#FFB8DD') }) +
  sh(C(34, 32, 10), '#E8F6FF', { sw: 2, off: [-2, -2] }) + sh(C(56, 22, 13), '#E8F6FF', { sw: 2, off: [-3, -3] }) + sh(C(77, 35, 8), '#E8F6FF', { sw: 2, off: [-2, -2] }) +
  `<circle cx="52" cy="17" r="3.4" fill="#fff"/><circle cx="31" cy="28" r="2.4" fill="#fff"/>`);

/* ---------- things that go ---------- */
const wheel = (x, y, r) => sh(C(x, y, r), '#3A3A46', { off: [-2, -2] }) + sh(C(x, y, r * 0.45), METAL, { sw: 1.6, off: [-1, -1] });
sym('s-car', ground(50, 86, 44, 4) +
  sh('M8 66 Q8 54 20 52 L30 50 Q36 33 52 32 H66 Q77 32 83 46 L88 52 Q94 54 94 64 V70 Q94 75 89 75 H13 Q8 75 8 70Z', '#F2545B', {
    inner: flat('M35 50 Q40 38 52 38 H57 V50Z', '#CDEBFA') + flat('M61 38 H66 Q73 38 78 50 H61Z', '#CDEBFA') + ink('M38 41 L45 39', 2, '#fff', 0.8) +
      ink('M59 52 V70', 1.8, tone('#F2545B').shade) + flat(R(64, 56, 7, 2.6, 1.3), '#fff', 0.8) + flat(R(36, 56, 7, 2.6, 1.3), '#fff', 0.8) }) +
  sh(E(91, 60, 3, 4.2), '#FFE58A', { sw: 1.4, off: [-1, -1] }) + sh(R(6.5, 57, 4.5, 6.5, 1.8), '#FFC93C', { sw: 1.4, off: [-1, -1] }) +
  sh(R(4, 66, 13, 6, 3), METAL, { sw: 1.6, off: [-1, -1] }) + sh(R(85, 66, 12, 6, 3), METAL, { sw: 1.6, off: [-1, -1] }) +
  wheel(28, 74, 11) + wheel(74, 74, 11));
sym('s-train', ground(52, 90, 46, 4) +
  `<circle cx="27" cy="11" r="7" fill="#fff" opacity=".9"/><circle cx="37" cy="5" r="5" fill="#fff" opacity=".8"/>` +
  sh('M20 41 L17 21 H33 L30 41Z', '#3A3A46', { sw: 2.2 }) + sh(R(14.5, 17, 21, 6, 2.5), '#3A3A46', { sw: 2 }) +
  sh(R(57, 24, 32, 48, 4), '#3A86FF', { inner: flat(R(63, 31, 20, 15, 3.5), '#CDEBFA') + ink('M66 34 L71 32', 2, '#fff', 0.8) }) +
  sh(R(53, 17, 40, 10, 4), '#F2545B', { sw: 2.2 }) +
  sh(R(12, 41, 50, 30, 12), '#F2545B', { inner: flat(R(12, 49, 50, 5, 0), '#FFC93C') }) +
  sh(C(15, 51, 5), '#FFE58A', { sw: 1.6, off: [-1, -1] }) +
  sh('M4 79 L13 66 H21 V79Z', '#FFC93C', { sw: 2 }) + sh(R(10, 67, 82, 11, 4), '#3A3A46', { off: [-2, -2] }) +
  wheel(30, 79, 9) + wheel(51, 79, 9) + wheel(76, 77, 12));
sym('s-boat', ink('M4 90 Q14 86 24 90 T44 90 T64 90 T84 90 T100 90', 3, '#7CC8F0') +
  `<circle cx="60" cy="10" r="6" fill="#fff" opacity=".9"/><circle cx="70" cy="5" r="4.5" fill="#fff" opacity=".8"/>` +
  sh(R(46, 17, 15, 24, 3), '#FFC93C', { inner: flat(R(46, 23, 15, 5.5, 0), '#3A3A46') }) +
  sh(R(28, 37, 38, 26, 5), '#FFFFFF', { inner: `<circle cx="38" cy="49" r="4.6" fill="#9CD6F5"/><circle cx="51" cy="49" r="4.6" fill="#9CD6F5"/>` }) +
  sh('M5 61 H95 Q91 85 71 87 H25 Q9 85 5 61Z', '#F2545B', { inner: flat(R(4, 61, 92, 6.5, 0), '#FFFFFF') + `<circle cx="20" cy="74" r="3.4" fill="#fff" opacity=".7"/>` }));
sym('s-bike', ground(50, 86, 44, 3.5) +
  [[25, 66], [75, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="none" stroke="#3A3A46" stroke-width="5"/><circle cx="${x}" cy="${y}" r="17" fill="none" stroke="#6B6B7A" stroke-width="1.6" opacity=".6"/>` +
    ink(`M${x} ${y - 14} V${y + 14} M${x - 14} ${y} H${x + 14} M${x - 10} ${y - 10} L${x + 10} ${y + 10} M${x - 10} ${y + 10} L${x + 10} ${y - 10}`, 1.2, '#9AA3AE') + `<circle cx="${x}" cy="${y}" r="3" fill="${METAL}"/>`).join('') +
  ink('M25 66 L44 41 L66 41 L75 66 M44 41 L52 66 L25 66 M52 66 L66 41', 5, tone('#3A86FF').line) + ink('M25 66 L44 41 L66 41 L75 66 M44 41 L52 66 L25 66 M52 66 L66 41', 3, '#3A86FF') +
  ink('M44 41 L42 33', 3.2, '#3A3A46') + sh(R(35, 29, 16, 5.5, 2.7), '#3A3A46', { sw: 1.6, off: [-1, -1] }) +
  ink('M66 41 L64 28 L73 26', 3.6, '#3A3A46') + sh(C(70, 21, 4.6), '#FFC93C', { sw: 1.6, off: [-1, -1] }) + ink('M52 66 L58 72', 3, '#3A3A46'));

/* ---------- feelings ---------- */
sym('s-balloon', ink('M50 66 Q43 77 52 86 Q59 94 50 100', 1.8, '#7B7B8E') +
  sh('M46 66 L54 66 L50 72Z', '#F2545B', { sw: 1.6, off: [-1, -1] }) +
  sh('M50 66 Q21 62 21 34 Q21 7 50 7 Q79 7 79 34 Q79 62 50 66Z', '#F2545B', { inner: gloss(37, 24, 6, 10, 25, 0.6) }));
sym('s-icecream', sh('M30 50 L50 96 L70 50Z', '#E7B06A', { inner: ink('M36 54 L58 82 M48 52 L64 70 M64 54 L42 82 M52 52 L36 70', 1.8, '#C78F48') }) +
  sh(C(50, 42, 17), '#FFF3E6') + sh(C(41, 30, 13), '#FF9EC4') + sh(C(59, 28, 13), '#9EDB8A') +
  sh(C(52, 14, 5.5), '#F2545B', { sw: 1.8, off: [-1.5, -1.5] }) + ink('M53 9 Q56 3 61 3', 1.6, '#2E8B4E'));
sym('s-splat', ground(50, 86, 40, 6) +
  sh('M12 84 Q14 72 26 74 Q30 64 42 70 Q52 62 62 70 Q74 64 78 74 Q90 72 88 84 Q70 92 50 90 Q30 92 12 84Z', '#FF9EC4', { off: [-2, -3] }) +
  sh('M50 52 L36 82 L64 82Z', '#E7B06A', { inner: ink('M44 62 L56 80 M56 62 L44 80', 1.6, '#C78F48') }));

/* Koko's face, for the feelings cards */
function kokoFace(mood) {
  const eyes = {
    happy: ink('M29 56 Q37 46 45 56 M55 56 Q63 46 71 56', 4.5),
    sad: sh(C(37, 55, 10), '#FFFFFF', { sw: 2.2, off: [-2, -2] }) + sh(C(63, 55, 10), '#FFFFFF', { sw: 2.2, off: [-2, -2] }) +
      eye(37, 58, 4.6) + eye(63, 58, 4.6) + flat('M26 54 Q37 47 48 54 V42 H26Z', '#2FB872') + flat('M52 54 Q63 47 74 54 V42 H52Z', '#2FB872') +
      ink('M27 44 L44 40 M73 44 L56 40', 3.4, '#145F3D') + sh('M24 64 Q21 71 25 74 Q29 71 26 64Z', '#8FD3F5', { sw: 1.4, off: [-1, -1] }),
    sleepy: ink('M29 55 Q37 61 45 55 M55 55 Q63 61 71 55', 4) + ink('M78 22 H86 L78 30 H86', 2.6, '#4C6A70')
  }[mood];
  const mouth = mood === 'happy' ? sh(E(50, 80, 9, 6), '#7A2E2E', { sw: 1.6, off: [0, 0] }) + sh(E(50, 85, 8, 4), '#F08A24', { sw: 2, off: [-1, -1] }) : '';
  return sh('M43 24 Q30 10 33 2 Q44 8 52 22Z', '#F2545B', { sw: 2 }) + sh('M48 22 Q47 6 56 -2 Q61 10 56 24Z', '#FF9F1C', { sw: 2 }) + sh('M54 24 Q65 11 76 9 Q71 20 60 28Z', '#FFC93C', { sw: 2 }) +
    sh(C(50, 58, 37), '#2FB872', { inner: flat(E(50, 64, 29, 22), '#6FDDA6', 0.5) }) + blush(22, 72, 6, 4) + blush(78, 72, 6, 4) + eyes + mouth +
    sh('M40 66 Q50 59 60 66 Q61 78 52 87 Q50 80 46 76 Q40 72 40 66Z', '#FFB238', { sw: 2, off: [-2, -2] });
}
['happy', 'sad', 'sleepy'].forEach(m => sym('s-face-' + m, kokoFace(m), '0 -4 100 104'));

/* ---------- Koko's parts, for the progress list ---------- */
sym('s-wing', sh('M60 10 Q24 30 26 72 Q28 92 46 94 Q60 80 66 60 Q74 32 60 10Z', '#22A866', { inner: flat('M20 70 Q40 96 66 96 L70 66Z', '#3A86FF') }));
sym('s-tail', sh('M50 8 Q30 50 26 94 Q34 98 40 92 Q48 52 58 12Z', '#F2545B', { sw: 2.2 }) + sh('M54 8 Q50 52 50 96 Q58 98 62 92 Q62 52 62 10Z', '#3A86FF', { sw: 2.2 }) + sh('M58 10 Q70 50 76 92 Q84 94 86 86 Q78 48 66 10Z', '#FFC93C', { sw: 2.2 }));
sym('s-claw', ground(50, 92, 34, 4) + ink('M50 20 V52', 8, tone('#FFA94D').line) + ink('M50 20 V52', 4.5, '#FFA94D') +
  sh(E(34, 80, 13, 7.5, -30), '#FFA94D', { sw: 2.2 }) + sh(E(50, 82, 8, 12), '#FFA94D', { sw: 2.2 }) + sh(E(66, 80, 13, 7.5, 30), '#FFA94D', { sw: 2.2 }) + sh(E(50, 62, 12, 9), '#FFA94D', { sw: 2.2 }));
sym('s-koko-eyes', sh(R(4, 22, 92, 56, 28), '#2FB872', { off: [-3, -4] }) + sh(C(30, 50, 17), '#FFFFFF', { sw: 2.4, off: [-2, -2] }) + sh(C(70, 50, 17), '#FFFFFF', { sw: 2.4, off: [-2, -2] }) +
  `<circle cx="32" cy="52" r="9.5" fill="#3B2A1E"/><circle cx="68" cy="52" r="9.5" fill="#3B2A1E"/>` + eye(32, 52, 5) + eye(68, 52, 5));

/* Main colour of each picture, for small chips and progress rows */
const SYM_COLOR = {};
