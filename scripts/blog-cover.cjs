// scripts/blog-cover.cjs — ब्लॉग लेख की cover फ़ोटो (1200×750 JPG) बनाना
// उपयोग:
//   node scripts/blog-cover.cjs --out public/blog-covers/<slug>.jpg \
//     --title "एसिडिटी" --sub "(अम्लपित्त)" --line "आयुर्वेद की दृष्टि से कारण, आहार,|दिनचर्या और सावधानियाँ" \
//     --chips "क्या खाएँ,क्या न खाएँ,योग,घरेलू उपाय" --category digestion
// ज़रूरी: Playwright (cloud container में पहले से है) और fonts.googleapis.com तक इंटरनेट।

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const os = require("os");

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = process.argv[i + 1] || "";
if (!args.out || !args.title) {
  console.error("ज़रूरी: --out और --title");
  process.exit(1);
}

// रोग-वर्ग के हिसाब से रंग
const COLORS = {
  "joint-pain": "#8a5a2b", "back-neck-pain": "#7a5c3a", digestion: "#b8861b", skin: "#b4545a", hair: "#5b4636",
  diabetes: "#9b2c2c", "bp-heart": "#a33b3b", "thyroid-hormones": "#2f6f73", "womens-health": "#a0456e",
  "respiratory-allergy": "#2f6690", piles: "#6b4f7a", weight: "#5d7a3a", "stress-sleep": "#4b4f8a",
  "kidney-liver": "#7a6a2b", "nadi-pariksha": "#4f5137", general: "#4f7a5b",
};
const accent = COLORS[args.category] || "#4f5137";
const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
const line = esc(args.line || "आयुर्वेद की दृष्टि से कारण, आहार,|दिनचर्या और सावधानियाँ").split("|").join("<br>");
const chips = (args.chips || "क्या खाएँ,क्या न खाएँ,योग,सावधानियाँ").split(",").filter(Boolean).slice(0, 5);

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@500;700;800&family=Poppins:wght@500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:750px;font-family:Mukta,sans-serif;background:#f6f1e2;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;background:radial-gradient(circle at 85% 30%,#e9ead9 0,#e9ead9 230px,transparent 231px),linear-gradient(135deg,#f8f3e6,#efe7d2)}
.band{position:absolute;left:0;top:0;bottom:0;width:14px;background:#c7a86d}
.text{position:absolute;left:80px;top:88px;width:660px}
.eyebrow{font-family:Poppins;font-weight:600;color:#8a6d2f;font-size:22px;letter-spacing:.06em}
h1{font-weight:800;color:#4f5137;font-size:${esc(args.title).length > 9 ? 76 : 100}px;line-height:1.08;margin-top:16px}
h1 small{display:block;font-size:46px;font-weight:700;color:#727450;margin-top:8px}
.sub{font-size:31px;color:#3b3b30;font-weight:500;margin-top:24px;line-height:1.35}
.chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.chips span{background:#4f5137;color:#fff;border-radius:999px;padding:8px 22px 6px;font-size:25px;font-weight:700}
.chips span:nth-child(3){background:#b8861b}
.art{position:absolute;right:70px;top:110px;width:400px;height:400px}
.foot{position:absolute;left:80px;bottom:44px;font-family:Poppins;font-size:22px;color:#6b6b5a}
.foot b{color:#4f5137}
</style></head><body>
<div class="bg"></div><div class="band"></div>
<div class="text">
 <div class="eyebrow">AYURVEDA • HEALTH BLOG</div>
 <h1>${esc(args.title)}${args.sub ? `<small>${esc(args.sub)}</small>` : ""}</h1>
 <div class="sub">${line}</div>
 <div class="chips">${chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
</div>
<svg class="art" viewBox="0 0 400 400">
 <circle cx="200" cy="200" r="170" fill="#fff" stroke="#c7a86d" stroke-width="6"/>
 <path d="M200 70 C130 120 110 200 150 260 C170 290 200 300 200 300 C200 300 230 290 250 260 C290 200 270 120 200 70Z" fill="${accent}"/>
 <path d="M200 95 L200 300" stroke="#fff" stroke-width="6" opacity=".8" stroke-linecap="round"/>
 <path d="M200 160 L160 130 M200 200 L150 170 M200 240 L160 215 M200 160 L240 130 M200 200 L250 170 M200 240 L240 215" stroke="#fff" stroke-width="4" opacity=".7" stroke-linecap="round"/>
 <g fill="#5d7a3a"><path d="M100 310 C125 265 175 268 190 310 C150 330 118 328 100 310Z"/><path d="M300 310 C275 265 225 268 210 310 C250 330 282 328 300 310Z" fill="#727450"/></g>
 <path d="M200 300 L200 345" stroke="#5d7a3a" stroke-width="6" stroke-linecap="round"/>
</svg>
<div class="foot"><b>नाड़ी वैद्य क्लीनिक</b> • nadivaidya.in • करनाल व वृंदावन</div>
</body></html>`;

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cover-"));
  const htmlFile = path.join(tmp, "cover.html");
  fs.writeFileSync(htmlFile, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 1 });
  await p.goto("file://" + htmlFile, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const fontOk = await p.evaluate(() => document.fonts.check("800 40px Mukta", "मधुमेह"));
  fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
  await p.screenshot({ path: path.resolve(args.out), type: "jpeg", quality: 86 });
  await b.close();
  console.log(`cover: ${args.out} (Hindi font ${fontOk ? "OK" : "NOT LOADED — check internet"})`);
  if (!fontOk) process.exit(2);
})();
