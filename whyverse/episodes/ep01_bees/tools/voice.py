import json, sys, os, soundfile as sf
from kokoro_onnx import Kokoro
src, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
k = Kokoro('/home/claude/kokoro/kokoro-v1.0.int8.onnx', '/home/claude/kokoro/voices-v1.0.bin')
L = json.load(open(src)); dur = {}
only = set(sys.argv[3:])
for ch, lid, text in L:
    p = f'{outdir}/{lid}.wav'
    if only and lid not in only and os.path.exists(p):
        dur[lid] = sf.info(p).duration; continue
    if not only and os.path.exists(p): dur[lid]=sf.info(p).duration; continue
    a, sr = k.create(text, voice='af_heart', speed=1.0, lang='en-us')
    sf.write(p, a, sr); dur[lid] = len(a) / sr
    print(lid, round(dur[lid], 2), flush=True)
json.dump(dur, open(f'{outdir}/durations.json', 'w'), indent=1)
print('TOTAL', round(sum(dur.values()), 1))
