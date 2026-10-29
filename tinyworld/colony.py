"""Tiny World — THE COLONY, test episode 1 (20 s, 1080x1920, 30 fps).

A real (small) simulation runs underneath: workers walk the tunnel graph to the surface, carry crumbs back to the
food store, the queen lays an egg for every few crumbs, eggs hatch into new workers, the nest is dug out over time.
Day 7 a storm floods the entrance and the episode ends on a vote.

python3 tinyworld/colony.py out/tinyworld/colony_ep1.mp4
"""
import math, os, random, subprocess, sys, tempfile
import cairo
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from reelgen import music

W, H, FPS, DUR = 1080, 1920, 30, 20.0
GROUND = 600                       # surface line y (world)
GS, CAM_S, CAM_X = 640, 1.2, 100   # screen ground y, camera zoom, camera x offset
rng = random.Random(7)

# ---------------------------------------------------------------- nest graph (dug progressively)
N = {  # name: (x, y)
    "E": (300, GROUND), "A": (330, 760), "Q": (470, 880), "S": (210, 980), "B": (560, 1020),
    "R": (690, 1100), "D": (600, 1250), "L": (470, 1330), "F": (820, 1240), "G": (900, 1360),
}
CH = {"Q": 74, "S": 62, "R": 66, "L": 58, "G": 56}          # chamber radii
EDGES = [("E", "A", 0.0, 0.0), ("A", "Q", 0.0, 0.0), ("A", "S", 3.0, 2.0), ("Q", "B", 5.0, 1.6),
         ("B", "R", 6.4, 1.4), ("R", "D", 8.6, 1.6), ("D", "L", 9.9, 1.5), ("R", "F", 10.6, 1.4),
         ("F", "G", 11.7, 1.4)]                                # (a, b, dig_start, dig_dur)
CH_DIG = {"Q": (0, 0), "S": (4.8, 1.4), "R": (7.6, 1.4), "L": (11.2, 1.4), "G": (12.9, 1.4)}
FOOD_X = 850                                                    # crumb pile on the surface
STORM = 12.6; FLOOD = 13.6; VOTE = 16.0; INTRO = 2.4


def ease(x): x = max(0, min(1, x)); return x * x * (3 - 2 * x)


def dug(t, name):
    s, d = CH_DIG.get(name, (0, 0)); return 1.0 if d == 0 else ease((t - s) / d)


def edge_prog(t, a, b):
    for e in EDGES:
        if (e[0], e[1]) == (a, b) or (e[1], e[0]) == (a, b):
            return 1.0 if e[3] == 0 else ease((t - e[2]) / e[3])
    return 0


def path(*names):
    pts = []
    for n in names: pts.append(N[n])
    return pts


ROUTES = {  # chamber -> node path from entrance E
    "Q": ["E", "A", "Q"], "S": ["E", "A", "S"], "R": ["E", "A", "Q", "B", "R"],
    "L": ["E", "A", "Q", "B", "R", "D", "L"], "G": ["E", "A", "Q", "B", "R", "F", "G"],
}


# ---------------------------------------------------------------- agents
class Ant:
    def __init__(self, home, t0, x=None, y=None):
        self.home = home; self.pts = []; self.d = 0; self.carry = False; self.dist = 0
        self.speed = rng.uniform(300, 540); self.state = "idle"; self.wait = rng.uniform(0, 3.0)
        self.x, self.y = x if x is not None else N[home][0], y if y is not None else N[home][1]
        self.ang = 0; self.born = t0; self.ph = rng.random() * 6; self.flee = False

    def go(self, pts):
        self.pts = [(self.x, self.y)] + pts; self.seg = 0; self.d = 0

    def step(self, dt):
        if not self.pts or self.seg >= len(self.pts) - 1: return True
        move = self.speed * dt
        while move > 0 and self.seg < len(self.pts) - 1:
            (x0, y0), (x1, y1) = self.pts[self.seg], self.pts[self.seg + 1]
            L = math.hypot(x1 - x0, y1 - y0) or 1e-6
            take = min(move, L - self.d); self.d += take; move -= take; self.dist += take
            f = self.d / L; self.x, self.y = x0 + (x1 - x0) * f, y0 + (y1 - y0) * f
            self.ang = math.atan2(y1 - y0, x1 - x0)
            if self.d >= L - 1e-6: self.seg += 1; self.d = 0
        return self.seg >= len(self.pts) - 1


