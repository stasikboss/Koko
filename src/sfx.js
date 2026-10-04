/* Koko action sounds: tiny Web Audio sketches, synthesised on the spot (no files, works offline).
   Each one illustrates something that happens on screen: food is eaten, a car honks, a bell rings.
   There is no music and no "well done" jingle. Played quietly through the same compressor as Koko's voice. */

const SFX = {
  bus: null, noiseBuf: null,
  ready() { return SET.sfx !== false && AE.ctx && AE.out && AE.ctx.state !== 'closed'; },
  out() {
    if (!this.bus) { this.bus = AE.ctx.createGain(); this.bus.gain.value = 0.34; this.bus.connect(AE.out); }
    return this.bus;
  },
  noise() {
    if (!this.noiseBuf) {
      const c = AE.ctx, b = c.createBuffer(1, c.sampleRate, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      this.noiseBuf = b;
    }
    return this.noiseBuf;
  },
  env(t, dur, vol, att = 0.01) {
    const g = AE.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(this.out());
    return g;
  },
  /* an oscillator gliding from f0 to f1 */
  tone(t, dur, f0, f1, vol, type = 'sine', att = 0.008, into = null) {
    const o = AE.ctx.createOscillator(), g = into || this.env(t, dur, vol, att);
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    o.connect(g); o.start(t); o.stop(t + dur + 0.05);
    return o;
  },
  /* filtered noise, the filter sweeping from f0 to f1 */
  hiss(t, dur, vol, type, f0, f1, q = 1, att = 0.01) {
    const s = AE.ctx.createBufferSource(), f = AE.ctx.createBiquadFilter(), g = this.env(t, dur, vol, att);
    s.buffer = this.noise(); s.loop = true;
    f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    s.connect(f); f.connect(g); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
    return g;
  },
  lib: {
    tap(t) { SFX.tone(t, 0.07, 700, 520, 0.22); },
    pop(t) { SFX.tone(t, 0.11, 380, 900, 0.3); },
    whoosh(t) { SFX.hiss(t, 0.42, 0.32, 'bandpass', 420, 2400, 1.1, 0.14); },
    land(t) { SFX.tone(t, 0.16, 190, 85, 0.42); SFX.hiss(t, 0.06, 0.18, 'lowpass', 700, 500); },
    chomp(t) { [0, 0.22, 0.44].forEach(d => { SFX.hiss(t + d, 0.08, 0.5, 'lowpass', 1100, 500, 0.7, 0.004); SFX.tone(t + d, 0.07, 150, 110, 0.25); }); },
    glug(t) { [0, 0.18, 0.36].forEach(d => SFX.tone(t + d, 0.1, 210, 360, 0.3)); },
    bubbles(t) { for (let i = 0; i < 7; i++) { const f = 520 + Math.random() * 600; SFX.tone(t + i * 0.075, 0.06, f, f * 1.7, 0.14); } },
    brush(t) {
      const g = SFX.hiss(t, 1.0, 0.16, 'bandpass', 3200, 3200, 1.6, 0.05);
      const lfo = AE.ctx.createOscillator(), d = AE.ctx.createGain();
      lfo.frequency.value = 8; d.gain.value = 0.1; lfo.connect(d); d.connect(g.gain); lfo.start(t); lfo.stop(t + 1.05);
    },
    swish(t) { SFX.hiss(t, 0.5, 0.26, 'bandpass', 900, 5200, 1.4, 0.12); SFX.tone(t + 0.1, 0.35, 600, 1200, 0.06); },
    flutter(t) {
      const g = SFX.hiss(t, 0.8, 0.22, 'bandpass', 1300, 900, 0.9, 0.05);
      const lfo = AE.ctx.createOscillator(), d = AE.ctx.createGain();
      lfo.frequency.value = 13; d.gain.value = 0.18; lfo.connect(d); d.connect(g.gain); lfo.start(t); lfo.stop(t + 0.85);
    },
    stomp(t) { [0, 0.26, 0.52, 0.78].forEach(d => SFX.tone(t + d, 0.14, 120, 58, 0.45)); },
    blink(t) { [0, 0.5].forEach(d => SFX.tone(t + d, 0.03, 1900, 1600, 0.06)); },
    wag(t) { [0, 0.3, 0.6].forEach(d => SFX.hiss(t + d, 0.16, 0.14, 'bandpass', 1500, 2600, 1.2, 0.04)); },
    nod(t) { [0, 0.34, 0.68].forEach(d => SFX.tone(t + d, 0.06, 420, 360, 0.12)); },
    /* things that go: each says its own word */
    car(t) {
      [0, 0.26].forEach(d => {
        const f = AE.ctx.createBiquadFilter(), g = SFX.env(t + d, 0.18, 0.16, 0.01);
        f.type = 'lowpass'; f.frequency.value = 1900; f.connect(g);
        SFX.tone(t + d, 0.18, 392, 392, 0, 'square', 0.01, f); SFX.tone(t + d, 0.18, 494, 494, 0, 'square', 0.01, f);
      });
    },
    train(t) {
      [0, 0.42].forEach(d => {
        const g = SFX.env(t + d, 0.36, 0.2, 0.05);
        [740, 932, 1109].forEach(fr => { const o = SFX.tone(t + d, 0.36, fr, fr * 0.985, 0, 'sine', 0.05, g); o.detune.value = Math.random() * 8; });
        SFX.hiss(t + d, 0.3, 0.06, 'highpass', 3000, 3000, 0.7, 0.05);
      });
    },
    boat(t) {
      [0, 0.62].forEach(d => {
        const f = AE.ctx.createBiquadFilter(), g = SFX.env(t + d, 0.5, 0.26, 0.06);
        f.type = 'lowpass'; f.frequency.value = 520; f.connect(g);
        SFX.tone(t + d, 0.5, 98, 96, 0, 'sawtooth', 0.06, f); SFX.tone(t + d, 0.5, 147, 145, 0, 'sawtooth', 0.06, f);
      });
    },
    bike(t) { [0, 0.3].forEach(d => { [2093, 3136, 4186].forEach((fr, i) => SFX.tone(t + d, 0.7 - i * 0.15, fr, fr, 0.09 / (i + 1), 'sine', 0.003)); }); },
    slide(t) {
      const o = SFX.tone(t, 1.5, 480, 1250, 0.09, 'sine', 0.1);
      const lfo = AE.ctx.createOscillator(), d = AE.ctx.createGain();
      lfo.frequency.value = 6; d.gain.value = 18; lfo.connect(d); d.connect(o.frequency); lfo.start(t); lfo.stop(t + 1.55);
    },
    splat(t) { SFX.hiss(t, 0.22, 0.5, 'lowpass', 900, 300, 0.8, 0.004); SFX.tone(t, 0.22, 130, 55, 0.35); }
  },
  play(name, delay = 0) {
    if (!this.ready() || !this.lib[name]) return;
    try { if (AE.ctx.state === 'suspended') AE.ctx.resume(); this.lib[name](AE.ctx.currentTime + 0.02 + delay / 1000); } catch (e) {}
  }
};
const sfx = (name, delay) => SFX.play(name, delay);
/* which sound goes with which part, thing or action */
const PART_SFX = { feet: 'stomp', eyes: 'blink', tail: 'wag', wings: 'flutter', head: 'nod' };
const USE_SFX = { toothbrush: 'brush', cup: 'glug', spoon: 'chomp', soap: 'bubbles' };
