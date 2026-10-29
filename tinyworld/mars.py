"""Tiny World — LAST DOME ON MARS, test episode 1 (20 s, 1080x1920, 30 fps).

Simulation underneath: 12 colonists with jobs (farm, power, rest), oxygen / food / power balances, day-night solar
cycle. Sol 9: a dust storm covers the panels and cracks the dome; oxygen really drains while the vote is shown.

python3 tinyworld/mars.py out/tinyworld/mars_ep1.mp4
"""
import math, os, random, subprocess, sys, tempfile, wave
import cairo
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from reelgen import music
from tinyworld.colony import rgb, rrect, text, ease


def mix(a, b, k):
    A = rgb(a) if isinstance(a, str) else a; B = rgb(b) if isinstance(b, str) else b
    return tuple(A[i] + (B[i] - A[i]) * k for i in range(3))

W, H, FPS, DUR = 1080, 1920, 30, 20.0
HOR, FLOOR = 1010, 1170            # horizon y, dome floor y
CX, R = 540, 420                   # dome centre x, radius
INTRO, STORM, CRACK, VOTE = 2.4, 10.8, 12.4, 15.6
SOL_LEN = 1.05
CAM_S, FLOOR_S = 1.6, 1380   # camera zoom around the dome, floor y on screen
HOR_S = CAM_S * (HOR - FLOOR) + FLOOR_S
rng = random.Random(42)

NAMES = ["ANA", "KOFI", "LENA", "RAJ", "MEI", "OMAR", "SARA", "IVAN", "NIA", "LEO", "YUKI", "TOMAS"]
STRIPES = ["#e74c3c", "#3498db", "#f1c40f", "#9b59b6", "#1abc9c", "#e67e22", "#ec407a", "#2ecc71",
           "#00bcd4", "#ff7043", "#8e44ad", "#95a5a6"]
SPOTS = {"farm": (700, 860), "power": (500, 580), "home": (190, 420)}   # x ranges on the floor


class Crew:
    def __init__(self, i):
        self.name = NAMES[i]; self.col = STRIPES[i]; self.x = rng.uniform(200, 880); self.tx = self.x
        self.speed = rng.uniform(70, 110); self.job = rng.choice(["farm", "farm", "power", "home"])
        self.wait = rng.uniform(0, 1.0); self.dist = 0; self.face = 1; self.working = False

    def step(self, dt, t, panic):
        sp = self.speed * (2.6 if panic else 1)
        if t > VOTE - 0.4 and self.name in ("ANA", "KOFI") and self.wait < 5:
            self.wait = 0; self.working = True
        if abs(self.tx - self.x) > 2:
            d = math.copysign(min(sp * dt, abs(self.tx - self.x)), self.tx - self.x)
            self.x += d; self.dist += abs(d); self.face = 1 if d > 0 else -1; self.working = False
        else:
            self.working = True; self.wait -= dt
            if self.wait <= 0:
                if t > VOTE - 0.4 and self.name in ("ANA", "KOFI"):
                    self.tx = 380 if self.name == "ANA" else 690; self.wait = 9
                elif panic:
                    self.tx = rng.uniform(470, 610); self.wait = 0.3
                else:
                    self.job = rng.choice(["farm", "farm", "power", "home"]); lo, hi = SPOTS[self.job]
                    self.tx = rng.uniform(lo, hi); self.wait = rng.uniform(0.6, 1.6)


