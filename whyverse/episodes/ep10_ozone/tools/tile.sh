#!/bin/sh
# tile.sh out.png img1 img2 ... (3 columns, 640 wide each)
o=$1; shift; n=$#; rows=$(( (n+2)/3 ))
ffmpeg -v error -y $(for f in "$@"; do printf -- "-i %s " "$f"; done) -filter_complex "$(i=0; for f in "$@"; do printf "[%d]scale=640:-1[v%d];" $i $i; i=$((i+1)); done; i=0; for f in "$@"; do printf "[v%d]" $i; i=$((i+1)); done; printf "xstack=inputs=%d:layout=" $n; i=0; for f in "$@"; do c=$((i%3)); r=$((i/3)); [ $i -gt 0 ] && printf "|"; printf "%d_%d" $((c*640)) $((r*360)); i=$((i+1)); done; printf ":fill=black")" -frames:v 1 $o
