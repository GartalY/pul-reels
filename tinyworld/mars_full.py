"""Tiny World — LAST DOME ON MARS, Episode 1 (full, ~48 s, 1080x1920, 30 fps).

Story beats (video time):
  0.0–3.6   cold open: close-up of the cracking dome on sol 9, alarm → "9 sols earlier"
  3.6–7.5   wide establishing shot, title
  7.5–16.6  crew intro: camera holds on MEI, ANA, RAJ, KOFI with name cards
  16.6–27   time-lapse sols 1–8 (real day/night, farm grows, food falls)
  27–34     sol 9: dust storm, panels covered, crack (camera zooms in), alarm
  34–46     decision: Ana & Kofi step forward, oxygen keeps falling, COMMENT A OR B
  46–48     end card
Underneath: crew agents with jobs, O2 / power / food / plant balances.

python3 tinyworld/mars_full.py out/tinyworld/mars_ep1_full.mp4
"""
import math, os, random, subprocess, sys, tempfile, wave
import cairo
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from reelgen import music
from tinyworld.colony import rgb, rrect, text, ease

W, H, FPS = 1080, 1920, 30
DUR = 48.0
HOR, FLOOR, CX, R = 1010, 1170, 540, 420
ANCHOR = (540, 1180)                       # screen point the camera centre maps to
COLD, EST, INTRO_END, LAPSE_END, STORM, CRACK, VOTE, END = 3.6, 7.5, 16.6, 27.0, 27.0, 30.4, 34.0, 46.0
SOL_LEN = (LAPSE_END - INTRO_END) / 8
rng = random.Random(42)

CREW = [("MEI", "COMMANDER", "#e74c3c"), ("ANA", "ENGINEER", "#3498db"), ("RAJ", "BOTANIST", "#2ecc71"),
        ("KOFI", "PILOT", "#f1c40f"), ("LENA", "DOCTOR", "#ec407a"), ("OMAR", "GEOLOGIST", "#e67e22"),
        ("SARA", "CHEMIST", "#9b59b6"), ("IVAN", "MECHANIC", "#95a5a6"), ("NIA", "BIOLOGIST", "#1abc9c"),
        ("LEO", "TECHNICIAN", "#ff7043"), ("YUKI", "PHYSICIST", "#00bcd4"), ("TOMAS", "COOK", "#8e44ad")]
STARS = {"MEI": (330, 8.0, 10.0), "ANA": (520, 10.2, 12.2), "RAJ": (730, 12.4, 14.4), "KOFI": (860, 14.6, 16.6)}
SPOTS = {"farm": (680, 880), "power": (480, 600), "home": (200, 420)}


def mix(a, b, k):
    A = rgb(a) if isinstance(a, str) else a; B = rgb(b) if isinstance(b, str) else b
    return tuple(A[i] + (B[i] - A[i]) * k for i in range(3))


# ---------------------------------------------------------------- camera
KEYS = [  # (time, wx, wy, zoom, cut)
    (0.0, 300, 840, 2.3, True), (3.6, 540, 990, 0.95, True), (7.4, 540, 1080, 1.55, False),
    (8.0, 330, 1100, 2.6, False), (10.0, 330, 1100, 2.6, False), (10.4, 520, 1100, 2.6, False),
    (12.2, 520, 1100, 2.6, False), (12.6, 730, 1100, 2.6, False), (14.4, 730, 1100, 2.6, False),
    (14.8, 860, 1100, 2.6, False), (16.4, 860, 1100, 2.6, False), (17.2, 540, 1080, 1.55, False),
    (30.3, 540, 1080, 1.55, False), (30.9, 310, 860, 2.4, False), (32.8, 310, 860, 2.4, False),
    (33.6, 540, 1080, 1.55, False), (48.0, 540, 1080, 1.55, False)]


def camera(t):
    for a, b in zip(KEYS, KEYS[1:]):
        if a[0] <= t < b[0]:
            if b[4]: return a[1:4]
            u = ease((t - a[0]) / (b[0] - a[0]))
            return tuple(a[k] + (b[k] - a[k]) * u for k in (1, 2, 3))
    return KEYS[-1][1:4]


def apply_cam(c, cam):
    wx, wy, z = cam
    c.translate(*ANCHOR); c.scale(z, z); c.translate(-wx, -wy)


def to_screen(cam, x, y):
    wx, wy, z = cam; return ANCHOR[0] + (x - wx) * z, ANCHOR[1] + (y - wy) * z


