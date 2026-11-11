// src/data/blogCategories.js
// ब्लॉग के रोग-वर्ग (category)। नया वर्ग जोड़ना हो तो यहाँ एक पंक्ति जोड़ें —
// "key" केवल छोटे English अक्षर और "-" (यह URL/database में जाता है), hi = हिन्दी नाम, en = English नाम।

export const BLOG_CATEGORIES = [
  { key: "joint-pain", hi: "जोड़ों का दर्द व गठिया", en: "Joint Pain & Arthritis" },
  { key: "back-neck-pain", hi: "कमर, गर्दन व साइटिका", en: "Back, Neck & Sciatica" },
  { key: "digestion", hi: "पाचन व पेट रोग", en: "Digestion & Stomach" },
  { key: "skin", hi: "त्वचा रोग", en: "Skin Diseases" },
  { key: "hair", hi: "बालों की समस्या", en: "Hair Problems" },
  { key: "diabetes", hi: "मधुमेह (शुगर)", en: "Diabetes" },
  { key: "bp-heart", hi: "बीपी व हृदय", en: "BP & Heart" },
  { key: "thyroid-hormones", hi: "थायरॉइड व हार्मोन", en: "Thyroid & Hormones" },
  { key: "womens-health", hi: "स्त्री रोग", en: "Women's Health" },
  { key: "respiratory-allergy", hi: "श्वास, खाँसी व एलर्जी", en: "Respiratory & Allergy" },
  { key: "piles", hi: "बवासीर व भगंदर", en: "Piles & Fistula" },
  { key: "weight", hi: "मोटापा व वज़न", en: "Weight Management" },
  { key: "stress-sleep", hi: "तनाव, नींद व मन", en: "Stress, Sleep & Mind" },
  { key: "kidney-liver", hi: "किडनी व लिवर", en: "Kidney & Liver" },
  { key: "nadi-pariksha", hi: "नाड़ी परीक्षा", en: "Nadi Pariksha" },
  { key: "general", hi: "सामान्य स्वास्थ्य", en: "General Wellness" },
];

export const categoryOf = (key) =>
  BLOG_CATEGORIES.find((c) => c.key === key) || null;

const MONTHS_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];

// "2026-11-11 10:20:00" → "11 नवंबर 2026"
export function hindiDate(s) {
  if (!s) return "";
  const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  return `${Number(m[3])} ${MONTHS_HI[Number(m[2]) - 1]} ${m[1]}`;
}
