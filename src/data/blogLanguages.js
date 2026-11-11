// src/data/blogLanguages.js
// स्वास्थ्य लेखों की 12 भाषाएँ + लेख पेज के छोटे शब्द हर भाषा में।
// मूल लेख हिंदी (hi) में लिखा जाता है; बाकी भाषाएँ उसका अनुवाद हैं।

export const BASE_LANG = "hi";

export const BLOG_LANGS = [
  { code: "hi", name: "हिंदी", en: "Hindi", locale: "hi-IN" },
  { code: "en", name: "English", en: "English", locale: "en-IN" },
  { code: "pa", name: "ਪੰਜਾਬੀ", en: "Punjabi", locale: "pa-IN" },
  { code: "gu", name: "ગુજરાતી", en: "Gujarati", locale: "gu-IN" },
  { code: "mr", name: "मराठी", en: "Marathi", locale: "mr-IN" },
  { code: "bn", name: "বাংলা", en: "Bengali", locale: "bn-IN" },
  { code: "ta", name: "தமிழ்", en: "Tamil", locale: "ta-IN" },
  { code: "te", name: "తెలుగు", en: "Telugu", locale: "te-IN" },
  { code: "kn", name: "ಕನ್ನಡ", en: "Kannada", locale: "kn-IN" },
  { code: "ml", name: "മലയാളം", en: "Malayalam", locale: "ml-IN" },
  { code: "or", name: "ଓଡ଼ିଆ", en: "Odia", locale: "or-IN" },
  { code: "as", name: "অসমীয়া", en: "Assamese", locale: "as-IN" },
];

export const langOf = (code) => BLOG_LANGS.find((l) => l.code === code) || BLOG_LANGS[0];
export const isLang = (code) => BLOG_LANGS.some((l) => l.code === code);

// लेख का link: हिंदी = /blog/slug , बाकी = /blog/slug/ta
export const postPath = (slug, lang) =>
  !lang || lang === BASE_LANG ? `/blog/${slug}` : `/blog/${slug}/${lang}`;

// "2026-11-12 10:00:00" → उस भाषा में तारीख़
export function langDate(s, code) {
  const m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  try {
    return new Intl.DateTimeFormat(langOf(code).locale, { day: "numeric", month: "long", year: "numeric" }).format(d);
  } catch {
    return `${m[3]}-${m[2]}-${m[1]}`;
  }
}

// याद रखो कि पाठक ने कौन-सी भाषा चुनी थी
const KEY = "nv_blog_lang";
export const savedLang = () => {
  try {
    const v = localStorage.getItem(KEY);
    return isLang(v) ? v : BASE_LANG;
  } catch {
    return BASE_LANG;
  }
};
export const saveLang = (code) => {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    /* ignore */
  }
};