def jitter(p, r=14):
    return (p[0] + rng.uniform(-r, r), p[1] + rng.uniform(-r * 0.6, r * 0.6))


class Sim:
    def __init__(self):
        self.ants = [Ant("Q", -9, *jitter(N["Q"], 30)) for _ in range(10)]
        self.food = 0; self.eggs = []; self.born = 0; self.t = 0; self.crumbs = 60

    def open_chambers(self):
        return [c for c in ROUTES if dug(self.t, c) > 0.95 and all(
            edge_prog(self.t, a, b) > 0.95 for a, b in zip(ROUTES[c], ROUTES[c][1:]))]

    def step(self, dt):
        self.t += dt; t = self.t
        chambers = self.open_chambers()
        for a in self.ants:
            if a.state == "idle":
                a.wait -= dt
                if a.wait <= 0 and t > INTRO - 0.8 and t < STORM:
                    # forage: home -> E -> surface -> food
                    back = list(reversed(ROUTES[a.home]))[1:]
                    sx = FOOD_X + rng.uniform(-40, 40)
                    a.go([jitter(N[n], 6) for n in back] + [(N["E"][0] + 30, GROUND - 6), (sx, GROUND - 8)])
                    a.state = "out"
                elif a.wait <= 0:
                    a.go([jitter(N[a.home], CH.get(a.home, 40) * 0.6)]); a.state = "wander"
            elif a.state == "wander":
                if a.step(dt): a.state = "idle"; a.wait = rng.uniform(0.3, 1.4)
            elif a.state == "out":
                if a.step(dt):
                    a.carry = self.crumbs > 0; self.crumbs = max(0, self.crumbs - (1 if a.carry else 0))
                    store = "S" if "S" in chambers else "Q"
                    a.go([(N["E"][0] + 30, GROUND - 6)] + [jitter(N[n], 6) for n in ROUTES[store]])
                    a.state = "back"; a.store = store
            elif a.state == "back":
                if a.flee: a.speed = 620
                if a.step(dt):
                    if a.carry: self.food += 1
                    a.carry = False; a.home = rng.choice(chambers) if chambers else "Q"
                    a.go([jitter(N[n], 6) for n in ROUTES[a.home][ROUTES[a.home].index("A"):]] +
                         [jitter(N[a.home], CH.get(a.home, 40) * 0.5)])
                    a.state = "wander"
        # storm: everyone outside runs home
        if t > STORM:
            for a in self.ants:
                if a.state == "out":
                    store = "S" if "S" in chambers else "Q"
                    a.go([(N["E"][0] + 30, GROUND - 6)] + [jitter(N[n], 6) for n in ROUTES[store]])
                    a.state = "back"; a.store = store; a.flee = True
        # queen lays an egg every 2 crumbs; eggs hatch after 1.6 s
        while self.food >= 1:
            self.food -= 1
            nest = "R" if "R" in chambers else "Q"
            ex, ey = jitter(N[nest], CH[nest] * 0.55)
            self.eggs.append([t, ex, ey, nest])
        hatch = [e for e in self.eggs if t - e[0] > 1.0]
        for e in hatch:
            self.eggs.remove(e); self.born += 1
            a = Ant(e[3], t, e[1], e[2]); a.wait = rng.uniform(0.2, 1.0); self.ants.append(a)

    @property
    def pop(self): return len(self.ants)


