import json, sys, os, soundfile as sf
from kokoro_onnx import Kokoro
src, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
k = Kokoro('/home/claude/kokoro/kokoro-v1.0.onnx', '/home/claude/kokoro/voices-v1.0.bin')
NAME = {'Alpöge': 'ˈɑlpəɡˌeɪ'}
L = json.load(open(src)); dur = {}
for ch, lid, text in L:
    p = f'{outdir}/{lid}.wav'
    t2 = text
    for w in NAME: t2 = t2.replace(w, 'ZZQ')
    ph = k.tokenizer.phonemize(t2, 'en-us')
    if 'ZZQ' in t2:
        zz = k.tokenizer.phonemize('ZZQ', 'en-us').strip()
        ph = ph.replace(zz, list(NAME.values())[0])
        print(lid, ph)
    a, sr = k.create(ph, voice='af_heart', speed=1.1, is_phonemes=True)
    sf.write(p, a, sr); dur[lid] = len(a) / sr
    print(lid, round(dur[lid], 2), flush=True)
json.dump(dur, open(f'{outdir}/durations.json', 'w'), indent=1)
print('TOTAL', round(sum(dur.values()), 1))
