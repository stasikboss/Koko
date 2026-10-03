#!/usr/bin/env python3
"""Generate Koko's studio voice pack with Google Cloud Text-to-Speech.

The game plays audio/<file> for every line listed in audio/manifest.json and falls back
to the device voice for anything missing. Parent recordings made in the game always win.

Usage (from the repo root):
  export GOOGLE_TTS_API_KEY=...           # Cloud project with the Text-to-Speech API enabled
  python3 tools/make_audio.py --list      # Hebrew voices available to your key
  python3 tools/make_audio.py --sample he-IL-Wavenet-D   # one test line -> audio/sample.mp3
  python3 tools/make_audio.py --voice he-IL-Wavenet-D    # whole pack

No third-party packages. ffmpeg is optional: when present, clips are trimmed and loudness-matched.
"""
import argparse, hashlib, json, os, re, shutil, subprocess, sys, tempfile, time, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / 'audio'
LINES = json.loads((Path(__file__).resolve().parent / 'lines.json').read_text(encoding='utf-8'))
API = 'https://texttospeech.googleapis.com/v1'


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


def synth(text, voice, rate, pitch):
    if plain_voice(voice):
        inp = {'text': text.replace('...', ',')}
        cfg = {'audioEncoding': 'MP3', 'speakingRate': rate, 'sampleRateHertz': 44100}
    else:
        ssml = '<speak>' + re.sub(r'\.\.\.', '<break time="320ms"/>', text) + '</speak>'
        inp = {'ssml': ssml}
        cfg = {'audioEncoding': 'MP3', 'speakingRate': rate, 'pitch': pitch, 'sampleRateHertz': 44100,
               'effectsProfileId': ['handset-class-device']}
    res = api('text:synthesize', {'input': inp, 'voice': {'languageCode': 'he-IL', 'name': voice}, 'audioConfig': cfg})
    import base64
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
        cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-i', str(src), '-af', flt, '-ar', '44100', '-ac', '1',
               '-b:a', '96k', str(out_path)]
        if subprocess.run(cmd).returncode != 0:
            out_path.write_bytes(mp3_bytes)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--voice', default='he-IL-Wavenet-D', help='voice name, e.g. he-IL-Wavenet-D or a Chirp3-HD voice')
    ap.add_argument('--rate', type=float, default=0.95, help='speaking rate (0.25-2.0), default 0.95')
    ap.add_argument('--pitch', type=float, default=2.0, help='semitones, ignored by Chirp/Journey voices, default +2')
    ap.add_argument('--list', action='store_true', help='list Hebrew voices and exit')
    ap.add_argument('--sample', metavar='VOICE', help='render one line with VOICE to audio/sample.mp3 and exit')
    a = ap.parse_args()

    if a.list:
        for v in api('voices?languageCode=he-IL').get('voices', []):
            print(f"{v['name']:32} {v.get('ssmlGender', ''):8} {v.get('naturalSampleRateHertz', '')}")
        return

    AUDIO.mkdir(exist_ok=True)
    if a.sample:
        line = next(l for l in LINES if l['id'] == 'i1_yes')
        polish(synth(line['spoken'], a.sample, a.rate, a.pitch), AUDIO / 'sample.mp3')
        print('wrote audio/sample.mp3:', line['text'])
        return

    files = {}
    for i, line in enumerate(LINES, 1):
        tag = hashlib.sha1(f"{a.voice}|{a.rate}|{a.pitch}|{line['spoken']}".encode()).hexdigest()[:8]
        name = f"{line['id']}.{tag}.mp3"
        out = AUDIO / name
        if not out.exists():
            polish(synth(line['spoken'], a.voice, a.rate, a.pitch), out)
            time.sleep(0.15)
        files[line['id']] = name
        print(f'[{i:2}/{len(LINES)}] {name}  {line["text"]}')

    keep = set(files.values()) | {'manifest.json'}
    for f in AUDIO.glob('*.mp3'):
        if f.name not in keep:
            f.unlink()
    manifest = {'voice': a.voice, 'rate': a.rate, 'pitch': None if plain_voice(a.voice) else a.pitch,
                'generated': datetime.now(timezone.utc).isoformat(timespec='seconds'), 'files': files}
    (AUDIO / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'done: {len(files)} clips, voice {a.voice}')


if __name__ == '__main__':
    main()
