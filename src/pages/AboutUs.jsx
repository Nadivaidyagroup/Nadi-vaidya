// src/pages/AboutUs.jsx
// हमारे बारे में — नाड़ी वैद्य परिवार, संस्थापक, नाड़ी परीक्षा, उद्देश्य, क्लीनिक, टीम

import { Link } from "react-router-dom";
import "./clinic.css";
import "./aboutNew.css";

import OurTeam from "../components/OurTeam";
import { ClinicCard } from "./ClinicPage.jsx";
import { clinics, CELEB_LINE, OPD_TIME } from "../data/clinics.js";

import drAjit from "../assets/images/doctors/ajit-singh-yadav.jpg";
import pulseImg from "../assets/images/workshop-dec-2023/33.jpg";
import groupImg from "../assets/images/workshop-dec-2023/37.jpg";
import teachImg from "../assets/images/workshop-dec-2023/2.jpg";

const stats = [
  { n: "1989", hi: "से निरंतर सेवा", en: "Serving since" },
  { n: "36+", hi: "वर्षों का क्लिनिकल अनुभव", en: "Years of practice" },
  { n: "2", hi: "क्लीनिक — करनाल व वृंदावन", en: "Clinics" },
  { n: "भारत व विदेश", hi: "के रोगियों का विश्वास", en: "Patients served" },
];

const steps = [
  {
    t: "नाड़ी परीक्षा",
    d: "वैद्य कलाई पर तीन उँगलियों से नाड़ी की गति, बल और लय देखकर वात, पित्त और कफ की स्थिति समझते हैं।",
  },
  {
    t: "प्रकृति व कारण की पहचान",
    d: "आपकी मूल प्रकृति, वर्तमान असंतुलन, पाचन-अग्नि, नींद और दिनचर्या को मिलाकर तकलीफ़ की जड़ तक पहुँचने का प्रयास।",
  },
  {
    t: "आहार, दिनचर्या व औषधि",
    d: "आपकी प्रकृति के अनुसार भोजन, दिनचर्या, योग-प्राणायाम और आवश्यकता होने पर आयुर्वेदिक औषधि का मार्गदर्शन।",
  },
];

