"""Renders every action sound offline and checks it is audible, short and never clips.
Usage: python3 tools/test/test_sfx.py"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from serve import serve

JS = """async () => {
  const k = window.__koko, out = {};
  for (const name of Object.keys(k.SFX.lib)) {
    const ctx = new OfflineAudioContext(1, 44100 * 2.5, 44100);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -22; comp.knee.value = 14; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.25;
    comp.connect(ctx.destination);
    const saved = { ctx: k.AE.ctx, out: k.AE.out };
    k.AE.ctx = ctx; k.AE.out = comp; k.SFX.bus = null; k.SFX.noiseBuf = null;
    k.SFX.lib[name](0.01);
    k.AE.ctx = saved.ctx; k.AE.out = saved.out; k.SFX.bus = null; k.SFX.noiseBuf = null;
    const buf = await ctx.startRendering(), d = buf.getChannelData(0);
    let peak = 0, sum = 0, last = 0;
    for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; sum += v * v; if (v > 0.003) last = i; }
    out[name] = { peak: +peak.toFixed(3), rms: +Math.sqrt(sum / d.length).toFixed(4), len: +(last / 44100).toFixed(2) };
  }
  return out;
}"""

srv, url = serve()
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url + 'index.html'); pg.wait_for_timeout(300)
    res = pg.evaluate(JS)
    bad = []
    for name, r in res.items():
        ok = 0.02 < r['peak'] < 0.9 and r['len'] < 2.2
        print(f"{'ok ' if ok else 'BAD'} {name:8} peak {r['peak']:.3f} rms {r['rms']:.4f} length {r['len']}s")
        if not ok: bad.append(name)
    b.close()
srv.shutdown()
if bad or errs:
    print('failed:', bad, errs); sys.exit(1)
print('all sounds ok')