// लेख पेज के शब्द
const T = {
  hi: {
    home: "होम", blog: "स्वास्थ्य लेख", chooseLang: "भाषा चुनें",
    disclaimer: "यह लेख केवल सामान्य जानकारी के लिए है। कोई भी दवा या उपचार शुरू करने से पहले वैद्य से परामर्श अवश्य लें।",
    translated: "",
    ctaTitle: "इस समस्या के लिए नाड़ी परीक्षा परामर्श",
    ctaText: "करनाल (1–10 तारीख़) व वृंदावन (11–31 तारीख़) • सुबह 8 से दोपहर 1 बजे तक",
    book: "📅 अपॉइंटमेंट बुक करें", share: "यह लेख WhatsApp पर भेजें", more: "और लेख पढ़ें", readMore: "पूरा पढ़ें →",
  },
  en: {
    home: "Home", blog: "Health Blog", chooseLang: "Choose language",
    disclaimer: "This article is for general information only. Please consult a Vaidya before starting any medicine or treatment.",
    translated: "Translated from the original Hindi article. If anything is unclear, please read the Hindi version.",
    ctaTitle: "Nadi Pariksha consultation for this problem",
    ctaText: "Karnal (1st–10th) & Vrindavan (11th–31st) • 8 AM to 1 PM",
    book: "📅 Book Appointment", share: "Share this article on WhatsApp", more: "Read more articles", readMore: "Read more →",
  },
  pa: {
    home: "ਹੋਮ", blog: "ਸਿਹਤ ਲੇਖ", chooseLang: "ਭਾਸ਼ਾ ਚੁਣੋ",
    disclaimer: "ਇਹ ਲੇਖ ਸਿਰਫ਼ ਆਮ ਜਾਣਕਾਰੀ ਲਈ ਹੈ। ਕੋਈ ਵੀ ਦਵਾਈ ਜਾਂ ਇਲਾਜ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਵੈਦ ਦੀ ਸਲਾਹ ਜ਼ਰੂਰ ਲਓ।",
    translated: "ਇਹ ਮੂਲ ਹਿੰਦੀ ਲੇਖ ਦਾ ਅਨੁਵਾਦ ਹੈ। ਕੋਈ ਸ਼ੱਕ ਹੋਵੇ ਤਾਂ ਹਿੰਦੀ ਲੇਖ ਪੜ੍ਹੋ।",
    ctaTitle: "ਇਸ ਸਮੱਸਿਆ ਲਈ ਨਾੜੀ ਪਰੀਖਿਆ ਸਲਾਹ",
    ctaText: "ਕਰਨਾਲ (1–10 ਤਾਰੀਖ਼) ਅਤੇ ਵ੍ਰਿੰਦਾਵਨ (11–31 ਤਾਰੀਖ਼) • ਸਵੇਰੇ 8 ਤੋਂ ਦੁਪਹਿਰ 1 ਵਜੇ ਤੱਕ",
    book: "📅 ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ", share: "ਇਹ ਲੇਖ WhatsApp ਤੇ ਭੇਜੋ", more: "ਹੋਰ ਲੇਖ ਪੜ੍ਹੋ", readMore: "ਪੂਰਾ ਪੜ੍ਹੋ →",
  },
  gu: {
    home: "હોમ", blog: "આરોગ્ય લેખ", chooseLang: "ભાષા પસંદ કરો",
    disclaimer: "આ લેખ માત્ર સામાન્ય માહિતી માટે છે. કોઈપણ દવા કે સારવાર શરૂ કરતાં પહેલાં વૈદ્યની સલાહ અવશ્ય લો.",
    translated: "આ મૂળ હિન્દી લેખનો અનુવાદ છે. કોઈ શંકા હોય તો હિન્દી લેખ વાંચો.",
    ctaTitle: "આ સમસ્યા માટે નાડી પરીક્ષા પરામર્શ",
    ctaText: "કરનાલ (1–10 તારીખ) અને વૃંદાવન (11–31 તારીખ) • સવારે 8 થી બપોરે 1 વાગ્યા સુધી",
    book: "📅 એપોઇન્ટમેન્ટ બુક કરો", share: "આ લેખ WhatsApp પર મોકલો", more: "વધુ લેખ વાંચો", readMore: "પૂરું વાંચો →",
  },
  mr: {
    home: "होम", blog: "आरोग्य लेख", chooseLang: "भाषा निवडा",
    disclaimer: "हा लेख केवळ सामान्य माहितीसाठी आहे. कोणतेही औषध किंवा उपचार सुरू करण्यापूर्वी वैद्यांचा सल्ला अवश्य घ्या.",
    translated: "हा मूळ हिंदी लेखाचा अनुवाद आहे. काही शंका असल्यास हिंदी लेख वाचा.",
    ctaTitle: "या समस्येसाठी नाडी परीक्षा सल्ला",
    ctaText: "करनाल (1–10 तारीख) व वृंदावन (11–31 तारीख) • सकाळी 8 ते दुपारी 1 वाजेपर्यंत",
    book: "📅 अपॉइंटमेंट बुक करा", share: "हा लेख WhatsApp वर पाठवा", more: "आणखी लेख वाचा", readMore: "पूर्ण वाचा →",
  },
  bn: {
    home: "হোম", blog: "স্বাস্থ্য প্রবন্ধ", chooseLang: "ভাষা বেছে নিন",
    disclaimer: "এই প্রবন্ধটি কেবল সাধারণ তথ্যের জন্য। কোনো ওষুধ বা চিকিৎসা শুরু করার আগে অবশ্যই বৈদ্যের পরামর্শ নিন।",
    translated: "এটি মূল হিন্দি প্রবন্ধের অনুবাদ। কোনো সন্দেহ থাকলে হিন্দি প্রবন্ধটি পড়ুন।",
    ctaTitle: "এই সমস্যার জন্য নাড়ী পরীক্ষা পরামর্শ",
    ctaText: "কর্নাল (১–১০ তারিখ) ও বৃন্দাবন (১১–৩১ তারিখ) • সকাল ৮টা থেকে দুপুর ১টা",
    book: "📅 অ্যাপয়েন্টমেন্ট বুক করুন", share: "এই প্রবন্ধটি WhatsApp-এ পাঠান", more: "আরও প্রবন্ধ পড়ুন", readMore: "পুরোটা পড়ুন →",
  },
  ta: {
    home: "முகப்பு", blog: "சுகாதாரக் கட்டுரைகள்", chooseLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    disclaimer: "இந்தக் கட்டுரை பொதுவான தகவலுக்காக மட்டுமே. எந்த மருந்து அல்லது சிகிச்சையையும் தொடங்கும் முன் வைத்தியரை அவசியம் கலந்தாலோசிக்கவும்.",
    translated: "இது மூல இந்தி கட்டுரையின் மொழிபெயர்ப்பு. சந்தேகம் இருந்தால் இந்தி கட்டுரையைப் படிக்கவும்.",
    ctaTitle: "இந்தப் பிரச்சனைக்கு நாடி பரிசோதனை ஆலோசனை",
    ctaText: "கர்னால் (1–10 தேதி) மற்றும் விருந்தாவன் (11–31 தேதி) • காலை 8 முதல் மதியம் 1 மணி வரை",
    book: "📅 சந்திப்பை முன்பதிவு செய்யுங்கள்", share: "இந்தக் கட்டுரையை WhatsApp-ல் அனுப்புங்கள்", more: "மேலும் கட்டுரைகள்", readMore: "முழுவதும் படிக்க →",
  },
  te: {
    home: "హోమ్", blog: "ఆరోగ్య వ్యాసాలు", chooseLang: "భాషను ఎంచుకోండి",
    disclaimer: "ఈ వ్యాసం సాధారణ సమాచారం కోసం మాత్రమే. ఏ మందు లేదా చికిత్స ప్రారంభించే ముందు తప్పనిసరిగా వైద్యుని సలహా తీసుకోండి.",
    translated: "ఇది మూల హిందీ వ్యాసానికి అనువాదం. ఏదైనా సందేహం ఉంటే హిందీ వ్యాసం చదవండి.",
    ctaTitle: "ఈ సమస్యకు నాడీ పరీక్ష సలహా",
    ctaText: "కర్నాల్ (1–10 తేదీలు) & బృందావనం (11–31 తేదీలు) • ఉదయం 8 నుండి మధ్యాహ్నం 1 వరకు",
    book: "📅 అపాయింట్‌మెంట్ బుక్ చేయండి", share: "ఈ వ్యాసాన్ని WhatsAppలో పంపండి", more: "మరిన్ని వ్యాసాలు", readMore: "పూర్తిగా చదవండి →",
  },
  kn: {
    home: "ಮುಖಪುಟ", blog: "ಆರೋಗ್ಯ ಲೇಖನಗಳು", chooseLang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    disclaimer: "ಈ ಲೇಖನ ಸಾಮಾನ್ಯ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಯಾವುದೇ ಔಷಧಿ ಅಥವಾ ಚಿಕಿತ್ಸೆ ಆರಂಭಿಸುವ ಮೊದಲು ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    translated: "ಇದು ಮೂಲ ಹಿಂದಿ ಲೇಖನದ ಅನುವಾದ. ಯಾವುದೇ ಸಂದೇಹವಿದ್ದರೆ ಹಿಂದಿ ಲೇಖನ ಓದಿ.",
    ctaTitle: "ಈ ಸಮಸ್ಯೆಗೆ ನಾಡಿ ಪರೀಕ್ಷೆ ಸಲಹೆ",
    ctaText: "ಕರ್ನಾಲ್ (1–10 ದಿನಾಂಕ) ಮತ್ತು ವೃಂದಾವನ (11–31 ದಿನಾಂಕ) • ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ ಮಧ್ಯಾಹ್ನ 1 ರವರೆಗೆ",
    book: "📅 ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ", share: "ಈ ಲೇಖನವನ್ನು WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸಿ", more: "ಇನ್ನಷ್ಟು ಲೇಖನಗಳು", readMore: "ಪೂರ್ತಿ ಓದಿ →",
  },
  ml: {
    home: "ഹോം", blog: "ആരോഗ്യ ലേഖനങ്ങൾ", chooseLang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    disclaimer: "ഈ ലേഖനം പൊതുവായ വിവരങ്ങൾക്കായി മാത്രമാണ്. ഏതെങ്കിലും മരുന്നോ ചികിത്സയോ തുടങ്ങുന്നതിനു മുമ്പ് വൈദ്യനെ നിർബന്ധമായും സമീപിക്കുക.",
    translated: "ഇത് മൂല ഹിന്ദി ലേഖനത്തിന്റെ വിവർത്തനമാണ്. സംശയമുണ്ടെങ്കിൽ ഹിന്ദി ലേഖനം വായിക്കുക.",
    ctaTitle: "ഈ പ്രശ്നത്തിന് നാഡി പരിശോധന കൺസൾട്ടേഷൻ",
    ctaText: "കർണാൽ (1–10 തീയതി), വൃന്ദാവൻ (11–31 തീയതി) • രാവിലെ 8 മുതൽ ഉച്ചയ്ക്ക് 1 വരെ",
    book: "📅 അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക", share: "ഈ ലേഖനം WhatsApp-ൽ അയയ്ക്കുക", more: "കൂടുതൽ ലേഖനങ്ങൾ", readMore: "മുഴുവൻ വായിക്കുക →",
  },
  or: {
    home: "ହୋମ୍", blog: "ସ୍ୱାସ୍ଥ୍ୟ ଲେଖା", chooseLang: "ଭାଷା ବାଛନ୍ତୁ",
    disclaimer: "ଏହି ଲେଖା କେବଳ ସାଧାରଣ ସୂଚନା ପାଇଁ। କୌଣସି ଔଷଧ ବା ଚିକିତ୍ସା ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ ବୈଦ୍ୟଙ୍କ ପରାମର୍ଶ ନିଶ୍ଚିତ ନିଅନ୍ତୁ।",
    translated: "ଏହା ମୂଳ ହିନ୍ଦୀ ଲେଖାର ଅନୁବାଦ। କୌଣସି ସନ୍ଦେହ ଥିଲେ ହିନ୍ଦୀ ଲେଖା ପଢ଼ନ୍ତୁ।",
    ctaTitle: "ଏହି ସମସ୍ୟା ପାଇଁ ନାଡ଼ୀ ପରୀକ୍ଷା ପରାମର୍ଶ",
    ctaText: "କର୍ଣ୍ଣାଲ (1–10 ତାରିଖ) ଓ ବୃନ୍ଦାବନ (11–31 ତାରିଖ) • ସକାଳ 8 ରୁ ଦିନ 1 ଟା ପର୍ଯ୍ୟନ୍ତ",
    book: "📅 ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ", share: "ଏହି ଲେଖା WhatsApp ରେ ପଠାନ୍ତୁ", more: "ଅଧିକ ଲେଖା ପଢ଼ନ୍ତୁ", readMore: "ପୂରା ପଢ଼ନ୍ତୁ →",
  },
  as: {
    home: "হোম", blog: "স্বাস্থ্য প্ৰবন্ধ", chooseLang: "ভাষা বাছক",
    disclaimer: "এই প্ৰবন্ধটো কেৱল সাধাৰণ তথ্যৰ বাবে। যিকোনো ঔষধ বা চিকিৎসা আৰম্ভ কৰাৰ আগতে বৈদ্যৰ পৰামৰ্শ নিশ্চয় লওক।",
    translated: "এইটো মূল হিন্দী প্ৰবন্ধৰ অনুবাদ। কোনো সন্দেহ থাকিলে হিন্দী প্ৰবন্ধটো পঢ়ক।",
    ctaTitle: "এই সমস্যাৰ বাবে নাড়ী পৰীক্ষা পৰামৰ্শ",
    ctaText: "কাৰ্নাল (১–১০ তাৰিখ) আৰু বৃন্দাবন (১১–৩১ তাৰিখ) • পুৱা ৮ বজাৰ পৰা দুপৰীয়া ১ বজালৈ",
    book: "📅 এপইণ্টমেণ্ট বুক কৰক", share: "এই প্ৰবন্ধটো WhatsApp-ত পঠিয়াওক", more: "আৰু প্ৰবন্ধ পঢ়ক", readMore: "সম্পূৰ্ণ পঢ়ক →",
  },
};

export const blogText = (code) => T[code] || T.hi;
