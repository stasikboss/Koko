/* Koko app logic. Concatenated after content.js and art.js inside one closure by tools/build.py. */

/* ---------- basics ---------- */
const EMBED = !!window.KOKO_EMBED;
const SPEED = (window.__kokoTest && window.__kokoTest.speed) || 1;
const T = ms => ms * SPEED;
const IDLE_MS = (window.__kokoTest && window.__kokoTest.idle) || 9000;
const NS = 'http://www.w3.org/2000/svg';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const wait = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k, d) { try { const v = localStorage.getItem('koko.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('koko.' + k, JSON.stringify(v)); } catch (e) {} }
};
function todayKey(off = 0) { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

document.body.insertAdjacentHTML('afterbegin', SPRITE);

/* ---------- settings and language ---------- */
const SET = Object.assign({ name: '', length: 'long', level: 'auto', limit: 0, rate: 0.92 }, store.get('set', {}));
if (!store.get('set', null)) {                       // carry over settings from version 1
  const n = store.get('name', ''); if (n) SET.name = n;
  const r = Number(store.get('rate', 0)); if (r) SET.rate = r;
}
const saveSet = () => store.set('set', SET);
function detectLang() {
  const saved = store.get('lang', null);
  if (saved && LANGS[saved]) return saved;
  for (const p of (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']))
    for (const l of LANG_ORDER) if (LANGS[l].re.test(p)) return l;
  return 'he';
}
let LANG = detectLang();
const U = () => UI[LANG];

/* ---------- learner model (this device only) ---------- */
const Learn = {
  d: null,
  load() { const d = store.get('learn', null); this.d = d && d.v === 1 ? d : { v: 1, langs: {}, days: {} }; },
  save() { store.set('learn', this.d); },
  L(lang) { return this.d.langs[lang] || (this.d.langs[lang] = { items: {}, cats: {}, sessions: 0 }); },
  it(lang, id) { const L = this.L(lang); return L.items[id] || (L.items[id] = { seen: 0, first: 0, miss: 0, streak: 0, last: -1 }); },
  record(lang, id, first) {
    const L = this.L(lang), it = this.it(lang, id);
    it.seen++; it.last = L.sessions;
    if (first) { it.first++; it.streak++; } else { it.miss++; it.streak = 0; }
    this.save();
  },
  status(lang, id) { const it = this.L(lang).items[id]; if (!it || !it.seen) return 'new'; return it.streak >= 2 ? 'knows' : 'practicing'; },
  day(k = todayKey()) { return this.d.days[k] || (this.d.days[k] = { ms: 0, games: 0 }); },
  addMs(ms) { if (ms > 0 && ms < 3600000) { this.day().ms += ms; this.prune(); this.save(); } },
  addGame() { this.day().games++; this.save(); },
  prune() { const keys = Object.keys(this.d.days).sort(); while (keys.length > 21) delete this.d.days[keys.shift()]; },
  week() { let ms = 0, g = 0; for (let i = 0; i < 7; i++) { const d = this.d.days[todayKey(-i)]; if (d) { ms += d.ms; g += d.games; } } return { ms, g }; },
  reset() { this.d.langs = {}; this.save(); }
};
Learn.load();

/* ---------- session planning: spaced, adaptive ---------- */
function planSession() {
  const L = Learn.L(LANG);
  const nR = SET.length === 'short' ? 2 : 3;
  const lastPlayed = c => (L.cats[c.id] && L.cats[c.id].last != null ? L.cats[c.id].last : -1);
  const cats = shuffle(CATS.slice()).sort((a, b) => lastPlayed(a) - lastPlayed(b)).slice(0, nR);
  // Priority: missed last time > new > still practicing > known (older first). Shuffle first so ties stay random.
  const pri = it => {
    const s = L.items[it.id];
    if (!s || !s.seen) return 1;
    if (s.streak === 0) return 0;
    if (s.streak < 2) return 2;
    return L.sessions - s.last > 2 ? 3 : 4;
  };
  const rounds = cats.map(c => ({ cat: c, items: shuffle(shuffle(c.items.map(i => Object.assign({ cat: c.id }, i))).sort((a, b) => pri(a) - pri(b)).slice(0, 3)) }));
  return { rounds, moveAfter: nR === 3 ? 1 : 0, move: MOVES[(L.sessions + Math.floor(Math.random() * 3)) % MOVES.length], played: [] };
}
function optionCount(item) {
  if (SET.level === 'easy') return 2;
  if (SET.level === 'hard') return 3;
  return Learn.status(LANG, item.id) === 'knows' ? 3 : 2;
}

/* ---------- state ---------- */
const S = {
  token: 0, accepting: false, onPick: null, cancelWait: null, stopCurrent: null,
  recs: new Map(), ttsBroken: 0, startedAt: 0, done: 0, total: 0, wake: null, clock: 0, plan: null, lastBlob: null
};
const alive = tok => tok === S.token;

/* ---------- worlds ---------- */
let worldName = '';
function setWorld(name) {
  if (name === worldName) return;
  worldName = name;
  $('#app').dataset.world = name;
  const host = $('#world');
  const layer = document.createElement('div');
  layer.className = 'layer in';
  layer.innerHTML = `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax slice">${WORLDS[name]()}</svg>`;
  host.appendChild(layer);
  requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.remove('in')));
  const old = $$('.layer', host).filter(l => l !== layer);
  setTimeout(() => old.forEach(l => l.remove()), 700);
}
function setTint(c) { $('#app').style.setProperty('--tint', c || '#FFE6B3'); }

/* ---------- Koko ---------- */
function mountKoko(slotId) { const slot = document.getElementById(slotId); slot.innerHTML = kokoMarkup(); return slot.firstElementChild; }
const K = { start: mountKoko('kokoStartSlot'), game: mountKoko('kokoGameSlot'), end: mountKoko('kokoEndSlot') };
const setMood = (k, m) => { k.dataset.mood = m; };
function setAct(k, act) { if (act) k.dataset.act = act; else delete k.dataset.act; }
setInterval(() => {
  $$('.koko[data-mood="idle"]').forEach(k => { if (Math.random() < 0.6) { k.classList.add('blink'); setTimeout(() => k.classList.remove('blink'), 170); } });
}, 2600);

const wTf = p => `translate(${p.x}px, ${p.y}px) rotate(${p.r || 0}deg) scale(${p.s / 100})`;
function wearAdd(key, sym, p, o = {}) {
  const layer = K.game.querySelector(o.back ? '.wear-back' : '.wear');
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'w' + (o.pop ? ' pop' : ''));
  g.dataset.k = key;
  g.style.transform = wTf(p);
  const col = o.color || SYM_COLOR[sym];
  if (col) g.style.color = col;
  g.innerHTML = `<use href="#${sym}" x="-50" y="-50" width="100" height="100"/>`;
  layer.appendChild(g);
  return g;
}
const wearGet = key => K.game.querySelector(`.w[data-k="${key}"]`);
function wearClear() { K.game.querySelector('.wear').innerHTML = ''; K.game.querySelector('.wear-back').innerHTML = ''; }
function kokoRect(p) {
  const svg = K.game, m = svg.getScreenCTM && svg.getScreenCTM();
  if (!m) return null;
  const pt = svg.createSVGPoint(); pt.x = p.x; pt.y = p.y;
  const c = pt.matrixTransform(m), size = p.s * Math.abs(m.a);
  return { left: c.x - size / 2, top: c.y - size / 2, width: size, height: size };
}

/* ---------- screens ---------- */
function show(name) { ['start', 'game', 'end'].forEach(n => { $('#screen-' + n).hidden = n !== name; }); }

/* ---------- voices ---------- */
const V = { by: {}, count: 0 };
function voiceScore(v) {
  const n = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();
  let s = 0;
  if (/premium/.test(n)) s += 60;
  if (/enhanced|neural|natural|wavenet|online|siri/.test(n)) s += 50;
  if (/google/.test(n)) s += 30;
  if (v.localService === false) s += 10;
  if (/compact|espeak|eloquence/.test(n)) s -= 40;
  return s;
}
function initVoices() {
  if (!('speechSynthesis' in window)) return;
  const pick = () => {
    let vs = [];
    try { vs = window.speechSynthesis.getVoices() || []; } catch (e) {}
    V.count = vs.length;
    LANG_ORDER.forEach(l => { V.by[l] = vs.filter(v => LANGS[l].re.test(v.lang || '')).sort((a, b) => voiceScore(b) - voiceScore(a)); });
    updateVoiceUI();
  };
  pick();
  try { window.speechSynthesis.addEventListener('voiceschanged', pick); } catch (e) { window.speechSynthesis.onvoiceschanged = pick; }
}
function curVoice() { const list = V.by[LANG] || [], uri = store.get('voice.' + LANG, ''); return list.find(v => v.voiceURI === uri) || list[0] || null; }
const knownNoVoice = () => V.count > 0 && !(V.by[LANG] || []).length;
const ttsUsable = () => ('speechSynthesis' in window) && S.ttsBroken < 2 && !knownNoVoice();
const estimate = text => T((650 + text.length * 85) / Math.max(0.5, SET.rate));
const ttsText = text => text.replace(/\.\.\./g, ', ').replace(/[«»"]/g, '');

function speakTTS(text) {
  return new Promise(resolve => {
    const synth = window.speechSynthesis, est = estimate(text), t0 = Date.now();
    let finished = false, started = false, fellBack = false, t1 = null, t2 = null;
    const finish = () => { if (finished) return; finished = true; clearTimeout(t1); clearTimeout(t2); if (S.stopCurrent === stop) S.stopCurrent = null; resolve(); };
    const stop = () => { try { synth.cancel(); } catch (e) {} finish(); };
    // The engine did not really speak (no voice, blocked, failed): keep the pacing so the bubble stays readable.
    const fallback = () => { if (finished || fellBack) return; fellBack = true; S.ttsBroken++; clearTimeout(t1); clearTimeout(t2); t2 = setTimeout(finish, Math.max(0, est - (Date.now() - t0))); };
    const u = new SpeechSynthesisUtterance(ttsText(text));
    const v = curVoice(); u.lang = (v && v.lang) || LANGS[LANG].tts; if (v) u.voice = v;
    u.rate = SET.rate; u.pitch = 1;
    u.onstart = () => { started = true; S.ttsBroken = 0; };
    u.onend = () => { if (fellBack) return; if (started || Date.now() - t0 > est * 0.3) finish(); else fallback(); };
    u.onerror = e => { if (fellBack) return; const er = e && e.error; if (er === 'interrupted' || er === 'canceled') finish(); else fallback(); };
    S.stopCurrent = stop;
    try { if (synth.speaking || synth.pending) synth.cancel(); synth.speak(u); } catch (e) { fallback(); return; }
    t1 = setTimeout(() => { if (!started && !finished && !fellBack) { fallback(); try { synth.cancel(); } catch (e) {} } }, T(2500));
    t2 = setTimeout(finish, est * 2.5 + T(4000));
  });
}
function primeTTS() { try { if (!('speechSynthesis' in window)) return; const u = new SpeechSynthesisUtterance(' '); u.volume = 0; u.lang = LANGS[LANG].tts; window.speechSynthesis.speak(u); } catch (e) {} }
function playBlob(blob) {
  return new Promise(resolve => {
    let url = null, a = null, fin = false, g = null;
    const finish = () => { if (fin) return; fin = true; clearTimeout(g); try { URL.revokeObjectURL(url); } catch (e) {} if (S.stopCurrent === stop) S.stopCurrent = null; resolve(); };
    const stop = () => { try { a.pause(); } catch (e) {} finish(); };
    try { url = URL.createObjectURL(blob); a = new Audio(url); } catch (e) { finish(); return; }
    a.onended = finish; a.onerror = finish; S.stopCurrent = stop; g = setTimeout(finish, 15000);
    const p = a.play(); if (p && p.catch) p.catch(finish);
  });
}

/* ---------- audio engine: recordings and voice packs play through Web Audio ----------
   One AudioContext, unlocked by the Play tap, so later lines play without another gesture (iOS),
   play with the ring switch on silent, and keep a steady loudness (compressor + per-clip gain). */
const AE = {
  ctx: null, out: null, buffers: new Map(),
  supported() { return !!(window.AudioContext || window.webkitAudioContext); },
  unlock() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
    if (!this.supported()) return;
    try {
      if (!this.ctx) {
        const C = window.AudioContext || window.webkitAudioContext;
        this.ctx = new C();
        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.value = -22; comp.knee.value = 14; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.25;
        comp.connect(this.ctx.destination); this.out = comp;
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const b = this.ctx.createBuffer(1, 1, 22050), src = this.ctx.createBufferSource();
      src.buffer = b; src.connect(this.ctx.destination); src.start(0);
    } catch (e) {}
  },
  decode(ab) { return new Promise((res, rej) => { try { const p = this.ctx.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); } catch (e) { rej(e); } }); },
  analyse(buf) {   // trim silence at both ends, and find a gain for a steady level
    const d = buf.getChannelData(0), n = d.length, sr = buf.sampleRate, th = 0.02;
    let a = 0, z = n - 1, peak = 0;
    while (a < n && Math.abs(d[a]) < th) a++;
    while (z > a && Math.abs(d[z]) < th) z--;
    for (let i = a; i <= z; i += 4) { const v = Math.abs(d[i]); if (v > peak) peak = v; }
    if (a >= z) { a = 0; z = n - 1; }
    return { start: Math.max(0, a / sr - 0.06), end: Math.min(buf.duration, z / sr + 0.15), gain: peak > 0.001 ? Math.min(4, 0.85 / peak) : 1 };
  },
  get(key, loader) {
    if (!this.buffers.has(key)) {
      const pr = loader().then(ab => this.decode(ab)).then(buf => Object.assign({ buf }, this.analyse(buf)));
      pr.catch(() => this.buffers.delete(key));
      this.buffers.set(key, pr);
    }
    return this.buffers.get(key);
  },
  play(entry) {
    return new Promise(resolve => {
      let done = false, guard = null;
      const src = this.ctx.createBufferSource(), g = this.ctx.createGain();
      src.buffer = entry.buf; g.gain.value = entry.gain; src.connect(g); g.connect(this.out);
      const finish = () => { if (done) return; done = true; clearTimeout(guard); if (S.stopCurrent === stop) S.stopCurrent = null; resolve(); };
      const stop = () => { try { src.stop(); } catch (e) {} finish(); };
      src.onended = finish; S.stopCurrent = stop;
      const dur = Math.max(0.05, entry.end - entry.start);
      guard = setTimeout(finish, dur * 1000 + 1500);
      try { if (this.ctx.state === 'suspended') this.ctx.resume(); src.start(0, entry.start, dur); } catch (e) { finish(); }
    });
  }
};
const blobAB = blob => (blob.arrayBuffer ? blob.arrayBuffer() : new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsArrayBuffer(blob); }));

/* Studio voice packs: audio/<lang>/manifest.json + one file per line (tools/make_audio.py). */
const PACK = {};
async function loadPack(lang) {
  if (EMBED || PACK[lang] !== undefined) return;
  PACK[lang] = null;
  try {
    const r = await fetch(`audio/${lang}/manifest.json`, { cache: 'no-cache' });
    if (r.ok) { const m = await r.json(); if (m && m.files && Object.keys(m.files).length) PACK[lang] = m; }
  } catch (e) {}
  if (lang === LANG) updateVoiceUI();
}
const packHas = id => !!(PACK[LANG] && PACK[LANG].files[id]);
function packEntry(id) { const lang = LANG; return AE.get(`pack:${lang}:${id}`, () => fetch(`audio/${lang}/${PACK[lang].files[id]}`).then(r => { if (!r.ok) throw new Error('missing'); return r.arrayBuffer(); })); }
async function preloadPack(ids) { if (!PACK[LANG] || !AE.ctx) return; for (const id of ids) { if (packHas(id)) { try { await packEntry(id); } catch (e) {} } } }

const speakOrWait = (spoken, text) => (ttsUsable() ? speakTTS(spoken) : wait(estimate(text)));
function say(id, text, o = {}) {
  const k = o.koko || K.game, bubble = o.bubble || $('#bubble'), tok = S.token;
  const rec = S.recs.get(LANG + ':' + id), pack = !rec && packHas(id) && AE.ctx;
  bubble.textContent = (rec || pack) && o.plain ? o.plain : text;
  k.classList.add('talking');
  const spoken = o.tts || spokenText(LANG, id, text);
  const fallback = () => (alive(tok) ? speakOrWait(spoken, text) : null);
  let p;
  if (rec && AE.ctx) p = AE.get('rec:' + LANG + ':' + id, () => blobAB(rec)).then(e => alive(tok) && AE.play(e), () => alive(tok) && playBlob(rec));
  else if (rec) p = playBlob(rec);
  else if (pack) p = packEntry(id).then(e => alive(tok) && AE.play(e), fallback);
  else p = speakOrWait(spoken, text);
  return Promise.resolve(p).catch(() => {}).then(() => { if (alive(tok)) k.classList.remove('talking'); });
}
function stopAll() {
  S.token++;
  S.accepting = false; S.onPick = null;
  if (S.cancelWait) { const c = S.cancelWait; S.cancelWait = null; c(); }
  if (S.stopCurrent) S.stopCurrent();
  try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  $$('.koko').forEach(k => k.classList.remove('talking'));
  $$('.badge,.count,.flyer').forEach(e => e.remove());
}

/* ---------- game interface ---------- */
const optionsEl = $('#options'), panelEl = $('#panel'), matesEl = $('#companions');
function renderProgress() {
  $('#progress').innerHTML = Array.from({ length: S.total }, (_, i) => `<svg class="feather${i < S.done ? ' done' : ''}" viewBox="0 0 40 40" aria-hidden="true"><use href="#s-feather"/></svg>`).join('');
  $('#progress').setAttribute('aria-label', U().progress(S.done, S.total));
}
function setChip(cat) {
  const chip = $('#chip');
  if (!cat) { chip.hidden = true; return; }
  $('#chipIcon').setAttribute('href', '#' + cat.icon);
  $('#chipIcon').parentNode.style.color = SYM_COLOR[cat.icon] || '';
  $('#chipText').textContent = U().cat[cat.id];
  chip.hidden = false;
}
function showBadge(sym, title) {
  const b = document.createElement('div');
  b.className = 'badge';
  b.innerHTML = `<div class="disc"><svg viewBox="0 0 100 100" style="color:${SYM_COLOR[sym] || ''}"><use href="#${sym}"/></svg><b>${esc(title)}</b></div>`;
  document.body.appendChild(b);
  setTimeout(() => b.remove(), Math.max(400, T(1900)));
}
function showCount(n, total) {
  for (let i = 1; i <= n; i++) {
    setTimeout(() => {
      $$('.count').forEach(e => e.remove());
      const c = document.createElement('div'); c.className = 'count'; c.innerHTML = `<b>${i}</b>`;
      document.body.appendChild(c); setTimeout(() => c.remove(), Math.max(200, T(900)));
    }, (i - 1) * total / n);
  }
}
function mateHTML(sym, key, cls = '') { return `<div class="mate ${cls}" data-k="${key}"><svg class="pic" viewBox="0 0 100 100" style="color:${SYM_COLOR[sym] || ''}"><use href="#${sym}"/></svg><span class="snd"></span></div>`; }
function setMates(html) { matesEl.innerHTML = html || ''; matesEl.classList.remove('two'); $('#scene').classList.toggle('duo', !!html); }

function renderOptions(item, n) {
  const opts = shuffle(itemOptions(LANG, item, n));
  $('#screen-game').dataset.n = String(opts.length);
  optionsEl.innerHTML = opts.map(o => {
    const col = o.color || SYM_COLOR[o.sym] || '';
    return `<button class="opt" type="button" data-correct="${o.correct ? 1 : 0}" data-key="${esc(o.key)}" data-sym="${o.sym}" ${col ? `data-color="${col}"` : ''} aria-label="${esc(o.label)}"><span class="plate"><svg viewBox="0 0 100 100" aria-hidden="true" style="color:${col}"><use href="#${o.sym}"/></svg></span><span>${esc(o.label)}</span></button>`;
  }).join('');
  optionsEl.hidden = false; panelEl.hidden = true;
  optionsEl.classList.remove('off');
  optionsEl.classList.add('locked', 'waiting');
  S.accepting = false;
}
function hideOptions() { S.accepting = false; optionsEl.hidden = false; optionsEl.classList.add('off', 'locked'); optionsEl.classList.remove('waiting'); }
function lockOptions() { S.accepting = false; optionsEl.classList.add('locked'); }
function unlockOptions() { optionsEl.classList.remove('locked', 'waiting'); S.accepting = true; }
function hint() { const b = optionsEl.querySelector('.opt[data-correct="1"]'); if (b) b.classList.add('hint'); }
function pick(btn) { if (!S.accepting || !S.onPick || !btn || btn.classList.contains('gone')) return; S.onPick(btn); }
optionsEl.addEventListener('pointerdown', e => { if (e.isPrimary === false) return; pick(e.target.closest('.opt')); });
optionsEl.addEventListener('click', e => { if (e.detail === 0) pick(e.target.closest('.opt')); });

function showPanel(sym, title, text, goLabel) {
  hideOptions(); optionsEl.hidden = true;
  $('#panelIcon').setAttribute('href', '#' + sym);
  $('#panelTitle').textContent = title;
  $('#panelText').textContent = text;
  const go = $('#panelGo');
  go.hidden = !goLabel; go.textContent = goLabel || ''; go.disabled = true;
  panelEl.hidden = false;
}
function hidePanel() { panelEl.hidden = true; optionsEl.hidden = false; }
function waitPanelGo(tok) {
  return new Promise(resolve => {
    const go = $('#panelGo');
    const done = () => { go.removeEventListener('click', done); S.cancelWait = null; resolve(); };
    go.disabled = false; go.addEventListener('click', done); S.cancelWait = done;
    if (!alive(tok)) done();
  });
}

/* Scaffolded answer: wrong → Koko asks again; with three cards the wrong one leaves; after two misses or a long pause the answer glows. */
function waitForCorrect(item, tok, ask) {
  return new Promise(resolve => {
    let wrongs = 0, idles = 0, idleTimer = null, settled = false;
    const done = btn => { if (settled) return; settled = true; clearTimeout(idleTimer); S.onPick = null; S.cancelWait = null; resolve({ first: wrongs === 0, btn }); };
    const arm = () => { clearTimeout(idleTimer); idleTimer = setTimeout(onIdle, T(IDLE_MS)); };
    const reask = async () => { setMood(K.game, 'idle'); await say(item.id + '_ask', ask); };
    async function onIdle() {
      if (!alive(tok) || settled) return done(null);
      idles++;
      if (idles > 2) { hint(); return; }
      lockOptions(); await reask();
      if (!alive(tok) || settled) return done(null);
      if (idles >= 2) hint();
      unlockOptions(); arm();
    }
    S.onPick = async btn => {
      lockOptions(); clearTimeout(idleTimer);
      if (btn.dataset.correct === '1') {
        btn.classList.remove('hint'); btn.classList.add('right');
        $$('.opt', optionsEl).forEach(o => { if (o !== btn) o.classList.add('fade'); });
        return done(btn);
      }
      wrongs++;
      const remaining = $$('.opt:not(.gone)', optionsEl).length;
      if (remaining > 2) btn.classList.add('gone');
      else { btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake'); }
      setMood(K.game, 'wow');
      await say('oops', SAY[LANG].oops);
      if (!alive(tok) || settled) return done(null);
      await reask();
      if (!alive(tok) || settled) return done(null);
      if (wrongs >= 2) hint();
      unlockOptions(); arm();
    };
    S.cancelWait = () => done(null);
    unlockOptions(); arm();
  });
}

/* A picture leaves the card and travels to where it belongs. */
function flyIcon(fromEl, sym, color, to) {
  return new Promise(res => {
    if (!fromEl || !to) return res();
    const r = fromEl.getBoundingClientRect();
    const d = document.createElement('div');
    d.className = 'flyer';
    Object.assign(d.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', color: color || '' });
    d.innerHTML = `<svg viewBox="0 0 100 100"><use href="#${sym}"/></svg>`;
    document.body.appendChild(d);
    const dx = to.left + to.width / 2 - (r.left + r.width / 2), dy = to.top + to.height / 2 - (r.top + r.height / 2), sc = to.width / Math.max(1, r.width);
    let fin = false; const end = () => { if (fin) return; fin = true; d.remove(); res(); };
    try {
      const a = d.animate([
        { transform: 'translate(0,0) scale(1)' },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 90}px) scale(${(1 + sc) / 2 + 0.15}) rotate(-8deg)`, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(${sc})` }
      ], { duration: T(700), easing: 'ease-in-out', fill: 'forwards' });
      a.onfinish = end;
    } catch (e) { end(); }
    setTimeout(end, T(700) + 250);
  });
}

