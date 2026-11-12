// src/components/OurOrgs.jsx
// "नाड़ी वैद्य परिवार की दूसरी संस्थाएँ" — हर पेज पर footer से ठीक ऊपर
import "../pages/clinic.css";

export default function OurOrgs() {
  return (
    <section className="home-orgs">
      <div className="container">
        <h2 className="home-section-title">नाड़ी वैद्य परिवार की दूसरी संस्थाएँ</h2>
        <p className="home-section-sub">
          आयुर्वेदिक उत्पाद, नाड़ी परीक्षा प्रशिक्षण और सेवा कार्य — अपनी-अपनी संस्था के माध्यम से।
        </p>
        <div className="org-grid org-grid-3">
          <a
            className="org-card"
            href="https://nadivaidyapharmacy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>नाड़ी वैद्य फार्मेसी</h3>
            <small className="org-en">Nadi Vaidya Pharmacy Pvt. Ltd.</small>
            <p>आयुर्वेदिक उत्पाद — ऑनलाइन ऑर्डर</p>
            <span>nadivaidyapharmacy.com →</span>
          </a>
          <a
            className="org-card"
            href="https://nadivaidya.com/pages/nadi-pariksha-course"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>नाड़ी वैद्य गुरुकुल</h3>
            <small className="org-en">Nadi Vaidya Gurukul Pvt. Ltd.</small>
            <p>नाड़ी परीक्षा कार्यशाला व कोर्स</p>
            <span>nadivaidya.com →</span>
          </a>
          <a
            className="org-card"
            href="https://www.nadivaidyatrust.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>नाड़ी वैद्य ट्रस्ट – हीलिंग हैंड्स</h3>
            <small className="org-en">Nadi Vaidya Trust – Healing Hands</small>
            <p>अध्यक्ष: डॉ. माना यादव · 📞 99922 42267</p>
            <span>nadivaidyatrust.com →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
