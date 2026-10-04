"""Screenshots of every round at its key moments (Koko's mix-up, the question, the answer), for review.
Usage: python3 tools/test/shots.py OUT_DIR [--lang he] [--vp phone|tablet|small] [--cats food,body] [--per 1]"""
import argparse, json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from serve import serve

VPS = {'phone': {'width': 390, 'height': 844}, 'tablet': {'width': 1180, 'height': 820}, 'small': {'width': 360, 'height': 640}, 'land': {'width': 844, 'height': 390}, 'portrait-tablet': {'width': 820, 'height': 1180}}
ALL = ['animals', 'clothes', 'home', 'colors', 'food', 'vehicles', 'feelings', 'body']

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('out'); ap.add_argument('--lang', default='he'); ap.add_argument('--vp', default='phone')
    ap.add_argument('--cats', default=','.join(ALL)); ap.add_argument('--per', type=int, default=1)
    ap.add_argument('--phases', default='mix,ask,yes')
    a = ap.parse_args()
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    phases = a.phases.split(',')
    srv, url = serve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for cat in a.cats.split(','):
            ctx = b.new_context(viewport=VPS[a.vp], device_scale_factor=2)
            ctx.add_init_script(f"window.__kokoTest = {{ speed: 0.4, idle: 60000, cats: {json.dumps([cat])}, per: {a.per} }}; localStorage.setItem('koko.lang', JSON.stringify('{a.lang}'));")
            pg = ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto(url + 'index.html'); pg.wait_for_timeout(400)
            pg.evaluate("() => document.querySelector('#playBtn').click()")
            seen, t0 = set(), time.time()
            while time.time() - t0 < 90:
                st = pg.evaluate("() => { const S = window.__koko.S; return { id: S.item && S.item.id, ph: S.phase, acc: S.accepting, talk: !!document.querySelector('#kokoGameSlot .koko.talking'), panel: !document.querySelector('#panel').hidden }; }")
                if st['panel']:
                    break
                key = (st['id'], st['ph'])
                if st['id'] and st['ph'] in phases and key not in seen and (st['ph'] != 'ask' or st['acc']):
                    seen.add(key)
                    pg.wait_for_timeout(650 if st['ph'] != 'ask' else 250)
                    pg.screenshot(path=str(out / f"{a.lang}-{a.vp}-{cat}-{st['id']}-{st['ph']}.png"))
                if st['acc']:
                    sel = '#kokoGameSlot .zone.on[data-correct="1"]' if pg.locator('#kokoGameSlot .zone.on').count() else '#options .opt[data-correct="1"]'
                    pg.locator(sel).first.click()
                pg.wait_for_timeout(60)
            print(cat, 'shots:', len(seen), 'errors:', errs)
            ctx.close()
        b.close()
    srv.shutdown()

if __name__ == '__main__':
    main()
