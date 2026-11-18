p='film.tpl.js'; s=open(p).read()
old_start=s.index('  // big curly hair'); old_end=s.index('  // No. 10 on the back')
s=s[:old_start]+'''  // big curly hair: a full mass over the crown falling past the ears to the shoulders
  for (let i = 0; i < 30; i++) { const a = Math.PI * (0.78 + 1.44 * (i / 29)), rx = 84, ry = 92;
    const bob = 3 * Math.sin(t * 9 + i);
    ctx.beginPath(); ctx.arc(Math.cos(a) * rx, headY + 10 + Math.sin(a) * ry + bob, 30 + 9 * hash01(i, 22), 0, TAU); ctx.fill(); }
  for (let i = 0; i < 12; i++) { const side = i % 2 ? 1 : -1, k = Math.floor(i / 2); // curls down to the shoulders
    ctx.beginPath(); ctx.arc(side * (70 + 10 * hash01(i, 23) - k * 2), headY + 30 + k * 22 + 2 * Math.sin(t * 8 + i), 27, 0, TAU); ctx.fill(); }
  // headband across the forehead (the one light accent on the figure)
  ctx.save(); ctx.beginPath(); ctx.moveTo(-86, headY - 22); ctx.quadraticCurveTo(0, headY - 42, 86, headY - 22); ctx.lineWidth = 17; ctx.strokeStyle = C.white; ctx.stroke(); ctx.restore();
'''+s[old_end:]
rep=[
("ctx.fillStyle = C.ink; ctx.fillRect(cx - 470, s.y + 1180, 380, 26); ctx.fillRect(cx - 450, s.y + 1206, 20, 90); ctx.fillRect(cx - 130, s.y + 1206, 20, 90);\n  ronnie(ctx, cx - 250, s.y + 1300, 0.62, 'sit', t, { number: false });\n  ball(ctx, cx - 120, s.y + 1270, 32, t * 2);",
 "ctx.fillStyle = C.ink; ctx.fillRect(cx - 470, s.y + 990, 380, 26); ctx.fillRect(cx - 450, s.y + 1016, 20, 90); ctx.fillRect(cx - 130, s.y + 1016, 20, 90);\n  ronnie(ctx, cx - 250, s.y + 1110, 0.62, 'sit', t, { number: false });\n  ball(ctx, cx - 100, s.y + 1078, 32, t * 2);"),
("s.y + 1060 - d * (520","s.y + 900 - d * (520"),("calPage(ctx, cx + 330, s.y + 1060, 0.04","calPage(ctx, cx + 330, s.y + 900, 0.04"),
("const y = s.y + 1010, xa","const y = s.y + 880, xa"),("big(ctx, n.toLocaleString('en-US'), cx, s.y + 860,","big(ctx, n.toLocaleString('en-US'), cx, s.y + 760,"),
("ronnie(ctx, lerp(xa, xb, q) - 10, s.y + 1440, 0.42","ronnie(ctx, lerp(xa, xb, q) - 10, s.y + 1180, 0.42"),
("nameplate(ctx, 'RONALDINHO', cx + 150, s.y + 1220","nameplate(ctx, 'RONALDINHO', cx + 170, s.y + 1010"),
("stamp(ctx, 'NO COMPETITIVE MATCH', cx, s.y + 1330, 50","stamp(ctx, 'NO COMPETITIVE MATCH', cx + 60, s.y + 1110, 50"),
("lerp(s.y + 960, s.y + 1420, q), lerp(0.42, 0.95, q), 'run'","lerp(s.y + 900, s.y + 1150, q), lerp(0.42, 0.82, q), 'run'"),
("lerp(s.y + 960, s.y + 1400, q) - 10, lerp(16, 40, q)","lerp(s.y + 900, s.y + 1135, q) - 10, lerp(16, 40, q)"),
("const ly = s.y + 620, rh = 200;","const ly = s.y + 560, rh = 165;"),
("chip(ctx, \"ITALY'S 3RD TIER\", cx, s.y + 1330","chip(ctx, \"ITALY'S 3RD TIER\", cx, s.y + 1110"),
("ball(ctx, cx - 340, s.y + 1210 - 90","ball(ctx, cx - 330, s.y + 1110 - 90"),
("card(cx - 210, s.y + 760,","card(cx - 210, s.y + 700,"),("ctx.translate(cx - 210, s.y + 760);","ctx.translate(cx - 210, s.y + 700);"),
("card(cx + 210, s.y + 800,","card(cx + 210, s.y + 740,"),("ctx.translate(cx + 210, s.y + 800);","ctx.translate(cx + 210, s.y + 740);"),
("stamp(ctx, 'IN THE CLUB', cx, s.y + 1190","stamp(ctx, 'IN THE CLUB', cx, s.y + 1100"),
("py = s.y + 1300;","py = s.y + 1150;"),("lerp(H + 300, s.y + 1060, kF)","lerp(H + 300, s.y + 960, kF)"),
("ronnie(ctx, cx - 250, s.y + 1430, 0.95, pose","ronnie(ctx, cx - 240, s.y + 1170, 0.85, pose"),
("bubble(ctx, ['IF THE PRESIDENT', \"CALLS ME, I'LL\", 'BE BACK!'], cx - 70, s.y + 880 - 300 * 0, 52","bubble(ctx, ['IF THE PRESIDENT', \"CALLS ME, I'LL\", 'BE BACK!'], cx - 20, s.y + 300, 50"),
("chip(ctx, 'RONALDINHO, 15 NOV', cx - 110, s.y + 1110","chip(ctx, 'RONALDINHO, 15 NOV', cx + 230, s.y + 1060"),
("ctx.translate(cx + 230, s.y + 640); ctx.rotate(0.1 + shk)","ctx.translate(cx + 230, s.y + 700); ctx.rotate(0.1 + shk)"),
("ctx.arc(cx + 230, s.y + 640, 330","ctx.arc(cx + 230, s.y + 700, 330"),
("chip(ctx, 'RING!', cx + 400, s.y + 320","chip(ctx, 'RING!', cx + 380, s.y + 430"),
]
for a,b in rep:
    assert a in s, a[:50]; s=s.replace(a,b)
a="  halftone(ctx, C.yellow, { gx: cx, gy: s.y + 300, reach: 1500, rmax: 9, step: 26, oy: Math.sin(t * 12) * 4 });"
assert a in s
s=s.replace(a,"  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, s.y + 700); ctx.clip();\n"+a+"\n  ctx.restore();")
open(p,'w').write(s)
