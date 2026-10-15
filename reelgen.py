"""Reel generator for @pulpsixologiyassi.

Usage: python3 reelgen.py specs/day01.json out/day01.mp4
A spec is {"scenes": [ {type, dur, ...}, ... ], "music_seed": int}.
Scene types: hook, myth, quiz, calc, bars, list, cta.
"""
import json, math, os, subprocess, sys, tempfile, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
FD = "/usr/share/fonts/opentype/inter/"
_fc = {}
def F(w, s):
    k = (w, s)
    if k not in _fc:
        _fc[k] = ImageFont.truetype(FD + f"InterDisplay-{w}.otf", s)
    return _fc[k]

BG = (14, 17, 28); FG = (245, 246, 250); MUTED = (150, 158, 180); CARD = (30, 35, 52)
COL = {"fg": FG, "muted": MUTED, "gold": (255, 196, 61), "blue": (86, 140, 255),
       "red": (255, 110, 110), "green": (72, 214, 150)}
HANDLE = "@pulpsixologiyassi"

def ease(t): t = max(0.0, min(1.0, t)); return 1 - (1 - t) ** 3
def mix(c, a): return tuple(int(BG[i] + (c[i] - BG[i]) * a) for i in range(3))
def col(c): return COL[c] if isinstance(c, str) else tuple(c)

def wrap(d, text, font, maxw):
    out = []
    for para in text.split("\n"):
        words, line = para.split(" "), ""
        for w in words:
            t = (line + " " + w).strip()
            if d.textlength(t, font=font) <= maxw: line = t
            else:
                if line: out.append(line)
                line = w
        out.append(line)
    return out

def block(d, y, text, font, color, a, dy=0, maxw=920, lh=1.18, align="c", x=80):
    lines = wrap(d, text, font, maxw)
    step = font.size * lh
    for i, ln in enumerate(lines):
        w = d.textlength(ln, font=font)
        xx = (W - w) / 2 if align == "c" else x
        d.text((xx, y + dy + i * step), ln, font=font, fill=mix(col(color), a))
    return y + len(lines) * step

def fade(s, dur, inn=0.4, out=0.3):
    return ease(s / inn) * (1 - ease((s - (dur - out)) / out))

