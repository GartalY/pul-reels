#!/bin/sh
# Resumable full render: the film is rendered in 45 s chunks (PNG frames → x264 CRF 14, same as engine "video"),
# each kept in film/out/chunks/, so a container restart only loses the chunk in progress. Then joined losslessly → out/video.mp4.
# Adds a tiny "range" mode to the vendored (git-ignored) engine copy: node engine/render.js range <f0> <f1> <file>.
cd "$(dirname "$0")/../film"; export CHROME_PATH=/home/claude/bin/chrome-nosandbox
grep -q "mode === 'range'" engine/render.js || python3 - <<'PY'
p='engine/render.js'; s=open(p).read()
a="  } else if (mode === 'video') {"
b="  } else if (mode === 'range') {\n    const f0 = parseInt(args[0], 10), f1 = parseInt(args[1], 10);\n    const { frames, secs } = await renderRange(f0, f1, 2, path.join(OUT, args[2]));\n    console.log(`range ${f0}-${f1} done in ${secs.toFixed(1)}s (${frames} frames)`);\n"
assert a in s; s=s.replace(a,b+a,1)
c="'clip', 'video', 'preview', 'cast'].includes(mode)"
assert c in s; s=s.replace(c,"'clip', 'video', 'range', 'preview', 'cast'].includes(mode)")
open(p,'w').write(s)
PY
mkdir -p out/chunks
TOTAL=$(node -e "const s=require('./score');console.log(Math.round(s.DURATION*s.FPS))"); STEP=1350; i=0; f=0
: > out/chunks/list.txt
while [ $f -lt $TOTAL ]; do
  g=$((f+STEP)); [ $g -gt $TOTAL ] && g=$TOTAL
  n=$(printf "chunk_%03d.mp4" $i)
  if [ ! -s out/chunks/$n ]; then
    node engine/render.js range $f $g chunks/.tmp_$n 2>&1 | grep -v "^    at" | tail -1 && mv out/chunks/.tmp_$n out/chunks/$n || { echo "FAILED $n"; exit 1; }
  fi
  echo "file '$n'" >> out/chunks/list.txt
  f=$g; i=$((i+1))
done
ffmpeg -v error -y -f concat -safe 0 -i out/chunks/list.txt -c copy out/video.mp4 && echo "ALL DONE $(ffprobe -v error -count_packets -select_streams v:0 -show_entries stream=nb_read_packets -of csv=p=0 out/video.mp4) frames of $TOTAL"