# ---------------------------------------------------------------- simulation
class Crew:
    def __init__(self, i):
        self.name, self.role, self.col = CREW[i]
        self.x = STARS[self.name][0] if self.name in STARS else rng.uniform(220, 880); self.tx = self.x
        self.speed = rng.uniform(55, 85); self.job = rng.choice(["farm", "farm", "power", "home"])
        self.wait = rng.uniform(0, 1.5); self.dist = rng.uniform(0, 50); self.face = rng.choice([-1, 1])
        self.working = True; self.ph = rng.random() * 6

    def step(self, dt, t):
        panic = t > CRACK
        lapse = INTRO_END < t < LAPSE_END
        if self.name in STARS and t < INTRO_END:              # hold for the intro shot
            self.x = STARS[self.name][0]; self.face = 1 if self.name in ("MEI", "ANA") else -1
            self.working = True; return
        if t > VOTE - 0.6 and self.name in ("ANA", "KOFI"):
            self.tx = 380 if self.name == "ANA" else 690
        sp = self.speed * (3.2 if lapse else 1) * (2.4 if panic else 1)
        if abs(self.tx - self.x) > 2:
            d = math.copysign(min(sp * dt, abs(self.tx - self.x)), self.tx - self.x)
            self.x += d; self.dist += abs(d); self.face = 1 if d > 0 else -1; self.working = False
        else:
            self.working = True; self.wait -= dt * (3 if lapse else 1)
            if self.wait <= 0 and not (t > VOTE - 0.6 and self.name in ("ANA", "KOFI")):
                if panic:
                    self.tx = rng.uniform(440, 640); self.wait = 0.4
                else:
                    self.job = rng.choice(["farm", "farm", "power", "home"]); lo, hi = SPOTS[self.job]
                    self.tx = rng.uniform(lo, hi); self.wait = rng.uniform(0.8, 2.2)


class Sim:
    def __init__(self):
        self.crew = [Crew(i) for i in range(12)]
        self.o2, self.food, self.power, self.plants = 98.0, 92.0, 85.0, 0.12

    @staticmethod
    def light(t):
        if t < COLD: return 0.35
        if t < INTRO_END: return 1.0
        if t < LAPSE_END: return 0.5 - 0.5 * math.cos(2 * math.pi * ((t - INTRO_END) / SOL_LEN + 0.5))
        return max(0.25, 1.0 - (t - STORM) * 0.25)

    @staticmethod
    def dust(t):
        return 1.0 if t < COLD else ease((t - STORM) / 1.8)

    @staticmethod
    def sol(t):
        if t < COLD: return 9
        if t < INTRO_END: return 1
        if t < LAPSE_END: return min(8, 1 + int((t - INTRO_END) / SOL_LEN))
        return 9

    def step(self, dt, t):
        for c in self.crew: c.step(dt, t)
        if t < COLD: return
        lapse = INTRO_END < t < LAPSE_END
        k = 6.0 if lapse else 0.4                              # sim speed multiplier
        farmers = sum(1 for c in self.crew if c.job == "farm")
        L, D = self.light(t), self.dust(t)
        self.power += (L * (1 - D) * 13 - 6.5) * dt * (2.2 if lapse else 1)
        self.power = max(6, min(100, self.power))
        if t < CRACK: self.plants = min(0.95, self.plants + farmers * 0.0046 * dt * k)
        self.food = max(0, self.food - 1.25 * dt * k + farmers * 0.03 * dt * k)
        prod = 2.0 * self.plants + (1.0 if self.power > 20 else 0.3)
        leak = 0 if t < CRACK else 4.8
        self.o2 = max(0, min(100, self.o2 + (prod - 2.0 - leak) * dt))


# ---------------------------------------------------------------- world drawing
def ground_layer():
    PAD = 700
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W + 2 * PAD, H + 400); c = cairo.Context(s); c.translate(PAD, 0)
    r = random.Random(5)
    for layer, (base, amp, col) in enumerate([(920, 130, "#c58058"), (958, 85, "#ad6642"), (992, 50, "#975233")]):
        c.move_to(-PAD, H + 400); x = -PAD
        while x <= W + PAD:
            y = base - amp * (0.5 + 0.5 * math.sin(x / (170 + layer * 60) + layer * 2)) * (0.6 + 0.4 * math.sin(x / 53 + layer))
            c.line_to(x, y); x += 16
        c.line_to(W + PAD, H + 400); c.close_path(); c.set_source_rgba(*rgb(col)); c.fill()
    g = cairo.LinearGradient(0, HOR, 0, H + 400)
    for o, col in [(0, "#b8603a"), (0.2, "#a4512f"), (1, "#4a1e0f")]: g.add_color_stop_rgb(o, *rgb(col)[:3])
    c.rectangle(-PAD, HOR, W + 2 * PAD, H + 400 - HOR); c.set_source(g); c.fill()
    for _ in range(4200):
        x, y = r.uniform(-PAD, W + PAD), r.uniform(HOR, H + 400); rr = r.uniform(0.6, 2.0) * (1 + (y - HOR) / 700)
        c.arc(x, y, rr, 0, 6.3); c.set_source_rgba(*rgb(r.choice(["#d9875a", "#6e2d18", "#c06a40"]), 0.3)); c.fill()
    for _ in range(90):
        x, y = r.uniform(-PAD, W + PAD), r.uniform(HOR + 20, H + 400); a = r.uniform(5, 24) * (1 + (y - HOR) / 500)
        if abs(x - CX) < R + 60 and y < FLOOR + 50: continue
        c.save(); c.translate(x, y); c.scale(a, a * 0.5); c.arc(0, 0, 1, 0, 6.3); c.restore()
        c.set_source_rgba(0.15, 0.05, 0.02, 0.35); c.fill()
        c.save(); c.translate(x, y - a * 0.12); c.scale(a, a * 0.55); c.arc(0, 0, 1, 0, 6.3); c.restore()
        g2 = cairo.RadialGradient(x - a * 0.35, y - a * 0.4, 1, x, y, a)
        g2.add_color_stop_rgb(0, *rgb("#b0583a")[:3]); g2.add_color_stop_rgb(1, *rgb("#4d1d0e")[:3]); c.set_source(g2); c.fill()
    # pad with ring lights
    for (dy, sc, col) in [(10, 40, "#6e7078"), (6, 34, "#9a9ca4"), (2, 26, "#c3c6cd")]:
        c.save(); c.translate(CX, FLOOR + dy); c.scale(R + 60, sc); c.arc(0, 0, 1, 0, 6.3); c.restore(); c.set_source_rgba(*rgb(col)); c.fill()
    return s, PAD


