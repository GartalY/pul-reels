"""Native 16:9 narrated YouTube video (v2 long-form, after Gartal rejected reel compilations on 2026-10-27).

python3 longform.py <out.mp4> <spec.json>

spec = {
  "voice": "Banu", "rate": "+5%",
  "intro": {"title": "...", "sub": "...", "photo": "path", "lines": [{"say": "...", "show": "..."}]},
  "facts": [{"title": "...", "photos": [{"path": "...", "cy": 0.5}], "lines": [{"say": "...", "show": "..."}]}],
  "outro": {"lines": [...]}   (optional)
}
`say` = what Banu speaks (numbers written out in words), `show` = the subtitle (digits allowed). If `show` is
missing, `say` is shown. Photos rotate across a fact's lines with a slow Ken Burns zoom. Each fact opens with a
2.5 s chapter card (big number + title). Prints chapter timestamps for the YouTube description.
"""
import asyncio, json, os, subprocess, sys, tempfile
import edge_tts
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import factgen as g
from reelgen import music

W, H, FPS = 1920, 1080, 30
ROOT = os.path.dirname(os.path.abspath(__file__))


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "csv=p=0", f]).decode().strip())


def cover(path, cy=0.5, scale=1.15):
    im = Image.open(path).convert("RGB")
    tw, th = int(W * scale), int(H * scale)
    r = max(tw / im.width, th / im.height)
    im = im.resize((int(im.width * r) + 1, int(im.height * r) + 1), Image.LANCZOS)
    x = (im.width - tw) // 2; y = int((im.height - th) * cy)
    return im.crop((x, y, x + tw, y + th))


def shade(im):
    w_, h_ = im.size
    g_ = Image.new("L", (1, h_))
    for y in range(h_):
        t = y / h_; a = 0
        if t > 0.62: a = int(200 * min(1, (t - 0.62) / 0.38))
        if t < 0.12: a = max(a, int(120 * (1 - t / 0.12)))
        g_.putpixel((0, y), a)
    return Image.composite(Image.new("RGB", (w_, h_), g.INK), im, g_.resize((w_, h_)))


def subtitle_png(path, text):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    f = g.F("Bold", 50); lines = g.wrap(d, text, f, 1500)
    y = H - 90 - len(lines) * 64
    for ln in lines:
        w = d.textlength(ln, font=f)
        for dx, dy in [(-2, 0), (2, 0), (0, -2), (0, 2), (2, 2)]:
            d.text(((W - w) / 2 + dx, y + dy), ln, font=f, fill=(0, 0, 0, 200))
        d.text(((W - w) / 2, y), ln, font=f, fill=g.WHITE); y += 64
    # small brand mark top-left
    d.text((48, 36), "@bilirdinizmi_az", font=g.F("SemiBold", 30), fill=(255, 255, 255, 190))
    im.save(path)


def chapter_png(path, photo, cy, num, title):
    bg = cover(photo, cy, 1.0).filter(ImageFilter.GaussianBlur(18))
    bg = Image.blend(bg, Image.new("RGB", (W, H), g.INK), 0.62)
    d = ImageDraw.Draw(bg)
    if num is not None:
        n = str(num); fn = g.F("Black", 260)
        d.text(((W - d.textlength(n, font=fn)) / 2, 230), n, font=fn, fill=g.GOLD)
    y = 560 if num is not None else 420
    for ln in g.wrap(d, title, g.F("Black", 78), 1500):
        d.text(((W - d.textlength(ln, font=g.F("Black", 78))) / 2, y), ln, font=g.F("Black", 78), fill=g.WHITE); y += 96
    bg.save(path)


async def tts(text, out, voice, rate):
    p = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    await edge_tts.Communicate(text, f"az-AZ-{voice}Neural", rate=rate, proxy=p).save(out)