class Sim:
    def __init__(self):
        self.crew = [Crew(i) for i in range(12)]
        self.o2, self.food, self.power, self.plants, self.t = 98.0, 30.0, 80.0, 0.15, 0

    def light(self, t):
        if t < INTRO: return 1.0
        if t > STORM: return max(0.0, 0.55 - (t - STORM) * 0.3)
        return 0.5 - 0.5 * math.cos(2 * math.pi * ((t - INTRO) / SOL_LEN + 0.5))

    def step(self, dt):
        self.t += dt; t = self.t
        panic = t > CRACK
        for c in self.crew: c.step(dt, t, panic)
        farmers = sum(1 for c in self.crew if c.job == "farm" and c.working)
        L = self.light(t)
        dust = ease((t - STORM) / 1.5)
        self.power += (L * (1 - dust) * 14 - 6) * dt; self.power = max(4, min(100, self.power))
        self.plants = min(1.0, self.plants + farmers * 0.0105 * dt * (1 if t < CRACK else 0))
        self.food += (farmers * 0.42 - 12 * 0.18) * dt; self.food = max(0, self.food)
        prod = 2.4 * self.plants + (1.2 if self.power > 20 else 0.4)
        leak = 0 if t < CRACK else 9.5
        self.o2 += (prod - 1.9 - leak) * dt; self.o2 = max(0, min(100, self.o2))

    def sol(self, t):
        return 1 if t < INTRO else (min(8, 1 + int((t - INTRO) / SOL_LEN)) if t < STORM else 9)


# ---------------------------------------------------------------- scenery (static parts cached)
def ground_layer():
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s); r = random.Random(5)
    # mesas
    for layer, (base, amp, col) in enumerate([(930, 120, "#c9825a"), (965, 80, "#b36a45"), (995, 50, "#9c5636")]):
        c.move_to(0, H)
        x = 0; y = base
        while x <= W + 40:
            y = base - amp * (0.5 + 0.5 * math.sin(x / (160 + layer * 50) + layer * 2)) * (0.6 + 0.4 * math.sin(x / 47 + layer))
            if r.random() < 0.08: y -= amp * 0.5
            c.line_to(x, y); x += 20
        c.line_to(W, H); c.close_path(); c.set_source_rgba(*rgb(col)); c.fill()
    g = cairo.LinearGradient(0, HOR, 0, H)
    for o, col in [(0, "#b8603a"), (0.25, "#a4512f"), (1, "#5c2614")]: g.add_color_stop_rgb(o, *rgb(col)[:3])
    c.rectangle(0, HOR, W, H - HOR); c.set_source(g); c.fill()
    for _ in range(1600):
        x, y = r.uniform(0, W), r.uniform(HOR, H); rr = r.uniform(0.8, 2.4) * (1 + (y - HOR) / 600)
        c.arc(x, y, rr, 0, 6.3); c.set_source_rgba(*rgb(r.choice(["#d9875a", "#6e2d18", "#c06a40"]), 0.35)); c.fill()
    for _ in range(40):
        x, y = r.uniform(0, W), r.uniform(HOR + 20, H); a = r.uniform(6, 26) * (1 + (y - HOR) / 500)
        c.save(); c.translate(x, y); c.scale(a, a * 0.55); c.arc(0, 0, 1, 0, 6.3); c.restore()
        g2 = cairo.RadialGradient(x - a * 0.3, y - a * 0.3, 1, x, y, a)
        g2.add_color_stop_rgb(0, *rgb("#9c4b2c")[:3]); g2.add_color_stop_rgb(1, *rgb("#4d1d0e")[:3]); c.set_source(g2); c.fill()
    # dome pad
    c.save(); c.translate(CX, FLOOR + 6); c.scale(R + 50, 34); c.arc(0, 0, 1, 0, 6.3); c.restore()
    c.set_source_rgba(*rgb("#8d8f96")); c.fill()
    c.save(); c.translate(CX, FLOOR + 2); c.scale(R + 50, 26); c.arc(0, 0, 1, 0, 6.3); c.restore()
    c.set_source_rgba(*rgb("#b9bcc4")); c.fill()
    return s