def sky(c, t, cam, L, D):
    hor = to_screen(cam, 0, HOR)[1]
    night = 1 - L
    top = mix(mix("#d8a27c", "#0f1430", night), "#6b3a22", D)
    bot = mix(mix("#f3caa2", "#3a2a40", night), "#a8643a", D)
    g = cairo.LinearGradient(0, 0, 0, max(200, hor)); g.add_color_stop_rgb(0, *top); g.add_color_stop_rgb(1, *bot)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()
    if night > 0.3 and D < 0.5:
        r = random.Random(9)
        for _ in range(170):
            x, y = r.uniform(0, W), r.uniform(0, max(50, hor - 260))
            tw = 0.7 + 0.3 * math.sin(t * 3 + x)
            c.arc(x, y, r.uniform(0.7, 2.2), 0, 6.3); c.set_source_rgba(1, 1, 1, (night - 0.3) * r.uniform(0.4, 1) * tw * (1 - D)); c.fill()
        # Phobos
        px, py = 820, max(120, hor - 720)
        c.arc(px, py, 26, 0, 6.3); c.set_source_rgba(0.75, 0.7, 0.66, (night - 0.3) * 1.3 * (1 - D)); c.fill()
        c.arc(px + 8, py - 4, 24, 0, 6.3); c.set_source_rgba(*top, (night - 0.3) * 1.2 * (1 - D)); c.fill()
    if INTRO_END < t < STORM + 1:
        ph = ((t - INTRO_END) / SOL_LEN + 0.5) % 1
        sx = 80 + 920 * ph; sy = hor - 100 - 520 * math.sin(math.pi * ph)
        for rad, a in [(80, 0.14), (40, 0.4), (19, 1)]:
            c.arc(sx, sy, rad, 0, 6.3); c.set_source_rgba(0.86, 0.94, 1, a * L * (1 - D)); c.fill()
    elif COLD <= t <= INTRO_END:
        sx, sy = 800, hor - 520
        for rad, a in [(80, 0.14), (40, 0.4), (19, 1)]:
            c.arc(sx, sy, rad, 0, 6.3); c.set_source_rgba(0.95, 0.96, 1, a); c.fill()


def panels(c, D):
    for bx in (20, 975):
        for k in range(2):
            x = bx + k * 50; y = FLOOR - 62
            c.save(); c.translate(x, y); c.transform(cairo.Matrix(1, 0, -0.35, 1, 0, 0))
            rrect(c, 0, 0, 44, 58, 4)
            g = cairo.LinearGradient(0, 0, 44, 58); g.add_color_stop_rgb(0, *mix("#2b5bb5", "#8a5233", D * 0.9))
            g.add_color_stop_rgb(1, *mix("#162f66", "#6b3a22", D * 0.9)); c.set_source(g); c.fill()
            c.set_source_rgba(1, 1, 1, 0.3 * (1 - D)); c.set_line_width(1)
            for gx in (11, 22, 33): c.move_to(gx, 0); c.line_to(gx, 58)
            for gy in (14.5, 29, 43.5): c.move_to(0, gy); c.line_to(44, gy)
            c.stroke(); c.restore()
            c.move_to(x + 10, y + 58); c.line_to(x + 10, FLOOR + 12); c.set_source_rgba(0.55, 0.56, 0.6, 1); c.set_line_width(3); c.stroke()
    # rover
    x, y = 120, FLOOR + 120
    rrect(c, x, y - 46, 120, 40, 12); c.set_source_rgba(*rgb("#e6e8ec")); c.fill()
    rrect(c, x + 70, y - 70, 44, 28, 8); c.set_source_rgba(*rgb("#c9cdd4")); c.fill()
    rrect(c, x + 78, y - 64, 28, 14, 5); c.set_source_rgba(*rgb("#3d5a80")); c.fill()
    for wx in (x + 18, x + 60, x + 102):
        c.arc(wx, y, 15, 0, 6.3); c.set_source_rgba(*rgb("#2b2b30")); c.fill()
        c.arc(wx, y, 6, 0, 6.3); c.set_source_rgba(*rgb("#7a7d85")); c.fill()


