// src/data/clinics.js
// =====================================================
// क्लीनिक की सारी जानकारी एक ही जगह।
// समय, पता या नंबर बदलना हो तो सिर्फ़ यही फ़ाइल बदलें —
// पूरी वेबसाइट (होम, क्लीनिक पेज, footer, संपर्क, Google schema)
// अपने-आप अपडेट हो जाएगी।
// =====================================================

import ayurVaidyaLogo from "../assets/images/AyurVaidya.jpeg";
import team1 from "../assets/images/team/1.jpg";
import team2 from "../assets/images/team/2.jpg";
import team3 from "../assets/images/team/3.jpg";

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
    mapQuery: "AyurVaidya Wellness, R.K. Puram, Karnal, Haryana 132001",
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
    opdDays: "11th – 30th of every month",
    opdDaysHi: "हर महीने 11 से 30 तारीख़",
    mapQuery: "Radha Rani Palace, Parikrama Marg, Vrindavan, Mathura 281121",
    logo: null,
  },
];

export const getClinic = (slug) => clinics.find((c) => c.slug === slug);

// आज की तारीख़ के हिसाब से नाड़ी वैद्य OPD किस क्लीनिक में है
export const todaysClinic = (date = new Date()) =>
  date.getDate() <= 10 ? clinics[0] : clinics[1];

export const doctors = [
  {
    name: "Nadi Vaidya Dr. Ajit Singh Yadav",
    qual: "BAMS",
    role: "Founder & Chairman, Nadi Vaidya Group • 36+ years of clinical experience",
    photo: team1,
  },
  {
    name: "Nadi Vaidya Dr. Saloni Yadav Vashishth",
    qual: "BAMS, MD (DN)",
    role: "Nadi Vaidya • Clinical Ayurveda",
    photo: team3,
  },
  {
    name: "Nadi Vaidya Dr. Mohit Vashishth",
    qual: "BAMS, MD (AM)",
    role: "Nadi Vaidya • Clinical Ayurveda",
    photo: team2,
  },
];
