#!/usr/bin/env python3
"""Generate Koko's studio voice packs with Google Cloud Text-to-Speech.

The game plays audio/<lang>/<file> for every line listed in audio/<lang>/manifest.json and falls back
to the device voice for anything missing. Parent recordings made in the game always win.

Usage (from the repo root):
  export GOOGLE_TTS_API_KEY=...                        # Cloud project with the Text-to-Speech API enabled
  python3 tools/make_audio.py --lang ru --list         # voices available for a language
  python3 tools/make_audio.py --lang ru --sample ru-RU-Wavenet-D   # one test line -> audio/ru/sample.mp3
  python3 tools/make_audio.py --lang ru                # whole pack with the default voice
  python3 tools/make_audio.py --lang all               # Hebrew, Russian and English

Koko speaks as a boy in Hebrew and Russian ("אני עייף", "Я устал"), so the defaults are male voices.
No third-party packages. ffmpeg is optional: when present, clips are trimmed and loudness-matched.
"""
import argparse, base64, hashlib, json, os, re, shutil, subprocess, sys, tempfile, time, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOOLS = Path(__file__).resolve().parent
API = 'https://texttospeech.googleapis.com/v1'
LANGS = {
    'he': {'code': 'he-IL', 'voice': 'he-IL-Wavenet-D'},
    'ru': {'code': 'ru-RU', 'voice': 'ru-RU-Wavenet-D'},
    'en': {'code': 'en-US', 'voice': 'en-US-Wavenet-D'},
}


def api(path, body=None):
    key = os.environ.get('GOOGLE_TTS_API_KEY', '').strip()
    if not key:
        sys.exit('Set GOOGLE_TTS_API_KEY first (Google Cloud > APIs & Services > Credentials).')
    url = f'{API}/{path}{"&" if "?" in path else "?"}key={key}'
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f'Google TTS error {e.code}: {e.read().decode(errors="replace")[:400]}')


def plain_voice(name):
    # Chirp 3 HD and Journey voices take plain text only and ignore pitch.
    return any(t in name for t in ('Chirp', 'Journey'))


def clean(text):
    return text.replace('«', '').replace('»', '')


def synth(text, code, voice, rate, pitch):
    text = clean(text)
    if plain_voice(voice):
        inp = {'text': text.replace('...', ',')}
        cfg = {'audioEncoding': 'MP3', 'speakingRate': rate, 'sampleRateHertz': 44100}
    else:
        esc = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        inp = {'ssml': '<speak>' + re.sub(r'\.\.\.', '<break time="320ms"/>', esc) + '</speak>'}
        cfg = {'audioEncoding': 'MP3', 'speakingRate': rate, 'pitch': pitch, 'sampleRateHertz': 44100,
               'effectsProfileId': ['handset-class-device']}
    res = api('text:synthesize', {'input': inp, 'voice': {'languageCode': code, 'name': voice}, 'audioConfig': cfg})
    return base64.b64decode(res['audioContent'])


def polish(mp3_bytes, out_path):
    """Trim silence and match loudness with ffmpeg when available; otherwise keep the API output."""
    if not shutil.which('ffmpeg'):
        out_path.write_bytes(mp3_bytes)
        return
    with tempfile.TemporaryDirectory() as td:
        src = Path(td) / 'in.mp3'
        src.write_bytes(mp3_bytes)
        flt = ('silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,'
               'areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,'
               'loudnorm=I=-16:TP=-1.5:LRA=11')
        cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-i', str(src), '-af', flt, '-ar', '44100', '-ac', '1', '-b:a', '96k', str(out_path)]
        if subprocess.run(cmd).returncode != 0:
            out_path.write_bytes(mp3_bytes)


def build(lang, voice, rate, pitch):
    code = LANGS[lang]['code']
    lines = json.loads((TOOLS / f'lines.{lang}.json').read_text(encoding='utf-8'))
    out_dir = ROOT / 'audio' / lang
    out_dir.mkdir(parents=True, exist_ok=True)
    files = {}
    for i, line in enumerate(lines, 1):
        tag = hashlib.sha1(f"{voice}|{rate}|{pitch}|{line['spoken']}".encode()).hexdigest()[:8]
        name = f"{line['id']}.{tag}.mp3"
        out = out_dir / name
        if not out.exists():
            polish(synth(line['spoken'], code, voice, rate, pitch), out)
            time.sleep(0.15)
        files[line['id']] = name
        print(f'[{lang} {i:2}/{len(lines)}] {name}  {line["text"]}')
    keep = set(files.values())
    for f in out_dir.glob('*.mp3'):
        if f.name not in keep:
            f.unlink()
    manifest = {'voice': voice, 'rate': rate, 'pitch': None if plain_voice(voice) else pitch,
                'generated': datetime.now(timezone.utc).isoformat(timespec='seconds'), 'files': files}
    (out_dir / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'done: {lang}, {len(files)} clips, voice {voice}')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--lang', default='he', choices=['he', 'ru', 'en', 'all'])
    ap.add_argument('--voice', default='', help='voice name; default: a male WaveNet voice for the language')
    ap.add_argument('--rate', type=float, default=0.95, help='speaking rate (0.25-2.0), default 0.95')
    ap.add_argument('--pitch', type=float, default=2.0, help='semitones, ignored by Chirp/Journey voices, default +2')
    ap.add_argument('--list', action='store_true', help='list voices for --lang and exit')
    ap.add_argument('--sample', metavar='VOICE', help='render one line with VOICE to audio/<lang>/sample.mp3 and exit')
    a = ap.parse_args()
    langs = ['he', 'ru', 'en'] if a.lang == 'all' else [a.lang]

    if a.list:
        for lang in langs:
            for v in api(f"voices?languageCode={LANGS[lang]['code']}").get('voices', []):
                print(f"{v['name']:34} {v.get('ssmlGender', ''):8} {v.get('naturalSampleRateHertz', '')}")
        return
    if a.sample:
        lang = langs[0]
        line = next(l for l in json.loads((TOOLS / f'lines.{lang}.json').read_text(encoding='utf-8')) if l['id'] == 'a1_yes')
        (ROOT / 'audio' / lang).mkdir(parents=True, exist_ok=True)
        polish(synth(line['spoken'], LANGS[lang]['code'], a.sample, a.rate, a.pitch), ROOT / 'audio' / lang / 'sample.mp3')
        print(f'wrote audio/{lang}/sample.mp3:', line['text'])
        return
    for lang in langs:
        build(lang, (a.voice if a.voice and a.lang != 'all' else LANGS[lang]['voice']), a.rate, a.pitch)


if __name__ == '__main__':
    main()
