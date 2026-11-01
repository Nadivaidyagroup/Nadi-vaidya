// src/pages/Home.jsx
// होम पेज — अब दोनों क्लीनिक (करनाल व वृंदावन) पर केंद्रित।

import { Link } from "react-router-dom";
import "./home.css";
import "./clinic.css";

import {
  OPD_TIME,
  CELEB_LINE,
  clinics,
  todaysClinic,
  whatsappLink,
} from "../data/clinics.js";
import { ClinicCard, DoctorsStrip } from "./ClinicPage.jsx";
import Therapies from "../components/Therapies.jsx";

// नाड़ी देखते हुए हाथ — Gurukul Shopify CDN पर पहले से अपलोड फ़ोटो
const HERO_IMG =
  "https://cdn.shopify.com/s/files/1/0814/7638/6916/files/nvg-hero-nadi-pariksha.png?v=1792082984&width=1400";

const reasons = [
  {
    icon: "🩺",
    title: "पारंपरिक नाड़ी परीक्षा",
    text: "कलाई की नाड़ी से प्रकृति, दोषों के असंतुलन और अग्नि को समझकर परामर्श।",
  },
  {
    icon: "🌿",
    title: "36+ वर्ष का अनुभव",
    text: "नाड़ी वैद्य डॉ. अजीत सिंह यादव जी और नाड़ी वैद्य परिवार का क्लीनिकल अनुभव।",
  },
  {
    icon: "🍽️",
    title: "आहार व दिनचर्या",
    text: "आपकी प्रकृति के अनुसार भोजन, नींद और दिनचर्या का व्यावहारिक मार्गदर्शन।",
  },
  {
    icon: "📍",
    title: "दो क्लीनिक",
    text: "करनाल (हरियाणा) और वृंदावन (मथुरा) — दोनों जगह सुबह 8 से दोपहर 1 बजे तक।",
  },
];

export default function Home() {
  const today = todaysClinic();

  return (
    <>
      {/* HERO */}
      <section
        className="home-clinic-hero home-hero2"
      >
        <div className="home-hero2-photo">
          <img
            src={HERO_IMG}
            alt="नाड़ी वैद्य द्वारा कलाई पर नाड़ी परीक्षा"
            fetchpriority="high"
          />
        </div>
        <div className="container home-hero2-text">
          <h1>
            नाड़ी वैद्य क्लीनिक
            <span>नाड़ी परीक्षा परामर्श — करनाल व वृंदावन</span>
          </h1>
          <p className="home-celeb">
            {CELEB_LINE.hi} — 1989 से, 36 वर्षों का अनुभव
          </p>

          <div className="home-today">
            🗓️ आज नाड़ी वैद्य OPD: <strong>{today.cityHi}</strong> • {OPD_TIME.labelHi}
          </div>

          <div className="home-hero-actions">
            <Link className="clinic-btn clinic-btn-book" to="/appointment">
              📅 ऑनलाइन अपॉइंटमेंट बुक करें
            </Link>
            <a
              className="clinic-btn clinic-btn-wa"
              href={whatsappLink(today.phone, `${today.city} clinic`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="clinic-btn clinic-btn-call"
              href={`tel:+91${today.phone.replace(/\D/g, "")}`}
            >
              📞 {today.phone}
            </a>
            <a className="clinic-btn clinic-btn-map" href="#clinics">
              दोनों क्लीनिक देखें
            </a>
          </div>
        </div>
      </section>

      {/* CLINICS */}
      <section className="home-clinics" id="clinics">
        <div className="container">
          <h2 className="home-section-title">हमारे क्लीनिक</h2>
          <p className="home-section-sub">
            हर महीने 1–10 तारीख़ करनाल और 11 से 31 तारीख़ तक वृंदावन में नाड़ी वैद्य OPD। तीनों नाड़ी वैद्य दोनों क्लीनिक में।
          </p>
          <div className="clinic-grid">
            {clinics.map((c) => (
              <ClinicCard clinic={c} compact key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="home-why">
        <div className="container">
          <h2 className="home-section-title">नाड़ी वैद्य क्लीनिक क्यों</h2>
          <p className="home-section-sub">
            “नाड़ी को केवल छूना नहीं — नाड़ी से जुड़ना पड़ता है।” — नाड़ी वैद्य
            डॉ. अजीत सिंह यादव
          </p>
          <div className="why-grid">
            {reasons.map((r) => (
              <div className="why-item" key={r.title}>
                <b>{r.icon}</b>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <p className="clinic-disclaimer" style={{ marginTop: 24 }}>
            नाड़ी परीक्षा एक पारंपरिक आयुर्वेदिक समग्र मूल्यांकन पद्धति है; यह लैब
            टेस्ट या आधुनिक जाँचों का विकल्प नहीं है।
          </p>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="home-doctors">
        <div className="container">
          <h2 className="home-section-title">हमारे नाड़ी वैद्य</h2>
          <p className="home-section-sub">
            <Link to="/about-us">पूरा परिचय पढ़ें →</Link>
          </p>
          <DoctorsStrip />
        </div>
      </section>


      {/* THERAPIES */}
      <Therapies />
    </>
  );
}
