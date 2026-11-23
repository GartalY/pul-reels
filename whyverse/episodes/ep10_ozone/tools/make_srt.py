# SRT from the measured timeline: cues of <= 9 words, broken at punctuation, timed by the word estimates
import json, re, sys
src, dst = sys.argv[1], sys.argv[2]
s = open(src).read(); d = json.loads(s[s.index('=') + 1:s.index(';if(')])
def tc(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s_, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s_:02},{ms:03}'
cues = []
for l in d['lines']:
    ws = l['words']; phr = []; cur = []
    for i, w in enumerate(ws):
        cur.append(w)
        if re.search(r'[.,?!:;]$', w['w']) or i == len(ws) - 1: phr.append(cur); cur = []
    merged = []
    for p_ in phr:
        if merged and (len(merged[-1]) < 3 or len(p_) < 3) and len(merged[-1]) + len(p_) <= 10 and not re.search(r'[.?!]$', merged[-1][-1]['w']): merged[-1] = merged[-1] + p_
        else: merged.append(p_)
    for p_ in merged:
        k = -(-len(p_) // 10); n = -(-len(p_) // k)
        for j in range(0, len(p_), n):
            c = p_[j:j + n]; cues.append([c[0]['t'], c[-1]['end'], ' '.join(x['w'] for x in c)])
    cues[-1][1] = max(cues[-1][1], l['end'])
for i in range(len(cues) - 1): cues[i][1] = min(cues[i][1] + 0.25, cues[i + 1][0] - 0.02)
with open(dst, 'w') as f:
    for i, (a, b, txt) in enumerate(cues, 1): f.write(f'{i}\n{tc(a)} --> {tc(b)}\n{txt}\n\n')
print(len(cues), 'cues')