def modules(c, t, sim, L):
    lamp = 1 - L
    # habitat
    rrect(c, 172, 990, 260, FLOOR - 990, 48)
    g = cairo.LinearGradient(172, 990, 172, FLOOR); g.add_color_stop_rgb(0, *rgb("#ffffff")[:3]); g.add_color_stop_rgb(1, *rgb("#cfd4dc")[:3])
    c.set_source(g); c.fill()
    rrect(c, 172, 990, 260, 22, 11); c.set_source_rgba(*rgb("#b7bdc7")); c.fill()
    c.move_to(200, 990); c.line_to(200, 940); c.set_source_rgba(0.6, 0.62, 0.68, 1); c.set_line_width(3); c.stroke()
    c.arc(200, 936, 6, 0, 6.3); c.set_source_rgba(*rgb("#e74c3c" if int(t * 2) % 2 else "#7a2a22")); c.fill()
    for i in range(3):
        rrect(c, 200 + i * 72, 1036, 50, 40, 13)
        c.set_source_rgba(*mix("#355075", "#ffd27a", lamp)); c.fill()
        rrect(c, 204 + i * 72, 1040, 18, 10, 5); c.set_source_rgba(1, 1, 1, 0.35); c.fill()
    rrect(c, 380, 1090, 38, 80, 10); c.set_source_rgba(*rgb("#9aa2ad")); c.fill()       # door
    text(c, "HAB-1", 285, 1128, 22, "#8c939e", align="c")
    # oxygen generator
    al = t > CRACK or t < COLD
    blink = al and int(t * 4) % 2 == 0
    rrect(c, 500, 925, 80, FLOOR - 925, 22)
    g = cairo.LinearGradient(500, 0, 580, 0); g.add_color_stop_rgb(0, *rgb("#c6ccd5")[:3]); g.add_color_stop_rgb(0.4, *rgb("#f4f6f9")[:3]); g.add_color_stop_rgb(1, *rgb("#aab1bc")[:3])
    c.set_source(g); c.fill()
    for k in range(4):
        rrect(c, 512, 950 + k * 52, 56, 32, 9)
        lvl = sim.o2 / 100 > (3 - k) / 4
        col = rgb("#ff3b30") if blink else (rgb("#35c2ff") if lvl else rgb("#4a525e"))
        c.set_source_rgba(*col); c.fill()
        if lvl and not blink:
            rrect(c, 516, 954 + k * 52, 22, 9, 4); c.set_source_rgba(1, 1, 1, 0.45); c.fill()
    text(c, "O2", 540, 912, 26, "#ff3b30" if blink else "#ffffff", align="c")
    # greenhouse
    gx0, gx1, gy = 640, 910, 1020
    c.move_to(gx0, FLOOR); c.line_to(gx0, gy + 40); c.curve_to(gx0, gy - 12, gx1, gy - 12, gx1, gy + 40)
    c.line_to(gx1, FLOOR); c.close_path()
    grow = lamp * (1 - sim.dust(t))
    c.set_source_rgba(*mix((0.75, 0.95, 0.85), (0.95, 0.45, 0.9), grow * 0.8), 0.28 + 0.2 * grow); c.fill_preserve()
    c.set_source_rgba(0.9, 1, 0.95, 0.75); c.set_line_width(4); c.stroke()
    for k in range(1, 6):
        x = gx0 + (gx1 - gx0) * k / 6; c.move_to(x, gy + 8); c.line_to(x, FLOOR); c.set_source_rgba(0.9, 1, 0.95, 0.25); c.set_line_width(2); c.stroke()
    r = random.Random(3)
    for row in range(3):
        for k in range(8):
            x = gx0 + 24 + k * 32 + row * 6; y = FLOOR - 14 - row * 36
            g_ = sim.plants * r.uniform(0.75, 1.05)
            rrect(c, x - 12, y + 2, 24, 8, 3); c.set_source_rgba(0.45, 0.32, 0.25, 0.9); c.fill()
            if g_ <= 0.05: continue
            for leaf in range(3):
                ang = -math.pi / 2 + (leaf - 1) * 0.7
                c.save(); c.translate(x + math.cos(ang) * 8 * g_, y + math.sin(ang) * 10 * g_); c.rotate(ang)
                c.scale(13 * g_, 6 * g_); c.arc(0, 0, 1, 0, 6.3); c.restore()
                c.set_source_rgba(*rgb(r.choice(["#3fbf6a", "#2fa356", "#5cd67f"]))); c.fill()
    text(c, "FARM", 775, 1162, 22, "#ffffff", align="c", alpha=0.8)


