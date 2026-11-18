#!/bin/sh
# 19 Nov 13:00 MYTH vs FACT static reel (no voice, silent). Run from repo root.
python3 factgen.py reel fetch/img/2026-11-19_1_brain_b.jpg out/2026-11-19/1_reel.mp4 "$(cat reels/2026-11-19_1300/spec.json)"
