p='film.tpl.js'; s=open(p).read()
rep=[
# headband up on the hairline, thinner -> no "mask" read
("ctx.moveTo(-86, headY - 22); ctx.quadraticCurveTo(0, headY - 42, 86, headY - 22); ctx.lineWidth = 17;",
 "ctx.moveTo(-80, headY - 44); ctx.quadraticCurveTo(0, headY - 66, 80, headY - 44); ctx.lineWidth = 13;"),
# flashback re-layout
("ctx.translate(cx - 40, s.y + 450); ctx.rotate(-0.06); ctx.scale(kT, kT);","ctx.translate(cx - 40, s.y + 360); ctx.rotate(-0.06); ctx.scale(kT, kT);"),
("const y = s.y + 880, xa","const y = s.y + 760, xa"),
("big(ctx, n.toLocaleString('en-US'), cx, s.y + 860,","big(ctx, n.toLocaleString('en-US'), cx, s.y + 660,"),
("big(ctx, n.toLocaleString('en-US'), cx, s.y + 760,","big(ctx, n.toLocaleString('en-US'), cx, s.y + 660,"),
("ronnie(ctx, lerp(xa, xb, q) - 10, s.y + 1180, 0.42","ronnie(ctx, lerp(xa, xb, q) - 10, s.y + 1090, 0.5"),
("nameplate(ctx, 'RONALDINHO', cx + 170, s.y + 1010","nameplate(ctx, 'RONALDINHO', cx + 150, s.y + 1180"),
("stamp(ctx, 'NO COMPETITIVE MATCH', cx + 60, s.y + 1110, 50, t, tC + 0.1, C.red, 0.04)","stamp(ctx, 'NO COMPETITIVE MATCH', cx - 30, s.y + 420, 50, t, tC + 0.1, C.red, 0.05)"),
# ladder chip above
("chip(ctx, \"ITALY'S 3RD TIER\", cx, s.y + 1110","chip(ctx, \"ITALY'S 3RD TIER\", cx, s.y + 400"),
("stamp(ctx, 'IN THE CLUB', cx, s.y + 1100","stamp(ctx, 'IN THE CLUB', cx, s.y + 1060"),
# match: burst + clock shrink up when the FT card arrives
("  const kc = pop(t, t45 - 0.12);\n  burst(ctx, cx, s.y + 560, 300, 14, C.yellow, kc, t * 0.2);\n  big(ctx, `${mins}'`, cx, s.y + 620, 190, C.white, kc, { sw: 0.08 });\n  chip(ctx, 'MINUTES PLAYED', cx, s.y + 760, 48, pop(t, T('minutes.') - 0.05), { bg: C.white, rot: -0.04 });\n  stamp(ctx, 'HALF-TIME', cx + 150, s.y + 380, 56, t, tHT, C.ink, 0.07);",
 "  const kc = pop(t, t45 - 0.12), sh = E.inOutCubic(prog(t, T('won') - 0.3, T('won') + 0.1));\n  ctx.save(); M.zoomAbout(ctx, lerp(1, 0.62, sh), cx, s.y + 380);\n  burst(ctx, cx, s.y + 560, 300, 14, C.yellow, kc, t * 0.2);\n  big(ctx, `${mins}'`, cx, s.y + 620, 190, C.white, kc, { sw: 0.08 });\n  chip(ctx, 'MINUTES PLAYED', cx, s.y + 760, 48, pop(t, T('minutes.') - 0.05), { bg: C.white, rot: -0.04 });\n  stamp(ctx, 'HALF-TIME', cx + 150, s.y + 380, 56, t, tHT, C.ink, 0.07);\n  ctx.restore();"),
("lerp(H + 300, s.y + 960, kF)","lerp(H + 300, s.y + 880, kF)"),
# bigger quote bubble
("cx - 20, s.y + 300, 50, pop(t, T('says') - 0.05)","cx - 10, s.y + 310, 56, pop(t, T('says') - 0.05)"),
]
for a,b in rep:
    if a not in s: print('MISS',a[:60]); continue
    s=s.replace(a,b)
# end card: juggling ball over the silhouette so the last 4 s keep moving
a="  ronnie(ctx, cx + 330, s.y + 1010, 0.62, 'stand', t, { flip: -1, number: false });"
assert a in s
s=s.replace(a,a+"\n  { const jt = (t - S.H) * 2.2, ph = jt % 1, hgt = 4 * ph * (1 - ph); ball(ctx, cx + 330 + (Math.floor(jt) % 2 ? -40 : 40) * (1 - ph * 2) * 0.5 - 90, s.y + 960 - 300 * hgt, 30, t * 8); }")
open(p,'w').write(s)
