// src/pages/ContactUs.jsx

import {
  useState
} from "react";

import axios from "axios";

import {
  Helmet
} from "react-helmet-async";

import "./contact.css";

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

                🌿 Ayurveda • Wellness • Nadi Pariksha

              </span>

              <h1>

                Contact Nadi Vaidya

              </h1>

              <p>

                Connect with us for Ayurveda consultation,
                wellness support, Nadi Pariksha workshops
                and holistic healing guidance.

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

                  Get In Touch

                </span>

                <h2>

                  Let’s Begin Your
                  Wellness Journey

                </h2>

                <p className="info-description">

                  We are here to help you with Ayurvedic
                  consultations, wellness guidance,
                  herbal support and Nadi Pariksha programs.

                </p>

                {/* INFO ITEMS */}
                <div className="info-list">

                  {/* ADDRESS */}
                  <div className="info-item">

                    <div className="info-icon">

                      📍

                    </div>

                    <div>

                      <h4>
                        Address
                      </h4>

                      <p>

                        Nadi Vaidya Pharmacy Pvt Ltd,
                        India

                      </p>

                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="info-item">

                    <div className="info-icon">

                      📞

                    </div>

                    <div>

                      <h4>
                        Phone Number
                      </h4>

                      <a href="tel:+918950770385">

                        +91 8950770385

                      </a>

                      <a href="tel:+919992242267">

                        +91 9992242267

                      </a>

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="info-item">

                    <div className="info-icon">

                      ✉️

                    </div>

                    <div>

                      <h4>
                        Email Address
                      </h4>

                      <a href="mailto:nadivaidyapharmacy@gmail.com">

                        nadivaidyapharmacy@gmail.com

                      </a>

                      <a href="mailto:nadivaidyatrust@gmail.com">

                        nadivaidyatrust@gmail.com

                      </a>

                    </div>

                  </div>

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