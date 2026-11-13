# Build 9:16 Shorts from the final 16:9 episode: blurred full-bleed background, the 16:9 picture in the middle,
# a hook title on top and a "full video on YouTube" line at the bottom (outside the platforms' UI zones).
# usage: python3 make_shorts.py <episode.mp4> <timeline.js> <out_dir>
import json, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SRC, TLF, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
FONTS = os.path.join(os.path.dirname(os.path.abspath(TLF)), 'engine', 'fonts')
os.makedirs(OUT, exist_ok=True)
s = open(TLF).read(); TL = json.loads(s[s.index('=') + 1:s.index(';if(')]); LINES = {l['id']: l for l in TL['lines']}

SHORTS = [
    ('ep06_s1_33km_gap', 'c0_2', 'c0_4', ['THIS 33 KM GAP', 'MOVES 1 IN 5', 'BARRELS OF OIL']),
]

def ass_for(t0, t1, path):
    # burned-in word captions for sound-off viewing: chunks of <= 4 words, white Bungee with a navy outline,
    # sitting on the lower part of the 16:9 picture (above the 'Full video' line, clear of the platform UI)
    import re
    words = [w for l in TL['lines'] for w in l['words'] if w['t'] >= t0 - 0.05 and w['t'] < t1]
    cues, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        if len(cur) >= 4 or re.search(r'[.,?!:;]$', w['w']) or i == len(words) - 1: cues.append(cur); cur = []
    def ts(x):
        x = max(0, x - t0); h = int(x // 3600); m = int(x % 3600 // 60); s_ = x % 60; return f'{h}:{m:02d}:{s_:05.2f}'
    hdr = '[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Cap,Bungee,150,&H00FFFFFF,&H00FFFFFF,&H00452019,&H80000000,0,0,0,0,100,100,0,0,1,10,3,2,40,40,440,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
    lines = []
    for k, c in enumerate(cues):
        a = c[0]['t']; b = min(c[-1]['end'] + 0.15, cues[k + 1][0]['t'] if k + 1 < len(cues) else c[-1]['end'] + 0.6)
        txt = ' '.join(x['w'] for x in c).upper().replace('{', '').replace('}', '')
        lines.append(f'Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\fad(60,40)}}{txt}')
    end = t1 - t0; lines.append(f'Dialogue: 1,{ts(t1 - 1.3)},{ts(t1)},Cap,,0,0,0,,{{\\fad(80,0)\\fs96}}FULL VIDEO ON OUR\\NYOUTUBE: WHYVERSE')
    open(path, 'w').write(hdr + '\n'.join(lines) + '\n')

def overlay(title, path):
    W, H = 1080, 1920
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    big = ImageFont.truetype(os.path.join(FONTS, 'Bungee-Regular.ttf'), 92)
    hand = ImageFont.truetype(os.path.join(FONTS, 'Caveat-Bold.ttf'), 50)
    y = 236
    for i, line in enumerate(title):
        w = d.textlength(line, font=big); x = (W - w) / 2
        pad = 26; box = [x - pad, y - 12, x + w + pad, y + 112]
        d.rounded_rectangle(box, 18, fill=(242, 184, 75, 255) if i % 2 == 0 else (255, 248, 232, 255), outline=(26, 32, 69, 255), width=6)
        d.text((x, y), line, font=big, fill=(26, 32, 69, 255)); y += 136
    cta = 'Full video on our YouTube: Whyverse'
    w = d.textlength(cta, font=hand); x = (W - w) / 2; yb = 662
    d.rounded_rectangle([x - 26, yb - 2, x + w + 26, yb + 66], 18, fill=(26, 32, 69, 235))
    d.text((x, yb), cta, font=hand, fill=(255, 248, 232, 255))
    im.save(path)

for name, a, b, title in SHORTS:
    t0 = max(0, LINES[a]['t'] - 0.4); t1 = LINES[b]['end'] + 1.35; dur = t1 - t0
    ov = os.path.join(OUT, name + '_ov.png'); overlay(title, ov)
    out = os.path.join(OUT, name + '.mp4')
    ass = os.path.join(OUT, name + '.ass'); ass_for(t0, t1, ass)
    fc = ('[0:v]split=2[a][b];'
          '[a]scale=-2:1920,crop=1080:1920,boxblur=28:2,eq=brightness=-0.18:saturation=0.8[bg];'
          '[b]scale=1080:-2[fg];'
          '[bg][fg]overlay=0:(H-h)/2+40[v1];'
          '[v1][1:v]overlay=0:0,subtitles=%s:fontsdir=%s,fade=t=in:st=0:d=0.25,fade=t=out:st=%.2f:d=0.4[v]' % (ass, FONTS, dur - 0.4))
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', '%.3f' % t0, '-t', '%.3f' % dur, '-i', SRC, '-loop', '1', '-i', ov,
           '-filter_complex', fc, '-map', '[v]', '-map', '0:a', '-af', 'afade=t=in:st=0:d=0.2,afade=t=out:st=%.2f:d=0.4' % (dur - 0.4),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-r', '60', '-c:a', 'aac', '-b:a', '160k',
           '-movflags', '+faststart', '-shortest', out]
    subprocess.run(cmd, check=True)
    print(name, round(t0, 2), round(t1, 2), round(dur, 1), 's')
