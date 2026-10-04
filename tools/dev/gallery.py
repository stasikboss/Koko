"""Dev gallery: every symbol, Koko's moods and every world, rendered to PNGs for review.
Usage: python3 tools/dev/gallery.py <out_dir>"""
import sys, os
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
js = '\n'.join((ROOT / 'src' / f).read_text(encoding='utf-8') for f in ['paint.js', 'symbols.js', 'koko.js', 'worlds.js'])
js = '\n'.join(l for l in js.split('\n') if not l.startswith('if (typeof module'))
css = (ROOT / 'src' / 'koko.css').read_text(encoding='utf-8')
html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
body{{margin:0;font:12px system-ui;background:#F3F0E8}} .grid{{display:grid;grid-template-columns:repeat(8,150px);gap:8px;padding:10px}}
.c{{background:#fff;border-radius:14px;padding:6px;text-align:center}} .c svg{{width:136px;height:136px}}
.k{{display:inline-block;width:240px;height:280px;background:#CFE8EE;margin:6px;border-radius:12px;vertical-align:top}} .k svg{{width:100%;height:100%}}
.w{{display:inline-block;width:300px;height:300px;margin:6px;border-radius:12px;overflow:hidden;position:relative}} .w svg{{width:100%;height:100%}} .w b{{position:absolute;left:6px;top:6px;background:#fff;padding:2px 6px;border-radius:6px}}
{css}</style></head><body><script>{js}
document.body.insertAdjacentHTML('afterbegin', spriteMarkup());
const ids = SYMS.map(s => s.match(/id="([^"]+)"/)[1]);
document.body.insertAdjacentHTML('beforeend', '<div class="grid" id="g">' + ids.map(i => `<div class="c"><svg viewBox="0 0 100 100"><use href="#${{i}}"/></svg><div>${{i}}</div></div>`).join('') + '</div>');
document.body.insertAdjacentHTML('beforeend', '<div id="kk">' + ['idle','happy','confused','wow','sad','sleep','sleepy'].map(m => `<div class="k">${{kokoMarkup().replace('data-mood="idle"', 'data-mood="'+m+'"')}}</div>`).join('') + '</div>');
document.body.insertAdjacentHTML('beforeend', '<div id="ww">' + Object.keys(WORLDS).map(k => `<div class="w"><svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax slice">${{WORLDS[k]()}}</svg><b>${{k}}</b></div>`).join('') + '</div>');
</script></body></html>"""
(OUT / 'gallery.html').write_text(html, encoding='utf-8')
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1300, 'height': 900})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto((OUT / 'gallery.html').as_uri()); pg.wait_for_timeout(600)
    pg.locator('#g').screenshot(path=str(OUT / 'symbols.png'))
    pg.locator('#kk').screenshot(path=str(OUT / 'koko.png'))
    pg.locator('#ww').screenshot(path=str(OUT / 'worlds.png'))
    print('errors', errs)
    b.close()