export default function AboutUs() {
  return (
    <div className="ab-page">
      {/* HERO */}
      <section className="ab-hero">
        <div className="container ab-hero-grid">
          <div className="ab-hero-text">
            <p className="ab-eyebrow">हमारे बारे में • About Us</p>
            <h1>
              नाड़ी वैद्य परिवार
              <span>घर-घर नाड़ी • घर-घर आयुर्वेद</span>
            </h1>
            <p className="ab-lead">
              1989 से नाड़ी वैद्य डॉ. अजीत सिंह यादव और उनका परिवार प्राचीन
              नाड़ी परीक्षा विद्या से रोगियों की सेवा कर रहा है। करनाल और
              वृंदावन के हमारे क्लीनिक में आज भी वही परंपरा — कलाई की नाड़ी से
              शरीर और मन को समझना — पूरी निष्ठा से निभाई जाती है।
            </p>
            <p className="ab-celeb">{CELEB_LINE.hi}</p>
            <div className="ab-hero-actions">
              <Link className="clinic-btn clinic-btn-book" to="/appointment">
                📅 ऑनलाइन अपॉइंटमेंट बुक करें
              </Link>
            </div>
          </div>
          <div className="ab-hero-photo">
            <img src={pulseImg} alt="नाड़ी वैद्य द्वारा कलाई पर नाड़ी परीक्षा" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container ab-stats">
        {stats.map((s) => (
          <div className="ab-stat" key={s.hi}>
            <strong>{s.n}</strong>
            <span>{s.hi}</span>
            <small>{s.en}</small>
          </div>
        ))}
      </section>

      {/* FOUNDER */}
      <section className="ab-section">
        <div className="container ab-founder">
          <div className="ab-founder-photo">
            <img src={drAjit} alt="नाड़ी वैद्य डॉ. अजीत सिंह यादव" />
          </div>
          <div className="ab-founder-text">
            <p className="ab-eyebrow">संस्थापक • Founder</p>
            <h2>
              नाड़ी वैद्य डॉ. अजीत सिंह यादव
              <small>Nadi Vaidya Dr. Ajit Singh Yadav • B.A.M.S.</small>
            </h2>
            <p>
              संस्थापक एवं अध्यक्ष, नाड़ी वैद्य ग्रुप। अंतरराष्ट्रीय स्तर पर
              प्रसिद्ध नाड़ी परीक्षा विशेषज्ञ, जिन्हें 36 वर्षों से अधिक का
              क्लिनिकल अनुभव है। वे वाना रिट्रीट, देहरादून में मुख्य परामर्शदाता
              रह चुके हैं और हज़ारों डॉक्टरों को नाड़ी परीक्षा सिखा चुके हैं।
            </p>
            <ul className="ab-points">
              <li>1989 से नाड़ी परीक्षा द्वारा रोगी सेवा</li>
              <li>{CELEB_LINE.hi}</li>
              <li>पूर्व मुख्य परामर्शदाता — वाना रिट्रीट, देहरादून</li>
              <li>हज़ारों डॉक्टरों के मार्गदर्शक; गुरुकुल से प्रशिक्षित नाड़ी वैद्य आज लगभग हर राज्य में</li>
            </ul>
            <blockquote>
              “नाड़ी को केवल छूना नहीं — नाड़ी से जुड़ना पड़ता है।”
            </blockquote>
          </div>
        </div>
      </section>

      {/* WHAT IS NADI PARIKSHA */}
      <section className="ab-section ab-soft">
        <div className="container">
          <p className="ab-eyebrow ab-center">नाड़ी परीक्षा • Nadi Pariksha</p>
          <h2 className="ab-title">क्लीनिक में परामर्श कैसे होता है</h2>
          <p className="ab-sub">
            नाड़ी परीक्षा आयुर्वेद की अष्टविध परीक्षा का प्रमुख अंग है। इसमें
            रोग के साथ-साथ व्यक्ति को समझा जाता है।
          </p>
          <div className="ab-steps">
            {steps.map((s, i) => (
              <div className="ab-step" key={s.t}>
                <span className="ab-step-n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="clinic-disclaimer ab-disclaimer">
            नाड़ी परीक्षा एक पारंपरिक आयुर्वेदिक समग्र मूल्यांकन पद्धति है; यह
            लैब टेस्ट या आधुनिक जाँचों का विकल्प नहीं है। आपातकालीन या गंभीर
            लक्षणों में तुरंत नज़दीकी अस्पताल जाएँ।
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="ab-section">
        <div className="container ab-mission">
          <div className="ab-mission-photos">
            <img src={groupImg} alt="नाड़ी परीक्षा कार्यशाला के प्रतिभागी" />
            <img src={teachImg} alt="डॉ. अजीत सिंह यादव कार्यशाला में" />
          </div>
          <div>
            <p className="ab-eyebrow">हमारा उद्देश्य • Our Mission</p>
            <h2 className="ab-title ab-left">हर गाँव तक एक नाड़ी वैद्य</h2>
            <p>
              हमारा सपना है कि देश के हर राज्य, ज़िले, शहर, तहसील, ब्लॉक और गाँव
              में एक प्रशिक्षित नाड़ी वैद्य हो — ताकि यह प्राचीन विद्या हर घर तक
              पहुँचे।
            </p>
            <p>
              इसी उद्देश्य से नाड़ी वैद्य गुरुकुल में नियमित नाड़ी परीक्षा
              कार्यशालाएँ होती हैं, नाड़ी वैद्य फार्मेसी शुद्ध आयुर्वेदिक उत्पाद
              बनाती है और नाड़ी वैद्य ट्रस्ट – हीलिंग हैंड्स सेवा कार्य करता है।
            </p>
            <p className="ab-motto">स्वस्थ भारत • श्रेष्ठ भारत</p>
          </div>
        </div>
      </section>

      {/* CLINICS */}
      <section className="ab-section ab-soft" id="clinics">
        <div className="container">
          <p className="ab-eyebrow ab-center">हमारे क्लीनिक • Our Clinics</p>
          <h2 className="ab-title">करनाल और वृंदावन</h2>
          <p className="ab-sub">
            OPD {OPD_TIME.labelHi} • हर महीने 1–10 तारीख़ करनाल, 11 से 31
            तारीख़ वृंदावन। तीनों नाड़ी वैद्य दोनों क्लीनिक में।
          </p>
          <div className="ab-clinics">
            {clinics.map((c) => (
              <ClinicCard clinic={c} compact key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <OurTeam />
    </div>
  );
}
