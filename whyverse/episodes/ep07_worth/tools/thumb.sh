#!/bin/sh
# thumb.sh -> ../thumbnail.jpg (1280x720). Renders tools/thumb.js in a temp copy of the film folder.
E="$(cd "$(dirname "$0")/.." && pwd)"; T=/home/claude/thumb_ep07; rm -rf $T; mkdir -p $T
cp -r $E/film/engine $E/film/*.js $E/film/index.html $T/; cp $E/tools/thumb.js $T/film.js
python3 - "$T/index.html" <<'PY'
import re,sys; p=sys.argv[1]; s=open(p).read(); s=re.sub(r'<script src="ch\d\.js"></script>\n','',s); open(p,'w').write(s)
PY
cd $T && CHROME_PATH=/home/claude/bin/chrome-nosandbox node engine/render.js stills 1 2>&1 | tail -1
ffmpeg -v error -y -i out/stills/t_001.00.png -vf scale=1280:720:flags=lanczos -q:v 2 $E/thumbnail.jpg && ls -la $E/thumbnail.jpg