def sky(c, t, L, dust):
    night = 1 - L
    top = mix(mix("#d9a07a", "#141a33", night), "#6b3a22", dust)
    bot = mix(mix("#f2c9a0", "#3a2a40", night), "#a8643a", dust)
    g = cairo.LinearGradient(0, 0, 0, HOR_S); g.add_color_stop_rgb(0, *top); g.add_color_stop_rgb(1, *bot)
    c.rectangle(0, 0, W, HOR_S + 60); c.set_source(g); c.fill()
    if night > 0.3 and dust < 0.5:  # stars
        r = random.Random(9)
        for _ in range(140):
            x, y = r.uniform(0, W), r.uniform(0, HOR_S - 250)
            c.arc(x, y, r.uniform(0.8, 2.2), 0, 6.3); c.set_source_rgba(1, 1, 1, (night - 0.3) * r.uniform(0.4, 1) * (1 - dust)); c.fill()
    # small blue-ish sun (Mars sunsets are blue) moves across each sol
    if t < STORM + 1:
        ph = ((t - INTRO) / SOL_LEN + 0.5) % 1 if t > INTRO else 0.5
        sx = 100 + 880 * ph; sy = HOR_S - 120 - 420 * math.sin(math.pi * ph)
        for rad, a in [(70, 0.15), (36, 0.4), (18, 1)]:
            c.arc(sx, sy, rad, 0, 6.3); c.set_source_rgba(0.85, 0.93, 1, a * L * (1 - dust)); c.fill()


def panels(c, dust):
    for bx in (30, 960):
        for k in range(2):
            x = bx + k * 48; y = FLOOR - 60
            c.save(); c.translate(x, y); c.transform(cairo.Matrix(1, 0, -0.35, 1, 0, 0))
            rrect(c, 0, 0, 42, 56, 4); c.set_source_rgba(*mix("#1f3d7a", "#8a5233", dust * 0.9)); c.fill()
            c.set_source_rgba(1, 1, 1, 0.25 * (1 - dust)); c.set_line_width(1)
            for gx in (14, 28): c.move_to(gx, 0); c.line_to(gx, 56)
            for gy in (14, 28, 42): c.move_to(0, gy); c.line_to(42, gy)
            c.stroke(); c.restore()
            c.move_to(x + 10, y + 56); c.line_to(x + 10, FLOOR + 10); c.set_source_rgba(0.6, 0.6, 0.65, 1); c.set_line_width(3); c.stroke()


def modules(c, t, sim, L):
    lamp = 1 - L
    # habitat (left)
    rrect(c, 175, 1000, 250, FLOOR - 1000, 46); c.set_source_rgba(*rgb("#eef0f3")); c.fill()
    rrect(c, 175, 1000, 250, 26, 13); c.set_source_rgba(*rgb("#cfd3da")); c.fill()
    for i in range(3):
        rrect(c, 205 + i * 72, 1050, 48, 40, 12)
        c.set_source_rgba(*mix("#3d5a80", "#ffd27a", lamp)); c.fill()
    text(c, "HAB", 300, 1140, 26, "#8c939e", align="c")
    # oxygen generator (centre)
    al = t > CRACK and int(t * 4) % 2 == 0
    rrect(c, 505, 930, 70, FLOOR - 930, 20); c.set_source_rgba(*rgb("#d5d9e0")); c.fill()
    for k in range(4):
        rrect(c, 515, 955 + k * 52, 50, 30, 8)
        lvl = sim.o2 / 100 > (3 - k) / 4
        c.set_source_rgba(*(rgb("#e74c3c") if al else (rgb("#35c2ff") if lvl else rgb("#5b6470")))); c.fill()
    text(c, "O2", 540, 920, 30, "#e74c3c" if al else "#ffffff", align="c")
    # greenhouse (right)
    gx0, gx1, gy = 640, 905, 1030
    c.save(); c.move_to(gx0, FLOOR); c.line_to(gx0, gy + 40); c.curve_to(gx0, gy - 10, gx1, gy - 10, gx1, gy + 40)
    c.line_to(gx1, FLOOR); c.close_path(); c.set_source_rgba(0.75, 0.95, 0.85, 0.28); c.fill_preserve()
    c.set_source_rgba(0.9, 1, 0.95, 0.7); c.set_line_width(4); c.stroke(); c.restore()
    r = random.Random(3)
    for row in range(3):
        for k in range(8):
            x = gx0 + 22 + k * 32 + row * 6; y = FLOOR - 14 - row * 36
            g = sim.plants * r.uniform(0.75, 1.05)
            if g <= 0.05: continue
            for leaf in range(3):
                ang = -math.pi / 2 + (leaf - 1) * 0.7
                c.save(); c.translate(x + math.cos(ang) * 8 * g, y + math.sin(ang) * 10 * g); c.rotate(ang)
                c.scale(13 * g, 6 * g); c.arc(0, 0, 1, 0, 6.3); c.restore()
                c.set_source_rgba(*rgb(r.choice(["#3fbf6a", "#2fa356", "#5cd67f"]))); c.fill()
    text(c, "FARM", 772, 1160, 24, "#ffffff", align="c", alpha=0.75)


