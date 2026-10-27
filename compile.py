"""Weekly long-form YouTube compilation from our best reels (16:9, 1920x1080).

python3 compile.py <out.mp4> '<json>'
json = {"title": "...", "subtitle": "...", "items": [{"file": "out/D/x.mp4", "hook": "..."}, ...]}

Each vertical reel is placed in the middle on a blurred copy of itself, with the number and hook on the left,
"@bilirdinizmi_az" on the right. Intro card (3 s) + outro card (5 s, subscribe). Prints chapter timestamps.
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import factgen as g

W, H = 1920, 1080


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "csv=p=0", f]).decode().strip())


def card(path, big, small, sub=None):
    im = Image.new("RGB", (W, H), g.INK); d = ImageDraw.Draw(im)
    logo = Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "brand/bilirdinizmi_logo.png")).resize((260, 260))
    im.paste(logo, ((W - 260) // 2, 150))
    y = 460
    for ln in g.wrap(d, big, g.F("Black", 84), W - 300):
        d.text(((W - d.textlength(ln, font=g.F("Black", 84))) / 2, y), ln, font=g.F("Black", 84), fill=g.GOLD); y += 104
    y += 20
    for ln in g.wrap(d, small, g.F("Bold", 48), W - 400):
        d.text(((W - d.textlength(ln, font=g.F("Bold", 48))) / 2, y), ln, font=g.F("Bold", 48), fill=g.WHITE); y += 62
    if sub:
        d.text(((W - d.textlength(sub, font=g.F("SemiBold", 38))) / 2, H - 120), sub, font=g.F("SemiBold", 38), fill=(170, 176, 190))
    im.save(path)


def side(path, n, total, hook):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    rw = int(1080 * 1080 / 1920); x0 = (W - rw) // 2   # reel area
    d.rectangle([0, 0, x0, H], fill=g.INK + (200,)); d.rectangle([x0 + rw, 0, W, H], fill=g.INK + (200,))
    d.text((70, 300), f"{n}/{total}", font=g.F("Black", 120), fill=g.GOLD)
    y = 470
    for ln in g.wrap(d, hook.upper().replace("i", "İ"), g.F("Black", 52), x0 - 120):
        d.text((70, y), ln, font=g.F("Black", 52), fill=g.WHITE); y += 66
    hx = x0 + rw + 70
    d.text((hx, 470), "@bilirdinizmi_az", font=g.F("Bold", 44), fill=g.WHITE)
    d.text((hx, 535), "Hər gün yeni fakt", font=g.F("SemiBold", 38), fill=(190, 196, 210))
    im.save(path)


def main():
    out, cfg = sys.argv[1], json.loads(sys.argv[2])
    tmp = tempfile.mkdtemp(); parts = []; chapters = []; t = 0.0
    items = cfg["items"]

    card(f"{tmp}/intro.png", cfg["title"], cfg.get("subtitle", ""), "@bilirdinizmi_az")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-t", "3", "-i", f"{tmp}/intro.png",
                    "-f", "lavfi", "-t", "3", "-i", "anullsrc=r=44100:cl=stereo", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                    "-r", "30", "-c:a", "aac", "-shortest", f"{tmp}/p0.mp4"], check=True)
    parts.append(f"{tmp}/p0.mp4"); chapters.append((0.0, "Giriş")); t = 3.0

    for i, it in enumerate(items, 1):
        side(f"{tmp}/s{i}.png", i, len(items), it["hook"])
        fc = ("[0:v]scale=1920:-2,crop=1920:1080,boxblur=30:3[bg];[0:v]scale=-2:1080[fg];"
              "[bg][fg]overlay=(W-w)/2:0[v1];[v1][1:v]overlay=0:0,fps=30,format=yuv420p[v]")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", it["file"], "-i", f"{tmp}/s{i}.png",
                        "-filter_complex", fc, "-map", "[v]", "-map", "0:a?", "-c:v", "libx264", "-crf", "21",
                        "-c:a", "aac", "-ar", "44100", "-ac", "2", f"{tmp}/p{i}.mp4"], check=True)
        parts.append(f"{tmp}/p{i}.mp4"); chapters.append((t, it["hook"])); t += dur(f"{tmp}/p{i}.mp4")

    card(f"{tmp}/outro.png", "Abunə ol!", "Hər gün yeni fakt — Instagram, TikTok və YouTube-da: @bilirdinizmi_az")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-t", "5", "-i", f"{tmp}/outro.png",
                    "-f", "lavfi", "-t", "5", "-i", "anullsrc=r=44100:cl=stereo", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                    "-r", "30", "-c:a", "aac", "-shortest", f"{tmp}/pz.mp4"], check=True)
    parts.append(f"{tmp}/pz.mp4")

    with open(f"{tmp}/list.txt", "w") as f:
        for p in parts: f.write(f"file '{p}'\n")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", f"{tmp}/list.txt",
                    "-c:v", "libx264", "-crf", "21", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", out], check=True)
    for s, name in chapters:
        print(f"{int(s // 60)}:{int(s % 60):02d} {name}")
    print(f"TOTAL {dur(out):.1f}s")


if __name__ == "__main__":
    main()
