"""Living-painting test (Gartal 11 Nov): an old Bibiheybat photochrome postcard 'comes alive'.
9:16 1080x1920, 30 fps, ~14 s. Halftone reveal, 2-layer parallax, flicker fire + sparks + drifting smoke,
dive into the flame, smoke-out to a paper text card with a counter. No music (AZ rule), only noise SFX."""
import math, os, subprocess, sys, wave, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter
SRC = sys.argv[1]; OUT = sys.argv[2]; TMP = sys.argv[3]
W, H, FPS, DUR = 1080, 1920, 30, 14.0
N = int(DUR * FPS)
os.makedirs(TMP, exist_ok=True)
PAPER = np.array([238, 228, 208], np.float32); INK = (38, 30, 24); GOLD = (196, 150, 70)
LORA = "/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"
def font(sz, wt="Regular"):
    f = ImageFont.truetype(LORA, sz)
    try: f.set_variation_by_name(wt)
    except Exception: pass
    return f
src = cv2.cvtColor(cv2.imread(SRC), cv2.COLOR_BGR2RGB).astype(np.float32)
sh, sw = src.shape[:2]
# crop off the printed caption strip at the top of the postcard (~7%)
src = src[int(sh * 0.07):, :]; sh, sw = src.shape[:2]
# upscale once (Lanczos) + light unsharp so zooms hold up
S = 2.4
big = cv2.resize(src, (int(sw * S), int(sh * S)), interpolation=cv2.INTER_LANCZOS4)
blur = cv2.GaussianBlur(big, (0, 0), 2.0); big = np.clip(big * 1.5 - blur * 0.5, 0, 255)
BH, BW = big.shape[:2]
FIRE = (0.335 * BW, 0.30 * BH)           # flame top of the derrick (in big coords)
yy, xx = np.mgrid[0:BH, 0:BW].astype(np.float32)
fg_mask = np.clip((yy / BH - 0.80) / 0.06, 0, 1)[..., None]       # ground strip with people = near layer
rng = np.random.default_rng(7)
def ease(x): x = min(1, max(0, x)); return x * x * (3 - 2 * x)
def view(img, cx, cy, z):
    """crop around (cx,cy) in big coords with zoom z (1 = image width fills frame) -> W x H"""
    scale = W / BW * z                      # output px per big px
    M = np.float32([[scale, 0, W / 2 - cx * scale], [0, scale, H / 2 - cy * scale]])
    return cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
