"""Azerbaijani voice-over for reels (edge-tts neural voices; needs speech.platform.bing.com allowed).

python3 voice.py <out_prefix> <Babek|Banu> <rate e.g. +15%> "<hook text>" "<beat 1>" "<beat 2>" ...
-> <out_prefix>_0.mp3 (hook), <out_prefix>_1.mp3 ... one file per segment, so the reel can time each beat
   to its own audio. Write hooks in sentence case ("Bakı dənizdən 28 metr aşağıdadır."), not ALL CAPS.
"""
import asyncio, os, sys
import edge_tts

async def main():
    prefix, voice, rate, *texts = sys.argv[1:]
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    for i, t in enumerate(texts):
        out = f"{prefix}_{i}.mp3"
        await edge_tts.Communicate(t, f"az-AZ-{voice}Neural", rate=rate, proxy=proxy).save(out)
        if os.path.getsize(out) == 0:
            sys.exit(f"empty audio for segment {i}")
        print(out)

asyncio.run(main())
