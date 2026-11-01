// src/components/Therapies.jsx — होम पेज: हमारी प्रमुख थेरेपी (photo cards)
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
          करनाल व वृंदावन, दोनों क्लीनिक में।
        </p>
        <ul className="th-tags" aria-label="कार्यक्रम के लाभ">
          <li>समग्र शरीर शुद्धि</li>
          <li>दर्द से राहत</li>
          <li>सम्पूर्ण स्वास्थ्य</li>
        </ul>

        <div className="th-grid">
          {therapies.map((t) => (
            <article className="th-card" key={t.en}>
              <div className="th-img">
                <img src={t.img} alt={t.hi} loading="lazy" />
              </div>
              <div className="th-body">
                <h3>{t.hi}</h3>
                <small>{t.en}</small>
                <p>{t.d}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="th-band">
          <p className="th-band-line">शुद्ध शरीर • संतुलित मन • ऊर्जावान जीवन</p>
          <p className="th-band-note">
            कौन-सी थेरेपी आपके लिए उपयुक्त है, यह नाड़ी परीक्षा के बाद वैद्य तय करते हैं।
          </p>
          <Link className="clinic-btn clinic-btn-book" to="/appointment">
            📅 नाड़ी परीक्षा व थेरेपी के लिए अपॉइंटमेंट बुक करें
          </Link>
        </div>
      </div>
    </section>
  );
}