def astronaut(c, cr, t, scale=1.15, ring=False):
    bob = math.sin(t * 2.2 + cr.ph) * 0.8 if cr.working else 0
    c.save(); c.translate(cr.x, FLOOR - 4 + bob); c.scale(cr.face * scale, scale)
    ph = cr.dist * 0.09
    if ring:
        c.save(); c.scale(1, 0.3); c.arc(0, 0, 42, 0, 6.3); c.restore()
        c.set_source_rgba(1, 0.85, 0.2, 0.6 + 0.35 * math.sin(t * 8)); c.set_line_width(5); c.stroke()
    c.save(); c.scale(1, 0.22); c.arc(0, 0, 20, 0, 6.3); c.restore(); c.set_source_rgba(0, 0, 0, 0.25); c.fill()   # shadow
    c.set_line_cap(1)
    for s in (-1, 1):
        sw = math.sin(ph + (0 if s > 0 else math.pi)) * (7 if not cr.working else 0)
        col = rgb("#c9ced6") if s < 0 else rgb("#f2f4f7")
        c.move_to(-1 + s * 3, -27); c.line_to(sw * 0.5 - 1 + s * 2, -14); c.line_to(sw - 1 + s * 2, -4)
        c.set_line_width(11); c.set_source_rgba(*col); c.stroke()
        rrect(c, sw - 8 + s * 2, -8, 15, 8, 3); c.set_source_rgba(*rgb("#5d636e")); c.fill()          # boot
    rrect(c, -19, -60, 10, 32, 4); c.set_source_rgba(*rgb("#8e96a3")); c.fill()                     # backpack
    c.arc(-14, -54, 2.2, 0, 6.3); c.set_source_rgba(*rgb("#35e07a" if int(t * 2 + cr.ph) % 2 else "#1d7a44")); c.fill()
    rrect(c, -11, -62, 24, 40, 10)
    g = cairo.LinearGradient(-11, 0, 13, 0); g.add_color_stop_rgb(0, *rgb("#d4d9e0")[:3]); g.add_color_stop_rgb(0.5, *rgb("#ffffff")[:3]); g.add_color_stop_rgb(1, *rgb("#c3c9d2")[:3])
    c.set_source(g); c.fill()
    rrect(c, -11, -46, 24, 6, 3); c.set_source_rgba(*rgb(cr.col)); c.fill()                         # stripe
    rrect(c, 2, -58, 8, 6, 2); c.set_source_rgba(*rgb(cr.col)); c.fill()                             # patch
    arm = math.sin(ph) * 6 if not cr.working else math.sin(t * 6 + cr.ph) * 3 - 4
    c.move_to(3, -55); c.line_to(7 + arm, -40); c.line_to(9 + arm, -30); c.set_line_width(8); c.set_source_rgba(*rgb("#dfe3e9")); c.stroke()
    c.arc(9 + arm, -29, 4.2, 0, 6.3); c.set_source_rgba(*rgb("#7a808b")); c.fill()                  # glove
    c.arc(1, -76, 17, 0, 6.3)                                                                          # helmet
    g = cairo.RadialGradient(-5, -84, 2, 1, -76, 18); g.add_color_stop_rgb(0, *rgb("#ffffff")[:3]); g.add_color_stop_rgb(1, *rgb("#c9ced6")[:3])
    c.set_source(g); c.fill()
    c.save(); c.translate(6, -76); c.scale(11, 10); c.arc(0, 0, 1, 0, 6.3); c.restore()             # visor
    g = cairo.LinearGradient(0, -86, 16, -66)
    g.add_color_stop_rgb(0, *rgb("#ffd36b")[:3]); g.add_color_stop_rgb(0.55, *rgb("#e8862a")[:3]); g.add_color_stop_rgb(1, *rgb("#8a3d14")[:3])
    c.set_source(g); c.fill()
    c.save(); c.translate(2, -81); c.rotate(-0.5); c.scale(4.5, 2.4); c.arc(0, 0, 1, 0, 6.3); c.restore(); c.set_source_rgba(1, 1, 1, 0.85); c.fill()
    c.arc(1, -76, 17, 0, 6.3); c.set_source_rgba(0.6, 0.64, 0.7, 0.8); c.set_line_width(1.6); c.stroke()
    c.restore()


def dome(c, t, D, sim, L):
    g = cairo.RadialGradient(CX - 150, FLOOR - 320, 40, CX, FLOOR, R)
    g.add_color_stop_rgba(0, 1, 1, 1, 0.14 + 0.1 * D); g.add_color_stop_rgba(1, 0.7, 0.85, 1, 0.07 + 0.22 * D)
    c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.close_path(); c.set_source(g); c.fill()
    # geodesic: rings + zig-zag struts
    rings = [0, 0.26, 0.5, 0.7, 0.86, 0.96]
    pts = []
    for i, hfrac in enumerate(rings):
        y = FLOOR - R * hfrac; hw = math.sqrt(max(0, R * R - (R * hfrac) ** 2)); n = max(2, 10 - i * 2)
        off = 0.5 if i % 2 else 0
        pts.append([(CX - hw + 2 * hw * (k + off) / n, y) for k in range(n + 1) if k + off <= n])
    c.set_source_rgba(0.88, 0.92, 0.97, 0.5); c.set_line_width(2.2)
    for i, row in enumerate(pts):
        c.move_to(*row[0])
        for p in row[1:]: c.line_to(*p)
        c.stroke()
        if i + 1 < len(pts):
            for p in row:
                q = min(pts[i + 1], key=lambda z: abs(z[0] - p[0]))
                c.move_to(*p); c.line_to(*q); c.stroke()
    c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.set_source_rgba(0.9, 0.94, 0.98, 0.75); c.set_line_width(5); c.stroke()
    c.arc(CX, FLOOR, R - 26, math.pi * 1.12, math.pi * 1.36); c.set_source_rgba(1, 1, 1, 0.5); c.set_line_width(10); c.stroke()
    c.arc(CX, FLOOR, R - 46, math.pi * 1.16, math.pi * 1.24); c.set_source_rgba(1, 1, 1, 0.35); c.set_line_width(6); c.stroke()
    if L < 0.6 and D < 0.4:
        gl = cairo.RadialGradient(CX, FLOOR - 80, 30, CX, FLOOR - 80, R)
        gl.add_color_stop_rgba(0, 1, 0.82, 0.5, 0.25 * (0.6 - L)); gl.add_color_stop_rgba(1, 1, 0.82, 0.5, 0)
        c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.set_source(gl); c.fill()
    # base lights
    for k in range(9):
        x = CX - R + 2 * R * (k + 0.5) / 9
        on = (int(t * 3) + k) % 3 == 0
        c.arc(x, FLOOR + 22, 4, 0, 6.3); c.set_source_rgba(*(rgb("#ff3b30") if (t > CRACK or t < COLD) and on else rgb("#9fe8ff", 0.9))); c.fill()
    crack(c, t)