def kenburns(photo, cy, seconds, out, k):
    """Slow zoom/pan clip of one photo (1920x1080, silent)."""
    src = shade(cover(photo, cy, 1.15))
    tmpimg = out + ".png"; src.save(tmpimg)
    n = max(1, int(seconds * FPS))
    zin = k % 2 == 0   # alternate zoom in / zoom out
    z = f"'if(eq(on,0),{1.0 if zin else 1.12},zoom{'+' if zin else '-'}{0.12 / n:.6f})'"
    x = "'iw/2-(iw/zoom/2)'"; y = "'ih/2-(ih/zoom/2)'"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", tmpimg, "-vf",
                    f"zoompan=z={z}:x={x}:y={y}:d={n}:s={W}x{H}:fps={FPS},format=yuv420p",
                    "-frames:v", str(n), "-c:v", "libx264", "-crf", "20", out], check=True)


def main():
    out, spec = sys.argv[1], json.load(open(sys.argv[2]))
    voice, rate = spec.get("voice", "Banu"), spec.get("rate", "+5%")
    tmp = tempfile.mkdtemp(); segs = []   # (video_path, audio_path_or_None, seconds)
    chapters = []; t = 0.0; k = 0

    def lines_block(lines, photos, tag):
        nonlocal t, k
        for i, ln in enumerate(lines):
            a = f"{tmp}/{tag}_{i}.mp3"; asyncio.run(tts(ln["say"], a, voice, rate))
            secs = dur(a) + 0.45
            ph = photos[i % len(photos)]
            v = f"{tmp}/{tag}_{i}_bg.mp4"; kenburns(ph["path"], ph.get("cy", 0.5), secs, v, k); k += 1
            sp = f"{tmp}/{tag}_{i}_sub.png"; subtitle_png(sp, ln.get("show", ln["say"]))
            vv = f"{tmp}/{tag}_{i}.mp4"
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", v, "-i", sp, "-i", a, "-filter_complex",
                            "[0:v][1:v]overlay=0:0[v];[2:a]apad=pad_dur=0.45,aresample=44100[a]", "-map", "[v]",
                            "-map", "[a]", "-t", f"{secs:.3f}", "-c:v", "libx264", "-crf", "20", "-pix_fmt", "yuv420p",
                            "-c:a", "aac", "-ac", "2", vv], check=True)
            segs.append(vv); t += secs

    def card(photo, cy, num, title, tag, secs=2.5):
        nonlocal t
        p = f"{tmp}/{tag}.png"; chapter_png(p, photo, cy, num, title); v = f"{tmp}/{tag}.mp4"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-t", str(secs), "-i", p, "-f", "lavfi",
                        "-t", str(secs), "-i", "anullsrc=r=44100:cl=stereo", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                        "-r", str(FPS), "-c:a", "aac", "-shortest", v], check=True)
        segs.append(v); t += secs

    it = spec["intro"]
    chapters.append((0.0, "Giriş"))
    card(it["photo"], it.get("cy", 0.5), None, it["title"], "intro_card", 3.0)
    lines_block(it["lines"], [{"path": it["photo"], "cy": it.get("cy", 0.5)}], "intro")
    for n, f in enumerate(spec["facts"], 1):
        chapters.append((t, f["title"]))
        card(f["photos"][0]["path"], f["photos"][0].get("cy", 0.5), n, f["title"], f"c{n}")
        lines_block(f["lines"], f["photos"], f"f{n}")
    if spec.get("outro"):
        o = spec["outro"]; chapters.append((t, "Sonda"))
        lines_block(o["lines"], o.get("photos") or [{"path": it["photo"], "cy": it.get("cy", 0.5)}], "outro")

    with open(f"{tmp}/list.txt", "w") as fl:
        for s in segs: fl.write(f"file '{s}'\n")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", f"{tmp}/list.txt",
                    "-c", "copy", f"{tmp}/body.mp4"], check=True)
    total = dur(f"{tmp}/body.mp4")
    music(f"{tmp}/m.wav", total + 1, 7)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{tmp}/body.mp4", "-i", f"{tmp}/m.wav",
                    "-filter_complex", "[1:a]volume=0.16[m];[0:a][m]amix=inputs=2:duration=first:dropout_transition=0[a]",
                    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", out], check=True)
    for s, name in chapters:
        print(f"{int(s // 60)}:{int(s % 60):02d} {name}")
    print(f"TOTAL {dur(out):.1f}s")


if __name__ == "__main__":
    main()
