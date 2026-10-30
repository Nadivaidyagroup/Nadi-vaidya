// src/pages/ContactUs.jsx

import {
  useState
} from "react";

import axios from "axios";

import {
  Helmet
} from "react-helmet-async";

import "./contact.css";
import { OPD_TIME, clinics, whatsappLink } from "../data/clinics.js";

export default function ContactUs() {

  /*
  =========================================
  FORM STATE
  =========================================
  */

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      phone: "",

      message: ""

    });

  /*
  =========================================
  STATUS
  =========================================
  */

  const [status, setStatus] =
    useState({

      type: "",

      text: ""

    });

  /*
  =========================================
  LOADING
  =========================================
  */

  const [loading, setLoading] =
    useState(false);

  /*
  =========================================
  HANDLE CHANGE
  =========================================
  */

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm({

      ...form,

      [name]: value

    });

  };

  /*
  =========================================
  SUBMIT FORM
  =========================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setStatus({

        type: "",

        text: ""

      });

      try {

        const response =
          await axios.post(

            "/api/submit/contact-submit.php",

            form

          );

        /*
        SUCCESS
        */

        if (
          response.data.success
        ) {

          setStatus({

            type: "success",

            text:
              "✅ Message sent successfully!"

          });

          /*
          RESET FORM
          */

          setForm({

            name: "",

            email: "",

            phone: "",

            message: ""

          });

        } else {

          setStatus({

            type: "error",

            text:
              response.data.message ||
              "❌ Failed to send message"

          });

        }

      } catch (error) {

        console.error(error);

        setStatus({

          type: "error",

          text:
            "❌ Server error. Please try again."

        });

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
      {/* SEO */}
      <Helmet>

        <title>
          Contact Us | Nadi Vaidya Ayurveda & Nadi Pariksha
        </title>

        <meta
          name="description"
          content="
          Contact Nadi Vaidya for Ayurveda consultation,
          Nadi Pariksha, wellness workshops, Ayurvedic products
          and holistic healing guidance by Dr. Ajit Singh Yadav.
          "
        />

      </Helmet>

      <main className="contact-page">

        {/* HERO */}
        <section className="contact-hero">

          <div className="container">

            <div className="contact-hero-content">

              <span className="hero-badge">

                🌿 Karnal • Vrindavan • OPD 8 AM–1 PM

              </span>

              <h1>
                Appointment &amp; Contact
              </h1>

              <p>

                नाड़ी परीक्षा परामर्श के लिए अपने नज़दीकी क्लीनिक पर WhatsApp या कॉल करें।

              </p>

            </div>

          </div>

        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">

          <div className="container">

            <div className="contact-wrapper">

              {/* LEFT SIDE */}
              <div className="contact-info-card">

                <span className="small-title">
                  Our Clinics
                </span>

                <h2>
                  Book Your Nadi Pariksha
                </h2>

                <p className="info-description">

                  OPD {OPD_TIME.label} ({OPD_TIME.labelHi}). नाड़ी वैद्य OPD: हर महीने 1–10 तारीख़ करनाल, 11 से 31 तारीख़ वृंदावन।

                </p>

                {/* INFO ITEMS */}
                <div className="info-list">
                  {clinics.map((c) => (
                    <div className="info-item" key={c.slug}>
                      <div className="info-icon">📍</div>
                      <div>
                        <h4>
                          {c.name} — {c.city}
                        </h4>
                        <p>{c.address}</p>
                        <a href={`tel:+91${c.phone.replace(/\D/g, "")}`}>
                          📞 {c.phone}
                        </a>
                        <a
                          href={whatsappLink(c.phone, `${c.city} clinic`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💬 WhatsApp पर अपॉइंटमेंट
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="contact-form-card">

                <div className="form-heading">

                  <span>

                    Contact Form

                  </span>

                  <h2>

                    Send Us Message

                  </h2>

                  <p>

                    Fill the form below and
                    our team will contact you soon.

                  </p>

                </div>

                {/* FORM */}
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  {/* NAME */}
                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PHONE */}
                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={form.phone}
                      onChange={handleChange}
                    />

                  </div>

                  {/* MESSAGE */}
                  <div className="form-group">

                    <label>
                      Your Message
                    </label>

                    <textarea
                      rows="5"
                      name="message"
                      placeholder="Write your message..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >

                    {loading
                      ? "Sending..."
                      : "Send Message"}

                  </button>

                  {/* STATUS */}
                  {status.text && (

                    <div
                      className={`status-message ${status.type}`}
                    >

                      {status.text}

                    </div>

                  )}

                </form>

              </div>

            </div>

          </div>

        </section>

      </main>

    </>

  );

}