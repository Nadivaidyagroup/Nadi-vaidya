// src/data/videos.js
// Home page के वीडियो — सबसे नया ऊपर।
// वीडियो अपनी वेबसाइट से चलते हैं: फ़ाइल public/videos/ में (H.264 MP4, 100 MB से छोटी — ffmpeg से compress करें),
// poster = पहली झलक वाली फ़ोटो। Drive का link कभी नहीं (मालिक का निर्देश)।
// YouTube पर हो तो src की जगह youtubeId दें।

export const VIDEOS = [
  {
    src: "/videos/ahar-nidra-brahmacharya-diabetes.mp4",
    poster: "/videos/ahar-nidra-brahmacharya-diabetes.jpg",
    titleHi: "स्वस्थ रहने के तीन स्तंभ — आहार, निद्रा और ब्रह्मचर्य (डायबिटीज़ में भी)",
    titleEn: "Three pillars of health — diet, sleep and brahmacharya, for diabetes and overall wellbeing — Nadi Vaidya Dr. Ajit Singh Yadav",
    blogSlug: "diabetes-ayurveda-diet-lifestyle",
  },
  {
    src: "/videos/diabetes-3-30-90.mp4",
    poster: "/videos/diabetes-3-30-90.jpg",
    titleHi: "टाइप-2 डायबिटीज़ — 3-30-90 दिन का फ़ॉर्मूला",
    titleEn: "Type-2 Diabetes: the 3-30-90 days approach — Nadi Vaidya Dr. Ajit Singh Yadav",
    blogSlug: "diabetes-ayurveda-diet-lifestyle",
  },
];
