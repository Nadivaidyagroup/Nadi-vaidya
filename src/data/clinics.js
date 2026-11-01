// src/data/clinics.js
// =====================================================
// क्लीनिक की सारी जानकारी एक ही जगह।
// समय, पता या नंबर बदलना हो तो सिर्फ़ यही फ़ाइल बदलें —
// पूरी वेबसाइट (होम, क्लीनिक पेज, footer, संपर्क, Google schema)
// अपने-आप अपडेट हो जाएगी।
// =====================================================

import ayurVaidyaLogo from "../assets/images/AyurVaidya.jpeg";
import drAjit from "../assets/images/doctors/ajit-singh-yadav.jpg";
import drMohit from "../assets/images/doctors/mohit-vashist.jpg";
import drSaloni from "../assets/images/doctors/saloni-yadav-vashist.jpg";

export const OPD_TIME = {
  label: "8:00 AM – 1:00 PM",
  labelHi: "सुबह 8 से दोपहर 1 बजे तक",
  opens: "08:00",
  closes: "13:00",
};

// WhatsApp पर पहले से लिखा संदेश
export const whatsappLink = (phone, clinicName) =>
  `https://wa.me/91${phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
    `Namaste, mujhe ${clinicName} mein Nadi Pariksha appointment chahiye.`
  )}`;

export const clinics = [
  {
    slug: "karnal-clinic",
    city: "Karnal",
    cityHi: "करनाल",
    name: "AyurVaidya Wellness",
    nameHi: "आयुर वैद्य वेलनेस",
    tagline: "Nadi Vaidya clinic in Karnal, Haryana",
    address: "4, R.K. Puram, Gali No. 10, Karnal – 132001, Haryana",
    addressHi: "4, आर.के. पुरम, गली नंबर 10, करनाल – 132001, हरियाणा",
    street: "4, R.K. Puram, Gali No. 10",
    locality: "Karnal",
    region: "Haryana",
    postalCode: "132001",
    phone: "99922 42267",
    opdDays: "1st – 10th of every month",
    opdDaysHi: "हर महीने 1 से 10 तारीख़",
    mapQuery: "4, RK Puram, Gali No 10, Kunjpura Road, Karnal, Haryana 132001",
    // क्लीनिक का असली Google Maps pin (मालिक ने भेजा)
    mapUrl: "https://maps.app.goo.gl/z2YwcKdLS9Q5JnwS9",
    logo: ayurVaidyaLogo,
  },
  {
    slug: "vrindavan-clinic",
    city: "Vrindavan",
    cityHi: "वृंदावन",
    name: "Vrindavan Swasthya Seva Kendra",
    nameHi: "वृंदावन स्वास्थ्य सेवा केंद्र",
    tagline: "Nadi Vaidya clinic in Vrindavan, Mathura",
    address:
      "Shop No. 5, Radha Rani Palace, near Shri Radha Teela, Parikrama Marg, Vrindavan, Mathura – 281121",
    addressHi:
      "शॉप नंबर 5, राधा रानी पैलेस, नज़दीक श्री राधा टीला, परिक्रमा मार्ग, वृंदावन, मथुरा – 281121",
    street: "Shop No. 5, Radha Rani Palace, near Shri Radha Teela, Parikrama Marg",
    locality: "Vrindavan",
    region: "Uttar Pradesh",
    postalCode: "281121",
    phone: "83960 66555",
    opdDays: "11th to month-end (incl. 31st)",
    opdDaysHi: "हर महीने 11 तारीख़ से महीने के अंत (31 तारीख़) तक",
    mapQuery: "Radha Rani Palace, Parikrama Marg, Vrindavan, Mathura 281121",
    logo: null,
  },
];

export const getClinic = (slug) => clinics.find((c) => c.slug === slug);

// आज की तारीख़ के हिसाब से नाड़ी वैद्य OPD किस क्लीनिक में है
export const todaysClinic = (date = new Date()) =>
  date.getDate() <= 10 ? clinics[0] : clinics[1];

// डॉक्टरों के नीचे दिखने वाली पंक्ति
export const CELEB_LINE = {
  hi: "बॉलीवुड, शीर्ष व्यापारिक घरानों एवं राजपरिवारों के परामर्शदाता",
  en: "Consultant to Bollywood, Top Business & Royal Families",
};

export const doctors = [
  {
    name: "Nadi Vaidya Dr. Ajit Singh Yadav",
    nameHi: "नाड़ी वैद्य डॉ. अजीत सिंह यादव",
    qual: "BAMS",
    role: "Founder & Chairman, Nadi Vaidya Group • 36+ years of clinical experience",
    roleHi: "संस्थापक एवं अध्यक्ष, नाड़ी वैद्य ग्रुप • 1989 से, 36 वर्षों का अनुभव",
    photo: drAjit,
  },
  {
    name: "Nadi Vaidya Dr. Saloni Yadav Vashist",
    nameHi: "नाड़ी वैद्य डॉ. सलोनी यादव वशिष्ठ",
    qual: "BAMS, MD (DN)",
    role: "Nadi Vaidya • Clinical Ayurveda",
    roleHi: "आहार, जीवनशैली एवं आयुर्वेदिक चिकित्सा • नाड़ी परीक्षा विशेषज्ञ",
    photo: drSaloni,
  },
  {
    name: "Nadi Vaidya Dr. Mohit Vashist",
    nameHi: "नाड़ी वैद्य डॉ. मोहित वशिष्ठ",
    qual: "BAMS, MD (AM)",
    role: "Nadi Vaidya • Clinical Ayurveda",
    roleHi: "आयुर्वेदिक चिकित्सा एवं मर्म विशेषज्ञ • नाड़ी परीक्षा विशेषज्ञ",
    photo: drMohit,
  },
];