def astronaut(c, cr, t, scale=1.0, ring=False):
    c.save(); c.translate(cr.x, FLOOR - 4); c.scale(cr.face * scale, scale)
    ph = cr.dist * 0.09
    if ring:
        c.save(); c.scale(1, 0.32); c.arc(0, 0, 40, 0, 6.3); c.restore()
        c.set_source_rgba(1, 0.85, 0.2, 0.55 + 0.35 * math.sin(t * 8)); c.set_line_width(5); c.stroke()
    suit = rgb("#f4f5f7"); shade = rgb("#c3c8d0")
    c.set_line_cap(1)
    for s in (-1, 1):  # legs
        sw = math.sin(ph + (0 if s > 0 else math.pi)) * (7 if not cr.working else 0)
        c.move_to(0, -26); c.line_to(sw, -2); c.set_line_width(11); c.set_source_rgba(*shade if s < 0 else suit); c.stroke()
    rrect(c, -15, -33, 7, 26, 3); c.set_source_rgba(*rgb("#9aa1ab")); c.fill()          # backpack
    rrect(c, -10, -58, 22, 36, 9); c.set_source_rgba(*suit); c.fill()                    # torso
    rrect(c, -10, -46, 22, 6, 3); c.set_source_rgba(*rgb(cr.col)); c.fill()             # colour stripe
    arm = math.sin(ph) * 6 if not cr.working else math.sin(t * 10) * 4 - 6
    c.move_to(2, -52); c.line_to(6 + arm, -34); c.set_line_width(8); c.set_source_rgba(*shade); c.stroke()
    c.arc(1, -70, 15, 0, 6.3); c.set_source_rgba(*suit); c.fill()                        # helmet
    g = cairo.LinearGradient(0, -80, 14, -62); g.add_color_stop_rgb(0, *rgb("#ffcf66")[:3]); g.add_color_stop_rgb(1, *rgb("#e07b22")[:3])
    c.save(); c.translate(6, -70); c.scale(10, 9); c.arc(0, 0, 1, 0, 6.3); c.restore(); c.set_source(g); c.fill()
    c.save(); c.translate(3, -74); c.scale(3.5, 2.5); c.arc(0, 0, 1, 0, 6.3); c.restore(); c.set_source_rgba(1, 1, 1, 0.8); c.fill()
    c.restore()
    if ring:
        text(c, cr.name, cr.x, FLOOR - 104 * scale, 26, "#ffd34d", align="c")