/* ---------- one question ---------- */
function setupItem(item) {
  wearClear(); setMates('');
  if (item.cat === 'animals') setMates(mateHTML(SYM[item.show], item.show, 'enter'));
  else if (item.cat === 'clothes') wearAdd(item.thing, SYM[item.thing], PLACE[item.thing][item.wrong]);
  else if (item.cat === 'home') {
    if (item.prop) wearAdd('prop', SYM[item.prop], PLACE[item.prop]);
    wearAdd('held', SYM[item.wrong], PLACE[item.at]);
  } else if (item.cat === 'colors') wearAdd('held', SYM[item.thing], PLACE.wing, { color: COLORS[item.wrong] });
}
async function resolveItem(item, btn) {
  const plate = btn && btn.querySelector('.plate svg');
  if (item.cat === 'animals') {
    const ph = document.createElement('div'); ph.className = 'mate'; ph.style.visibility = 'hidden'; matesEl.appendChild(ph); matesEl.classList.add('two');
    await flyIcon(plate, SYM[item.target], '', ph.getBoundingClientRect());
    ph.remove();
    matesEl.insertAdjacentHTML('beforeend', mateHTML(SYM[item.target], item.target, 'enter'));
  } else if (item.cat === 'clothes') {
    const g = wearGet(item.thing); if (g) g.style.transform = wTf(PLACE[item.thing][item.right]);
    await wait(T(500));
  } else if (item.cat === 'home') {
    const old = wearGet('held'), p = PLACE[item.at];
    if (old) old.classList.add('out');
    await flyIcon(plate, SYM[item.right], SYM_COLOR[SYM[item.right]], kokoRect(p));
    if (old) old.remove();
    wearAdd('held', SYM[item.right], p, { back: item.right === 'bed', pop: true });
  } else if (item.cat === 'colors') {
    const g = wearGet('held'); if (g) g.style.color = COLORS[item.right];
    await wait(T(500));
  }
}
function soundBubbles(item, tok) {
  if (item.cat !== 'animals') return;
  const A = ANIMAL[LANG], put = (k, delay) => setTimeout(() => {
    if (!alive(tok)) return;
    const s = matesEl.querySelector(`.mate[data-k="${k}"] .snd`);
    if (s) { s.textContent = A[k][2]; s.classList.add('on'); }
  }, delay);
  put(item.target, T(700)); put(item.show, T(2600));
}
async function playItem(item, tok) {
  const lines = itemLines(LANG, item);
  hideOptions(); setupItem(item); setMood(K.game, 'confused');
  await say(item.id + '_say', lines[0]); if (!alive(tok)) return;
  renderOptions(item, optionCount(item)); setMood(K.game, 'idle');
  await say(item.id + '_ask', lines[1]); if (!alive(tok)) return;
  const res = await waitForCorrect(item, tok, lines[1]); if (!alive(tok)) return;
  Learn.record(LANG, item.id, res.first);
  S.plan.played.push({ item, first: res.first });
  await resolveItem(item, res.btn); if (!alive(tok)) return;
  setMood(K.game, 'happy'); soundBubbles(item, tok);
  await say(item.id + '_yes', lines[2]); if (!alive(tok)) return;
  S.done++; renderProgress();
  await wait(T(500));
}