# ---------------- scenes ----------------
def sc_hook(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    y = sc.get("y", 560)
    for txt, c in sc["lines"]:
        y = block(d, y, txt, F("Black", sc.get("size", 120)), c, a, (1 - a) * 60) + 10
    if sc.get("sub"):
        block(d, y + 80, sc["sub"], F("SemiBold", 54), "muted", ease((s - 1.0) / 0.4) * fo)

def badge(d, y, label, color, a):
    f = F("Black", 44); w = d.textlength(label, font=f) + 70
    x0 = (W - w) / 2
    d.rounded_rectangle([x0, y, x0 + w, y + 84], 42, fill=mix(color, a))
    d.text((x0 + 35, y + 16), label, font=f, fill=mix(BG, 1) if a > 0.5 else mix(BG, a))

def sc_myth(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    badge(d, 330, "MİF", COL["red"], a)
    y = block(d, 460, "“" + sc["myth"] + "”", F("Bold", 76), "fg", a)
    # strike-through after 1.6s
    st = ease((s - 1.6) / 0.5) * fo
    if st > 0:
        d.line([140, y + 30, 140 + 800 * st, y + 30], fill=mix(COL["red"], fo), width=8)
    b = ease((s - 2.4) / 0.4) * fo
    badge(d, y + 110, "FAKT", COL["green"], b)
    y2 = block(d, y + 240, sc["fact"], F("SemiBold", 60), "fg", b, (1 - b) * 40)
    if sc.get("note"):
        n = ease((s - 3.6) / 0.4) * fo
        block(d, y2 + 60, sc["note"], F("Bold", 50), "gold", n)

def sc_quiz(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    badge(d, 300, "SUAL", COL["gold"], a)
    y = block(d, 430, sc["q"], F("Bold", 72), "fg", a) + 70
    reveal = sc.get("reveal", 3.2)
    # countdown dots
    if s < reveal:
        left = max(0, math.ceil(reveal - s))
        if s > 1.0:
            block(d, 1660, f"{left}", F("Black", 90), "gold", ease((s - 1.0) / 0.3))
    for i, opt in enumerate(sc["opts"]):
        oa = ease((s - 0.5 - i * 0.3) / 0.4) * fo
        r = ease((s - reveal) / 0.4)
        good = i == sc["ans"]
        base = CARD
        fill = tuple(int(base[k] + ((COL["green"] if good else (40, 30, 40))[k] - base[k]) * r) for k in range(3))
        d.rounded_rectangle([80, y, 1000, y + 150], 30, fill=mix(fill, oa))
        tc = BG if (good and r > 0.5) else (MUTED if r > 0.5 else FG)
        d.text((120, y + 42), f"{'AB'[i]}.  {opt}", font=F("Bold", 56), fill=mix(tc, oa))
        y += 180
    e = ease((s - reveal - 0.6) / 0.4) * fo
    y2 = block(d, y + 60, sc["why"], F("SemiBold", 52), "fg", e, (1 - e) * 30)
    if sc.get("note"):
        block(d, y2 + 50, sc["note"], F("Medium", 38), "muted", e)

def fmt(n):
    return f"{int(round(n)):,}".replace(",", " ")

def sc_calc(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    block(d, 300, sc["title"], F("Bold", 72), "muted", a)
    y = 520
    for i, (label, val, unit, c) in enumerate(sc["rows"]):
        st = 0.8 + i * 1.6
        r = ease((s - st) / 0.4) * fo
        cnt = ease((s - st) / 1.0)
        d.text((80, y), label, font=F("SemiBold", 54), fill=mix(MUTED, r))
        num = fmt(val * cnt) + " " + unit
        block(d, y + 70, num, F("Black", 130), c, r, align="l")
        y += 330
    if sc.get("punch"):
        p = ease((s - (0.8 + len(sc["rows"]) * 1.6)) / 0.4) * fo
        block(d, y + 20, sc["punch"], F("Bold", 62), "gold", p, (1 - p) * 30)

def sc_bars(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    block(d, 300, sc["title"], F("Black", 120), "gold", a)
    if sc.get("sub"):
        block(d, 460, sc["sub"], F("SemiBold", 56), "muted", ease((s - 0.5) / 0.4) * fo)
    y0, maxw, x0 = 640, 920, 80
    mx = max(r[0] for r in sc["rows"])
    for i, (p, amt, name, sub, c) in enumerate(sc["rows"]):
        st = 1.0 + i * 1.6; g = ease((s - st) / 0.9) * fo; ta = ease((s - st - 0.3) / 0.4) * fo
        if g <= 0: continue
        y = y0 + i * 320; c = col(c)
        d.text((x0, y), name, font=F("Bold", 60), fill=mix(FG, ta))
        pct = f"{int(round(p * g))}%"; pw = d.textlength(pct, font=F("Black", 60))
        d.text((W - x0 - pw, y), pct, font=F("Black", 60), fill=mix(c, ta))
        d.rounded_rectangle([x0, y + 90, x0 + maxw, y + 160], 35, fill=CARD)
        bw = min(maxw, max(70, maxw * p / mx * g))
        d.rounded_rectangle([x0, y + 90, x0 + bw, y + 160], 35, fill=mix(c, fo))
        if amt: d.text((x0 + 30, y + 99), amt, font=F("Black", 44), fill=BG)
        if sub: d.text((x0, y + 180), sub, font=F("Medium", 42), fill=mix(MUTED, ta))

def sc_list(d, s, sc):
    dur = sc["dur"]; fo = 1 - ease((s - (dur - 0.3)) / 0.3)
    a = ease(s / 0.4) * fo
    y = block(d, 280, sc["title"], F("Black", 84), "gold", a) + 50
    step = sc.get("step", 1.3)
    for i, it in enumerate(sc["items"]):
        r = ease((s - 0.8 - i * step) / 0.4) * fo
        d.rounded_rectangle([80, y, 1000, y + 190], 30, fill=mix(CARD, r))
        d.text((115, y + 48), str(i + 1), font=F("Black", 84), fill=mix(COL["gold"], r))
        block(d, y + 40, it[0], F("Bold", 50), "fg", r, maxw=760, align="l", x=210)
        if len(it) > 1:
            block(d, y + 112, it[1], F("Medium", 38), "muted", r, maxw=760, align="l", x=210)
        y += 215

def sc_cta(d, s, sc):
    a = ease(s / 0.4)
    y = sc.get("y", 640)
    for txt, c in sc["lines"]:
        y = block(d, y, txt, F("Black", sc.get("size", 84)), c, a, (1 - a) * 40) + 10
    b = ease((s - 0.8) / 0.4)
    block(d, y + 90, sc.get("sub", "Yadda saxla və dostuna göndər"), F("SemiBold", 56), "muted", b)
    block(d, y + 200, "Hər gün yeni reel → " + HANDLE, F("SemiBold", 44), "gold", ease((s - 1.4) / 0.4))

SCENES = dict(hook=sc_hook, myth=sc_myth, quiz=sc_quiz, calc=sc_calc, bars=sc_bars, list=sc_list, cta=sc_cta)

def render_frame(spec, t, total):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    tw = d.textlength(HANDLE, font=F("SemiBold", 34))
    d.text(((W - tw) / 2, 120), HANDLE, font=F("SemiBold", 34), fill=MUTED)
    acc = 0.0
    for sc in spec["scenes"]:
        if t < acc + sc["dur"] or sc is spec["scenes"][-1]:
            SCENES[sc["type"]](d, t - acc, sc); break
        acc += sc["dur"]
    d.rectangle([0, H - 10, W * t / total, H], fill=COL["gold"])
    return im

# ---------------- original background music ----------------
def music(path, seconds, seed=1):
    sr = 44100; n = int(sr * seconds); t = np.arange(n) / sr
    rng = np.random.default_rng(seed)
    bpm = 88; beat = 60 / bpm
    progs = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 65]]
    rng.shuffle(progs)
    out = np.zeros(n)
    bar = beat * 4
    for b in range(int(seconds / bar) + 1):
        ch = progs[b % 4]; s0 = int(b * bar * sr); s1 = min(n, int((b + 1) * bar * sr))
        if s0 >= n: break
        tt = t[s0:s1] - b * bar
        env = np.minimum(1, tt / 0.6) * np.exp(-tt * 0.35)
        for m in ch:
            f = 440 * 2 ** ((m - 69) / 12)
            out[s0:s1] += 0.06 * env * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt))
        fb = 440 * 2 ** ((ch[0] - 12 - 69) / 12)
        out[s0:s1] += 0.10 * env * np.sin(2 * np.pi * fb * tt)
    for k in range(int(seconds / beat) + 1):
        s0 = int(k * beat * sr)
        if s0 >= n: break
        L = min(int(0.25 * sr), n - s0); tt = np.arange(L) / sr
        if k % 2 == 0:  # kick
            f = 110 * np.exp(-tt * 18) + 45
            out[s0:s0 + L] += 0.45 * np.exp(-tt * 9) * np.sin(2 * np.pi * np.cumsum(f) / sr)
        else:  # soft snare/clap
            out[s0:s0 + L] += 0.10 * np.exp(-tt * 22) * rng.standard_normal(L)
        h0 = int((k + 0.5) * beat * sr)
        if h0 < n:
            Lh = min(int(0.05 * sr), n - h0)
            out[h0:h0 + Lh] += 0.04 * np.exp(-np.arange(Lh) / sr * 60) * rng.standard_normal(Lh)
    fade = np.minimum(1, np.minimum(t / 0.5, (seconds - t) / 1.0))
    out = out * fade
    out = out / (np.max(np.abs(out)) + 1e-9) * 0.5
    data = (np.stack([out, out], 1) * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(data.tobytes())

def build(spec_path, out_path, previews=None):
    spec = json.load(open(spec_path))
    total = sum(sc["dur"] for sc in spec["scenes"])
    tmp = tempfile.mkdtemp()
    for i in range(int(total * FPS)):
        render_frame(spec, i / FPS, total).save(f"{tmp}/{i:05d}.png", compress_level=1)
    music(f"{tmp}/m.wav", total, spec.get("music_seed", 1))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.png",
                    "-i", f"{tmp}/m.wav", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20",
                    "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out_path], check=True)
    if previews:
        acc, ims = 0.0, []
        for sc in spec["scenes"]:
            ims.append(render_frame(spec, acc + sc["dur"] * 0.85, total).resize((270, 480)))
            acc += sc["dur"]
        strip = Image.new("RGB", (270 * len(ims), 480))
        for i, im in enumerate(ims): strip.paste(im, (i * 270, 0))
        strip.save(previews)
    subprocess.run(["rm", "-rf", tmp])
    return total

if __name__ == "__main__":
    print(build(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None))
