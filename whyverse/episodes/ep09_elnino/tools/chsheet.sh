#!/bin/sh
# chsheet.sh c3 [n] -> out/sheet_c3.png (n frames across the chapter)
cd "$(dirname "$0")/../film"; export CHROME_PATH=/home/claude/bin/chrome-nosandbox
R=$(node -e "const s=require('./score');const c=s.CH['$1'];console.log((c.t0+0.4).toFixed(2),(c.t1-0.2).toFixed(2))")
node engine/render.js sheet $R ${2:-16} 4 2>&1 | grep -v "^    at" | tail -3
cp out/sheet.png out/sheet_$1.png
