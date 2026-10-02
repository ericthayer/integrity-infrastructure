"""Pure-Python PNG helpers (PIL is not installed on this machine).

Makes the logo variants from the live site's logo PNG without redrawing it:
  python3 tools/png.py logo <source.png> <out-dir>
writes
  integrity-infrastructure-logo.png           trimmed, full color, transparent
  integrity-infrastructure-logo-reversed.png  same pixels, wordmark ink -> neutral-50 (provisional)
Only pixels are recolored; shapes are untouched.
"""
import struct
import sys
import zlib
from pathlib import Path


def decode(path):
    data = Path(path).read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "not a PNG"
    i, idat, w = 8, [], None
    while i < len(data):
        n = struct.unpack(">I", data[i:i + 4])[0]
        kind, body = data[i + 4:i + 8], data[i + 8:i + 8 + n]
        if kind == b"IHDR":
            w, h, depth, ctype = struct.unpack(">IIBB", body[:10])
            assert depth == 8 and ctype in (2, 6), "only 8-bit RGB/RGBA"
        elif kind == b"IDAT":
            idat.append(body)
        i += 12 + n
    bpp = 4 if ctype == 6 else 3
    raw = zlib.decompress(b"".join(idat))
    stride = w * bpp
    out = bytearray(w * h * 4)
    prev = bytearray(stride)
    pos = 0
    for y in range(h):
        f = raw[pos]
        line = bytearray(raw[pos + 1:pos + 1 + stride])
        pos += 1 + stride
        if f == 1:
            for x in range(bpp, stride):
                line[x] = (line[x] + line[x - bpp]) & 255
        elif f == 2:
            line = bytearray((a + b) & 255 for a, b in zip(line, prev))
        elif f == 3:
            for x in range(stride):
                left = line[x - bpp] if x >= bpp else 0
                line[x] = (line[x] + ((left + prev[x]) >> 1)) & 255
        elif f == 4:
            for x in range(stride):
                a = line[x - bpp] if x >= bpp else 0
                b = prev[x]
                c = prev[x - bpp] if x >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        prev = line
        if bpp == 4:
            out[y * w * 4:(y + 1) * w * 4] = line
        else:
            for x in range(w):
                o = (y * w + x) * 4
                out[o:o + 3] = line[x * 3:x * 3 + 3]
                out[o + 3] = 255
    return w, h, out


def encode(path, w, h, rgba):
    rows = b"".join(b"\x00" + bytes(rgba[y * w * 4:(y + 1) * w * 4]) for y in range(h))

    def chunk(kind, body):
        return struct.pack(">I", len(body)) + kind + body + struct.pack(">I", zlib.crc32(kind + body) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(rows, 9)) + chunk(b"IEND", b"")
    Path(path).write_bytes(png)


def to_transparent(w, h, px):
    """White artboard -> alpha. Keeps anti-aliasing by un-mixing from white."""
    for i in range(0, len(px), 4):
        r, g, b, a = px[i:i + 4]
        if a == 0:
            continue
        alpha = 255 - min(r, g, b)  # how far from white
        if alpha <= 2:
            px[i + 3] = 0
            continue
        k = 255 / alpha
        px[i] = max(0, min(255, round(255 - (255 - r) * k)))
        px[i + 1] = max(0, min(255, round(255 - (255 - g) * k)))
        px[i + 2] = max(0, min(255, round(255 - (255 - b) * k)))
        px[i + 3] = alpha * a // 255
    return px


def bbox(w, h, px, pad=0):
    xs, ys = [], []
    for y in range(h):
        row = px[y * w * 4:(y + 1) * w * 4]
        hits = [x for x in range(w) if row[x * 4 + 3] > 8]
        if hits:
            ys.append(y)
            xs += [hits[0], hits[-1]]
    x0, x1, y0, y1 = max(0, min(xs) - pad), min(w - 1, max(xs) + pad), max(0, min(ys) - pad), min(h - 1, max(ys) + pad)
    return x0, y0, x1 + 1, y1 + 1


def crop(w, px, box):
    x0, y0, x1, y1 = box
    out = bytearray()
    for y in range(y0, y1):
        out += px[(y * w + x0) * 4:(y * w + x1) * 4]
    return x1 - x0, y1 - y0, out


def reverse_ink(px, ink=(0xF5, 0xF4, 0xF2)):
    """Recolor dark, neutral pixels (the wordmark and tagline) to ink; orange/yellow flame untouched."""
    out = bytearray(px)
    for i in range(0, len(out), 4):
        r, g, b, a = out[i:i + 4]
        if a and max(r, g, b) < 110 and max(r, g, b) - min(r, g, b) < 40:
            out[i:i + 3] = bytes(ink)
    return out


def main():
    if len(sys.argv) != 4 or sys.argv[1] != "logo":
        print(__doc__)
        sys.exit(1)
    src, out_dir = sys.argv[2], Path(sys.argv[3])
    out_dir.mkdir(parents=True, exist_ok=True)
    w, h, px = decode(src)
    corner = tuple(px[0:4])
    print(f"source {w}x{h}, corner pixel {corner}")
    if corner[3] == 255:
        px = to_transparent(w, h, px)
    box = bbox(w, h, px, pad=24)
    cw, ch, cropped = crop(w, px, box)
    print(f"trimmed to {cw}x{ch} (box {box})")
    encode(out_dir / "integrity-infrastructure-logo.png", cw, ch, cropped)
    encode(out_dir / "integrity-infrastructure-logo-reversed.png", cw, ch, reverse_ink(cropped))
    print("wrote", out_dir / "integrity-infrastructure-logo.png", "and -reversed.png")


if __name__ == "__main__":
    main()