# smoke texture: tileable-ish blurred noise
smoke_tex = cv2.GaussianBlur(rng.random((BH // 4, BW // 4)).astype(np.float32), (0, 0), 9)
smoke_tex = (smoke_tex - smoke_tex.min()) / (smoke_tex.max() - smoke_tex.min())
smoke_tex = cv2.resize(smoke_tex, (BW * 2, BH), interpolation=cv2.INTER_CUBIC)
smoke_zone = (np.clip(1 - yy / (0.55 * BH), 0, 1) ** 1.2)
sparks = [dict(x=FIRE[0] + rng.normal(0, 18), y=FIRE[1] + rng.normal(0, 10), t0=rng.uniform(0, DUR),
               vx=rng.normal(8, 14), vy=-rng.uniform(60, 140), life=rng.uniform(1.0, 2.4)) for _ in range(140)]
def frame_scene(t):
    # camera: slow push, then dive toward the flame
    if t < 4.6: z = 1.0 + 0.12 * ease(t / 4.6); cx, cy = BW * 0.5, BH * 0.5
    else:
        k = ease((t - 4.6) / 4.6)
        z = 1.12 + 1.25 * k; cx = BW * 0.5 + (FIRE[0] - BW * 0.5) * k; cy = BH * 0.5 + (FIRE[1] + 0.06 * BH - BH * 0.5) * k
    img = big.copy()
    # drifting smoke (lighten grey-dark areas, moving right/up)
    off = int((t * 22) % BW)
    sm = smoke_tex[:, off:off + BW] * smoke_zone
    img = img * (1 - 0.22 * sm[..., None]) + np.array([150, 140, 130], np.float32) * 0.22 * sm[..., None]
    # fire flicker glow (additive)
    fl = 0.75 + 0.25 * math.sin(t * 17) * math.sin(t * 7.3 + 1) + 0.1 * rng.standard_normal()
    d2 = ((xx - FIRE[0]) ** 2 + ((yy - FIRE[1]) * 0.8) ** 2) / (0.06 * BW) ** 2
    glow = np.exp(-d2) * fl
    img = img + glow[..., None] * np.array([255, 140, 40], np.float32) * 0.55
    # sparks
    pts = []
    for p in sparks:
        a = (t - p["t0"]) % DUR
        if a < p["life"]:
            pts.append((p["x"] + p["vx"] * a + 6 * math.sin(a * 5 + p["t0"]), p["y"] + p["vy"] * a, 1 - a / p["life"]))
    img = np.clip(img, 0, 255)
    far = view(img, cx, cy, z)
    near = view(img, cx, cy - (t * 6), z * 1.035)                  # parallax: ground strip moves more
    nm = view(fg_mask.repeat(3, 2), cx, cy - (t * 6), z * 1.035)
    out = far * (1 - nm) + near * nm
    scale = W / BW * z
    for (px, py, a) in pts:
        sx = (px - cx) * scale + W / 2; sy = (py - cy) * scale + H / 2
        if 0 <= sx < W and 0 <= sy < H:
            r = max(1, int(3 * a * min(z, 2)))
            cv2.circle(out, (int(sx), int(sy)), r, (255, 190 + 50 * a, 90), -1, lineType=cv2.LINE_AA)
    return out
def halftone(img, amount):
    """dot-screen version of img; amount 0..1 grows the dots"""
    g = img.mean(2) / 255.0; cell = 14
    out = np.tile(PAPER, (H, W, 1)).astype(np.float32)
    canvas = Image.fromarray(out.astype(np.uint8)); d = ImageDraw.Draw(canvas)
    small = cv2.resize(img, (W // cell, H // cell), interpolation=cv2.INTER_AREA)
    for j in range(small.shape[0]):
        for i in range(small.shape[1]):
            c = small[j, i]; dark = 1 - c.mean() / 255
            r = cell * 0.62 * math.sqrt(max(0, dark)) * amount + cell * 0.08 * amount
            if r > 0.4:
                x, y = i * cell + cell / 2, j * cell + cell / 2
                d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(int(v) for v in c * 0.85))
    return np.array(canvas).astype(np.float32)
def grain_vignette(img, t):
    n = rng.normal(0, 6, (H // 2, W // 2)).astype(np.float32)
    n = cv2.resize(n, (W, H))[..., None]
    vy, vx = np.mgrid[0:H, 0:W]
    v = 1 - 0.45 * (((vx - W / 2) / (W * 0.75)) ** 2 + ((vy - H / 2) / (H * 0.75)) ** 2)
    return np.clip(img * v[..., None] + n, 0, 255)
VIG = None
def text_layer(t):
    lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    def put(txt, f, y, a, col=(255, 248, 235), x=None, shadow=True):
        if a <= 0: return
        w = d.textlength(txt, font=f); x = (W - 140 - w) / 2 + 70 if x is None else x
        if shadow: d.text((x + 3, y + 3), txt, font=f, fill=(0, 0, 0, int(150 * a)))
        d.text((x, y), txt, font=f, fill=col + (int(255 * a),))
    a1 = ease((t - 0.8) / 0.8) * (1 - ease((t - 4.2) / 0.6))
    a2 = ease((t - 5.4) / 0.7) * (1 - ease((t - 8.6) / 0.4))
    # soft dark bands behind text so it reads over the busy painting
    for (y0, y1, a) in ((220, 560, a1), (1180, 1500, a2)):
        if a > 0:
            for yy_ in range(y0, y1, 4):
                k = math.sin(math.pi * (yy_ - y0) / (y1 - y0))
                d.rectangle([0, yy_, W, yy_ + 4], fill=(10, 8, 6, int(150 * k * a)))
    put("Bakı, 1901", font(104, "SemiBold"), 300, a1)
    put("Bibiheybət", font(52, "Italic") if False else font(52), 430, a1 * 0.95)
    put("Yanan neft fontanı.", font(70, "SemiBold"), 1270, a2)
    put("Köhnə bir açıqca canlanır.", font(46), 1370, a2 * 0.9)
    return lay
def card(t, bg):
    """paper text card 9.6 s -> end"""
    k = ease((t - 9.6) / 0.8)
    base = np.tile(PAPER, (H, W, 1)).astype(np.float32)
    base = base * (1 - 0.13 * k) + bg * 0.13 * k if t < 10.4 else base * 0.87 + bg * 0.13
    lay = Image.fromarray(base.astype(np.uint8)).convert("RGBA"); d = ImageDraw.Draw(lay)
    def put(txt, f, y, a, col=INK):
        if a <= 0: return
        w = d.textlength(txt, font=f); d.text(((W - 140 - w) / 2 + 70, y), txt, font=f, fill=col + (int(255 * a),))
    a = ease((t - 10.0) / 0.5); put("1901-ci ildə Bakıda", font(56), 560, a)
    cnt = int(11_000_000 * ease((t - 10.3) / 1.6))
    put(f"{cnt:,}".replace(",", " "), font(150, "SemiBold"), 660, ease((t - 10.3) / 0.3), GOLD)
    put("ton neft çıxarıldı", font(60), 850, ease((t - 11.2) / 0.5))
    if t > 11.8:
        w = int(500 * ease((t - 11.8) / 0.5)); d.rectangle([W / 2 - 70 - w / 2, 975, W / 2 - 70 + w / 2, 979], fill=GOLD)
    put("dünya neftinin yarısından çoxu", font(58, "SemiBold"), 1020, ease((t - 12.1) / 0.5))
    put("@bilirdinizmi_az", font(40), 1380, ease((t - 12.8) / 0.5), (120, 100, 80))
    return np.array(lay.convert("RGB")).astype(np.float32)
for i in range(N):
    t = i / FPS
    sc = frame_scene(t)
    if t < 1.7:   # halftone reveal from paper, then crossfade to the full image
        ht = halftone(sc, ease(t / 1.1))
        img = ht * (1 - ease((t - 1.0) / 0.7)) + sc * ease((t - 1.0) / 0.7)
    else: img = sc
    if 8.9 <= t < 9.9:   # smoke white-out
        k = ease((t - 8.9) / 0.7); img = img * (1 - k) + np.array([225, 218, 205], np.float32) * k
    if t >= 9.6:
        cardimg = card(t, cv2.GaussianBlur(sc, (0, 0), 6))
        img = cardimg if t >= 9.9 else img * (1 - ease((t - 9.6) / 0.3)) + cardimg * ease((t - 9.6) / 0.3)
    img = grain_vignette(img, t)
    im = Image.fromarray(img.astype(np.uint8)).convert("RGBA")
    if t < 9.0: im.alpha_composite(text_layer(t))
    d = ImageDraw.Draw(im); d.rectangle([0, H - 8, W * t / DUR, H], fill=GOLD)
    im.convert("RGB").save(f"{TMP}/{i:05d}.jpg", quality=90)
# ---- sound: no notes, only noise-based SFX
sr = 44100; n = int(sr * DUR); T = np.arange(n) / sr; a = np.zeros(n)
def lp(x, k):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += k * (x[i] - acc); y[i] = acc
    return y
noise = rng.standard_normal(n)
rumble = lp(noise, 0.002); rumble /= np.abs(rumble).max()
crack = np.zeros(n)
for _ in range(260):
    p = int(rng.uniform(0.3, 9.4) * sr); L = int(sr * rng.uniform(0.004, 0.02))
    crack[p:p + L] += rng.standard_normal(min(L, n - p)) * np.exp(-np.arange(min(L, n - p)) / (L / 4)) * rng.uniform(0.2, 1)
fire_env = np.clip(T / 1.5, 0, 1) * np.clip((9.4 - T) / 0.6, 0, 1) * (0.6 + 0.6 * np.clip((T - 4.6) / 4.6, 0, 1))
a += 0.35 * rumble * fire_env + 0.18 * crack * fire_env
for t0, dur in ((4.5, 1.2), (8.8, 1.4)):
    i0 = int(t0 * sr); L = int(dur * sr); w = lp(rng.standard_normal(L), 0.08)
    a[i0:i0 + L] += 0.5 * w / np.abs(w).max() * np.sin(np.linspace(0, np.pi, L)) ** 2
tick = int(10.3 * sr)
for k in range(16):   # counter ticks (noise clicks)
    i0 = tick + int(k * 0.1 * sr); L = 300; a[i0:i0 + L] += 0.25 * rng.standard_normal(L) * np.exp(-np.arange(L) / 50)
amb = lp(rng.standard_normal(n), 0.004); a += 0.08 * amb / np.abs(amb).max()
a = a / np.abs(a).max() * 0.7
with wave.open(f"{TMP}/a.wav", "wb") as wv:
    wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(sr); wv.writeframes((a * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{TMP}/%05d.jpg", "-i", f"{TMP}/a.wav",
                "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
                "-shortest", "-movflags", "+faststart", OUT], check=True)
print("done", OUT)
