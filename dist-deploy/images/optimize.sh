#!/bin/bash

# Image Optimization Script for HOD images
# Run this in your /public/images directory

echo "Starting image optimization..."

# 1. Create optimized versions of AB1.jpg
echo "Optimizing AB1.jpg..."

# Create a small version (320px width for actual display)
convert AB1.jpg -resize 640x640 -quality 85 -strip AB1_small.jpg

# Create a medium version (for retina displays)
convert AB1.jpg -resize 960x960 -quality 85 -strip AB1_medium.jpg

# Create a WebP version (better compression)
convert AB1.jpg -resize 640x640 -quality 85 -strip AB1_small.webp

# 2. Optimize hod.JPG as well
echo "Optimizing hod.JPG..."
convert hod.JPG -resize 640x640 -quality 85 -strip hod_small.jpg
convert hod.JPG -resize 960x960 -quality 85 -strip hod_medium.jpg
convert hod.JPG -resize 640x640 -quality 85 -strip hod_small.webp

# 3. Check file sizes
echo -e "\n=== Original file sizes ==="
ls -lh AB1.jpg hod.JPG

echo -e "\n=== Optimized file sizes ==="
ls -lh *_small.* *_medium.*

echo -e "\nOptimization complete!"

# Alternative using cwebp for WebP (if available)
# cwebp -q 85 AB1.jpg -resize 640 640 -o AB1_small.webp

# Using jpegoptim for in-place optimization (optional)
# jpegoptim --size=200k AB1_small.jpg