def dome(c, t, L, dust, sim):
    # glass
    g = cairo.RadialGradient(CX - 140, FLOOR - 300, 40, CX, FLOOR, R)
    g.add_color_stop_rgba(0, 1, 1, 1, 0.16 + 0.1 * dust); g.add_color_stop_rgba(1, 0.7, 0.85, 1, 0.08 + 0.25 * dust)
    c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.close_path(); c.set_source(g); c.fill()
    # ribs
    c.set_source_rgba(0.85, 0.9, 0.95, 0.55); c.set_line_width(4)
    c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.stroke()
    c.set_line_width(2)
    for k in range(1, 6):
        a = math.pi * k / 6; rx = R * math.cos(a)
        c.save(); c.translate(CX, FLOOR); c.scale(abs(rx) / R if abs(rx) > 1 else 0.01, 1)
        c.arc(0, 0, R, math.pi, 2 * math.pi); c.restore(); c.stroke()
    for hh in (0.35, 0.68):
        y = FLOOR - R * hh; hw = math.sqrt(max(0, R * R - (R * hh) ** 2))
        c.move_to(CX - hw, y); c.line_to(CX + hw, y); c.stroke()
    # highlight
    c.arc(CX, FLOOR, R - 26, math.pi * 1.12, math.pi * 1.38); c.set_source_rgba(1, 1, 1, 0.45); c.set_line_width(10); c.stroke()
    # night interior glow
    if L < 0.6 and dust < 0.4:
        gl = cairo.RadialGradient(CX, FLOOR - 80, 30, CX, FLOOR - 80, R)
        gl.add_color_stop_rgba(0, 1, 0.82, 0.5, 0.22 * (0.6 - L)); gl.add_color_stop_rgba(1, 1, 0.82, 0.5, 0)
        c.arc(CX, FLOOR, R, math.pi, 2 * math.pi); c.set_source(gl); c.fill()
    # crack + escaping air
    p = ease((t - CRACK) / 0.5)
    if p > 0:
        ang = -2.18; cx0, cy0 = CX + R * math.cos(ang), FLOOR + R * math.sin(ang)
        rr = random.Random(4); c.set_source_rgba(1, 1, 1, 0.95); c.set_line_width(3)
        for b in range(5):
            c.move_to(cx0, cy0); x, y = cx0, cy0; a0 = math.pi + ang + rr.uniform(-0.9, 0.9)
            for k in range(5):
                x += math.cos(a0) * 20 * p; y += math.sin(a0) * 20 * p; a0 += rr.uniform(-0.6, 0.6); c.line_to(x, y)
            c.stroke()
        for k in range(14):  # air puffs flying out
            u = ((t * 1.6 + k / 14) % 1)
            x = cx0 + math.cos(ang) * 260 * u + math.sin(k * 7) * 30 * u; y = cy0 + math.sin(ang) * 260 * u - 60 * u
            c.arc(x, y, 6 + 26 * u, 0, 6.3); c.set_source_rgba(1, 1, 1, 0.35 * (1 - u)); c.fill()


def storm(c, t, dust):
    if dust <= 0: return
    # wall of dust on the horizon moving in
    front = -300 + 1500 * ease((t - STORM) / 2.0)
    g = cairo.LinearGradient(front - 400, 0, front + 200, 0)
    fade = 1 - 0.75 * ease((t - STORM - 1.6) / 1.2)
    g.add_color_stop_rgba(0, 0.55, 0.3, 0.17, 0.75 * dust * fade); g.add_color_stop_rgba(1, 0.55, 0.3, 0.17, 0)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.6, 0.33, 0.18, 0.12 * dust); c.fill()
    r = random.Random(1)
    for k in range(int(150 * dust)):
        y = r.uniform(0, H); spd = r.uniform(600, 1400)
        x = (r.uniform(0, W + 400) + t * spd) % (W + 400) - 200
        c.move_to(x, y); c.line_to(x + r.uniform(20, 70), y + 4)
        c.set_source_rgba(0.9, 0.62, 0.42, r.uniform(0.15, 0.45) * dust); c.set_line_width(r.uniform(1.5, 3.5)); c.stroke()


def gauge(c, x, y, w, label, val, col, warn=False, t=0):
    blink = warn and int(t * 4) % 2 == 0
    text(c, label, x, y, 24, "#ff6b5b" if warn else "#8a7a70")
    text(c, f"{int(round(val))}%", x + w, y, 30, "#ff3b30" if warn else "#2a1a14", align="r")
    rrect(c, x, y + 16, w, 18, 9); c.set_source_rgba(0, 0, 0, 0.12); c.fill()
    rrect(c, x, y + 16, max(18, w * val / 100), 18, 9)
    c.set_source_rgba(*rgb("#ff3b30" if blink else col)); c.fill()


