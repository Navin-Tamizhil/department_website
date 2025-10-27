#!/bin/bash

# This script converts and optimizes images for the "Life at Department" gallery.
# It resizes images to a max width of 1200px and converts them to WebP format.

# --- Configuration ---
IMAGE_DIR="$(dirname "$0")" # Assumes the script is in the gallery directory
MAX_WIDTH=1200
QUALITY=80 # WebP quality (0-100)

# Set to 'true' to delete original files after successful conversion.
# Use with caution. Make sure you have backups.
DELETE_ORIGINALS=false
# -------------------

# 1. Check if cwebp and convert (ImageMagick) are installed
if ! command -v cwebp &> /dev/null || ! command -v convert &> /dev/null; then
    echo "❌ 'cwebp' and/or 'convert' (ImageMagick) could not be found."
    echo "Please install them to continue."
    echo "   - On Debian/Ubuntu: sudo apt-get install webp imagemagick"
    echo "   - On macOS (with Homebrew): brew install webp imagemagick"
    exit 1
fi

echo "Looking for images in '$IMAGE_DIR'..."

# 2. Find, resize, and convert images
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | while IFS= read -r -d $'\0' file; do
    filename_no_ext="${file%.*}"
    output_file="${filename_no_ext}.webp"
    echo "Processing '$file' -> '$output_file'"
    convert "$file" -resize "${MAX_WIDTH}>" -quality "$QUALITY" "$output_file"
    if [ "$DELETE_ORIGINALS" = true ] && [ $? -eq 0 ]; then
        rm "$file"
    fi
done

echo "✅ Optimization complete."