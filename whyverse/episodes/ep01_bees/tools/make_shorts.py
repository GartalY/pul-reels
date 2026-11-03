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
    ('s1_einstein', 'c0_1', 'c0_5', ['EINSTEIN NEVER', 'SAID THIS', 'ABOUT BEES']),
    ('s2_colour', 'c2_7', 'c2_10', ['NO BEES?', 'BREAD SURVIVES.', 'COLOUR DOESN\'T.']),
    ('s3_maoxian', 'c3_5', 'c3_9', ['EVERY APPLE HERE', 'WAS POLLINATED', 'BY HAND']),
    ('s4_almonds', 'c4_3', 'c4_8', ['ALMOST EVERY HIVE', 'IN AMERICA DRIVES', 'TO ONE VALLEY']),
    ('s5_chocolate', 'c6_2', 'c6_4', ['CHOCOLATE', 'DOESN\'T NEED', 'BEES']),
]

def overlay(title, path):
    W, H = 1080, 1920
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    big = ImageFont.truetype(os.path.join(FONTS, 'Bungee-Regular.ttf'), 92)
    hand = ImageFont.truetype(os.path.join(FONTS, 'Caveat-Bold.ttf'), 64)
    y = 300
    for i, line in enumerate(title):
        w = d.textlength(line, font=big); x = (W - w) / 2
        pad = 26; box = [x - pad, y - 12, x + w + pad, y + 112]
        d.rounded_rectangle(box, 18, fill=(242, 184, 75, 255) if i % 2 == 0 else (255, 248, 232, 255), outline=(26, 32, 69, 255), width=6)
        d.text((x, y), line, font=big, fill=(26, 32, 69, 255)); y += 140
    cta = 'Full video on YouTube: Whyverse'
    w = d.textlength(cta, font=hand); x = (W - w) / 2; yb = 1330
    d.rounded_rectangle([x - 30, yb - 6, x + w + 30, yb + 86], 22, fill=(26, 32, 69, 235))
    d.text((x, yb), cta, font=hand, fill=(255, 248, 232, 255))
    im.save(path)

for name, a, b, title in SHORTS:
    t0 = max(0, LINES[a]['t'] - 0.4); t1 = LINES[b]['end'] + 0.9; dur = t1 - t0
    ov = os.path.join(OUT, name + '_ov.png'); overlay(title, ov)
    out = os.path.join(OUT, name + '.mp4')
    fc = ('[0:v]split=2[a][b];'
          '[a]scale=-2:1920,crop=1080:1920,boxblur=28:2,eq=brightness=-0.18:saturation=0.8[bg];'
          '[b]scale=1080:-2[fg];'
          '[bg][fg]overlay=0:(H-h)/2+40[v1];'
          '[v1][1:v]overlay=0:0,fade=t=in:st=0:d=0.25,fade=t=out:st=%.2f:d=0.4[v]' % (dur - 0.4))
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', '%.3f' % t0, '-t', '%.3f' % dur, '-i', SRC, '-loop', '1', '-i', ov,
           '-filter_complex', fc, '-map', '[v]', '-map', '0:a', '-af', 'afade=t=in:st=0:d=0.2,afade=t=out:st=%.2f:d=0.4' % (dur - 0.4),
           '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '160k',
           '-movflags', '+faststart', '-shortest', out]
    subprocess.run(cmd, check=True)
    print(name, round(t0, 2), round(t1, 2), round(dur, 1), 's')