/* ---------- the session ---------- */
function greetText() { return SET.name ? SAY[LANG].greetName(SET.name) : SAY[LANG].greet; }
function clockStart() { S.clock = Date.now(); }
function clockStop() { if (S.clock) { Learn.addMs(Date.now() - S.clock); S.clock = 0; } }

async function startSession() {
  stopAll();
  const tok = S.token;
  S.plan = planSession();
  const plan = S.plan;
  S.startedAt = Date.now(); S.done = 0;
  S.total = plan.rounds.reduce((n, r) => n + r.items.length, 0) + 2;
  renderProgress(); setChip(null); setMates(''); wearClear(); hideOptions(); panelEl.hidden = true; optionsEl.innerHTML = '';
  $('#bubble').textContent = '';
  setWorld(plan.rounds[0].cat.world); setTint(plan.rounds[0].cat.tint);
  setMood(K.game, 'idle'); setAct(K.game, 'flyin');
  show('game');
  AE.unlock(); primeTTS(); requestWake(); clockStart();
  const ids = ['greet', 'oops', 'recall', 'recall_yes', 'bye', 'end', 'mv_' + plan.move, 'mv_count', 'mv_done'];
  plan.rounds.forEach(r => { ids.push('r_' + r.cat.id, 'talk_' + r.cat.id); r.items.forEach(it => ids.push(it.id + '_say', it.id + '_ask', it.id + '_yes')); });
  preloadPack(ids);
  setTimeout(() => { if (alive(tok)) setAct(K.game, null); }, Math.max(300, T(1200)));
  await say('greet', greetText(), { plain: SAY[LANG].greet }); if (!alive(tok)) return;
  for (let i = 0; i < plan.rounds.length; i++) {
    const r = plan.rounds[i];
    setWorld(r.cat.world); setTint(r.cat.tint); setChip(r.cat); setMates(''); wearClear(); hideOptions(); setMood(K.game, 'idle');
    showBadge(r.cat.icon, U().cat[r.cat.id]);
    await say('r_' + r.cat.id, SAY[LANG]['r_' + r.cat.id]); if (!alive(tok)) return;
    for (const item of r.items) { await playItem(item, tok); if (!alive(tok)) return; }
    await talkTime(r.cat, tok); if (!alive(tok)) return;
    if (i === plan.moveAfter && plan.rounds.length > 1) { await moveBreak(plan.move, tok); if (!alive(tok)) return; }
  }
  await recall(plan, tok); if (!alive(tok)) return;
  setMates(''); wearClear(); hideOptions(); setChip(null); setMood(K.game, 'happy');
  await say('bye', SAY[LANG].bye); if (!alive(tok)) return;
  await wait(T(500)); if (!alive(tok)) return;
  finish(plan, tok);
}

