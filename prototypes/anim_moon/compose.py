"""Mux rendered frames (text already in the frames) with Banu voice-over + reelgen.music().
python3 -I compose.py <frames_dir> <fps> <out.mp4> [crf]"""
import os, subprocess, sys, tempfile, wave
import numpy as np
REPO = "/home/claude/pul-reels"
sys.path.insert(0, REPO)
from reelgen import music

SEG = [4.3, 8.4, 7.4, 8.1, 2.8]          # must match scene.html
ST = [sum(SEG[:i]) for i in range(len(SEG))]; DUR = sum(SEG)
VOFF = 0.15
HERE = os.path.dirname(os.path.abspath(__file__))
VO = [os.path.join(HERE, os.environ.get("VODIR", "vo"), f"vo_{i}.mp3") for i in range(4)]


SR = 44100
def sfx(path):
    """Synth sound design: drone bed, hook impact, cut whoosh, counter ticks + pops, laser pings, rewind, clock, chime."""
    n = int(SR * DUR); out = np.zeros(n); rng = np.random.default_rng(7); T = np.arange(n) / SR
    def add(t0, sig, g=1.0):
        i = int(t0 * SR); j = min(n, i + len(sig))
        if 0 <= i < n: out[i:j] += g * sig[:j - i]
    def lp(x, a):  # one-pole low-pass
        from scipy.signal import lfilter
        return lfilter([a], [1, -(1 - a)], x)
    tt = lambda d: np.arange(int(d * SR)) / SR
    # drone bed: low sines + slow filtered noise
    bed = 0.05 * np.sin(2 * np.pi * 55 * T) + 0.03 * np.sin(2 * np.pi * 82.4 * T + 1) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.07 * T))
    bed += 0.06 * lp(rng.standard_normal(n), 0.004)
    bed *= np.minimum(1, np.minimum(T / 1.0, (DUR - T) / 1.5)); out += bed
    # hook impact
    x = tt(2.2); add(0.0, (np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-x * 9)) / SR) * np.exp(-x * 2.2) * 0.9 + lp(rng.standard_normal(len(x)), 0.05) * np.exp(-x * 5) * 0.5))
    # whoosh into the cut at ST[1]
    x = tt(0.9); env = np.exp(-((x - 0.62) / 0.2) ** 2); add(ST[1] - 0.62, lp(rng.standard_normal(len(x)), 0.08) * env * 0.9)
    # counter ticks (slowing) + landing pop
    t = ST[1] + 0.45; k = 0
    while t < ST[1] + 2.1:
        x = tt(0.02); add(t, np.sin(2 * np.pi * 2600 * x) * np.exp(-x * 400) * 0.12); k += 1; t += 0.035 + 0.006 * k
    x = tt(0.35); add(ST[1] + 2.18, np.sin(2 * np.pi * 880 * x) * np.exp(-x * 14) * 0.35 + np.sin(2 * np.pi * 1320 * x) * np.exp(-x * 20) * 0.15)
    # laser: soft "pew" on emission, glass ping on arrival
    t0 = ST[1] + 3.6; per = 1.5
    while t0 < ST[2] - 0.3:
        x = tt(0.25); add(t0, np.sin(2 * np.pi * np.cumsum(2200 - 3000 * x) / SR) * np.exp(-x * 16) * 0.10)
        x = tt(0.9); add(t0 + per / 2, (np.sin(2 * np.pi * 1760 * x) + 0.4 * np.sin(2 * np.pi * 2640 * x)) * np.exp(-x * 6) * 0.10)
        t0 += per
    # beat 2: low swell as the bulge appears
    x = tt(1.6); add(ST[2] + 0.2, np.sin(2 * np.pi * 65 * x) * np.sin(np.pi * x / 1.6) * 0.25 + lp(rng.standard_normal(len(x)), 0.02) * np.sin(np.pi * x / 1.6) * 0.3)
    # beat 3: rewind (reverse whoosh), then clock ticks while time runs forward, chime on 24
    b3 = ST[3]; x = tt(1.6); add(b3, lp(rng.standard_normal(len(x)), 0.06) * (x / 1.6) ** 2 * 0.8 * np.exp(-np.maximum(0, x - 1.5) * 30))
    t = b3 + 3.2
    while t < b3 + 7.3:
        x = tt(0.03); add(t, np.sin(2 * np.pi * 1900 * x) * np.exp(-x * 300) * 0.13); t += 0.2
    x = tt(2.5); add(b3 + 7.4, sum(np.sin(2 * np.pi * f * x) * np.exp(-x * d) * g for f, d, g in [(1046.5, 2.2, .22), (1568, 3, .12), (2093, 4, .06)]))
    # CTA pop
    x = tt(0.3); add(ST[4] + 0.05, np.sin(2 * np.pi * np.cumsum(500 + 500 * x) / SR) * np.exp(-x * 18) * 0.3)
    out = np.clip(out, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())

def main():
    fdir, fps, out = sys.argv[1], sys.argv[2], sys.argv[3]
    crf = sys.argv[4] if len(sys.argv) > 4 else "23"
    tmp = tempfile.mkdtemp()
    music(f"{tmp}/m.wav", DUR, seed=31)
    sfx(f"{tmp}/sfx.wav")
    # music: near-silence for the beat-3 rewind (the "breath" before the turn)
    a, b = ST[3] - 0.3, ST[3] + 1.7
    ins, fl = ["-i", f"{tmp}/m.wav"], [f"[0:a]volume=0.17,lowpass=f=6000,volume='if(between(t,{a},{b}),0.25,1)':eval=frame[m]"]
    for j, f in enumerate(VO):
        ins += ["-i", f]; ms = int((ST[j] + VOFF) * 1000)
        fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
    ins += ["-i", f"{tmp}/sfx.wav"]; k = len(VO) + 1
    fl.append(f"[{k}:a]aformat=channel_layouts=stereo,volume=0.9[s]")
    fl.append("[m][s]" + "".join(f"[v{j}]" for j in range(len(VO))) + f"amix=inputs={len(VO) + 2}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[a]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl),
                    "-map", "[a]", "-t", str(DUR), f"{tmp}/mix.wav"], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", fps, "-i", f"{fdir}/%05d.jpg", "-i", f"{tmp}/mix.wav",
                    "-vf", "scale=1080:1920:flags=lanczos,format=yuv420p", "-r", "30", "-c:v", "libx264", "-preset", "slow",
                    "-crf", crf, "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])
    print(out, os.path.getsize(out) / 1e6, "MB")

main()