# ---------------------------------------------------------------- drawing helpers
def rgb(h, a=1.0):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (a,)


def rrect(c, x, y, w, h, r):
    c.new_sub_path(); c.arc(x + w - r, y + r, r, -math.pi / 2, 0); c.arc(x + w - r, y + h - r, r, 0, math.pi / 2)
    c.arc(x + r, y + h - r, r, math.pi / 2, math.pi); c.arc(x + r, y + r, r, math.pi, 3 * math.pi / 2); c.close_path()


def text(c, s, x, y, size, col="#ffffff", weight=cairo.FONT_WEIGHT_BOLD, align="l", font="Poppins", alpha=1):
    c.select_font_face(font, cairo.FONT_SLANT_NORMAL, weight); c.set_font_size(size)
    xb, yb, tw, th, xa, ya = c.text_extents(s)
    if align == "c": x -= xa / 2
    elif align == "r": x -= xa
    c.move_to(x, y); c.set_source_rgba(*rgb(col, alpha)); c.show_text(s); return xa


def soil_layer(GROUND=GS):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H); c = cairo.Context(s)
    g = cairo.LinearGradient(0, GROUND, 0, H)
    for o, col in [(0, "#8a5a36"), (0.18, "#7a4c2c"), (0.5, "#5e3a22"), (1, "#3a2416")]:
        g.add_color_stop_rgb(o, *rgb(col)[:3])
    c.rectangle(0, GROUND, W, H - GROUND); c.set_source(g); c.fill()
    r = random.Random(3)
    for band, col in [(760, "#94633d"), (1060, "#6b4428"), (1420, "#4a2e1b")]:  # strata waves
        c.move_to(0, band)
        for x in range(0, W + 60, 60): c.line_to(x, band + 18 * math.sin(x / 140 + band))
        c.line_to(W, H); c.line_to(0, H); c.close_path(); c.set_source_rgba(*rgb(col, 0.35)); c.fill()
    for _ in range(2600):  # grains
        x, y = r.uniform(0, W), r.uniform(GROUND + 10, H); rr = r.uniform(0.8, 2.6)
        c.arc(x, y, rr, 0, 6.3); c.set_source_rgba(*rgb(r.choice(["#a0703f", "#3b2516", "#8a6040", "#2a190e"]), r.uniform(0.15, 0.4))); c.fill()
    for _ in range(26):  # pebbles
        x, y = r.uniform(0, W), r.uniform(GROUND + 40, H); a, b = r.uniform(10, 26), r.uniform(7, 16)
        c.save(); c.translate(x, y); c.rotate(r.uniform(0, 3)); c.scale(a, b); c.arc(0, 0, 1, 0, 6.3); c.restore()
        g2 = cairo.RadialGradient(x - a * 0.3, y - b * 0.4, 1, x, y, a)
        g2.add_color_stop_rgba(0, *rgb("#8d7660")[:3], 0.75); g2.add_color_stop_rgba(1, *rgb("#4e3d2e")[:3], 0.75); c.set_source(g2); c.fill()
    for _ in range(9):  # roots
        x = r.uniform(40, W - 40); c.move_to(x, GROUND); y = GROUND
        for k in range(8):
            x += r.uniform(-30, 30); y += r.uniform(25, 45); c.line_to(x, y)
        c.set_source_rgba(*rgb("#d8b98e", 0.35)); c.set_line_width(r.uniform(2, 5)); c.set_line_cap(1); c.stroke()
    # grass edge
    c.rectangle(0, GROUND - 6, W, 22)
    gg = cairo.LinearGradient(0, GROUND - 6, 0, GROUND + 16); gg.add_color_stop_rgb(0, *rgb("#4f8a3a")[:3]); gg.add_color_stop_rgb(1, *rgb("#7a4c2c")[:3])
    c.set_source(gg); c.fill()
    return s


