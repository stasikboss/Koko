"""Build Koko from src/:
1. index.html            - the game (shell + styles + scripts), used by the PWA
2. tools/lines.<lang>.json - every line Koko says, for tools/make_audio.py
3. artifact/koko-artifact.html - single-file preview (fonts inlined, no PWA bits)
4. release/koko/ + release/koko-github.zip - the folder that goes to GitHub Pages
"""
import base64, json, re, shutil, subprocess, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
read = lambda p: (SRC / p).read_text(encoding='utf-8')

# ---------- 1. index.html ----------
scripts = "(() => {\n'use strict';\n" + read('content.js') + "\n" + read('art.js') + "\n" + read('app.js') + "\n})();"
html = read('shell.html').replace('/*STYLES*/', read('styles.css')).replace('/*SCRIPTS*/', scripts)
(ROOT / 'index.html').write_text(html, encoding='utf-8')

# ---------- 2. line lists for the voice packs ----------
out = subprocess.run(['node', '-e', """
const C = require(process.argv[1]);
const o = {}; for (const l of C.LANG_ORDER) o[l] = C.lineList(l).map(x => ({ id: x.id, text: x.text, spoken: x.spoken }));
process.stdout.write(JSON.stringify(o));
""", str(SRC / 'content.js')], capture_output=True, text=True, check=True).stdout
for lang, lines in json.loads(out).items():
    (ROOT / 'tools' / f'lines.{lang}.json').write_text(json.dumps(lines, ensure_ascii=False, indent=1), encoding='utf-8')
old = ROOT / 'tools' / 'lines.json'
if old.exists():
    old.unlink()

# ---------- 3. artifact ----------
a = html
a = re.sub(r'<!--HEAD-META-START-->.*?<!--HEAD-META-END-->\n?', '', a, flags=re.S)
a = re.sub(r'<!--PWA-START-->.*?<!--PWA-END-->\n?', '', a, flags=re.S)
for tag in ['<!doctype html>\n', '<html lang="he" dir="rtl">\n', '<head>\n', '</head>\n', '<body>\n', '</body>\n', '</html>\n']:
    a = a.replace(tag, '', 1)
a = re.sub(r'url\(fonts/([\w.-]+\.woff2)\)', lambda m: 'url(data:font/woff2;base64,' + base64.b64encode((ROOT / 'fonts' / m.group(1)).read_bytes()).decode() + ')', a)
a = a.replace('</title>\n', '</title>\n<script>window.KOKO_EMBED = true;</script>\n', 1)
assert '<title>' in a[:8000], 'title must be in the first 8KB'
(ROOT / 'artifact').mkdir(exist_ok=True)
(ROOT / 'artifact' / 'koko-artifact.html').write_text(a, encoding='utf-8')

# ---------- 4. release ----------
rel = ROOT / 'release' / 'koko'
if rel.exists():
    shutil.rmtree(rel)
rel.mkdir(parents=True)
for f in ['index.html', 'sw.js', 'manifest.webmanifest', 'og.png', 'README.md', '.nojekyll']:
    if (ROOT / f).exists():
        shutil.copy2(ROOT / f, rel / f)
for d in ['icons', 'fonts', 'src', '.github']:
    shutil.copytree(ROOT / d, rel / d)
if (ROOT / 'audio').exists():
    shutil.copytree(ROOT / 'audio', rel / 'audio')
(rel / 'tools').mkdir()
for f in ['build.py', 'make_audio.py'] + [p.name for p in (ROOT / 'tools').glob('lines.*.json')]:
    shutil.copy2(ROOT / 'tools' / f, rel / 'tools' / f)
zp = ROOT / 'release' / 'koko-github.zip'
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(rel.rglob('*')):
        if p.is_file():
            z.write(p, p.relative_to(rel.parent))
print('index.html:', (ROOT / 'index.html').stat().st_size, 'bytes')
print('artifact:', (ROOT / 'artifact' / 'koko-artifact.html').stat().st_size, 'bytes')
print('zip:', zp.stat().st_size, 'bytes')