def crack(c, t):
    p = 1.0 if t < COLD else ease((t - CRACK) / 0.7)
    if p <= 0: return
    ang = -2.18; cx0, cy0 = CX + R * math.cos(ang), FLOOR + R * math.sin(ang)
    rr = random.Random(4); c.set_line_cap(1)
    for w_, a_ in [(5, 0.35), (2.6, 0.95)]:
        rr.seed(4)
        for b in range(6):
            c.move_to(cx0, cy0); x, y = cx0, cy0; a0 = math.pi + ang + rr.uniform(-1.0, 1.0)
            for k in range(6):
                x += math.cos(a0) * 17 * p; y += math.sin(a0) * 17 * p; a0 += rr.uniform(-0.6, 0.6); c.line_to(x, y)
            c.set_source_rgba(1, 1, 1, a_); c.set_line_width(w_); c.stroke()
    for k in range(16):
        u = ((t * 1.5 + k / 16) % 1)
        x = cx0 + math.cos(ang) * 230 * u + math.sin(k * 7) * 30 * u; y = cy0 + math.sin(ang) * 230 * u - 40 * u
        c.arc(x, y, 5 + 24 * u, 0, 6.3); c.set_source_rgba(1, 1, 1, 0.4 * (1 - u) * p); c.fill()


def storm(c, t, D):
    if D <= 0: return
    front = 1.0 if t < COLD else ease((t - STORM) / 2.2)
    fade = 1 - 0.75 * (1.0 if t < COLD else ease((t - STORM - 2.2) / 1.4))
    x = -400 + 1700 * front
    g = cairo.LinearGradient(x - 500, 0, x + 200, 0)
    g.add_color_stop_rgba(0, 0.55, 0.3, 0.17, 0.8 * D * fade); g.add_color_stop_rgba(1, 0.55, 0.3, 0.17, 0)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.6, 0.33, 0.18, 0.12 * D); c.fill()
    r = random.Random(1)
    for k in range(int(150 * D)):
        y = r.uniform(0, H); spd = r.uniform(600, 1400)
        xx = (r.uniform(0, W + 400) + t * spd) % (W + 400) - 200
        c.move_to(xx, y); c.line_to(xx + r.uniform(20, 70), y + 4)
        c.set_source_rgba(0.92, 0.64, 0.44, r.uniform(0.15, 0.45) * D); c.set_line_width(r.uniform(1.5, 3.5)); c.stroke()


# ---------------------------------------------------------------- overlays
def gauge(c, x, y, w, label, val, col, warn=False, t=0, a=1):
    blink = warn and int(t * 4) % 2 == 0
    text(c, label, x, y, 24, "#ff6b5b" if warn else "#8a7a70", alpha=a)
    text(c, f"{int(round(val))}%", x + w, y, 30, "#ff3b30" if warn else "#2a1a14", align="r", alpha=a)
    rrect(c, x, y + 16, w, 18, 9); c.set_source_rgba(0, 0, 0, 0.12 * a); c.fill()
    rrect(c, x, y + 16, max(18, w * val / 100), 18, 9); c.set_source_rgba(*rgb("#ff3b30" if blink else col, a)); c.fill()


def hud(c, t, sim, cold_vals=None):
    a = 1.0 if t < COLD else ease((t - INTRO_END) / 0.6)
    if a <= 0: return
    o2, power, food = cold_vals if t < COLD else (sim.o2, sim.power, sim.food)
    rrect(c, 60, 200, 430, 62, 31); c.set_source_rgba(0, 0, 0, 0.4 * a); c.fill()
    text(c, "TINY WORLD · MARS · EP 1", 86, 242, 28, "#ffffff", alpha=a)
    rrect(c, 60, 290, 960, 200, 36); c.set_source_rgba(1, 1, 1, 0.92 * a); c.fill()
    sol = Sim.sol(t)
    text(c, "SOL", 96, 344, 24, "#8a7a70", alpha=a); text(c, f"{sol}", 96, 440, 88, "#d35400" if sol == 9 else "#2a1a14", alpha=a)
    text(c, "CREW", 260, 344, 24, "#8a7a70", alpha=a); text(c, "12", 260, 440, 88, "#2a1a14", alpha=a)
    gauge(c, 470, 340, 500, "OXYGEN", o2, "#35c2ff", warn=o2 < 70, t=t, a=a)
    gauge(c, 470, 400, 230, "POWER", power, "#f1c40f", warn=power < 25, t=t, a=a)
    gauge(c, 740, 400, 230, "FOOD", food, "#3fbf6a", warn=food < 25, t=t, a=a)


def caption(c, t, s, t0, t1, y=1500, col="#ffffff", size=44):
    if not (t0 <= t <= t1): return
    a = ease((t - t0) / 0.35) * (1 - ease((t - t1 + 0.35) / 0.35))
    c.select_font_face("Poppins", 0, 1); c.set_font_size(size); w = c.text_extents(s)[4]
    rrect(c, (W - w) / 2 - 34, y - size - 10, w + 68, size + 42, (size + 42) / 2); c.set_source_rgba(0.08, 0.04, 0.03, 0.72 * a); c.fill()
    text(c, s, W / 2, y + 6, size, col, align="c", alpha=a)


