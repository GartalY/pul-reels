"""Mux Caspian frames with Banu voice-over + reelgen.music() + synth sound design.
python3 -I compose.py <frames_dir> <fps> <out.mp4> [crf]"""
import os, subprocess, sys, tempfile, wave
import numpy as np
from scipy.signal import lfilter
REPO = "/home/claude/pul-reels"
sys.path.insert(0, REPO)
from reelgen import music

SEG = [4.2, 7.4, 7.8, 8.2, 2.8]          # must match scene.html
ST = [sum(SEG[:i]) for i in range(len(SEG))]; DUR = sum(SEG)
VOFF = 0.15
HERE = os.path.dirname(os.path.abspath(__file__))
VO = [os.path.join(HERE, "vo", f"vo_{i}.mp3") for i in range(4)]
SR = 44100


def sfx(path):
    n = int(SR * DUR); out = np.zeros(n); rng = np.random.default_rng(11); T = np.arange(n) / SR
    tt = lambda d: np.arange(int(d * SR)) / SR
    lp = lambda x, a: lfilter([a], [1, -(1 - a)], x)
    def add(t0, sig, g=1.0):
        i = int(t0 * SR); j = min(n, i + len(sig))
        if 0 <= i < n: out[i:j] += g * sig[:j - i]
    # soft airy bed
    bed = 0.04 * lp(rng.standard_normal(n), 0.01) + 0.025 * np.sin(2 * np.pi * 110 * T) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.05 * T))
    out += bed * np.minimum(1, np.minimum(T / 0.8, (DUR - T) / 1.5))
    # hook: water rushing up the column (rising filtered noise) + landing "glug"
    x = tt(2.8); env = np.minimum(1, x / 0.3) * np.exp(-np.maximum(0, x - 2.3) * 8)
    rush = np.zeros(len(x)); a = 0.02 + 0.25 * (x / 2.8) ** 1.5
    w = rng.standard_normal(len(x)); y = 0.0
    for i in range(len(x)):
        y += a[i] * (w[i] - y); rush[i] = y
    add(0.2, rush * env * 1.4)
    x = tt(0.5); add(2.75, np.sin(2 * np.pi * np.cumsum(180 + 260 * np.exp(-x * 12)) / SR) * np.exp(-x * 9) * 0.5)
    # beat 1: each small lake fills (bubbly pluck) + big pop for x3,3
    for i in range(4):
        t0 = ST[1] + 1.6 + i * 0.55; x = tt(0.6)
        add(t0, np.sin(2 * np.pi * np.cumsum(300 + 500 * x + 40 * np.sin(x * 60)) / SR) * np.exp(-x * 7) * 0.18)
        add(t0 + 0.95, np.sin(2 * np.pi * (660 + 110 * i) * tt(0.2)) * np.exp(-tt(0.2) * 22) * 0.2)
    x = tt(0.4); add(ST[1] + 5.0, (np.sin(2 * np.pi * 880 * x) + 0.5 * np.sin(2 * np.pi * 1320 * x)) * np.exp(-x * 10) * 0.32)
    # whooshes at the camera moves
    for t0 in (ST[1] + 0.1, ST[2] + 0.1, ST[3] + 0.1, ST[4]):
        x = tt(1.0); add(t0, lp(rng.standard_normal(len(x)), 0.06) * np.exp(-((x - 0.5) / 0.22) ** 2) * 0.7)
    # beat 2: river flow (band-limited noise) + gauge ticks + 80% chime
    x = tt(SEG[2] - 0.3); fl = lp(rng.standard_normal(len(x)), 0.12) - lp(rng.standard_normal(len(x)), 0.01)
    add(ST[2] + 0.3, fl * np.minimum(1, x / 1.0) * np.minimum(1, (SEG[2] - 0.3 - x) / 0.6) * 0.35)
    t = ST[2] + 2.0
    while t < ST[2] + 4.0:
        x = tt(0.02); add(t, np.sin(2 * np.pi * 2400 * x) * np.exp(-x * 400) * 0.1); t += 0.09
    x = tt(1.2); add(ST[2] + 4.05, sum(np.sin(2 * np.pi * f * x) * np.exp(-x * d) * g for f, d, g in [(1046.5, 3, .18), (1568, 4, .1)]))
    # beat 3: salt cubes landing (short clinks)
    for k, cnt in enumerate((35, 12)):
        for i in range(cnt):
            t0 = ST[3] + 1.2 + k * 0.2 + i * (3.4 / 35) + 0.45
            x = tt(0.12); f = 1800 + rng.uniform(-300, 600)
            add(t0, (np.sin(2 * np.pi * f * x) * np.exp(-x * 60) + lp(rng.standard_normal(len(x)), 0.4) * np.exp(-x * 90) * 0.5) * 0.07)
    # question sting + CTA pop
    x = tt(1.5); add(ST[3] + 5.0, sum(np.sin(2 * np.pi * f * x) * np.exp(-x * d) * g for f, d, g in [(784, 2.5, .14), (1175, 3, .08)]))
    x = tt(0.3); add(ST[4] + 0.05, np.sin(2 * np.pi * np.cumsum(500 + 500 * x) / SR) * np.exp(-x * 18) * 0.3)
    out = np.clip(out, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())


def main():
    fdir, fps, out = sys.argv[1], sys.argv[2], sys.argv[3]
    crf = sys.argv[4] if len(sys.argv) > 4 else "23"
    tmp = tempfile.mkdtemp()
    music(f"{tmp}/m.wav", DUR, seed=47)
    sfx(f"{tmp}/sfx.wav")
    ins, fl = ["-i", f"{tmp}/m.wav"], ["[0:a]volume=0.16,lowpass=f=6500[m]"]
    for j, f in enumerate(VO):
        ins += ["-i", f]; ms = int((ST[j] + VOFF) * 1000)
        fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
    ins += ["-i", f"{tmp}/sfx.wav"]; k = len(VO) + 1
    fl.append(f"[{k}:a]aformat=channel_layouts=stereo,volume=0.9[s]")
    fl.append("[m][s]" + "".join(f"[v{j}]" for j in range(len(VO))) + f"amix=inputs={len(VO) + 2}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl), "-map", "[a]", "-t", str(DUR), f"{tmp}/mix.wav"], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", fps, "-i", f"{fdir}/%05d.jpg", "-i", f"{tmp}/mix.wav",
                    "-vf", "scale=1080:1920:flags=lanczos,format=yuv420p", "-r", "30", "-c:v", "libx264", "-preset", "slow",
                    "-crf", crf, "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])
    print(out, os.path.getsize(out) / 1e6, "MB")


main()