def grass(c, t, wind=0.0):
    r = random.Random(11)
    for i in range(200):
        x = -60 + i * 6.4 + r.uniform(-3, 3)
        if 262 < x < 338: continue                       # keep the entrance clear
        h = r.uniform(22, 64); sway = math.sin(t * 2.2 + x * 0.05) * (3 + wind * 14) + wind * 18
        c.move_to(x - 3, GROUND); c.curve_to(x - 1, GROUND - h * 0.5, x + sway * 0.5, GROUND - h * 0.8, x + sway, GROUND - h)
        c.curve_to(x + sway * 0.4, GROUND - h * 0.7, x + 2, GROUND - h * 0.4, x + 3, GROUND)
        c.close_path(); c.set_source_rgba(*rgb(r.choice(["#5fa043", "#4c8a35", "#6db54e", "#3f7a2c"]))); c.fill()


def sky(c, t):
    k = ease((t - STORM + 0.6) / 1.4)                     # 0 = sunny, 1 = storm
    g = cairo.LinearGradient(0, 0, 0, GS)
    top = mix("#7fc4ef", "#2b3442", k); bot = mix("#fbe3b4", "#566070", k)
    g.add_color_stop_rgb(0, *top); g.add_color_stop_rgb(1, *bot); c.rectangle(0, 0, W, GS); c.set_source(g); c.fill()
    sx, sy = 860 - 200 * min(1, t / 13), 230 + 40 * min(1, t / 13)       # sun
    for rad, a in [(150, 0.10), (100, 0.18), (62, 1.0)]:
        c.arc(sx, sy, rad, 0, 6.3); c.set_source_rgba(1, 0.93, 0.6, a * (1 - k)); c.fill()
    # clouds roll in
    for i, (cx, cy, s) in enumerate([(120, 160, 1.2), (520, 120, 1.5), (880, 190, 1.1), (330, 260, 0.9), (720, 300, 1.0)]):
        drift = -500 + 520 * ease((t - STORM + 1.2 + i * 0.12) / 1.6)
        col = mix("#ffffff", "#3c4552", k)
        for dx, dy, r in [(-70, 10, 55), (-10, -20, 70), (60, 0, 58), (110, 18, 42), (-120, 25, 38)]:
            c.arc(cx + drift + dx * s, cy + dy * s, r * s, 0, 6.3); c.set_source_rgba(*col, 0.92 * min(1, k * 1.3)); c.fill()
    return k


def mix(a, b, k):
    A, B = rgb(a), rgb(b); return tuple(A[i] + (B[i] - A[i]) * k for i in range(3))


def tunnels(c, t):
    col = rgb("#3a2314")
    c.set_line_cap(cairo.LINE_CAP_ROUND); c.set_line_join(cairo.LINE_JOIN_ROUND)
    for a, b, s, d in EDGES:
        p = 1.0 if d == 0 else ease((t - s) / d)
        if p <= 0: continue
        (x0, y0), (x1, y1) = N[a], N[b]
        mx, my = (x0 + x1) / 2 + (y1 - y0) * 0.18, (y0 + y1) / 2 - (x1 - x0) * 0.12
        pts = [bez((x0, y0), (mx, my), (x1, y1), u * p) for u in np.linspace(0, 1, 24)]
        for lw, cc in [(46, rgb("#a8774c", 0.55)), (34, col)]:
            c.move_to(*pts[0])
            for q in pts[1:]: c.line_to(*q)
            c.set_line_width(lw); c.set_source_rgba(*cc); c.stroke()
        if 0 < p < 1:  # dig front: little dirt particles
            fx, fy = pts[-1]
            for k in range(6):
                ang = t * 9 + k; c.arc(fx + 22 * math.cos(ang), fy + 22 * math.sin(ang), 3, 0, 6.3)
                c.set_source_rgba(*rgb("#c99a6a", 0.8)); c.fill()
    for n, r in CH.items():
        p = dug(t, n)
        if p <= 0: continue
        x, y = N[n]; rr = r * p
        for k, cc in [(1.18, rgb("#a8774c", 0.5)), (1.0, col)]:
            c.save(); c.translate(x, y); c.scale(rr * 1.45 * k, rr * 0.82 * k); c.arc(0, 0, 1, 0, 6.3); c.restore()
            c.set_source_rgba(*cc); c.fill()


