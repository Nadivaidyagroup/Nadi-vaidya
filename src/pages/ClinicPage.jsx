// src/pages/ClinicPage.jsx
// करनाल और वृंदावन — दोनों क्लीनिक का एक ही पेज-ढाँचा।
// जानकारी src/data/clinics.js से आती है।

import { Link } from "react-router-dom";
import {
  OPD_TIME,
  clinics,
  doctors,
  getClinic,
  whatsappLink,
} from "../data/clinics.js";
import "./clinic.css";

export function ClinicCard({ clinic, compact = false }) {
  const tel = `tel:+91${clinic.phone.replace(/\D/g, "")}`;
  return (
    <article className="clinic-card">
      <p className="clinic-card-city">
        📍 {clinic.city} • {clinic.cityHi}
      </p>
      <h3 className="clinic-card-name">{clinic.name}</h3>
      <p className="clinic-card-namehi">{clinic.nameHi}</p>

      <ul className="clinic-facts">
        <li>
          <span>🕗</span>
          <div>
            <strong>{OPD_TIME.label}</strong>
            <small>{OPD_TIME.labelHi}</small>
          </div>
        </li>
        <li>
          <span>🗓️</span>
          <div>
            <strong>Nadi Vaidya OPD: {clinic.opdDays}</strong>
            <small>नाड़ी वैद्य OPD: {clinic.opdDaysHi}</small>
          </div>
        </li>
        <li>
          <span>🏠</span>
          <div>
            <strong>{clinic.address}</strong>
            {!compact && <small>{clinic.addressHi}</small>}
          </div>
        </li>
        <li>
          <span>📞</span>
          <div>
            <a href={tel}>
              <strong>{clinic.phone}</strong>
            </a>
          </div>
        </li>
      </ul>

      <div className="clinic-actions">
        <a
          className="clinic-btn clinic-btn-wa"
          href={whatsappLink(clinic.phone, `${clinic.city} clinic`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp पर अपॉइंटमेंट
        </a>
        <a className="clinic-btn clinic-btn-call" href={tel}>
          कॉल करें
        </a>
        <a
          className="clinic-btn clinic-btn-map"
          href={
            clinic.mapUrl ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              clinic.mapQuery
            )}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          रास्ता देखें
        </a>
      </div>

      {compact && (
        <Link className="clinic-more" to={`/${clinic.slug}`}>
          पूरी जानकारी →
        </Link>
      )}
    </article>
  );
}

export function DoctorsStrip() {
  return (
    <div className="doctor-grid">
      {doctors.map((d) => (
        <figure className="doctor-card" key={d.name}>
          <img src={d.photo} alt={d.name} loading="lazy" />
          <figcaption>
            <strong>{d.name}</strong>
            <span>{d.qual}</span>
            <small>{d.role}</small>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ClinicPage({ slug }) {
  const clinic = getClinic(slug);
  const other = clinics.find((c) => c.slug !== slug);

  return (
    <div className="clinic-page">
      <section className="clinic-hero">
        <div className="container">
          <p className="clinic-eyebrow">
            Nadi Vaidya Clinic • नाड़ी वैद्य क्लीनिक
          </p>
          <h1>
            Nadi Pariksha Clinic in {clinic.city}
            <span>{clinic.cityHi} में नाड़ी परीक्षा परामर्श</span>
          </h1>
          <p className="clinic-lead">
            {clinic.name} — नाड़ी वैद्य परिवार का {clinic.cityHi} क्लीनिक। यहाँ
            पारंपरिक नाड़ी परीक्षा से आपकी प्रकृति, दोषों के असंतुलन, अग्नि और
            दिनचर्या को समझकर आयुर्वेदिक परामर्श दिया जाता है।
          </p>
        </div>
      </section>

      <section className="container clinic-main">
        <ClinicCard clinic={clinic} />

        <div className="clinic-map">
          <iframe
            title={`${clinic.name} map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              clinic.mapQuery
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="container clinic-section">
        <h2>अपॉइंटमेंट कैसे लें</h2>
        <ol className="clinic-steps">
          <li>
            <strong>WhatsApp या कॉल करें</strong> — {clinic.phone} पर। संदेश
            पहले से लिखा मिलेगा, बस भेजें।
          </li>
          <li>
            <strong>दिन और समय तय करें</strong> — OPD {OPD_TIME.labelHi}।
            नाड़ी वैद्य OPD {clinic.opdDaysHi}।
          </li>
          <li>
            <strong>सुबह खाली पेट आएँ</strong> तो अच्छा — पारंपरिक रूप से नाड़ी
            देखने का उत्तम समय प्रातःकाल माना गया है। पुरानी रिपोर्ट और चल रही
            दवाइयों की सूची साथ लाएँ।
          </li>
        </ol>
      </section>

      <section className="container clinic-section">
        <h2>हमारे नाड़ी वैद्य</h2>
        <DoctorsStrip />
        <p className="clinic-note">
          तीनों नाड़ी वैद्य करनाल और वृंदावन — दोनों क्लीनिक में परामर्श देते हैं। अपॉइंटमेंट के समय दिन पक्का कर लें।
        </p>
      </section>

      <section className="container clinic-section">
        <p className="clinic-disclaimer">
          नाड़ी परीक्षा एक पारंपरिक आयुर्वेदिक समग्र मूल्यांकन पद्धति है; यह लैब
          टेस्ट या आधुनिक जाँचों का विकल्प नहीं है। आपातकालीन या गंभीर लक्षणों में
          तुरंत नज़दीकी अस्पताल जाएँ।
        </p>
        <p className="clinic-other">
          हमारा दूसरा क्लीनिक:{" "}
          <Link to={`/${other.slug}`}>
            {other.name}, {other.cityHi} →
          </Link>
        </p>
      </section>
    </div>
  );
}