async function talkTime(cat, tok) {
  setMates(''); wearClear(); setMood(K.game, 'idle');
  showPanel('s-talk', U().talkTitle, U().talkTip[cat.id], U().cont);
  await say('talk_' + cat.id, SAY[LANG]['talk_' + cat.id]); if (!alive(tok)) return;
  setAct(K.game, 'listen');
  await waitPanelGo(tok);
  setAct(K.game, null); hidePanel();
}

async function moveBreak(move, tok) {
  setMates(''); wearClear(); setChip(null); setWorld('meadow'); setTint('#E4F7D9'); setMood(K.game, 'happy');
  showPanel('s-foot', U().moveTitle, U().moveTip, null);
  await say('mv_' + move, SAY[LANG]['mv_' + move]); if (!alive(tok)) return;
  setMood(K.game, 'idle'); setAct(K.game, move);
  const counting = say('mv_count', SAY[LANG].mv_count);
  showCount(5, Math.max(1000, estimate(SAY[LANG].mv_count)));
  await counting; if (!alive(tok)) return;
  await wait(T(1500)); if (!alive(tok)) return;
  setAct(K.game, null); setMood(K.game, 'happy');
  await say('mv_done', SAY[LANG].mv_done); if (!alive(tok)) return;
  hidePanel();
}