def bez(p0, p1, p2, u):
    return ((1 - u) ** 2 * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
            (1 - u) ** 2 * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1])


def ant(c, a, t, scale=1.0, queen=False):
    c.save(); c.translate(a.x, a.y); c.rotate(a.ang); c.scale(scale, scale)
    stride = a.dist * 0.22 + a.ph
    body = rgb("#8e2412") if not queen else rgb("#6a170b"); hi = rgb("#f08a5c", 0.85)
    c.set_line_cap(1); c.set_line_width(2.6); c.set_source_rgba(*rgb("#5e170b"))
    for side in (-1, 1):  # legs
        for i, lx in enumerate((-3, 2, 7)):
            sw = math.sin(stride + i * 2.1 + (0 if side > 0 else math.pi)) * 5
            c.move_to(lx, 0); c.line_to(lx + sw * 0.6, side * 7); c.line_to(lx + sw + (i - 1) * 4, side * 13); c.stroke()
    c.move_to(12, -2); c.line_to(18, -8); c.line_to(22, -9)       # antennae
    c.move_to(12, 2); c.line_to(18, 8); c.line_to(22, 9); c.set_line_width(1.6); c.stroke()
    for (bx, rx, ry) in [(-10 if not queen else -16, 8.5 if not queen else 15, 6 if not queen else 9.5), (2, 5, 4), (11, 4.6, 4.2)]:
        c.save(); c.translate(bx, 0); c.scale(rx, ry); c.arc(0, 0, 1, 0, 6.3); c.restore()
        c.set_source_rgba(*body); c.fill_preserve() if False else c.fill()
        c.save(); c.translate(bx - rx * 0.2, -ry * 0.35); c.scale(rx * 0.45, ry * 0.3); c.arc(0, 0, 1, 0, 6.3); c.restore()
        c.set_source_rgba(*hi); c.fill()
    if queen:  # translucent wings + golden glow
        for sgn in (-1, 1):
            c.save(); c.translate(-6, sgn * 6); c.rotate(sgn * 0.35); c.scale(14, 5); c.arc(0, 0, 1, 0, 6.3); c.restore()
            c.set_source_rgba(1, 0.95, 0.85, 0.45); c.fill()
    if a.carry:
        c.arc(19, 0, 6.5, 0, 6.3); c.set_source_rgba(*rgb("#f2c46b")); c.fill()
        c.arc(17.5, -2, 2.4, 0, 6.3); c.set_source_rgba(1, 1, 1, 0.6); c.fill()
    c.restore()


def crumbs(c, left, t):
    r = random.Random(5)
    n = left
    for i in range(46):
        if i >= n: break
        x = FOOD_X + r.uniform(-70, 70) * (1 - i / 60); y = GROUND - 8 - r.uniform(0, 34) * (1 - i / 46) - i * 0.8
        c.save(); c.translate(x, y); c.rotate(r.uniform(0, 3)); c.scale(r.uniform(9, 15), r.uniform(6, 10)); c.arc(0, 0, 1, 0, 6.3); c.restore()
        g = cairo.RadialGradient(x - 3, y - 3, 1, x, y, 14); g.add_color_stop_rgb(0, *rgb("#ffe2a0")[:3]); g.add_color_stop_rgb(1, *rgb("#d39a45")[:3])
        c.set_source(g); c.fill()


