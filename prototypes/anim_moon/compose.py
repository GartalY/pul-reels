"""Mux rendered frames (text already in the frames) with Banu voice-over + reelgen.music().
python3 -I compose.py <frames_dir> <fps> <out.mp4> [crf]"""
import os, subprocess, sys, tempfile
REPO = "/home/claude/pul-reels"
sys.path.insert(0, REPO)
from reelgen import music

SEG = [4.3, 8.4, 7.4, 8.1, 2.8]          # must match scene.html
ST = [sum(SEG[:i]) for i in range(len(SEG))]; DUR = sum(SEG)
VOFF = 0.15
HERE = os.path.dirname(os.path.abspath(__file__))
VO = [os.path.join(HERE, f"vo/vo_{i}.mp3") for i in range(4)]

def main():
    fdir, fps, out = sys.argv[1], sys.argv[2], sys.argv[3]
    crf = sys.argv[4] if len(sys.argv) > 4 else "23"
    tmp = tempfile.mkdtemp()
    music(f"{tmp}/m.wav", DUR, seed=31)
    ins, fl = ["-i", f"{tmp}/m.wav"], ["[0:a]volume=0.17,lowpass=f=6000[m]"]
    for j, f in enumerate(VO):
        ins += ["-i", f]; ms = int((ST[j] + VOFF) * 1000)
        fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
    fl.append("[m]" + "".join(f"[v{j}]" for j in range(len(VO))) + f"amix=inputs={len(VO) + 1}:normalize=0:duration=first,alimiter=limit=0.95[a]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl),
                    "-map", "[a]", "-t", str(DUR), f"{tmp}/mix.wav"], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", fps, "-i", f"{fdir}/%05d.jpg", "-i", f"{tmp}/mix.wav",
                    "-vf", "scale=1080:1920:flags=lanczos,format=yuv420p", "-r", "30", "-c:v", "libx264", "-preset", "slow",
                    "-crf", crf, "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])
    print(out, os.path.getsize(out) / 1e6, "MB")

main()