/* Spaced retrieval: a short "do you remember?" from earlier in the game, missed words first. */
async function recall(plan, tok) {
  const missed = plan.played.filter(p => !p.first).map(p => p.item);
  const rest = shuffle(plan.played.filter(p => p.first).map(p => p.item));
  const cand = missed.concat(rest), picks = [];
  for (const it of cand) { if (picks.length >= 2) break; if (!picks.some(p => p.cat === it.cat)) picks.push(it); }
  for (const it of cand) { if (picks.length >= 2) break; if (!picks.includes(it)) picks.push(it); }
  if (!picks.length) return;
  setChip(null); setMates(''); wearClear(); hideOptions(); setWorld('sky'); setTint('#FFF0C2'); setMood(K.game, 'idle');
  showBadge('s-think', U().recallTitle);
  await say('recall', SAY[LANG].recall); if (!alive(tok)) return;
  for (const item of picks) {
    const lines = itemLines(LANG, item);
    setMates(item.cat === 'clothes' ? mateHTML(SYM[item.thing], item.thing, 'cue enter') : '');
    wearClear(); hideOptions();
    renderOptions(item, 2); setMood(K.game, 'idle');
    await say(item.id + '_ask', lines[1]); if (!alive(tok)) return;
    const res = await waitForCorrect(item, tok, lines[1]); if (!alive(tok)) return;
    Learn.record(LANG, item.id, res.first);
    setMood(K.game, 'happy');
    await say('recall_yes', SAY[LANG].recall_yes); if (!alive(tok)) return;
    S.done++; renderProgress();
    await wait(T(400));
  }
}

