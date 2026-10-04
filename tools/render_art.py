"""Renders the app icons and the social preview image (og.png) from the game's own art.
Usage: python3 tools/build.py && python3 tools/render_art.py"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent / 'test'))
from serve import serve

ROOT = Path(__file__).resolve().parent.parent

ICON = """(o) => {
  const k = window.__koko, div = document.createElement('div');
  div.id = 'art';
  div.style.cssText = `position:fixed;left:0;top:0;width:${o.size}px;height:${o.size}px;z-index:99;overflow:hidden;background:linear-gradient(#BFE6F2,#E8F6EE)`;
  const koko = k.markup().replace(/viewBox="[^"]+"/, `viewBox="${o.vb}"`).replace('xMidYMax meet', 'xMidYMid meet');
  div.innerHTML = `<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="72" cy="26" r="15" fill="#FFE27A" opacity=".8"/>
    <path d="M0 78 Q30 68 60 76 Q82 82 100 74 V100 H0Z" fill="#BFE0C5"/><path d="M0 88 Q34 82 64 88 Q84 92 100 86 V100 H0Z" fill="#A9D3AE"/></svg>
    <div style="position:absolute;inset:0">${koko}</div>`;
  document.body.appendChild(div);
  div.querySelector('.koko').style.cssText = 'width:100%;height:100%';
}"""

OG = """() => {
  const k = window.__koko, div = document.createElement('div');
  div.id = 'art';
  div.style.cssText = 'position:fixed;left:0;top:0;width:1200px;height:630px;z-index:99;overflow:hidden;font-family:var(--display)';
  div.innerHTML = `<svg viewBox="0 200 1000 525" preserveAspectRatio="xMidYMax slice" style="position:absolute;inset:0;width:100%;height:100%">${k.WORLDS.home()}</svg>
    <div style="position:absolute;left:40px;bottom:36px;width:430px;height:500px">${k.markup()}</div>
    <div style="position:absolute;right:48px;top:64px;width:600px;padding:34px 40px;border-radius:36px;background:rgba(255,253,247,.9);box-shadow:0 0 0 4px #fff,0 12px 0 4px rgba(34,48,92,.10),0 30px 60px rgba(34,48,92,.18);text-align:center" dir="rtl">
      <div style="font-weight:700;font-size:96px;line-height:1;color:#23A867">קוקו התוכי</div>
      <div style="font-weight:600;font-size:32px;margin-top:14px;color:#1E2B33;white-space:nowrap" dir="ltr">Попугай Коко · Koko the Parrot</div>
      <div style="font-weight:600;font-size:34px;margin-top:22px;color:#1E2B33">קוקו מתבלבל. אתם מתקנים.</div>
      <div style="font-family:var(--body);font-size:25px;margin-top:10px;color:#4F6470">משחק להורה וילד יחד · גילאי \u20662–3\u2069 · בלי פרסומות</div>
      <div style="display:flex;justify-content:center;gap:10px;margin-top:22px">${['s-cow','s-sock','s-banana','s-car','s-face-happy','s-bone'].map(s => `<svg viewBox="0 0 100 100" style="width:70px;height:70px"><use href="#${s}"/></svg>`).join('')}</div>
    </div>`;
  document.body.appendChild(div);
  const kk = div.querySelector('.koko'); kk.style.cssText = 'width:100%;height:100%';
}"""

srv, url = serve()
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, size, vb in [('icon-512', 512, '58 -14 284 284'), ('icon-192', 192, '58 -14 284 284'), ('apple-touch-icon', 180, '58 -14 284 284'), ('icon-maskable-512', 512, '6 -66 388 388')]:
        pg = b.new_page(viewport={'width': size, 'height': size})
        pg.goto(url + 'index.html'); pg.wait_for_timeout(400)
        pg.evaluate(ICON, {'size': size, 'vb': vb}); pg.wait_for_timeout(300)
        pg.locator('#art').screenshot(path=str(ROOT / 'icons' / f'{name}.png'))
        pg.close()
    pg = b.new_page(viewport={'width': 1200, 'height': 630})
    pg.goto(url + 'index.html'); pg.wait_for_timeout(600)
    pg.evaluate(OG); pg.wait_for_timeout(400)
    pg.locator('#art').screenshot(path=str(ROOT / 'og.png'))
    b.close()
srv.shutdown()
print('icons and og.png rendered')