def rain(c, t, k):
    if k <= 0: return
    r = random.Random(int(t * 30))
    c.set_line_width(2.4); c.set_line_cap(1)
    for _ in range(int(160 * k)):
        x = r.uniform(-100, W); y = r.uniform(0, GS)
        c.move_to(x, y); c.line_to(x + 14, y + 42); c.set_source_rgba(0.75, 0.85, 1, 0.55 * k); c.stroke()
    for _ in range(int(30 * k)):  # splashes on the ground
        x = r.uniform(0, W); c.arc(x, GS - 2, r.uniform(3, 7), math.pi, 2 * math.pi); c.set_source_rgba(0.8, 0.9, 1, 0.6 * k); c.set_line_width(2); c.stroke()


def flood(c, t):
    p = ease((t - FLOOD) / 2.6)
    if p <= 0: return 0
    c.set_line_cap(1)
    segs = [("E", "A"), ("A", "S")]
    total = 2; done = p * total
    for i, (a, b) in enumerate(segs):
        q = max(0, min(1, done - i))
        if q <= 0: continue
        (x0, y0), (x1, y1) = N[a], N[b]
        mx, my = (x0 + x1) / 2 + (y1 - y0) * 0.18, (y0 + y1) / 2 - (x1 - x0) * 0.12
        pts = [bez((x0, y0), (mx, my), (x1, y1), u * q) for u in np.linspace(0, 1, 24)]
        for lw, col in [(40, (0.22, 0.55, 0.95, 0.95)), (14, (0.75, 0.9, 1, 0.7))]:
            c.move_to(*pts[0])
            for pt in pts[1:]: c.line_to(*pt)
            c.set_line_width(lw); c.set_source_rgba(*col); c.stroke()
    if p > 0.6:
        q = (p - 0.6) / 0.4; x, y = N["S"]; r = CH["S"]
        c.save(); c.translate(x, y + r * 0.82 * (1 - q)); c.scale(r * 1.4, r * 0.8 * q + 1); c.arc(0, 0, 1, 0, 6.3); c.restore()
        c.set_source_rgba(0.22, 0.55, 0.95, 0.9); c.fill()
    # puddle at the entrance
    c.save(); c.translate(N["E"][0], GROUND - 2); c.scale(70 * p + 10, 10); c.arc(0, 0, 1, math.pi, 2 * math.pi); c.restore()
    c.set_source_rgba(0.25, 0.55, 0.95, 0.85); c.fill()
    return p


def hud(c, t, sim, storm_k):
    a = ease((t - 0.3) / 0.6)
    # top-left pill
    rrect(c, 60, 210, 380, 64, 32); c.set_source_rgba(0, 0, 0, 0.35 * a); c.fill()
    text(c, "TINY WORLD · EP 1", 88, 252, 30, "#ffffff", alpha=a)
    # population card
    rrect(c, 60, 300, 440, 170, 34); c.set_source_rgba(1, 1, 1, 0.88 * a); c.fill()
    text(c, "POPULATION", 96, 352, 26, "#7a6a5a", alpha=a)
    text(c, f"{sim.pop}", 96, 448, 92, "#1b1210", font="Poppins", alpha=a)
    # small ant icon
    day = 1 + min(6, int(max(0, t - INTRO) / 1.8)) if t < STORM else 7
    rrect(c, 640, 300, 380, 170, 34); c.set_source_rgba(1, 1, 1, 0.88 * a); c.fill()
    text(c, "DAY", 676, 352, 26, "#7a6a5a", alpha=a)
    text(c, f"{day}", 676, 448, 92, "#c0392b" if day == 7 else "#1b1210", alpha=a)
    # food bar
    text(c, "FOOD", 830, 352, 26, "#7a6a5a", alpha=a)
    fill = sim.crumbs / 46
    rrect(c, 830, 380, 150, 26, 13); c.set_source_rgba(0, 0, 0, 0.12 * a); c.fill()
    rrect(c, 830, 380, max(26, 150 * fill), 26, 13); c.set_source_rgba(*rgb("#e2a33c", a)); c.fill()


