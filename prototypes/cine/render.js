// node render.js <outdir> <t1,t2,...> | node render.js <outdir> range <from> <to> <fps>
const { chromium } = require('playwright'); const http = require('http'); const fs = require('fs'); const path = require('path');
const root = __dirname;
const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : 'text/html' }); r.end(d); }); });
(async () => {
  await new Promise(ok => srv.listen(0, ok)); const port = srv.address().port;
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  let ts; if (process.argv[3] === 'range') { const [a, b, fps] = process.argv.slice(4).map(Number); ts = []; for (let i = a; i < b; i++) ts.push([i, i / fps]); }
  else ts = process.argv[3].split(',').map((x, i) => [i, Number(x)]);
  const br = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const pg = await br.newPage({ viewport: { width: 720, height: 1280 } });
  pg.on('console', m => { if (m.type() === 'error') console.error('PAGE', m.text()); }); pg.on('pageerror', e => console.error('PAGEERR', e.message));
  await pg.goto(`http://localhost:${port}/scene.html?seg=${encodeURIComponent(process.env.SEG || '[3.49,7.91,7.05,9.78,1.8]')}&${process.env.Q||''}`);
  await pg.waitForFunction(() => window.ready === true, null, { timeout: 120000 });
  const meta = fs.createWriteStream(path.join(out, 'meta.jsonl'), { flags: 'a' }); const t0 = Date.now();
  for (const [i, t] of ts) {
    const m = await pg.evaluate(t => window.renderAt(t), t);
    await pg.screenshot({ path: path.join(out, `${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
    m.i = i; meta.write(JSON.stringify(m) + '\n');
  }
  meta.end(); console.log('frames', ts.length, 'sec/frame', ((Date.now() - t0) / 1000 / ts.length).toFixed(2));
  await br.close(); srv.close();
})();
