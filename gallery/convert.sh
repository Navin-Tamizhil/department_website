#!/bin/bash
n=1
for img in *.jpg *.JPG *.jpeg *.JPEG *.png *.PNG; do
  [ -f "$img" ] || continue
  convert "$img" -quality 100 "${n}.jpeg"
  echo "Converted $img → ${n}.jpeg"
  n=$((n+1))
done
