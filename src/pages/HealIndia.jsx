// src/pages/HealIndia.jsx

import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

import "./HealIndia.css";

const objectives = [

  {
    title: "Health Care",
    icon: "🩺",

    points: [
      "Ayurveda wellness awareness",
      "Free medical camps",
      "Women health education",
      "Natural healing support",
      "AYUSH healthcare promotion"
    ]
  },

  {
    title: "Education",
    icon: "📚",

    points: [
      "Ayurveda training programs",
      "Scholarship support",
      "Skill development workshops",
      "Nadi Pariksha education",
      "Free learning initiatives"
    ]
  },

  {
    title: "Organic Farming",
    icon: "🌱",

    points: [
      "Herbal plantation drives",
      "Organic farming awareness",
      "Farmer wellness support",
      "Sustainable agriculture",
      "Natural cultivation education"
    ]
  },

  {
    title: "Livelihood",
    icon: "💼",

    points: [
      "Employment opportunities",
      "Traditional practitioner support",
      "Self-employment guidance",
      "Ayurveda business training",
      "Community empowerment"
    ]
  }

];

export default function HealIndia() {

  return (

    <>

      <Helmet>

        <title>
          Heal India Trust | Ayurveda Wellness Mission
        </title>

        <meta
          name="description"
          content="Heal India Trust promotes Ayurveda wellness, healthcare awareness, education, organic farming and livelihood support across India."
        />

      </Helmet>

      <div className="heal-page">

        {/* HERO */}
        <section className="heal-hero">

          <div className="heal-container">

            <div className="heal-hero-content">

              <span className="heal-tag">

                🌿 Heal India Trust

              </span>

              <h1>

                Creating A Better
                <span>
                  Healthy Future
                </span>

              </h1>

              <p>

                Heal India Trust is committed to
                Ayurveda wellness, social upliftment,
                education and sustainable development
                for a healthier and happier India.

              </p>

              <div className="heal-hero-buttons">

                <Link
                  to="/contact-us"
                  className="heal-btn-primary"
                >

                  Join Mission

                </Link>

                <a
                  href="#focus-area"
                  className="heal-btn-outline"
                >

                  Explore Mission

                </a>

              </div>

            </div>

          </div>

        </section>

        {/* ABOUT */}
        <section className="heal-about">

          <div className="heal-container">

            <div className="heal-section-title">

              <span>

                About Heal India

              </span>

              <h2>

                Our Mission &
                Objectives

              </h2>

              <p>

                Heal India Trust works towards
                healthcare awareness, Ayurveda education,
                organic farming and livelihood development
                to create a positive social impact.

              </p>

            </div>

          </div>

        </section>

        {/* OBJECTIVES */}
        <section
          className="heal-objectives"
          id="focus-area"
        >

          <div className="heal-container">

            <div className="heal-grid">

              {objectives.map((item, index) => (

                <div
                  className="heal-card"
                  key={index}
                >

                  <div className="heal-icon">

                    {item.icon}

                  </div>

                  <h3>

                    {item.title}

                  </h3>

                  <ul>

                    {item.points.map((point, i) => (

                      <li key={i}>

                        {point}

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA SECTION */}
        <section className="heal-cta-section">

          <div className="heal-container">

            <div className="heal-cta-box">

              <div className="heal-cta-content">

                <span className="heal-cta-mini">

                  🌿 Join Heal India Mission

                </span>

                <h2>

                  Together We Can Build
                  A Healthier India

                </h2>

                <p>

                  Connect with Heal India Trust
                  and become part of our mission
                  for Ayurveda wellness, healthcare,
                  education and community development.

                </p>

              </div>

              <div className="heal-cta-buttons">

                <Link
                  to="/contact-us"
                  className="heal-cta-btn"
                >

                  Contact Us

                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>

    </>

  );

}