def name_card(c, t, cam, cr, t0, t1):
    if not (t0 <= t <= t1): return
    a = ease((t - t0 - 0.2) / 0.35) * (1 - ease((t - t1 + 0.3) / 0.3))
    sx, sy = to_screen(cam, cr.x, FLOOR - 150)
    y = sy - 150
    c.move_to(sx, sy + 10); c.line_to(sx, y + 92); c.set_source_rgba(1, 1, 1, 0.8 * a); c.set_line_width(3); c.stroke()
    c.select_font_face("Poppins", 0, 1); c.set_font_size(64); w = max(c.text_extents(cr.name)[4], 220) + 70
    rrect(c, sx - w / 2, y - 40, w, 132, 30); c.set_source_rgba(1, 1, 1, 0.95 * a); c.fill()
    rrect(c, sx - w / 2, y - 40, 14, 132, 7); c.set_source_rgba(*rgb(cr.col, a)); c.fill()
    text(c, cr.name, sx, y + 30, 64, "#1d1410", align="c", alpha=a)
    text(c, cr.role, sx, y + 72, 28, "#8a7a70", align="c", alpha=a)


def title(c, t):
    if not (COLD + 0.3 <= t <= EST + 0.4): return
    a = ease((t - COLD - 0.5) / 0.6) * (1 - ease((t - EST) / 0.4))
    s = 0.94 + 0.06 * ease((t - COLD) / 3)
    c.save(); c.translate(W / 2, 520); c.scale(s, s)
    text(c, "LAST DOME", 0, 0, 124, "#ffb27a", align="c", alpha=a)
    text(c, "ON MARS", 0, 120, 124, "#ffb27a", align="c", alpha=a)
    text(c, "12 people. 1 dome. You decide who lives.", 0, 200, 38, "#ffffff", weight=0, align="c", alpha=a)
    c.restore()


def alarm(c, t):
    if not (t < COLD or t > CRACK): return
    k = 0.5 + 0.5 * math.sin(t * 11)
    g = cairo.RadialGradient(W / 2, H / 2, 380, W / 2, H / 2, 1250)
    g.add_color_stop_rgba(0, 1, 0, 0, 0); g.add_color_stop_rgba(1, 1, 0.05, 0.05, 0.38 * k)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()


def vote(c, t, sim):
    if not (VOTE <= t < END): return
    a = ease((t - VOTE - 0.3) / 0.5) * (1 - ease((t - END + 0.4) / 0.4))
    y0 = 520 - 30 * (1 - a)
    rrect(c, 50, y0, 980, 290, 40); c.set_source_rgba(1, 1, 1, 0.96 * a); c.fill()
    text(c, f"Oxygen is falling: {int(sim.o2)}% left. What now?", W / 2, y0 + 62, 36, "#c0392b", align="c", alpha=a)
    for i, (lab, t1, t2, col) in enumerate([("A", "SEAL THE FARM", "lose all plants and food", "#2e86de"),
                                            ("B", "SEND ANA & KOFI", "outside, into the storm", "#e67e22")]):
        pop = a * ease((t - VOTE - 0.8 - i * 0.3) / 0.4)
        x = 80 + i * 470; yy = y0 + 95
        rrect(c, x, yy, 450, 170, 30); c.set_source_rgba(*rgb(col, 0.13 * pop)); c.fill()
        c.arc(x + 62, yy + 85, 42, 0, 6.3); c.set_source_rgba(*rgb(col, pop)); c.fill()
        text(c, lab, x + 62, yy + 107, 54, "#ffffff", align="c", alpha=pop)
        text(c, t1, x + 120, yy + 78, 33, "#2a1a14", alpha=pop)
        text(c, t2, x + 120, yy + 118, 25, "#6b5b4b", weight=0, alpha=pop)
    b = a * ease((t - VOTE - 2.0) / 0.4)
    rrect(c, 140, 1440, 800, 104, 52); c.set_source_rgba(1, 1, 1, 0.95 * b); c.fill()
    pulse = 1 + 0.035 * math.sin(t * 7)
    c.save(); c.translate(W / 2, 1510); c.scale(pulse, pulse)
    text(c, "COMMENT  A  OR  B", 0, 0, 52, "#c0392b", align="c", alpha=b); c.restore()


def end_card(c, t):
    if t < END: return
    a = ease((t - END) / 0.6)
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.05, 0.03, 0.03, 0.85 * a); c.fill()
    text(c, "EPISODE 2", W / 2, 860, 54, "#ffb27a", align="c", alpha=a)
    text(c, "Your choice happens.", W / 2, 960, 70, "#ffffff", align="c", alpha=a)
    text(c, "The simulation decides who survives.", W / 2, 1030, 36, "#cfc6c0", weight=0, align="c", alpha=a)
    b = ease((t - END - 0.6) / 0.5)
    rrect(c, 290, 1120, 500, 100, 50); c.set_source_rgba(*rgb("#ff7a3d", b)); c.fill()
    text(c, "FOLLOW TO SEE", W / 2, 1186, 42, "#ffffff", align="c", alpha=b)


def flash(c, t, t0, d=0.5):
    if t0 <= t <= t0 + d:
        a = 1 - (t - t0) / d; c.rectangle(0, 0, W, H); c.set_source_rgba(1, 1, 1, 0.9 * a); c.fill()


