#!/usr/bin/env python3
"""
ब्लॉग लेख की seed फ़ाइलें जाँचना (12 भाषाएँ पूरी और एक जैसी हैं?)
उपयोग:  python3 -I scripts/check-blog-seed.py 2026-11-14-acidity-ayurveda
(नाम = seed फ़ाइल का नाम, बिना .json)
"""
import json, os, re, sys
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEED = os.path.join(ROOT, "api", "clinic-blogs", "seed")
LANGS = ["en", "pa", "gu", "mr", "bn", "ta", "te", "kn", "ml", "or", "as"]
cats_src = open(os.path.join(ROOT, "src", "data", "blogCategories.js"), encoding="utf-8").read()
CATS = set(re.findall(r'key:\s*"([a-z0-9-]+)"', cats_src))

errors = []
def err(m): errors.append(m)

def shape(html):
    return {t: len(re.findall(f"<{t}[ >]", html)) for t in ["h2", "h3", "li", "blockquote", "strong"]}

def load(name):
    p = os.path.join(SEED, name + ".json")
    if not os.path.exists(p):
        err(f"फ़ाइल नहीं मिली: {p}")
        return None
    try:
        return json.load(open(p, encoding="utf-8"))
    except Exception as e:
        err(f"{name}.json — JSON गलत: {e}")
        return None

if len(sys.argv) != 2:
    print(__doc__); sys.exit(1)
name = sys.argv[1]
base = load(name)
if base:
    for k in ["slug", "title", "title_en", "category", "excerpt", "content", "image", "author", "publish_at"]:
        if not str(base.get(k, "")).strip():
            err(f"मूल लेख में '{k}' खाली है")
    if base.get("lang", "hi") != "hi":
        err("मूल लेख का lang 'hi' होना चाहिए (या lang हटाएँ)")
    if not re.fullmatch(r"[a-z0-9-]{3,120}", base.get("slug", "")):
        err("slug में केवल छोटे English अक्षर, अंक और - हों")
    if base.get("category") not in CATS:
        err(f"category '{base.get('category')}' blogCategories.js में नहीं है")
    try:
        datetime.strptime(base.get("publish_at", ""), "%Y-%m-%d %H:%M")
    except ValueError:
        err("publish_at का रूप 'YYYY-MM-DD 09:00' होना चाहिए")
    img = base.get("image", "")
    if img and not os.path.exists(os.path.join(ROOT, "public", img.lstrip("/"))):
        err(f"cover फ़ोटो नहीं मिली: public{img}")
    if re.search(r"<(script|iframe|img|style)", base.get("content", ""), re.I):
        err("content में script/iframe/img/style नहीं होना चाहिए")
    words = len(re.sub(r"<[^>]+>", " ", base.get("content", "")).split())
    if words < 700:
        err(f"हिंदी लेख बहुत छोटा है ({words} शब्द) — कम से कम ~900 शब्द")
    s0 = shape(base.get("content", ""))

    for lang in LANGS:
        t = load(f"{name}-{lang}")
        if not t:
            continue
        if t.get("lang") != lang: err(f"{lang}: 'lang' गलत ({t.get('lang')})")
        if t.get("slug") != base.get("slug"): err(f"{lang}: slug मूल लेख से अलग है")
        for k in ["title", "excerpt", "content"]:
            if not str(t.get(k, "")).strip(): err(f"{lang}: '{k}' खाली है")
        s = shape(t.get("content", ""))
        for tag in ["h2", "h3", "li", "blockquote"]:
            if s[tag] != s0[tag]:
                err(f"{lang}: <{tag}> की संख्या {s[tag]}, हिंदी में {s0[tag]} — ढाँचा एक जैसा रखें")
        if re.search(r"<(script|iframe|img|style)", t.get("content", ""), re.I):
            err(f"{lang}: content में script/iframe/img/style")

if errors:
    print("❌ गलतियाँ:")
    for e in errors: print("  -", e)
    sys.exit(1)
print(f"✅ {name}: हिंदी + 11 भाषाएँ ठीक हैं  (h2={s0['h2']}, li={s0['li']}, publish_at={base['publish_at']})")