function finish(plan, tok) {
  clockStop(); releaseWake();
  Learn.addGame();
  const L = Learn.L(LANG);
  plan.rounds.forEach(r => { L.cats[r.cat.id] = Object.assign(L.cats[r.cat.id] || {}, { last: L.sessions }); });
  L.sessions++; Learn.save();
  const cats = plan.rounds.map(r => r.cat.id), last = store.get('lastMission', '');
  let mc = cats[Math.floor(Math.random() * cats.length)];
  if (mc === last && cats.length > 1) mc = cats.find(c => c !== last);
  store.set('lastMission', mc);
  const [mt, mx] = U().missions[mc];
  $('#missionTitle').textContent = mt; $('#missionText').textContent = mx;
  const seen = new Set();
  $('#wordList').innerHTML = plan.played.filter(p => !seen.has(p.item.id) && seen.add(p.item.id)).map(p => {
    const w = itemWord(LANG, p.item);
    return `<span class="wchip"><svg viewBox="0 0 100 100" aria-hidden="true" style="color:${w.color || SYM_COLOR[w.sym] || ''}"><use href="#${w.sym}"/></svg>${esc(w.label)}</span>`;
  }).join('');
  const mins = Math.max(1, Math.round((Date.now() - S.startedAt) / 60000));
  $('#playedFor').textContent = U().played(mins);
  $('#endBubble').textContent = '';
  setWorld('night'); setMood(K.end, 'idle'); show('end');
  say('end', SAY[LANG].end, { koko: K.end, bubble: $('#endBubble') }).then(() => { if (alive(tok)) setMood(K.end, 'sleep'); });
}

function exitToStart() { stopAll(); clockStop(); releaseWake(); panelEl.hidden = true; renderStart(); show('start'); }

/* ---------- wake lock ---------- */
async function requestWake() { try { if ('wakeLock' in navigator) S.wake = await navigator.wakeLock.request('screen'); } catch (e) { S.wake = null; } }
function releaseWake() { try { if (S.wake) S.wake.release(); } catch (e) {} S.wake = null; }

/* ---------- hold-to-activate (grown-ups) ---------- */
function holdable(el, action, ms = 1200) {
  let t = null;
  const cancel = () => { if (t) { clearTimeout(t); t = null; } el.classList.remove('holding'); };
  el.addEventListener('pointerdown', e => { if (e.button > 0) return; cancel(); el.classList.add('holding'); t = setTimeout(() => { t = null; el.classList.remove('holding'); action(); }, ms); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => el.addEventListener(ev, cancel));
  el.addEventListener('click', e => { if (e.detail === 0) action(); });
  el.addEventListener('contextmenu', e => e.preventDefault());
}

/* ---------- recordings (IndexedDB, this device only) ---------- */
const idb = {
  db: null,
  open() { return new Promise((res, rej) => { try { const r = indexedDB.open('koko', 1); r.onupgradeneeded = () => r.result.createObjectStore('rec'); r.onsuccess = () => { this.db = r.result; res(this.db); }; r.onerror = () => rej(r.error); } catch (e) { rej(e); } }); },
  async tx(mode, fn) { const db = this.db || await this.open(); return new Promise((res, rej) => { const tx = db.transaction('rec', mode); fn(tx.objectStore('rec')); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); },
  async all() { const db = this.db || await this.open(); return new Promise((res, rej) => { const out = new Map(); const rq = db.transaction('rec', 'readonly').objectStore('rec').openCursor(); rq.onsuccess = () => { const c = rq.result; if (c) { out.set(c.key, c.value); c.continue(); } else res(out); }; rq.onerror = () => rej(rq.error); }); },
  put(k, v) { return this.tx('readwrite', st => st.put(v, k)); },
  del(k) { return this.tx('readwrite', st => st.delete(k)); }
};
const OLD_IDS = { r1: 'r_animals', r2: 'r_clothes', r3: 'r_home', i1: 'a1', i2: 'a2', i3: 'a3', i4: 'c1', i5: 'c2', i6: 'c3', i7: 'h1', i8: 'h2', i9: 'h3' };
function migrateKey(k) {
  if (String(k).includes(':')) return k;
  const m = /^(i\d)_(say|ask|yes)$/.exec(k);
  if (m) return 'he:' + OLD_IDS[m[1]] + '_' + m[2];
  return 'he:' + (OLD_IDS[k] || k);
}
async function loadRecordings() {
  if (EMBED) return;
  try {
    const all = await idb.all();
    for (const [k, v] of all) {
      const nk = migrateKey(k);
      if (nk !== k) { try { await idb.put(nk, v); await idb.del(k); } catch (e) {} }
      if (v && v.buf) S.recs.set(nk, new Blob([v.buf], { type: v.type || 'audio/mp4' }));
    }
  } catch (e) {}
  updateVoiceUI();
}
const Rec = {
  mr: null, stream: null, id: null, timer: null,
  supported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); },
  async start(id) {
    if (this.mr) this.stop();
    recMsg('');
    try { this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } }); }
    catch (e) { recMsg(U().noMic, true); return; }
    let mr;
    try { mr = new MediaRecorder(this.stream); } catch (e) { recMsg(U().noRecDevice, true); this.stream.getTracks().forEach(t => t.stop()); return; }
    const chunks = [], key = LANG + ':' + id;
    this.mr = mr; this.id = id;
    mr.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    mr.onstop = async () => {
      const type = mr.mimeType || (chunks[0] && chunks[0].type) || 'audio/mp4';
      const blob = new Blob(chunks, { type });
      try { this.stream.getTracks().forEach(t => t.stop()); } catch (e) {}
      this.mr = null; this.id = null; this.stream = null;
      if (blob.size > 0) {
        S.recs.set(key, blob); AE.buffers.delete('rec:' + key);
        try { await idb.put(key, { buf: await blob.arrayBuffer(), type }); recMsg(U().saved); } catch (e) { recMsg(U().notSaved, true); }
      }
      renderRecList(); updateVoiceUI();
    };
    mr.start();
    this.timer = setTimeout(() => this.stop(), 8000);
    renderRecList();
  },
  stop() { clearTimeout(this.timer); if (this.mr && this.mr.state !== 'inactive') this.mr.stop(); }
};
function recMsg(t, warn) { const el = $('#recMsg'); if (!el) return; el.textContent = t; el.classList.toggle('warn', !!warn); }
function renderRecList() {
  const host = $('#recList'); if (!host) return;
  const groups = [];
  lineList(LANG).forEach(l => { let g = groups.find(x => x.name === l.group); if (!g) groups.push(g = { name: l.group, lines: [] }); g.lines.push(l); });
  const openNames = new Set($$('details[open]', host).map(d => d.dataset.g));
  host.innerHTML = groups.map((g, gi) => {
    const n = g.lines.filter(l => S.recs.has(LANG + ':' + l.id)).length;
    return `<details class="recgroup" data-g="${esc(g.name)}" ${openNames.has(g.name) || (!openNames.size && gi === 0) ? 'open' : ''}><summary>${esc(g.name)} · ${n}/${g.lines.length}</summary>${g.lines.map(l => {
      const has = S.recs.has(LANG + ':' + l.id), on = Rec.id === l.id;
      return `<div class="recrow" data-id="${l.id}"><div class="txt">${esc(l.text)}${has ? `<span class="ok">${esc(U().recorded)}</span>` : ''}</div><div class="acts">
        <button class="btn${on ? ' rec-on' : ''}" type="button" data-act="rec">${esc(on ? U().stop : U().rec)}</button>
        <button class="btn" type="button" data-act="play" ${has ? '' : 'disabled'}>${esc(U().playRec)}</button>
        <button class="btn" type="button" data-act="del" ${has ? '' : 'disabled'} aria-label="${esc(U().delAria)}">${esc(U().del)}</button></div></div>`;
    }).join('')}</details>`;
  }).join('');
}
$('#recList').addEventListener('click', async e => {
  const b = e.target.closest('button[data-act]'); if (!b) return;
  const id = b.closest('.recrow').dataset.id, key = LANG + ':' + id;
  if (b.dataset.act === 'rec') { if (Rec.id === id) Rec.stop(); else Rec.start(id); }
  else if (b.dataset.act === 'play') { const blob = S.recs.get(key); if (blob) { if (S.stopCurrent) S.stopCurrent(); playBlob(blob); } }
  else if (b.dataset.act === 'del') { S.recs.delete(key); AE.buffers.delete('rec:' + key); try { await idb.del(key); } catch (err) {} recMsg(U().deleted); renderRecList(); updateVoiceUI(); }
});

