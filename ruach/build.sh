#!/bin/bash
# uso: RW=1920 ./build.sh saida.mp4
set -e
cd "$(dirname "$0")"
OUT=${1:-out.mp4}; N=$(python3 -c "import json,math;print(math.ceil(json.load(open('audio/end.json'))['end']*24))")
mkdir -p seg; rm -f seg/*.mp4; CH=$(( (N + 3) / 4 )); : > seg/list.txt
for i in 0 1 2 3; do
  a=$((i*CH)); b=$(( (i+1)*CH )); python3 render.py $a $b seg/p$i.mp4 &
  echo "file 'p$i.mp4'" >> seg/list.txt
done
wait
ffmpeg -y -loglevel error -f concat -safe 0 -i seg/list.txt -i audio/mix.wav -c:v copy -c:a aac -b:a 224k -shortest -movflags +faststart "$OUT"
echo done $OUT
