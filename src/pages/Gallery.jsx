import { useState } from "react";

import { Helmet } from "react-helmet-async";

import "./gallery.css";

import bannerImg from "../assets/images/gallerybackground.jpg";

/* AUTO IMPORT IMAGES */

const marchImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-march-2024/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

const decImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-dec-2023/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

const septImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-sept-2023/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

const juneImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-june-2023/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

const mayImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-may-2023/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

const julyImages = Object.values(
  import.meta.glob(
    "../assets/images/workshop-july-2019/*.jpg",
    {
      eager: true,
      import: "default"
    }
  )
);

/* GALLERY DATA */
const galleryData = {

  march2024: marchImages,

  dec2023: decImages,

  sept2023: septImages,

  june2023: juneImages,

  may2023: mayImages,

  july2019: julyImages

};

/* TAB LABELS */
const galleryTitles = {

  march2024:
    "Nadi Pariksha Workshop March 2024",

  dec2023:
    "Nadi Pariksha Workshop December 2023",

  sept2023:
    "Nadi Pariksha Workshop September 2023",

  june2023:
    "Nadi Pariksha Workshop June 2023",

  may2023:
    "Nadi Pariksha Workshop May 2023",

  july2019:
    "Nadi Pariksha Workshop July 2019"

};

export default function Gallery() {

  const [activeTab, setActiveTab] =
    useState("march2024");

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Gallery | Ayurveda Workshops & Nadi Pariksha Events
        </title>

        <meta
          name="description"
          content="Explore the official Nadi Vaidya Gallery featuring Ayurveda workshops, Nadi Pariksha training sessions, wellness seminars, Ayurvedic events and healing programs conducted across India."
        />

        <meta
          name="keywords"
          content="Ayurveda Gallery, Nadi Pariksha Workshop Photos, Ayurveda Seminar Images, Nadi Vaidya Gallery, Ayurvedic Events, Wellness Workshop Gallery, Dr Ajit Singh Yadav"
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
          href="https://www.nadivaidya.in/gallery"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Gallery | Nadi Vaidya Ayurveda Workshops"
        />

        <meta
          property="og:description"
          content="View photos from Ayurveda workshops, pulse diagnosis seminars and Nadi Pariksha events organized by Nadi Vaidya."
        />

        <meta
          property="og:url"
          content="https://www.nadivaidya.in/gallery"
        />

        <meta
          property="og:image"
          content="https://www.nadivaidya.in/og-image.jpg"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Nadi Vaidya Gallery"
        />

        <meta
          name="twitter:description"
          content="Explore Ayurveda workshop and Nadi Pariksha event galleries."
        />

        <meta
          name="twitter:image"
          content="https://www.nadivaidya.in/og-image.jpg"
        />

        {/* SCHEMA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context":
              "https://schema.org",

            "@type":
              "ImageGallery",

            "name":
              "Nadi Vaidya Gallery",

            "description":
              "Gallery of Ayurveda workshops, Nadi Pariksha seminars and wellness events conducted by Nadi Vaidya.",

            "url":
              "https://www.nadivaidya.in/gallery",

            "publisher": {

              "@type":
                "Organization",

              "name":
                "Nadi Vaidya"

            }

          })}

        </script>

      </Helmet>

      <div className="gallery-page">

        {/* HERO */}
        <section
          className="gallery-hero"
          style={{
            backgroundImage:
              `url(${bannerImg})`
          }}
        >

          <div className="container">

            <span className="gallery-tag">
              Ayurveda • Workshops • Events
            </span>

            <h1 className="gallery-title">
              Nadi Vaidya Gallery
            </h1>

            <p className="gallery-description">
              Explore moments from
              Ayurveda workshops,
              Nadi Pariksha seminars,
              wellness programs and
              healing events organized
              by Nadi Vaidya Gurukul.
            </p>

            <div className="gallery-buttons">

              <button
                className={
                  activeTab === "march2024"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("march2024")
                }
              >
                WORKSHOP MARCH 2024
              </button>

              <button
                className={
                  activeTab === "dec2023"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("dec2023")
                }
              >
                WORKSHOP DEC 2023
              </button>

              <button
                className={
                  activeTab === "sept2023"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("sept2023")
                }
              >
                WORKSHOP SEPT 2023
              </button>

              <button
                className={
                  activeTab === "june2023"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("june2023")
                }
              >
                WORKSHOP JUNE 2023
              </button>

              <button
                className={
                  activeTab === "may2023"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("may2023")
                }
              >
                WORKSHOP MAY 2023
              </button>

              <button
                className={
                  activeTab === "july2019"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("july2019")
                }
              >
                WORKSHOP JULY 2019
              </button>

            </div>

          </div>

        </section>

        {/* GRID */}
        <section className="gallery-grid-section">

          <div className="container">

            <div className="gallery-heading">

              <h2>
                {galleryTitles[activeTab]}
              </h2>

              <p>
                View workshop highlights,
                Ayurveda training sessions
                and wellness event moments.
              </p>

            </div>

            <div className="gallery-grid">

              {galleryData[activeTab]?.map(
                (img, index) => (

                  <div
                    className="gallery-card"
                    key={index}
                  >

                    <img
                      src={img}
                      alt={`${galleryTitles[activeTab]} Image ${index + 1}`}
                      loading="lazy"
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      </div>

    </>

  );

}