/* ---------- language and static text ---------- */
function tGet(path) { return path.split('.').reduce((o, k) => (o == null ? o : o[k]), U()); }
function applyText() {
  $$('[data-t]').forEach(el => { const v = tGet(el.dataset.t); if (typeof v === 'string') el.textContent = v; });
  $$('[data-ta]').forEach(el => { const v = tGet(el.dataset.ta); if (typeof v === 'string') el.setAttribute('aria-label', v); });
}
function applyLang(lang, persist = true) {
  if (!LANGS[lang]) return;
  if (lang !== LANG) stopAll();
  LANG = lang; if (persist) store.set('lang', lang);
  const dir = LANGS[lang].dir;
  document.documentElement.lang = lang; document.documentElement.dir = dir;
  $('#app').setAttribute('dir', dir); $('#app').setAttribute('lang', lang);
  document.title = U().docTitle;
  S.ttsBroken = 0;
  applyText();
  renderStart();
  loadPack(lang);
  if (!$('#sheet').hidden) renderSheet();
  updateVoiceUI();
}

/* ---------- start screen ---------- */
function resting() { return SET.limit > 0 && Learn.day().games >= SET.limit; }
function renderStart() {
  $('#langs').innerHTML = LANG_ORDER.map(l => `<button type="button" data-lang="${l}" lang="${l}" aria-pressed="${l === LANG}">${LANGS[l].name}</button>`).join('');
  const meta = U().meta.slice(); if (SET.length === 'short') meta[2] = U().metaShort;
  $('#meta').innerHTML = meta.map(m => `<span>${esc(m)}</span>`).join('');
  const rest = resting();
  $('#rest').hidden = !rest; $('#playBtn').hidden = rest; $('#meta').hidden = rest;
  if (rest) { const d = Learn.day(); $('#restText').textContent = U().restText(d.games, Math.max(1, Math.round(d.ms / 60000))); }
  setMood(K.start, rest ? 'sleep' : 'idle');
  if (!$('#screen-start').hidden) { setWorld(rest ? 'night' : 'sky'); setTint('#FFE6B3'); }
  updateVoiceUI();
}
$('#langs').addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (b) applyLang(b.dataset.lang); });