def intro(c, t):
    if t > INTRO + 0.6: return
    a = 1 - ease((t - INTRO) / 0.6)
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.05, 0.03, 0.02, 0.55 * a); c.fill()
    s = 0.92 + 0.08 * ease(t / 0.8)
    c.save(); c.translate(W / 2, 1010); c.scale(s, s)
    text(c, "THE COLONY", 0, 0, 120, "#ffd36b", align="c", alpha=a)
    text(c, "1 queen. 10 ants. You decide what happens.", 0, 80, 38, "#ffffff", weight=cairo.FONT_WEIGHT_NORMAL, align="c", alpha=a)
    c.restore()


def banner(c, t):
    if t < STORM or t > VOTE + 0.3: return
    a = ease((t - STORM) / 0.4) * (1 - ease((t - VOTE) / 0.3))
    rrect(c, 90, 520, 900, 120, 40); c.set_source_rgba(*rgb("#c0392b", 0.95 * a)); c.fill()
    text(c, "DAY 7: A STORM IS COMING", W / 2, 600, 50, "#ffffff", align="c", alpha=a)


def vote(c, t, sim):
    if t < VOTE: return
    a = ease((t - VOTE) / 0.5)
    c.rectangle(0, 0, W, H); c.set_source_rgba(0.04, 0.03, 0.02, 0.5 * a); c.fill()
    y0 = 760 + 40 * (1 - a)
    rrect(c, 70, y0, 940, 640, 46); c.set_source_rgba(1, 1, 1, 0.97 * a); c.fill()
    text(c, "WATER IS FLOODING THE NEST", W / 2, y0 + 92, 44, "#c0392b", align="c", alpha=a)
    text(c, f"{sim.pop} ants are in danger. What should they do?", W / 2, y0 + 150, 34, "#5a4a3a",
         weight=cairo.FONT_WEIGHT_NORMAL, align="c", alpha=a)
    for i, (lab, t1, t2, col) in enumerate([("A", "DIG DEEPER", "escape down, lose the food store", "#2e86de"),
                                            ("B", "BUILD A WALL", "block the entrance, risk being trapped", "#e67e22")]):
        yy = y0 + 210 + i * 170; pop = ease((t - VOTE - 0.3 - i * 0.25) / 0.4)
        rrect(c, 120, yy, 840, 140, 34); c.set_source_rgba(*rgb(col, 0.12 * pop)); c.fill()
        c.arc(200, yy + 70, 46, 0, 6.3); c.set_source_rgba(*rgb(col, pop)); c.fill()
        text(c, lab, 200, yy + 92, 58, "#ffffff", align="c", alpha=pop)
        text(c, t1, 275, yy + 66, 44, "#1b1210", alpha=pop)
        text(c, t2, 275, yy + 110, 28, "#6b5b4b", weight=cairo.FONT_WEIGHT_NORMAL, alpha=pop)
    pulse = 1 + 0.04 * math.sin(t * 7)
    cy = y0 + 580
    c.save(); c.translate(W / 2, cy); c.scale(pulse, pulse)
    text(c, "COMMENT  A  OR  B", 0, 0, 52, "#1b1210", align="c", alpha=ease((t - VOTE - 0.9) / 0.4))
    c.restore()
    text(c, "The colony does what most of you choose.", W / 2, y0 + 700, 32, "#ffffff",
         weight=cairo.FONT_WEIGHT_NORMAL, align="c", alpha=ease((t - VOTE - 1.2) / 0.4))


def vignette(c):
    g = cairo.RadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1250)
    g.add_color_stop_rgba(0, 0, 0, 0, 0); g.add_color_stop_rgba(1, 0, 0, 0, 0.45)
    c.rectangle(0, 0, W, H); c.set_source(g); c.fill()


