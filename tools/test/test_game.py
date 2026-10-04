"""End-to-end test: plays whole games in every language with every round, the way a child would
(tapping cards, tapping Koko, sometimes wrong first), and fails on any page error or stuck state.
Usage: python3 tools/test/test_game.py   (run tools/build.py first)"""
import json, random, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from serve import serve

GAMES = [['animals', 'clothes', 'home', 'colors'], ['food', 'vehicles', 'feelings', 'body']]
LANGS = ['he', 'ru', 'en']

STATE_JS = """() => {
  const q = s => document.querySelector(s), k = window.__koko;
  if (!q('#screen-end').hidden) return {s: 'end'};
  if (k.S.accepting) {
    const zones = [...document.querySelectorAll('#kokoGameSlot .zone.on:not(.gone)')];
    if (zones.length) return {s: 'zones', keys: [...new Set(zones.map(z => z.dataset.key))], right: zones.find(z => z.dataset.correct === '1').dataset.key};
    const opts = [...document.querySelectorAll('#options .opt:not(.gone)')];
    if (opts.length) return {s: 'cards', keys: opts.map(o => o.dataset.key), right: opts.find(o => o.dataset.correct === '1').dataset.key};
  }
  const go = q('#panelGo');
  if (!q('#panel').hidden && !go.hidden && !go.disabled) return {s: 'go'};
  return {s: 'wait', bubble: q('#bubble').textContent};
}"""

def play(pg, lang, cats, wrong_rate, log):
    pg.evaluate("() => document.querySelector('#playBtn').click()")
    t0, answered, wrongs, last_change, last_bubble = time.time(), 0, 0, time.time(), ''
    asked = set()
    while True:
        st = pg.evaluate(STATE_JS)
        if st['s'] == 'end':
            return answered, wrongs
        if st.get('bubble', '') != last_bubble:
            last_bubble, last_change = st.get('bubble', ''), time.time()
        if time.time() - last_change > 25:
            raise AssertionError(f'{lang} {cats}: stuck, bubble={last_bubble!r}')
        if time.time() - t0 > 240:
            raise AssertionError(f'{lang} {cats}: game took too long')
        if st['s'] in ('cards', 'zones'):
            key = st['right']
            sig = pg.evaluate("() => document.querySelector('#bubble').textContent")
            if sig not in asked and random.random() < wrong_rate and len(st['keys']) > 1:
                key = random.choice([k for k in st['keys'] if k != st['right']]); wrongs += 1
            asked.add(sig)
            sel = f'#kokoGameSlot .zone.on[data-key="{key}"]' if st['s'] == 'zones' else f'#options .opt[data-key="{key}"]'
            pg.locator(sel).first.click(timeout=3000)
            if key == st['right']:
                answered += 1
            last_change = time.time()
        elif st['s'] == 'go':
            pg.click('#panelGo'); last_change = time.time()
        pg.wait_for_timeout(40)

def main():
    random.seed(7)
    srv, url = serve()
    fails = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        for lang in LANGS:
            for cats in GAMES:
                for vp in [{'width': 390, 'height': 844}, {'width': 1180, 'height': 820}]:
                    ctx = b.new_context(viewport=vp)
                    ctx.add_init_script(f"window.__kokoTest = {{ speed: 0.04, idle: 900, cats: {json.dumps(cats)}, per: 5 }}; localStorage.setItem('koko.lang', JSON.stringify('{lang}'));")
                    pg = ctx.new_page(); errs = []
                    pg.on('pageerror', lambda e: errs.append(str(e)))
                    pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' else None)
                    pg.goto(url + 'index.html'); pg.wait_for_timeout(300)
                    try:
                        answered, wrongs = play(pg, lang, cats, 0.3, None)
                        words = pg.evaluate("() => document.querySelectorAll('#wordList .wchip').length")
                        learn = pg.evaluate(f"() => Object.keys(window.__koko.Learn.L('{lang}').items).length")
                        assert words >= 15, f'end screen words: {words}'
                        assert not errs, errs
                        print(f'ok  {lang} {vp["width"]}x{vp["height"]} {"+".join(cats)}: {answered} answers, {wrongs} wrong first, {words} words, {learn} items learned')
                    except Exception as e:
                        fails.append(f'{lang} {cats} {vp}: {e} {errs}')
                        print('FAIL', fails[-1])
                        pg.screenshot(path=f'/tmp/koko-fail-{lang}-{cats[0]}.png')
                    ctx.close()
        b.close()
    srv.shutdown()
    if fails:
        print(f'{len(fails)} failed'); sys.exit(1)
    print('all games passed')

if __name__ == '__main__':
    main()
