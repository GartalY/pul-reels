import json, sys, os, soundfile as sf
from kokoro_onnx import Kokoro
src, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
k = Kokoro('/home/claude/kokoro/kokoro-v1.0.int8.onnx', '/home/claude/kokoro/voices-v1.0.bin')
FIX = {'pˈʌɡ': 'pjˈuː', 'hˈɔːɹmʌz': 'hɔːɹmˈuːz', 'oʊmˈæn': 'oʊmˈɑːn', 'kˈɪləmˌiːɾɚz': 'kɪlˈɑːmɪɾɚz'}
L = json.load(open(src)); dur = {}
for ch, lid, text in L:
    p = f'{outdir}/{lid}.wav'
    ph = k.tokenizer.phonemize(text, 'en-us')
    for a_, b_ in FIX.items(): ph = ph.replace(a_, b_)
    print(lid, ph)
    a, sr = k.create(ph, voice='af_heart', speed=1.05, is_phonemes=True)
    sf.write(p, a, sr); dur[lid] = len(a) / sr
    print(lid, round(dur[lid], 2), flush=True)
json.dump(dur, open(f'{outdir}/durations.json', 'w'), indent=1)
print('TOTAL', round(sum(dur.values()), 1))