# ---------------------------------------------------------------- render
def main(out):
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    soil = soil_layer(); sim = Sim()
    queen = Ant("Q", -9); queen.x, queen.y = N["Q"][0] + 10, N["Q"][1] + 8; queen.ang = math.pi
    tmp = tempfile.mkdtemp(); vid = f"{tmp}/v.mp4"
    p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgra", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                          "-pix_fmt", "yuv420p", vid], stdin=subprocess.PIPE)
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
    frames = int(DUR * FPS); flash = []
    for f in range(frames):
        t = f / FPS
        for _ in range(2): sim.step(0.5 / FPS)
        c = cairo.Context(surf)
        k = sky(c, t)
        c.set_source_surface(soil, 0, 0); c.paint()
        c.save(); c.translate(-CAM_X * CAM_S, GS - GROUND * CAM_S); c.scale(CAM_S, CAM_S)
        tunnels(c, t)
        # eggs
        for e in sim.eggs:
            c.save(); c.translate(e[1], e[2]); c.scale(7, 10); c.arc(0, 0, 1, 0, 6.3); c.restore()
            c.set_source_rgba(1, 0.98, 0.9, 0.95); c.fill()
        flood(c, t)
        qg = cairo.RadialGradient(queen.x, queen.y, 5, queen.x, queen.y, 90)
        qg.add_color_stop_rgba(0, 1, 0.8, 0.4, 0.35); qg.add_color_stop_rgba(1, 1, 0.8, 0.4, 0)
        c.arc(queen.x, queen.y, 90, 0, 6.3); c.set_source(qg); c.fill()
        queen.dist = t * 8; ant(c, queen, t, 2.6, queen=True)
        grass(c, t, wind=k)
        crumbs(c, sim.crumbs, t)
        for a in sim.ants:
            ant(c, a, t, 1.75)
        c.restore()
        rain(c, t, k)
        if 14.15 < t < 14.3 or 15.0 < t < 15.08:  # lightning
            c.rectangle(0, 0, W, H); c.set_source_rgba(1, 1, 1, 0.55); c.fill()
        vignette(c)
        hud(c, t, sim, k); banner(c, t); intro(c, t); vote(c, t, sim)
        surf.flush(); p.stdin.write(bytes(surf.get_data()))
        if f % 60 == 0: print(f"{t:4.1f}s pop={sim.pop} eggs={len(sim.eggs)} food={sim.crumbs}", flush=True)
    p.stdin.close(); p.wait()
    # audio: music + rain noise from the storm
    music(f"{tmp}/m.wav", DUR + 0.5, 4)
    sr = 44100; n = int(DUR * sr); tt = np.arange(n) / sr
    noise = np.random.default_rng(1).standard_normal(n)
    noise = np.convolve(noise, np.ones(6) / 6, mode="same")
    env = np.clip((tt - STORM + 0.5) / 1.5, 0, 1) * 0.22
    thunder = np.zeros(n); s0 = int(14.2 * sr); L = int(2.2 * sr)
    thunder[s0:s0 + L] = np.convolve(np.random.default_rng(2).standard_normal(L), np.ones(120) / 120, "same") * np.exp(-np.arange(L) / sr * 1.6) * 2.5
    import wave
    rain_pcm = np.clip((noise * env + thunder) * 32767, -32767, 32767).astype(np.int16)
    with wave.open(f"{tmp}/r.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(rain_pcm.tobytes())
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", vid, "-i", f"{tmp}/m.wav", "-i", f"{tmp}/r.wav",
                    "-filter_complex", "[1:a]volume=0.55,afade=t=out:st=13.6:d=1.5[m];[m][2:a]amix=inputs=2:duration=first:normalize=0[a]",
                    "-map", "0:v", "-map", "[a]", "-t", str(DUR), "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", out], check=True)
    print("done", out, "final pop", sim.pop)


if __name__ == "__main__":
    main(sys.argv[1])
