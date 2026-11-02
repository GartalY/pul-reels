# builds film/timeline.js (line times, word times, mouth track) + film/vo.wav from per-line Kokoro wavs
import json, re, sys, numpy as np, soundfile as sf
EP = '/home/claude/pul-reels/whyverse/episodes/ep01_bees'
VO = '/home/claude/vo'
L = json.load(open(f'{EP}/lines.json'))
FPS = 30
START = 1.2
GAP = 0.55
PRE_CH = 1.4      # before a chapter title line (transition + sting)
POST_CH = 0.9     # after the chapter title line
TITLE_GAP = 4.6   # after c0_7 for the title sequence
END_HOLD = 5.0
EXTRA = {'c0_4': 0.4, 'c0_6': 0.3, 'c2_7': 0.4, 'c3_12': 0.6, 'c4_8': 0.7, 'c5_9': 0.8, 'c6_7': 0.6, 'c7_5': 0.8, 'c8_2': 0.5, 'c8_3': 0.6}

def words_with_times(text, a, sr, t0):
    words = text.split()
    # silence detection: 10 ms frames
    hop = int(sr * 0.01); n = len(a) // hop
    rms = np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop]**2)) for i in range(n)])
    thr = max(rms.max() * 0.04, 1e-4)
    voiced = rms > thr
    nz = np.nonzero(voiced)[0]
    s0, s1 = (nz[0], nz[-1]) if len(nz) else (0, n-1)
    # pauses inside speech (>= 90 ms)
    gaps = []; i = s0
    while i <= s1:
        if not voiced[i]:
            j = i
            while j <= s1 and not voiced[j]: j += 1
            if j - i >= 9: gaps.append((i, j))
            i = j
        else: i += 1
    # punctuation boundaries: after word k ends with , . ? ! : ;
    pb = [k for k, w in enumerate(words[:-1]) if re.search(r'[,.?!:;]$', w)]
    # assign the len(pb) longest gaps to boundaries in order (if counts mismatch use the longest ones that fit)
    use = sorted(sorted(gaps, key=lambda g: g[1]-g[0], reverse=True)[:len(pb)])
    anchors = []  # (word index that starts after the gap, gap start, gap end)
    if len(use) == len(pb):
        anchors = [(pb[k]+1, use[k][0], use[k][1]) for k in range(len(pb))]
    segs = []; prev_w, prev_t = 0, s0
    for wi, g0, g1 in anchors:
        segs.append((prev_w, wi, prev_t, g0)); prev_w, prev_t = wi, g1
    segs.append((prev_w, len(words), prev_t, s1 + 1))
    out = []
    for w0, w1, a0, a1 in segs:
        ws = words[w0:w1]
        wt = [len(re.sub(r'[^A-Za-z0-9]', '', w)) + 2 for w in ws]
        tot = sum(wt) or 1; acc = 0
        for w, k in zip(ws, wt):
            ts = a0 + (a1 - a0) * acc / tot; acc += k; te = a0 + (a1 - a0) * acc / tot
            out.append({'w': w, 't': round(t0 + ts * 0.01, 3), 'end': round(t0 + te * 0.01, 3)})
    return out, rms

lines = []; t = START; prev_ch = None
mouth_env = []
for idx, (ch, lid, text) in enumerate(L):
    is_title = text.startswith('Chapter ')
    if lid == 'c1_1': t += TITLE_GAP - GAP
    if is_title: t += PRE_CH - GAP
    a, sr = sf.read(f'{VO}/{lid}.wav')
    if a.ndim > 1: a = a.mean(1)
    d = len(a) / sr
    words, rms = words_with_times(text, a, sr, t)
    lines.append({'id': lid, 'ch': ch, 'text': text, 't': round(t, 3), 'end': round(t + d, 3), 'title': is_title, 'words': words, 'sr': sr})
    mouth_env.append((t, rms))
    t += d + (POST_CH if is_title else GAP) + EXTRA.get(lid, 0)
DUR = round(t - GAP + END_HOLD, 2)
# mouth track per frame (0..9)
nf = int(DUR * FPS) + 1; mouth = np.zeros(nf)
for t0, rms in mouth_env:
    for i, v in enumerate(rms):
        f = int((t0 + i * 0.01) * FPS)
        if f < nf: mouth[f] = max(mouth[f], v)
mouth = np.clip(mouth / (np.percentile(mouth[mouth > 0], 90) + 1e-9), 0, 1)
ms = ''.join(str(int(round(v * 9))) for v in mouth)
# voice wav (48k mono) placed on the timeline
SR = 48000; vo = np.zeros(int(DUR * SR) + SR)
import subprocess, os
for ln in lines:
    a, sr = sf.read(f'{VO}/{ln["id"]}.wav')
    if a.ndim > 1: a = a.mean(1)
    if sr != SR:
        x = np.arange(0, len(a), sr / SR); a = np.interp(x, np.arange(len(a)), a)
    i = int(ln['t'] * SR); vo[i:i+len(a)] += a
    del ln['sr']
sf.write(f'{EP}/film/out/vo.wav', vo.astype(np.float32), SR, subtype='FLOAT')
js = '(function(){const TL=' + json.dumps({'DURATION': DUR, 'lines': lines, 'mouth': ms}, separators=(',', ':')) + ";if(typeof module!=='undefined')module.exports=TL;else globalThis.TL=TL;})();\n"
open(f'{EP}/film/timeline.js', 'w').write(js)
print('duration', DUR, 's =', round(DUR/60, 2), 'min; lines', len(lines))