def hud(c, t, sim):
    a = ease((t - 0.3) / 0.6)
    rrect(c, 60, 200, 420, 62, 31); c.set_source_rgba(0, 0, 0, 0.38 * a); c.fill()
    text(c, "TINY WORLD · MARS · EP 1", 86, 242, 28, "#ffffff", alpha=a)
    rrect(c, 60, 290, 960, 200, 36); c.set_source_rgba(1, 1, 1, 0.9 * a); c.fill()
    text(c, "SOL", 96, 344, 24, "#8a7a70", alpha=a)
    sol = sim.sol(t); text(c, f"{sol}", 96, 440, 88, "#d35400" if sol == 9 else "#2a1a14", alpha=a)
    text(c, "CREW", 260, 344, 24, "#8a7a70", alpha=a)
    text(c, "12", 260, 440, 88, "#2a1a14", alpha=a)
    gx = 470
    gauge(c, gx, 340, 500, "OXYGEN", sim.o2, "#35c2ff", warn=sim.o2 < 70, t=t)
    gauge(c, gx, 400, 230, "POWER", sim.power, "#f1c40f", warn=sim.power < 25, t=t)
    gauge(c, gx + 270, 400, 230, "FOOD", min(100, sim.food / 40 * 100), "#3fbf6a")


def intro(c, t):
    if t > INTRO + 0.6: return
    a = 1 - ease((t - INTRO) / 0.6)
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.06, 0.03, 0.03, 0.55 * a); c.fill()
    text(c, "LAST DOME", W / 2, 640, 116, "#ff9f5a", align="c", alpha=a)
    text(c, "ON MARS", W / 2, 750, 116, "#ff9f5a", align="c", alpha=a)
    text(c, "12 people. 1 dome. You decide who lives.", W / 2, 825, 38, "#ffffff",
         weight=cairo.FONT_WEIGHT_NORMAL, align="c", alpha=a)


def alarm(c, t):
    if t < CRACK: return
    k = 0.5 + 0.5 * math.sin(t * 12)
    g = cairo.RadialGradient(W / 2, H / 2, 400, W / 2, H / 2, 1200)
    g.add_color_stop_rgba(0, 1, 0, 0, 0); g.add_color_stop_rgba(1, 1, 0.05, 0.05, 0.35 * k)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()
    if t < VOTE + 0.3:
        a = ease((t - CRACK) / 0.3) * (1 - ease((t - VOTE) / 0.3))
        rrect(c, 90, 540, 900, 110, 40); c.set_source_rgba(*rgb("#c0392b", 0.95 * a)); c.fill()
        text(c, "SOL 9: THE DOME IS LEAKING", W / 2, 615, 48, "#ffffff", align="c", alpha=a)


def vote(c, t, sim):
    if t < VOTE: return
    a = ease((t - VOTE) / 0.5)
    y0 = 505 - 30 * (1 - a)
    rrect(c, 50, y0, 980, 290, 40); c.set_source_rgba(1, 1, 1, 0.96 * a); c.fill()
    text(c, f"Oxygen is falling: {int(sim.o2)}% left. What now?", W / 2, y0 + 62, 36, "#c0392b", align="c", alpha=a)
    for i, (lab, t1, t2, col) in enumerate([("A", "SEAL THE FARM", "lose all plants and food", "#2e86de"),
                                            ("B", "SEND ANA & KOFI", "outside, into the storm", "#e67e22")]):
        pop = ease((t - VOTE - 0.3 - i * 0.25) / 0.4)
        x = 80 + i * 470; yy = y0 + 95
        rrect(c, x, yy, 450, 180, 30); c.set_source_rgba(*rgb(col, 0.13 * pop)); c.fill()
        c.arc(x + 62, yy + 90, 42, 0, 6.3); c.set_source_rgba(*rgb(col, pop)); c.fill()
        text(c, lab, x + 62, yy + 112, 54, "#ffffff", align="c", alpha=pop)
        text(c, t1, x + 120, yy + 82, 33, "#2a1a14", alpha=pop)
        text(c, t2, x + 120, yy + 122, 25, "#6b5b4b", weight=cairo.FONT_WEIGHT_NORMAL, alpha=pop)
    b = ease((t - VOTE - 1.0) / 0.4)
    rrect(c, 140, 1450, 800, 104, 52); c.set_source_rgba(1, 1, 1, 0.95 * b); c.fill()
    pulse = 1 + 0.035 * math.sin(t * 7)
    c.save(); c.translate(W / 2, 1520); c.scale(pulse, pulse)
    text(c, "COMMENT  A  OR  B", 0, 0, 52, "#c0392b", align="c", alpha=b); c.restore()


