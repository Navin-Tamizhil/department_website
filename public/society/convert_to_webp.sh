#!/bin/bash

# --- Configuration ---
# The directory where your images are located.
# You can change this to any other folder.
IMAGE_DIR="$HOME/dept_website/public/society"
# WebP quality setting (0-100). 80 is a good balance of quality and size.
QUALITY=80

# Set to 'true' to delete the original JPG/JPEG files after successful conversion.
DELETE_ORIGINALS=false
# -------------------

# 1. Check if cwebp is installed
if ! command -v cwebp &> /dev/null
then
    echo "❌ 'cwebp' command could not be found. Please install it to continue."
    echo "   - On Debian/Ubuntu: sudo apt-get install webp"
    echo "   - On macOS (with Homebrew): brew install webp"
    exit 1
fi

echo "Looking for images in '$IMAGE_DIR'..."

# 2. Find and convert all .jpg and .jpeg files
# The -print0 and read -d flags handle filenames with spaces correctly.
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d $'\0' file; do
    # Get the filename without the extension
    filename_no_ext="${file%.*}"

    # Define the output .webp filename
    output_file="${filename_no_ext}.webp"

    echo "Converting '$file' -> '$output_file'"

    # 3. Run the conversion command
    cwebp -q "$QUALITY" "$file" -o "$output_file"

    # 4. Optionally, delete the original file
    if [ "$DELETE_ORIGINALS" = true ] && [ $? -eq 0 ]; then
        echo "   -> Deleting original: '$file'"
        rm "$file"
    fi
done

echo "✅ Conversion complete."