/* ---------- grown-ups sheet ---------- */
let tab = 'together';
function voiceStatus() {
  const hasTTS = 'speechSynthesis' in window, v = curVoice();
  if (PACK[LANG]) return [U().vPack, false];
  if (!hasTTS) return [U().vNoTTS, true];
  if (v) return [U().vDevice(v.name), false];
  if (V.count > 0) return [U().vNone, true];
  return [U().vTrying, false];
}
function updateVoiceUI() {
  const noVoice = (!('speechSynthesis' in window) || knownNoVoice()) && !PACK[LANG];
  const anyRec = Array.from(S.recs.keys()).some(k => k.startsWith(LANG + ':'));
  const note = $('#voiceNote'); if (note) note.hidden = !(noVoice && !anyRec) || resting();
  const st = $('#voiceStatus'); if (!st) return;
  const [msg, warn] = voiceStatus(); st.textContent = msg; st.classList.toggle('warn', warn);
  const v = curVoice();
  const tips = $('#voiceTips'); if (tips) tips.hidden = !!PACK[LANG] || (v && voiceScore(v) >= 30);
}
function renderVoiceSelect() {
  const sel = $('#voiceSel'); if (!sel) return;
  const list = V.by[LANG] || [];
  $('#voiceField').hidden = list.length === 0;
  sel.innerHTML = list.map((v, i) => `<option value="${esc(v.voiceURI)}">${esc(v.name)}${i === 0 ? ' ' + esc(U().recommended) : ''}</option>`).join('');
  const cv = curVoice(); if (cv) sel.value = cv.voiceURI;
}
function renderTogether() {
  $('#howList').innerHTML = U().how.map(h => `<li>${esc(h)}</li>`).join('');
  $('#whyList').innerHTML = U().why.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('');
  $('#installTip').hidden = EMBED;
}
function renderProgressPane() {
  const d = Learn.day(), w = Learn.week(), min = ms => Math.round(ms / 60000);
  $('#stats').innerHTML = `<div class="stat"><small>${esc(U().today)}</small><b>${esc(U().minN(min(d.ms)))}</b><span>${esc(U().gamesN(d.games))}</span></div><div class="stat"><small>${esc(U().week)}</small><b>${esc(U().minN(min(w.ms)))}</b><span>${esc(U().gamesN(w.g))}</span></div>`;
  $('#wordsPane').innerHTML = CATS.map(c => `<div class="wgroup"><h4>${esc(U().cat[c.id])}</h4>${c.items.map(i0 => {
    const it = Object.assign({ cat: c.id }, i0), w = itemWord(LANG, it), st = Learn.status(LANG, it.id);
    const others = LANG_ORDER.filter(l => l !== LANG).map(l => itemWord(l, it).label).join(' · ');
    return `<div class="wrow"><svg viewBox="0 0 100 100" aria-hidden="true" style="color:${w.color || SYM_COLOR[w.sym] || ''}"><use href="#${w.sym}"/></svg><div><div class="w1">${esc(w.label)}</div><div class="w2">${esc(others)}</div></div><span class="st ${st}">${esc(U().status[st])}</span></div>`;
  }).join('')}</div>`).join('');
}
function renderVoicePane() {
  renderVoiceSelect();
  $('#rate').value = String(SET.rate);
  const canRec = !EMBED && Rec.supported();
  $('#recArea').hidden = !canRec;
  $('#recEmbedNote').hidden = canRec;
  $('#recEmbedNote').textContent = EMBED ? U().recEmbed : U().recUnsupported;
  if (canRec) renderRecList();
  updateVoiceUI();
}
function renderSettingsPane() {
  $('#childName').value = SET.name; $('#childName').placeholder = U().namePh;
  $('#langSel').innerHTML = LANG_ORDER.map(l => `<option value="${l}">${LANGS[l].name}</option>`).join(''); $('#langSel').value = LANG;
  $('#lenSel').innerHTML = `<option value="short">${esc(U().lengthShort)}</option><option value="long">${esc(U().lengthLong)}</option>`; $('#lenSel').value = SET.length;
  $('#levelSel').innerHTML = `<option value="auto">${esc(U().levelAuto)}</option><option value="easy">${esc(U().levelEasy)}</option><option value="hard">${esc(U().levelHard)}</option>`; $('#levelSel').value = SET.level;
  $('#limitSel').innerHTML = [0, 1, 2, 3].map(n => `<option value="${n}">${esc(n ? U().limitN(n) : U().limitOff)}</option>`).join(''); $('#limitSel').value = String(SET.limit);
}
function renderSheet() {
  applyText();
  $$('#tabs [data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
  $$('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== tab; });
  ({ together: renderTogether, progress: renderProgressPane, voice: renderVoicePane, settings: renderSettingsPane })[tab]();
}
function openSheet() { stopAll(); clockStop(); $('#sheet').hidden = false; renderSheet(); $('#sheetClose').focus(); }
function closeSheet() {
  Rec.stop(); $('#sheet').hidden = true;
  if (!$('#screen-game').hidden) exitToStart(); else renderStart();
}
$('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (!b) return; tab = b.dataset.tab; Rec.stop(); renderSheet(); });
$('#sheetClose').addEventListener('click', closeSheet);
$('#sheet').addEventListener('click', e => { if (e.target.id === 'sheet') closeSheet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });
$('#childName').addEventListener('input', e => { SET.name = e.target.value.trim().slice(0, 20); saveSet(); });
$('#rate').addEventListener('input', e => { SET.rate = Number(e.target.value) || 0.92; saveSet(); });
$('#voiceSel').addEventListener('change', e => { store.set('voice.' + LANG, e.target.value); S.ttsBroken = 0; updateVoiceUI(); });
$('#langSel').addEventListener('change', e => applyLang(e.target.value));
$('#lenSel').addEventListener('change', e => { SET.length = e.target.value; saveSet(); });
$('#levelSel').addEventListener('change', e => { SET.level = e.target.value; saveSet(); });
$('#limitSel').addEventListener('change', e => { SET.limit = Number(e.target.value) || 0; saveSet(); });
$('#testVoice').addEventListener('click', () => { stopAll(); AE.unlock(); primeTTS(); say('greet', greetText(), { koko: K.start, bubble: document.createElement('div'), plain: SAY[LANG].greet }); });
let resetArmed = 0;
$('#resetBtn').addEventListener('click', () => {
  const b = $('#resetBtn');
  if (Date.now() - resetArmed < 3500) { Learn.reset(); resetArmed = 0; b.textContent = U().reset; b.classList.remove('warn'); $('#resetMsg').textContent = U().resetDone; renderProgressPane(); return; }
  resetArmed = Date.now(); b.textContent = U().resetConfirm; b.classList.add('warn');
  setTimeout(() => { if (Date.now() - resetArmed >= 3400) { b.textContent = U().reset; b.classList.remove('warn'); } }, 3600);
});

/* ---------- wiring ---------- */
$('#playBtn').addEventListener('click', () => startSession());
holdable($('#parentBtnStart'), openSheet);
holdable($('#parentBtnEnd'), openSheet);
holdable($('#homeBtn'), exitToStart);
holdable($('#againBtn'), () => startSession());
holdable($('#restHold'), () => startSession());
$('#panelGo').addEventListener('pointerdown', e => e.stopPropagation());

document.addEventListener('contextmenu', e => { if (!e.target.closest('.sheet')) e.preventDefault(); });
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} clockStop(); }
  else if (!$('#screen-game').hidden) { requestWake(); clockStart(); }
});

applyLang(LANG, false);
setWorld(resting() ? 'night' : 'sky');
initVoices();
renderProgress();
loadRecordings();

if (!EMBED && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}

window.__koko = { markup: kokoMarkup, S, SET, Learn, K, PACK, AE, show, setMood, applyLang, lineList, planSession, voiceScore, get lang() { return LANG; } };
