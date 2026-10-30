// node render.js <outdir> <t1,t2,...>   |   node render.js <outdir> range <fromFrame> <toFrame> <fps>
// env: RS=render scale (0.6667 default), Q=extra query string
const { chromium } = require('playwright'); const http = require('http'); const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '../..');
const CT = { js: 'text/javascript', html: 'text/html', jpg: 'image/jpeg', png: 'image/png', otf: 'font/otf', ttf: 'font/ttf', json: 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { 'Content-Type': CT[f.split('.').pop()] || 'application/octet-stream' }); r.end(d); }); });
(async () => {
  await new Promise(ok => srv.listen(0, ok)); const port = srv.address().port;
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let ts; if (process.argv[3] === 'range') { const [a, b, fps] = process.argv.slice(4).map(Number); ts = []; for (let i = a; i < b; i++) ts.push([i, i / fps]); }
  else ts = process.argv[3].split(',').map((x, i) => [i, Number(x)]);
  const br = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, // brief's -1194 path no longer exists; bundled headless shell (-1243) is used
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('PAGE', m.text()); }); pg.on('pageerror', e => console.error('PAGEERR', e.message));
  await pg.goto(`http://localhost:${port}/prototypes/anim_moon/scene.html?rs=${process.env.RS || 0.6667}&${process.env.Q || ''}`);
  await pg.waitForFunction(() => window.ready === true, null, { timeout: 180000 });
  await pg.evaluate(() => document.fonts.ready);
  const t0 = Date.now();
  for (const [i, t] of ts) {
    await pg.evaluate(t => window.renderAt(t), t);
    const name = process.argv[3] === 'range' ? `${String(i).padStart(5, '0')}.jpg` : `t${t.toFixed(2)}.jpg`;
    await pg.screenshot({ path: path.join(out, name), type: 'jpeg', quality: 93 });
    if (i % 30 === 0) console.log('frame', i, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  console.log('frames', ts.length, 'sec/frame', ((Date.now() - t0) / 1000 / ts.length).toFixed(2));
  await br.close(); srv.close();
})();
