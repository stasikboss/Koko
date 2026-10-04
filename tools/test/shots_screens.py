"""Screenshots of the screens around the game: start, talk time, end screen and the grown-ups sheet tabs.
Usage: python3 tools/test/shots_screens.py OUT_DIR [--langs he,ru,en] [--vp phone]"""
import argparse, json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from serve import serve
from shots import VPS

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('out'); ap.add_argument('--langs', default='he,ru,en'); ap.add_argument('--vp', default='phone')
    a = ap.parse_args(); out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    srv, url = serve()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for lang in a.langs.split(','):
            ctx = b.new_context(viewport=VPS[a.vp], device_scale_factor=2)
            ctx.add_init_script(f"window.__kokoTest = {{ speed: 0.04, idle: 60000, cats: ['food', 'body'], per: 3 }}; localStorage.setItem('koko.lang', JSON.stringify('{lang}'));")
            pg = ctx.new_page(); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e)))
            pg.goto(url + 'index.html'); pg.wait_for_timeout(500)
            pg.screenshot(path=str(out / f'{lang}-{a.vp}-start.png'))
            pg.evaluate("() => document.querySelector('#playBtn').click()")
            talk = move = False
            for _ in range(3000):
                st = pg.evaluate("() => ({ end: !document.querySelector('#screen-end').hidden, acc: window.__koko.S.accepting, go: !document.querySelector('#panel').hidden && !document.querySelector('#panelGo').hidden && !document.querySelector('#panelGo').disabled, panel: !document.querySelector('#panel').hidden && document.querySelector('#panelGo').hidden })")
                if st['end']: break
                if st['panel'] and not move:
                    move = True; pg.wait_for_timeout(300); pg.screenshot(path=str(out / f'{lang}-{a.vp}-move.png'))
                if st['go']:
                    if not talk:
                        talk = True; pg.screenshot(path=str(out / f'{lang}-{a.vp}-talk.png'))
                    pg.click('#panelGo')
                elif st['acc']:
                    sel = '#kokoGameSlot .zone.on[data-correct="1"]' if pg.locator('#kokoGameSlot .zone.on').count() else '#options .opt[data-correct="1"]'
                    pg.locator(sel).first.click()
                pg.wait_for_timeout(40)
            pg.wait_for_timeout(1500)
            pg.screenshot(path=str(out / f'{lang}-{a.vp}-end.png'))
            pg.evaluate("() => document.querySelector('#parentBtnEnd').click()")
            for tab in ['together', 'progress', 'voice', 'settings']:
                pg.evaluate(f"() => document.querySelector('#tabs [data-tab=\"{tab}\"]').click()"); pg.wait_for_timeout(200)
                pg.screenshot(path=str(out / f'{lang}-{a.vp}-sheet-{tab}.png'))
            print(lang, 'errors:', errs)
            ctx.close()
        b.close()
    srv.shutdown()

if __name__ == '__main__':
    main()
