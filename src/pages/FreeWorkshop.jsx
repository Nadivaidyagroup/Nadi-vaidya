import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import "./freeWorkshop.css";

import workshopImg from "../assets/images/workshop.jpg";
import hospitalImg from "../assets/images/hospital.jpg";
import abroadImg from "../assets/images/abroad.jpg";

export default function FreeWorkshop() {

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Advance Nadi Pariksha Workshop | Ayurveda Training by Dr Ajit Singh Yadav
        </title>

        <meta
          name="description"
          content="Join the Advance Nadi Pariksha Workshop by Nadi Vaidya Gurukul and learn Ayurvedic Pulse Diagnosis with practical training from Dr Ajit Singh Yadav. Explore Ayurveda healing, diagnostics and wellness education."
        />

        <meta
          name="keywords"
          content="Nadi Pariksha Workshop, Ayurveda Workshop, Pulse Diagnosis Training, Dr Ajit Singh Yadav, Ayurvedic Course, Ayurveda Education, Nadi Vaidya Gurukul, Ayurveda Seminar, Holistic Healing"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="author"
          content="Nadi Vaidya"
        />

        <link
          rel="canonical"
          href="https://www.nadivaidya.inhttps://www.nadivaidya.com/"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Advance Nadi Pariksha Workshop | Ayurveda Training"
        />

        <meta
          property="og:description"
          content="Learn authentic Nadi Pariksha and Ayurvedic Pulse Diagnosis through practical workshops by Dr Ajit Singh Yadav."
        />

        <meta
          property="og:url"
          content="https://www.nadivaidya.inhttps://www.nadivaidya.com/"
        />

        <meta
          property="og:image"
          content="https://www.nadivaidya.in/og-image.jpg?v=2"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Advance Nadi Pariksha Workshop | Nadi Vaidya"
        />

        <meta
          name="twitter:description"
          content="Join Ayurveda and Pulse Diagnosis workshops by Nadi Vaidya Gurukul."
        />

        <meta
          name="twitter:image"
          content="https://www.nadivaidya.in/og-image.jpg?v=2"
        />

        {/* SCHEMA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "Course",

            "name":
              "Advance Nadi Pariksha Workshop",

            "description":
              "Professional Ayurvedic pulse diagnosis and Nadi Pariksha workshop conducted by Nadi Vaidya Gurukul.",

            "provider": {

              "@type": "Organization",

              "name": "Nadi Vaidya Gurukul",

              "url": "https://www.nadivaidya.in"

            },

            "educationalCredentialAwarded":
              "Workshop Participation Certificate",

            "inLanguage":
              "English",

            "courseMode":
              "Offline",

            "teaches": [
              "Nadi Pariksha",
              "Ayurveda",
              "Pulse Diagnosis",
              "Holistic Healing"
            ]

          })}

        </script>

      </Helmet>

      <div className="fw-page">

        {/* HERO */}
        <section className="fw-hero">

          <div className="container fw-hero-grid">

            <div className="fw-hero-content">

              <span className="fw-tag">
                Ayurveda • Nadi Pariksha • Wellness
              </span>

              <h1>
                Advance Nadi Pariksha Workshop
              </h1>

              <p>
                Learn the ancient science of
                Nadi Pariksha (Pulse Diagnosis)
                through practical Ayurvedic
                training and holistic wellness education.
              </p>

              <div className="fw-buttons">

                <Link
                  to="/nadi-pariksha-form"
                  className="fw-btn primary"
                >
                  Join Workshop
                </Link>

                <Link
                  to="/workshop-schedule"
                  className="fw-btn ghost"
                >
                  View Schedule
                </Link>

              </div>

            </div>

            <div className="fw-hero-img">

              <img
                src={workshopImg}
                alt="Advance Nadi Pariksha Ayurveda Workshop"
                loading="eager"
              />

            </div>

          </div>

        </section>

        {/* ABOUT */}
        <section className="fw-content">

          <div className="container">

            <h2>
              About Advance Nadi Pariksha Workshop
            </h2>

            <p>
              Nadi Vaidya Gurukul has taken a
              powerful initiative to spread the
              ancient Ayurvedic science of
              Nadi Pariksha (Pulse Diagnosis)
              across India and worldwide.
            </p>

            <p>
              This Ayurveda workshop is specially
              designed for doctors, wellness seekers,
              Ayurvedic practitioners and students
              who want to gain deep knowledge of
              pulse diagnosis and holistic healing.
            </p>

            <p className="highlight-box">
              Register today and get lifetime access
              to our Advance Nadi Pariksha Training Workshop.
            </p>

            <div className="fw-list">

              <div>
                ✔ Hands-on Ayurveda training by Dr Ajit Singh Yadav
              </div>

              <div>
                ✔ Practical pulse diagnosis learning
              </div>

              <div>
                ✔ Workshop kit included
              </div>

              <div>
                ✔ Lunch, tea and snacks included
              </div>

              <div>
                ✔ E-Certificate provided
              </div>

              <div>
                ✔ One-time registration fee: ₹1500
              </div>

              <div>
                ✔ Future workshop access support
              </div>

            </div>

          </div>

        </section>

        {/* BENEFITS */}
        <section className="fw-benefits">

          <div className="container">

            <div className="fw-heading">

              <h2>
                Workshop Benefits
              </h2>

              <p>
                Learn Ayurveda practically with
                real clinical understanding and
                expert guidance.
              </p>

            </div>

            <div className="fw-benefit-grid">

              {[
                "Advance Nadi Training",
                "Hands-on Practice",
                "Workshop Kit",
                "Lunch & Snacks",
                "E-Certificate",
                "One Time Registration"
              ].map((item, i) => (

                <div
                  key={i}
                  className="fw-benefit-card"
                >
                  ✔ {item}
                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="fw-cta">

          <div className="container">

            <h2>
              Start Your Ayurveda Healing Journey
            </h2>

            <p>
              Become a certified Nadi Pariksha expert
              and transform lives through authentic Ayurveda.
            </p>

            <Link
              to="/nadi-pariksha-form"
              className="fw-btn primary large"
            >
              Register Now
            </Link>

          </div>

        </section>

        {/* INDIA */}
        <section className="fw-section">

          <div className="container fw-flex">

            <div className="fw-card-img">

              <img
                src={hospitalImg}
                alt="Ayurveda Workshop in India"
                loading="lazy"
              />

            </div>

            <div className="fw-card-content">

              <h3>
                Ayurveda Workshops in India
              </h3>

              <p>
                Ayurvedic hospitals, wellness centers
                and institutes can organize
                in-house Nadi Pariksha training workshops.
              </p>

              <div className="fw-price">
                ₹1.5 Lakhs (Up to 3 Doctors)
              </div>

              <Link
                to="/contact-us"
                className="fw-btn outline"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </section>

        {/* WORLDWIDE */}
        <section className="fw-section alt">

          <div className="container fw-flex reverse">

            <div className="fw-card-content">

              <h3>
                International Ayurveda Workshops
              </h3>

              <p>
                Global wellness centers and
                healthcare organizations can
                collaborate with us to spread
                Ayurveda worldwide.
              </p>

              <div className="fw-price">
                $6000 (Up to 3 Candidates)
              </div>

              <Link
                to="/contact-us"
                className="fw-btn outline"
              >
                Contact Us
              </Link>

            </div>

            <div className="fw-card-img">

              <img
                src={abroadImg}
                alt="International Nadi Pariksha Workshop"
                loading="lazy"
              />

            </div>

          </div>

        </section>

      </div>

    </>

  );

}