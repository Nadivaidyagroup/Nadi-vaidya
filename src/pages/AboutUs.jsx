// =========================================
// ABOUTUS.JSX
// PREMIUM MODERN AYURVEDA ABOUT PAGE
// =========================================

import { Helmet } from "react-helmet-async";

import "./about.css";

import gurukulImg from "../assets/images/Nadi-Vaidya-Gurukul.png";
import wellnessImg from "../assets/images/AyurVaidya.jpeg";
import trustImg from "../assets/images/Nadi-Vaidya-Trust.jpeg";
import pharmacyImg from "../assets/images/NADI-VAIDYA-PHARMACY.png";

import OurTeam from "../components/OurTeam";

import { team } from "../data/homeData";

export default function AboutUs() {

  return (

    <>

      <Helmet>

        <title>
          About Us | Nadi Vaidya Ayurveda & Wellness
        </title>

        <meta
          name="description"
          content="Learn about Nadi Vaidya Gurukul, AyurVaidya Wellness, Nadi Vaidya Trust and Nadi Vaidya Pharmacy."
        />

      </Helmet>

      <main className="about-page">

        {/* =========================================
        HERO
        ========================================= */}

        <section className="about-hero">

          <div className="hero-overlay"></div>

          <div className="container">

            <div className="about-hero-content">

              <span className="hero-badge">

                🌿 Ayurveda • Nadi Vigyan • Wellness

              </span>

              <h1>

                Ancient Healing
                <span>
                  Modern Wellness
                </span>

              </h1>

              <p>

                Preserving authentic Ayurveda,
                Nadi Pariksha and holistic healing
                through education, wellness,
                pharmacy and social healthcare missions.

              </p>

              <div className="hero-stats">

                <div className="hero-stat">

                  <h3>
                    35+
                  </h3>

                  <span>
                    Years Experience
                  </span>

                </div>

                <div className="hero-stat">

                  <h3>
                    1L+
                  </h3>

                  <span>
                    Wellness Lives
                  </span>

                </div>

                <div className="hero-stat">

                  <h3>
                    100+
                  </h3>

                  <span>
                    Health Camps
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
        GURUKUL
        ========================================= */}

        <section className="about-section">

          <div className="container">

            <div className="about-grid">

              <div className="about-image">

                <img
                  src={gurukulImg}
                  alt="Nadi Vaidya Gurukul"
                  loading="lazy"
                />

              </div>

              <div className="about-content">

                <span className="section-badge">

                  🎓 Ayurveda Education

                </span>

                <h2>

                  Nadi Vaidya Gurukul

                </h2>

                <p>

                  Nadi Vaidya Gurukul is the dream initiative
                  of Nadi Vaidya Dr. Ajit Singh Yadav,
                  established with the vision of preserving
                  and spreading authentic Ayurveda and
                  Nadi Pariksha knowledge globally.

                </p>

                <p>

                  The Gurukul follows the ancient
                  Guru-Shishya Parampara combined
                  with modern scientific understanding,
                  offering practical Ayurvedic learning
                  for students, doctors and wellness seekers.

                </p>

                <blockquote>

                  “Anyone who sincerely learns
                  Nadi Pariksha with discipline
                  and devotion can master this
                  healing science.”

                </blockquote>

                <div className="feature-grid">

                  <div className="feature-card">

                    <span>
                      📚
                    </span>

                    <h4>
                      Traditional Learning
                    </h4>

                  </div>

                  <div className="feature-card">

                    <span>
                      🌿
                    </span>

                    <h4>
                      Nadi Pariksha Training
                    </h4>

                  </div>

                  <div className="feature-card">

                    <span>
                      🧘
                    </span>

                    <h4>
                      Holistic Education
                    </h4>

                  </div>

                  <div className="feature-card">

                    <span>
                      🌎
                    </span>

                    <h4>
                      Global Ayurveda Mission
                    </h4>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
        WELLNESS
        ========================================= */}

        <section className="about-section about-alt">

          <div className="container">

            <div className="about-grid reverse">

              <div className="about-image">

                <img
                  src={wellnessImg}
                  alt="AyurVaidya Wellness"
                  loading="lazy"
                />

              </div>

              <div className="about-content">

                <span className="section-badge">

                  🌼 Wellness Center

                </span>

                <h2>

                  AyurVaidya Wellness

                </h2>

                <p>

                  AyurVaidya Wellness offers
                  root-cause holistic healing
                  through Ayurveda,
                  Nadi Pariksha,
                  Yoga and lifestyle medicine.

                </p>

                <p>

                  Dr. Ajit Singh Yadav has over
                  35 years of clinical experience
                  in pulse diagnosis and wellness transformation,
                  helping thousands of people
                  achieve healthier lives naturally.

                </p>

                <h3>

                  Our Wellness Approach

                </h3>

                <ul>

                  <li>
                    Nadi Pariksha (Pulse Diagnosis)
                  </li>

                  <li>
                    Personalized Ayurvedic Treatments
                  </li>

                  <li>
                    Ayurvedic Diet Planning
                  </li>

                  <li>
                    Lifestyle Correction
                  </li>

                  <li>
                    Yoga & Detox Programs
                  </li>

                  <li>
                    Preventive Wellness Care
                  </li>

                </ul>

                <blockquote>

                  “Pulse speaks what body hides,
                  and lifestyle heals what medicine can’t.”

                </blockquote>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
        TRUST
        ========================================= */}

        <section className="about-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-badge">

                🤝 Social Mission

              </span>

              <h2>

                Nadi Vaidya Trust – Healing Hands

              </h2>

              <p>

                A national wellness movement dedicated
                to bringing Ayurveda, healthcare
                and wellness awareness to every village.

              </p>

            </div>

            <div className="trust-grid">

              <div className="trust-image">

                <img
                  src={trustImg}
                  alt="Nadi Vaidya Trust"
                  loading="lazy"
                />

              </div>

              <div className="trust-content">

                <div className="trust-card">

                  <h3>
                    🌿 परिचय
                  </h3>

                  <p>

                    Nadi Vaidya Trust – Healing Hands
                    एक समग्र स्वास्थ्य को बढ़ावा देने वाला
                    गैर-लाभकारी संगठन है जिसकी स्थापना
                    नाड़ी वैद्य डॉ. अजीत सिंह यादव द्वारा
                    प्राचीन नाड़ी परीक्षा एवं आयुर्वेद के
                    विज्ञान को जन-जन तक पहुँचाने के उद्देश्य से की गई।

                  </p>

                </div>

                <div className="trust-card">

                  <h3>
                    🎯 मिशन एवं विज़न
                  </h3>

                  <ul>

                    <li>
                      स्वस्थ भारत – श्रेष्ठ भारत
                    </li>

                    <li>
                      मेरा गाँव – स्वस्थ गाँव
                    </li>

                    <li>
                      घर-घर आयुर्वेद
                    </li>

                    <li>
                      घर-घर नाड़ी विज्ञान
                    </li>

                  </ul>

                </div>

                <div className="trust-card">

                  <h3>
                    🏥 प्रमुख पहल
                  </h3>

                  <ul>

                    <li>
                      निःशुल्क स्वास्थ्य शिविर
                    </li>

                    <li>
                      ग्रामीण स्वास्थ्य जागरूकता अभियान
                    </li>

                    <li>
                      महिला एवं बाल स्वास्थ्य कार्यक्रम
                    </li>

                    <li>
                      आयुर्वेदिक प्राथमिक उपचार किट
                    </li>

                    <li>
                      औषधीय पौधारोपण अभियान
                    </li>

                  </ul>

                </div>

                <div className="trust-card">

                  <h3>
                    👥 ट्रस्ट से कौन जुड़ सकता है?
                  </h3>

                  <ul>

                    <li>
                      आयुर्वेद एवं चिकित्सा विशेषज्ञ
                    </li>

                    <li>
                      मेडिकल छात्र एवं शोधकर्ता
                    </li>

                    <li>
                      ग्राम वेलनेस कोऑर्डिनेटर
                    </li>

                    <li>
                      कॉर्पोरेट वेलनेस कोऑर्डिनेटर
                    </li>

                    <li>
                      समाजसेवी एवं स्वयंसेवक
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
        PHARMACY
        ========================================= */}

        <section className="about-section about-alt">

          <div className="container">

            <div className="about-grid reverse">

              <div className="about-image">

                <img
                  src={pharmacyImg}
                  alt="Nadi Vaidya Pharmacy"
                  loading="lazy"
                />

              </div>

              <div className="about-content">

                <span className="section-badge">

                  💊 Ayurvedic Products

                </span>

                <h2>

                  Nadi Vaidya Pharmacy

                </h2>

                <p>

                  Nadi Vaidya Pharmacy develops
                  Ayurvedic wellness products
                  using classical Ayurveda
                  and modern wellness research.

                </p>

                <p>

                  The pharmacy provides herbal
                  wellness support products
                  designed for preventive healthcare,
                  lifestyle balance and holistic healing.

                </p>

                <ul>

                  <li>
                    Herbal Ayurvedic Formulations
                  </li>

                  <li>
                    Research-Based Wellness Products
                  </li>

                  <li>
                    Lifestyle & Diet Integration
                  </li>

                  <li>
                    Preventive Healthcare Support
                  </li>

                  <li>
                    Holistic Healing Solutions
                  </li>

                  <li>
                    Ayurvedic Wellness Care
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </section>

        {/* TEAM */}

        <OurTeam />

        {/* =========================================
        CONTACT
        ========================================= */}

        <section className="contact-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-badge">

                📞 Contact Information

              </span>

              <h2>

                Connect With Us

              </h2>

              <p>

                We are here to support your wellness journey.

              </p>

            </div>

            <div className="contact-grid">

              <div className="contact-card">

                <div className="contact-icon">

                  🌿

                </div>

                <h3>

                  Wellness Center

                </h3>

                <p>

                  Karnal, Haryana

                </p>

                <a href="tel:+919992242267">

                  +91 99922 42267

                </a>

              </div>

              <div className="contact-card">

                <div className="contact-icon">

                  🎓

                </div>

                <h3>

                  Gurukul

                </h3>

                <p>

                  Ayurveda Education

                </p>

                <a href="tel:+918950770385">

                  +91 89507 70385

                </a>

              </div>

              <div className="contact-card">

                <div className="contact-icon">

                  💊

                </div>

                <h3>

                  Pharmacy

                </h3>

                <p>

                  Wellness Products

                </p>

                <a href="tel:+917015614500">

                  +91 70156 14500

                </a>

              </div>

              <div className="contact-card">

                <div className="contact-icon">

                  ❤️

                </div>

                <h3>

                  Trust Support

                </h3>

                <p>

                  Community Wellness

                </p>

                <a href="tel:+918396066555">

                  +91 83960 66555

                </a>

              </div>

            </div>

          </div>

        </section>

      </main>

    </>

  );

}