# ---------------------------------------------------------------- render
def main(out):
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    ground, PAD = ground_layer(); sim = Sim()
    cold_sim = Sim()                       # independent crew for the cold open (panicking)
    for cr in cold_sim.crew: cr.x = rng.uniform(420, 660)
    tmp = tempfile.mkdtemp(); vid = f"{tmp}/v.mp4"
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgra", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "19", "-preset", "medium",
                          "-pix_fmt", "yuv420p", vid], stdin=subprocess.PIPE)
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
    for f in range(int(DUR * FPS)):
        t = f / FPS
        if t < COLD:
            for cr in cold_sim.crew: cr.step(1 / FPS, CRACK + 1 + t)
            world = cold_sim
        else:
            for _ in range(2): sim.step(0.5 / FPS, t)
            world = sim
        L, D = Sim.light(t), Sim.dust(t)
        cam = camera(t)
        c = cairo.Context(surf)
        sky(c, t, cam, L, D)
        c.save(); apply_cam(c, cam); c.set_source_surface(ground, -PAD, 0); c.paint(); c.restore()
        c.rectangle(0, 0, W, H); c.set_source_rgba(0.05, 0.05, 0.16, 0.38 * (1 - L) * (1 - D)); c.fill()
        c.save(); apply_cam(c, cam)
        panels(c, D)
        if t < COLD: sim_view = cold_sim; sim_view.o2 = 41
        modules(c, t, world, L)
        ring = t > VOTE + 0.3
        for cr in world.crew:
            star = cr.name in STARS and STARS[cr.name][1] <= t <= STARS[cr.name][2]
            astronaut(c, cr, t, 1.15, ring=(ring and cr.name in ("ANA", "KOFI")) or star)
        dome(c, t, D, world, L)
        c.restore()
        if ring:
            for cr in world.crew:
                if cr.name in ("ANA", "KOFI"):
                    sx, sy = to_screen(cam, cr.x, FLOOR - 120)
                    text(c, cr.name, sx, sy - 14, 30, "#ffd34d", align="c")
        storm(c, t, D)
        alarm(c, t)
        hud(c, t, sim, cold_vals=(41, 6, 12))
        for cr in sim.crew:
            if cr.name in STARS: name_card(c, t, cam, cr, STARS[cr.name][1], STARS[cr.name][2])
        title(c, t)
        caption(c, t, "SOL 9. THE DOME IS CRACKING.", 0.2, 2.6, y=560, col="#ff6b5b", size=48)
        caption(c, t, "9 sols earlier...", 2.7, 3.6, y=960, size=52)
        caption(c, t, "8 sols pass. The farm grows. Food runs low.", 17.6, 22.4, y=1560, size=38)
        caption(c, t, "Then, on sol 9...", 24.0, 26.8, y=1560, size=42)
        caption(c, t, "The storm nobody predicted.", 27.6, 30.2, y=1560, size=42)
        caption(c, t, "The dome is cracking.", 30.9, 33.2, y=1560, col="#ff6b5b", size=46)
        vote(c, t, sim)
        end_card(c, t)
        flash(c, t, COLD, 0.45); flash(c, t, CRACK, 0.25)
        surf.flush(); p.stdin.write(bytes(surf.get_data()))
        if f % 90 == 0: print(f"{t:5.1f}s sol={Sim.sol(t)} o2={sim.o2:.0f} pw={sim.power:.0f} food={sim.food:.0f} pl={sim.plants:.2f}", flush=True)
    p.stdin.close(); p.wait()
    # ---- audio
    sr = 44100; n = int(DUR * sr); tt = np.arange(n) / sr
    music(f"{tmp}/m.wav", DUR + 0.5, 9)
    rg = np.random.default_rng(3)
    wind = np.convolve(rg.standard_normal(n), np.ones(40) / 40, "same") * 1.6
    storm_env = np.where(tt < COLD, 1.0, np.clip((tt - STORM) / 1.5, 0, 1)) * np.where(tt > END, np.clip(1 - (tt - END) / 1.0, 0, 1), 1)
    alarm_on = (tt < COLD) | ((tt > CRACK) & (tt < END))
    beep = np.where(alarm_on & ((tt * 2.5) % 1 < 0.22), 0.12 * np.sin(2 * np.pi * 880 * tt), 0)
    hiss = rg.standard_normal(n) * 0.045 * alarm_on
    boom = np.zeros(n)
    for t0 in (COLD, CRACK):
        s0 = int(t0 * sr); L_ = int(1.4 * sr); u = np.arange(L_) / sr
        boom[s0:s0 + L_] += 0.7 * np.sin(2 * np.pi * (60 * np.exp(-u * 3) + 30) * u) * np.exp(-u * 3)
    pcm = np.clip((wind * storm_env * (0.9 + 0.3 * np.sin(tt * 3)) + beep + hiss + boom) * 32767, -32767, 32767).astype(np.int16)
    with wave.open(f"{tmp}/s.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
    # music: silent in cold open, in from the title, ducks for the storm, back softly under the vote
    vol = (f"volume='if(lt(t,{COLD}),0,if(lt(t,{STORM}),0.6,if(lt(t,{VOTE}),0.2,0.45)))':eval=frame")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", f"{tmp}/m.wav", "-i", f"{tmp}/s.wav",
                    "-filter_complex", f"[1:a]{vol}[m];[m][2:a]amix=inputs=2:duration=first:normalize=0,afade=t=out:st={DUR - 1.2}:d=1.2[a]",
                    "-map", "0:v", "-map", "[a]", "-t", str(DUR), "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", out], check=True)
    print("done", out)


if __name__ == "__main__":
    main(sys.argv[1])
