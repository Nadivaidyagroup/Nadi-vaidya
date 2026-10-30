// src/pages/WorkshopSchedule.jsx

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import "./workshopSchedule.css";

import schedule1 from "../assets/images/workshopschedule/1.png";
import schedule2 from "../assets/images/workshopschedule/2.png";
import schedule3 from "../assets/images/workshopschedule/3.png";

const workshopSchedules = [

  {
    id: 1,
    image: schedule1,
    title: "Nadi Pariksha Workshop Schedule",
    subtitle:
      "Traditional Ayurveda & Pulse Diagnosis Training"
  },

  {
    id: 2,
    image: schedule2,
    title: "Advanced Ayurveda Learning Program",
    subtitle:
      "Hands-on Clinical Pulse Diagnosis Sessions"
  },

  {
    id: 3,
    image: schedule3,
    title: "International Ayurveda Workshop",
    subtitle:
      "Ayurvedic Wellness & Nadi Science Education"
  }

];

export default function WorkshopSchedule() {

  return (

    <>
      <Helmet>

        <title>
          Workshop Schedule | Nadi Pariksha & Ayurveda Training
        </title>

        <meta
          name="description"
          content="
            Explore upcoming Nadi Pariksha workshop schedules,
            Ayurveda training programs, pulse diagnosis courses,
            and wellness learning sessions by Nadi Vaidya Gurukul.
          "
        />

        <meta
          name="keywords"
          content="
            Workshop Schedule,
            Nadi Pariksha Workshop,
            Ayurveda Training,
            Pulse Diagnosis Course,
            Ayurveda Workshop India,
            Dr Ajit Singh Yadav,
            Nadi Vaidya Gurukul,
            Ayurveda Learning
          "
        />

        <link
          rel="canonical"
          href="https://nadivaidya.in/workshop-schedule"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="
            Workshop Schedule | Ayurveda & Nadi Pariksha
          "
        />

        <meta
          property="og:description"
          content="
            Join Ayurveda and Nadi Pariksha workshops
            conducted by Nadi Vaidya Gurukul.
          "
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://nadivaidya.in/workshop-schedule"
        />

        {/* STRUCTURED DATA */}
        <script type="application/ld+json">
          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "EducationalOrganization",

            name: "Nadi Vaidya Gurukul",

            url: "https://nadivaidya.in",

            description:
              "Nadi Vaidya Gurukul provides Ayurveda and Nadi Pariksha training workshops led by Dr Ajit Singh Yadav.",

            founder: {
              "@type": "Person",
              name: "Dr Ajit Singh Yadav"
            }

          })}
        </script>

      </Helmet>

      <div className="workshop-page">

        {/* HERO */}
        <section className="workshop-hero">

          <div className="container">

            <div className="workshop-hero-content">

              <span className="workshop-tag">
                Ayurveda • Nadi Pariksha • Wellness Education
              </span>

              <h1>
                Workshop Schedule
              </h1>

              <p>
                Explore upcoming Ayurveda and Nadi Pariksha
                workshop schedules designed for wellness seekers,
                doctors, Ayurveda students and holistic healers.
              </p>

              <div className="workshop-hero-buttons">

                <Link
                  to="https://www.nadivaidya.com/"
                  className="workshop-primary-btn"
                >
                  Join Workshop
                </Link>

                <Link
                  to="/contact-us"
                  className="workshop-secondary-btn"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* SCHEDULE SECTION */}
        <section className="workshop-schedule-section">

          <div className="container">

            <div className="workshop-title-wrap">

              <span className="workshop-mini-title">
                Upcoming Programs
              </span>

              <h2>
                Ayurveda Workshop Schedule
              </h2>

              <p>
                Learn authentic pulse diagnosis and Ayurveda
                healing systems through practical workshops
                guided by experienced Ayurvedic experts.
              </p>

            </div>

            <div className="workshop-grid">

              {workshopSchedules.map((item) => (

                <div
                  className="workshop-card"
                  key={item.id}
                >

                  <div className="workshop-image-wrap">

                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />

                  </div>

                  <div className="workshop-card-content">


                    <Link
                      to="https://www.nadivaidya.com/"
                      className="workshop-card-btn"
                    >
                      Register Now
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="workshop-cta-section">

          <div className="container">

            <div className="workshop-cta-box">

              <h2>
                Start Your Ayurveda Learning Journey
              </h2>

              <p>
                Become part of our Ayurveda and Nadi Pariksha
                learning mission with practical workshops,
                traditional healing knowledge and wellness education.
              </p>

              <Link
                to="/nadi-pariksha-form"
                className="workshop-cta-btn"
              >
                Apply For Workshop
              </Link>

            </div>

          </div>

        </section>

      </div>
    </>

  );

}