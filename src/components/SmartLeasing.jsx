// src/components/SmartCapex.jsx

import React from "react";

import "./smartleasing.css";

import bannerImage from "../assets/bannerimage.png";

import bannerBackground from "../assets/bannerbackground.png";

/* =========================
COMPONENT
========================= */

export default function SmartLeasing() {

  return (

    <section
      className="smartcapex-section"
      style={{
        backgroundImage: `url(${bannerBackground})`
      }}
    >

      <div className="smartcapex-container">

        <div className="smartcapex-row">

          {/* LEFT CONTENT */}

          <div className="smartcapex-text-section">

            <h1 className="smartcapex-heading">
             Nadi Vaidya Trust
            </h1>

            <div className="smartcapex-line-wrapper">

              <div className="smartcapex-line"></div>

              <h2 className="smartcapex-subheading">
                Natural Wellness Mission
              </h2>

            </div>

            <p className="smartcapex-paragraph">
             A National Wellness Movement by Nadi Vaidya Dr. Ajit Singh Yadav Reviving Nadi Pariksha & Ayurveda for preventive, personalized healthcare. Integrating AYUSH systems with digital tools to bring “हर घर – स्वस्थ घर” through wellness camps, surveys & holistic healing.
            </p>

            <h3 className="smartcapex-mission-text">
             Mission: Swasth Bharat – Shreshth Bharat
            </h3>

          <button
  className="smartcapex-button"
  onClick={() => window.open("https://nadivaidyatrust.com/", "_blank")}
>
  Explore More
</button>

          </div>

          {/* RIGHT IMAGE */}

          <div className="smartcapex-image-wrapper">

            <img
              src={bannerImage}
              alt="Ayurveda Wellness"
              className="smartcapex-banner-image"
              loading="lazy"
            />

          </div>

        </div>

      </div>

    </section>
  );
}