def main(out):
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    ground = ground_layer(); sim = Sim()
    tmp = tempfile.mkdtemp(); vid = f"{tmp}/v.mp4"
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgra", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                          "-pix_fmt", "yuv420p", vid], stdin=subprocess.PIPE)
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
    for f in range(int(DUR * FPS)):
        t = f / FPS
        for _ in range(2): sim.step(0.5 / FPS)
        L = sim.light(t); dust = ease((t - STORM) / 1.6)
        c = cairo.Context(surf)
        sky(c, t, L, dust)
        c.save(); c.translate(CX, FLOOR_S); c.scale(CAM_S, CAM_S); c.translate(-CX, -FLOOR)
        c.set_source_surface(ground, 0, 0); c.paint()
        c.restore()
        c.rectangle(0, 0, W, H); c.set_source_rgba(0.05, 0.05, 0.15, 0.35 * (1 - L) * (1 - dust)); c.fill()  # night tint
        c.save(); c.translate(CX, FLOOR_S); c.scale(CAM_S, CAM_S); c.translate(-CX, -FLOOR)
        panels(c, dust)
        modules(c, t, sim, L)
        vol = t > VOTE
        for cr in sim.crew: astronaut(c, cr, t, 1.15, ring=vol and cr.name in ("ANA", "KOFI"))
        dome(c, t, L, dust, sim)
        c.restore()
        storm(c, t, dust)
        alarm(c, t)
        hud(c, t, sim); intro(c, t); vote(c, t, sim)
        surf.flush(); p.stdin.write(bytes(surf.get_data()))
        if f % 60 == 0: print(f"{t:4.1f}s sol={sim.sol(t)} o2={sim.o2:.0f} power={sim.power:.0f} food={sim.food:.0f} plants={sim.plants:.2f}", flush=True)
    p.stdin.close(); p.wait()
    music(f"{tmp}/m.wav", DUR + 0.5, 9)
    sr = 44100; n = int(DUR * sr); tt = np.arange(n) / sr
    wind = np.convolve(np.random.default_rng(3).standard_normal(n), np.ones(40) / 40, "same")
    wind *= np.clip((tt - STORM) / 1.5, 0, 1) * (0.9 + 0.3 * np.sin(tt * 3)) * 1.6
    beep = np.where((tt > CRACK) & ((tt * 2.5) % 1 < 0.22), 0.13 * np.sin(2 * np.pi * 880 * tt), 0)
    hiss = np.random.default_rng(4).standard_normal(n) * 0.05 * (tt > CRACK)
    pcm = np.clip((wind + beep + hiss) * 32767, -32767, 32767).astype(np.int16)
    with wave.open(f"{tmp}/s.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", f"{tmp}/m.wav", "-i", f"{tmp}/s.wav",
                    "-filter_complex", "[1:a]volume=0.55,afade=t=out:st=11:d=2[m];[m][2:a]amix=inputs=2:duration=first:normalize=0[a]",
                    "-map", "0:v", "-map", "[a]", "-t", str(DUR), "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", out], check=True)
    print("done", out)


if __name__ == "__main__":
    main(sys.argv[1])
