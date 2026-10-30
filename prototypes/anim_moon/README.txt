Night animation test 2026-10-31 — "Ay hər il 3,8 sm uzaqlaşır" (three.js 0.160 in headless Chromium/SwiftShader).
npm install three@0.160.0 here (playwright = the global one). Text overlays are DOM in scene.html (crisp at 1080x1920),
the 3D canvas renders at RS x 1080x1920 (RS=0.6667 default, RS=1 = full res).
  node render.js <dir> 0,4.2,9           # stills
  RS=1 node render.js <dir> range 0 930 30   # full sequence (31 s @ 30 fps)
  python3 -I compose.py <dir> 30 out.mp4 23  # + Banu voice (vo/) + reelgen.music()
Voice: python3 voice.py prototypes/anim_moon/vo/vo Banu +15% "<hook>" "<b1>" "<b2>" "<b3>" (texts in out/anim/2026-10-31_moon.md)
