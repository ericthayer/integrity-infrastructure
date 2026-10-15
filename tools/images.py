"""Responsive photo variants for the website (one-time asset step; outputs are committed).

  python3 tools/images.py

For each photo in src/img/photos/*.jpg writes <name>-<width>.avif and <name>-<width>.webp
at 640, 1024 and 1600px wide next to the source. The JPEG stays as the <img> fallback.
Also writes a 360px-wide reversed logo for the header and footer (resampled only, never
redrawn or recolored).
Needs Pillow with AVIF support (Pillow 11.3+). Building, testing and verifying the
project do not run this script.
"""
from pathlib import Path

from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "src" / "img"
PHOTOS = IMG / "photos"
LOGO = IMG / "logo" / "integrity-infrastructure-logo-reversed.png"
WIDTHS = (640, 1024, 1600)
# Photos the website does not use stay out (fleet-mountains shows sister-company trucks).
SKIP = {"fleet-mountains"}


def main() -> None:
    for source in sorted(PHOTOS.glob("*.jpg")):
        if source.stem in SKIP:
            continue
        with Image.open(source) as image:
            image = image.convert("RGB")
            for width in WIDTHS:
                if width > image.width:
                    continue
                height = round(image.height * width / image.width)
                resized = image.resize((width, height), Image.Resampling.LANCZOS)
                resized.save(PHOTOS / f"{source.stem}-{width}.avif", quality=52, speed=4)
                resized.save(PHOTOS / f"{source.stem}-{width}.webp", quality=74, method=6)
        print(f"{source.name}: {', '.join(str(w) for w in WIDTHS)}")
    with Image.open(LOGO) as logo:
        height = round(logo.height * 360 / logo.width)
        small = logo.resize((360, height), Image.Resampling.LANCZOS)
        small.save(LOGO.with_name(f"{LOGO.stem}-360.png"), optimize=True)
        print(f"{LOGO.name}: 360x{height}")


if __name__ == "__main__":
    main()
