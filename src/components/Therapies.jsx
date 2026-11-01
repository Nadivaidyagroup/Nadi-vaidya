// src/components/Therapies.jsx — होम पेज: हमारी प्रमुख थेरेपी
import { Link } from "react-router-dom";
import { therapies } from "../data/therapies.js";
import "./therapies.css";

export default function Therapies() {
  return (
    <section className="th-section" id="therapies">
      <div className="container">
        <p className="th-eyebrow">फुल बॉडी डिटॉक्स प्रोग्राम • Full Body Detox Program</p>
        <h2 className="th-title">हमारी प्रमुख थेरेपी</h2>
        <p className="th-sub">
          आयुर्वेद, योग एवं आधुनिक चिकित्सा का समन्वित कार्यक्रम — आपकी प्रकृति,
          नाड़ी परीक्षा एवं स्वास्थ्य स्थिति के अनुसार व्यक्तिगत उपचार योजना।
        </p>
        <p className="th-tags">समग्र शरीर शुद्धि • दर्द से राहत • सम्पूर्ण स्वास्थ्य</p>
        <div className="th-grid">
          {therapies.map((t, i) => (
            <article className="th-card" key={t.en}>
              <span className="th-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t.hi}</h3>
              <small>{t.en}</small>
              <p>{t.d}</p>
            </article>
          ))}
        </div>
        <p className="th-note">
          कौन-सी थेरेपी आपके लिए उपयुक्त है, यह नाड़ी परीक्षा के बाद वैद्य तय करते हैं।
        </p>
        <div className="th-cta">
          <Link className="clinic-btn clinic-btn-book" to="/appointment">
            📅 नाड़ी परीक्षा व थेरेपी के लिए अपॉइंटमेंट बुक करें
          </Link>
        </div>
      </div>
    </section>
  );
}
