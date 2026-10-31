// src/components/OurTeam.jsx
// "हमारी टीम" — 7 सदस्य, हिंदी में (Gurukul साइट जैसा)
import t1 from "../assets/images/team/1.jpg";
import t2 from "../assets/images/team/2.jpg";
import t3 from "../assets/images/team/3.jpg";
import t4 from "../assets/images/team/4.jpg";
import t5 from "../assets/images/team/5.jpg";
import t6 from "../assets/images/team/6.jpg";
import t7 from "../assets/images/team/7.jpg";
import "./ourTeam.css";

export const teamMembers = [
  { name: "डॉ. अजीत सिंह यादव", role: "संस्थापक एवं अध्यक्ष, नाड़ी वैद्य ग्रुप · 1989 से, 36 वर्षों का अनुभव", photo: t1 },
  { name: "मंजू लता", role: "सह-संस्थापक, नाड़ी वैद्य गुरुकुल", photo: t5 },
  { name: "डॉ. मोहित वशिष्ठ", role: "सीईओ, नाड़ी वैद्य फार्मेसी", photo: t2 },
  { name: "डॉ. सलोनी यादव वशिष्ठ", role: "सीईओ, नाड़ी वैद्य गुरुकुल", photo: t3 },
  { name: "डॉ. कार्तिक शर्मा", role: "सीओओ, नाड़ी वैद्य ट्रस्ट – हीलिंग हैंड्स", photo: t6 },
  { name: "डॉ. माना यादव", role: "अध्यक्ष, नाड़ी वैद्य ट्रस्ट – हीलिंग हैंड्स", photo: t4 },
  { name: "शिवाय वशिष्ठ", role: "लिटिल मास्टर", photo: t7 },
];

export default function OurTeam() {
  return (
    <section className="ourteam" id="team">
      <div className="container">
        <p className="ourteam-eyebrow">नाड़ी वैद्य परिवार</p>
        <h2 className="ourteam-title">हमारी टीम</h2>
        <div className="ourteam-grid">
          {teamMembers.map((m) => (
            <figure className="ourteam-card" key={m.name}>
              <div className="ourteam-photo">
                <img src={m.photo} alt={m.name} loading="lazy" />
              </div>
              <figcaption>
                <strong>{m.name}</strong>
                <span>{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
