"""Renders iPhone launch screens (public/splash/*.png): navy background, app icon, name.
Run: python3 pipeline/build_splash.py. Sizes follow Apple's portrait screen sizes."""
import json, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "splash")
os.makedirs(OUT, exist_ok=True)
BOLD = "/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf"
SEMI = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
if not os.path.exists(SEMI):
    SEMI = BOLD
NAVY = (12, 24, 52)
NAVY2 = (19, 38, 82)
GOLD = (226, 178, 74)

# (css width, css height, pixel ratio)
DEVICES = [
    (440, 956, 3), (402, 874, 3), (420, 912, 3), (430, 932, 3), (393, 852, 3), (428, 926, 3), (390, 844, 3),
    (375, 812, 3), (360, 780, 3), (414, 896, 3), (414, 896, 2), (375, 667, 2), (414, 736, 3), (320, 568, 2),
]

icon = Image.open(os.path.join(ROOT, "public", "icon-512.png")).convert("RGBA")
out = []
for w, h, r in DEVICES:
    W, H = w * r, h * r
    img = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(img)
    for y in range(H):  # gentle vertical gradient
        t = y / (H - 1)
        d.line([(0, y), (W, y)], fill=tuple(int(NAVY[i] + (NAVY2[i] - NAVY[i]) * t) for i in range(3)))
    s = int(W * 0.30)
    ic = icon.resize((s, s), Image.LANCZOS)
    top = int(H * 0.40 - s / 2)
    img.paste(ic, ((W - s) // 2, top), ic)
    f1 = ImageFont.truetype(SEMI, int(W * 0.032))
    f2 = ImageFont.truetype(BOLD, int(W * 0.064))
    y = top + s + int(W * 0.07)
    for text, font, fill, gap in (("NEW JERSEY", f1, GOLD, 0.03), ("Police Reference", f2, (255, 255, 255), 0)):
        b = d.textbbox((0, 0), text, font=font)
        d.text(((W - (b[2] - b[0])) / 2 - b[0], y - b[1]), text, font=font, fill=fill)
        y += (b[3] - b[1]) + int(W * gap) + int(W * 0.02)
    name = f"splash-{W}x{H}.png"
    img.save(os.path.join(OUT, name), optimize=True)
    out.append({"url": f"/splash/{name}", "media": f"(device-width: {w}px) and (device-height: {h}px) and (-webkit-device-pixel-ratio: {r}) and (orientation: portrait)"})

with open(os.path.join(ROOT, "lib", "splash.json"), "w") as fh:
    json.dump(out, fh, indent=1)
print(len(out), "launch screens")
