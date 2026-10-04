"""Edge cases: a child who does not answer (Koko asks again, then the answer glows), leaving mid-game
and starting again, and the grown-ups settings. Usage: python3 tools/test/test_edges.py"""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from serve import serve

def wait_accepting(pg, ms=20000):
    pg.wait_for_function("() => window.__koko.S.accepting", timeout=ms)

srv, url = serve()
fails = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for cats in (['body'], ['colors']):
        ctx = b.new_context(viewport={'width': 390, 'height': 844})
        ctx.add_init_script(f"window.__kokoTest = {{ speed: 0.04, idle: 250, cats: {json.dumps(cats)}, per: 2 }}; localStorage.setItem('koko.lang', JSON.stringify('he'));")
        pg = ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url + 'index.html'); pg.wait_for_timeout(300)
        pg.evaluate("() => document.querySelector('#playBtn').click()")
        wait_accepting(pg)
        # no answer: Koko asks twice, then the right answer glows
        hint_sel = '#kokoGameSlot .zone.hint' if cats == ['body'] else '#options .opt.hint'
        try:
            pg.wait_for_selector(hint_sel, timeout=15000, state='attached')
            print(f'ok  {cats[0]}: no answer -> asked again -> answer glows')
        except Exception as e:
            fails.append(f'{cats}: no hint ({e})')
        # leave mid-game (home button, keyboard activation) and check the stage is clean
        pg.evaluate("() => document.querySelector('#homeBtn').click()")
        pg.wait_for_timeout(300)
        st = pg.evaluate("""() => ({ start: !document.querySelector('#screen-start').hidden,
            zoning: document.querySelector('#kokoGameSlot .koko').classList.contains('zoning'),
            touch: document.querySelector('#screen-game').classList.contains('touch'),
            wear: document.querySelector('#kokoGameSlot .wear').children.length, talking: !!document.querySelector('.koko.talking') })""")
        if not st['start'] or st['zoning'] or st['touch'] or st['wear'] or st['talking']:
            fails.append(f'{cats}: dirty stage after leaving: {st}')
        else:
            print(f'ok  {cats[0]}: leaving mid-game resets the stage')
        # play again to the end
        pg.evaluate("() => document.querySelector('#playBtn').click()")
        for _ in range(4000):
            if pg.evaluate("() => !document.querySelector('#screen-end').hidden"): break
            if pg.evaluate("() => window.__koko.S.accepting"):
                sel = '#kokoGameSlot .zone.on[data-correct="1"]' if pg.locator('#kokoGameSlot .zone.on').count() else '#options .opt[data-correct="1"]'
                pg.locator(sel).first.click()
            elif pg.evaluate("() => !document.querySelector('#panel').hidden && !document.querySelector('#panelGo').hidden && !document.querySelector('#panelGo').disabled"):
                pg.click('#panelGo')
            pg.wait_for_timeout(30)
        if not pg.evaluate("() => !document.querySelector('#screen-end').hidden"):
            fails.append(f'{cats}: second game did not finish')
        else:
            print(f'ok  {cats[0]}: second game finished')
        if errs: fails.append(f'{cats}: {errs}')
        ctx.close()
    # settings: action sounds off is saved
    ctx = b.new_context(); pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url + 'index.html'); pg.wait_for_timeout(300)
    pg.evaluate("() => document.querySelector('#parentBtnStart').click()")
    pg.evaluate("() => document.querySelector('#tabs [data-tab=\"settings\"]').click()")
    pg.select_option('#sfxSel', 'off')
    saved = pg.evaluate("() => JSON.parse(localStorage.getItem('koko.set')).sfx")
    if saved is not False or errs: fails.append(f'sfx setting not saved: {saved} {errs}')
    else: print('ok  action sounds can be turned off')
    ctx.close(); b.close()
srv.shutdown()
if fails:
    print('\n'.join(fails)); sys.exit(1)
print('all edge cases passed')
