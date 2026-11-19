"""Renders the app icons (PNG) from the same shield design as components/Logo.tsx.
Run: python3 pipeline/build_icons.py  -> public/icon-512.png, public/icon-192.png, public/apple-touch-icon.png, public/favicon-32.png
Uses the Inter ExtraBold font (SIL Open Font License)."""
import math, os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public")
os.makedirs(OUT, exist_ok=True)
FONT = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"

NAVY_TOP = (12, 24, 52)
NAVY_BOT = (23, 52, 120)
GOLD = (226, 178, 74)
GOLD_LIGHT = (245, 214, 140)
WHITE = (241, 245, 249)

def bezier(p0, p1, p2, p3, n=40):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0]
        y = (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]
        pts.append((x, y))
    return pts

def shield(cx, top, w, h):
    """Shield outline as a polygon: flat-ish top with peak, straight sides, curved point at the bottom."""
    l, r = cx - w / 2, cx + w / 2
    shoulder = top + h * 0.12
    side_end = top + h * 0.48
    bottom = top + h
    pts = [(cx, top), (r, shoulder), (r, side_end)]
    pts += bezier((r, side_end), (r, top + h * 0.78), (cx + w * 0.22, top + h * 0.9), (cx, bottom))[1:]
    pts += bezier((cx, bottom), (cx - w * 0.22, top + h * 0.9), (l, top + h * 0.78), (l, side_end))[1:]
    pts += [(l, shoulder)]
    return pts

def star(cx, cy, r_out, r_in, points=5, rot=-90):
    pts = []
    for i in range(points * 2):
        r = r_out if i % 2 == 0 else r_in
        a = math.radians(rot + i * 180 / points)
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def render(size, rounded=True):
    S = 4  # supersample for smooth edges
    W = size * S
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    # background: vertical navy gradient
    bg = Image.new("RGBA", (W, W))
    d = ImageDraw.Draw(bg)
    for y in range(W):
        t = y / (W - 1)
        c = tuple(int(NAVY_TOP[i] + (NAVY_BOT[i] - NAVY_TOP[i]) * t) for i in range(3)) + (255,)
        d.line([(0, y), (W, y)], fill=c)
    if rounded:
        mask = Image.new("L", (W, W), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, W - 1, W - 1], radius=int(W * 0.22), fill=255)
        img.paste(bg, (0, 0), mask)
    else:
        img = bg
    d = ImageDraw.Draw(img)

    cx = W / 2
    top, h, w = W * 0.15, W * 0.72, W * 0.60
    # soft glow behind the shield
    glow = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    ImageDraw.Draw(glow).polygon(shield(cx, top, w, h), fill=(80, 130, 255, 90))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(W * 0.04)))
    d = ImageDraw.Draw(img)
    # gold rim, then inner navy field, then thin inner gold line
    d.polygon(shield(cx, top, w, h), fill=GOLD)
    rim = W * 0.028
    d.polygon(shield(cx, top + rim, w - rim * 2.2, h - rim * 2.3), fill=NAVY_TOP)
    line = W * 0.008
    inner = shield(cx, top + rim * 2.0, w - rim * 4.0, h - rim * 4.2)
    d.line(inner + [inner[0]], fill=GOLD_LIGHT + (160,), width=max(1, int(line)), joint="curve")
    # star
    d.polygon(star(cx, top + h * 0.25, W * 0.055, W * 0.023), fill=GOLD_LIGHT)
    # NJ monogram
    font = ImageFont.truetype(FONT, int(W * 0.25))
    text = "NJ"
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((cx - tw / 2 - bbox[0], top + h * 0.52 - th / 2 - bbox[1]), text, font=font, fill=WHITE)
    return img.resize((size, size), Image.LANCZOS)

render(512).save(os.path.join(OUT, "icon-512.png"))
render(192).save(os.path.join(OUT, "icon-192.png"))
# iOS adds its own rounded corners and ignores transparency, so the Apple icon is square and full-bleed.
render(180, rounded=False).convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"))
render(32).save(os.path.join(OUT, "favicon-32.png"))
render(1024, rounded=False).convert("RGB").save(os.path.join(OUT, "logo-1024.png"))
print("icons written to", OUT)
