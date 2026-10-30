// src/pages/NadiParikshaForm.jsx

import {
  useState
} from "react";

import axios from "axios";

import { Helmet } from "react-helmet-async";

import "./nadiParikshaForm.css";

export default function NadiParikshaForm() {

  /*
  =========================================
  FORM STATE
  =========================================
  */

  const [formData, setFormData] =
    useState({

      full_name: "",

      gender: "",

      age: "",

      education: "",

      phone: "",

      whatsapp: "",

      email: "",

      country: "",

      city: "",

      state: "",

      address: "",

      message: ""

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
  SUCCESS / ERROR MESSAGE
  =========================================
  */

  const [responseMessage, setResponseMessage] =
    useState("");

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

    setFormData({

      ...formData,

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

      setResponseMessage("");

      try {

        const response =
          await axios.post(

            "/api/submit/nadi-submit.php",

            formData

          );

        if (
          response.data.success
        ) {

          setResponseMessage(
            "✅ Registration Submitted Successfully"
          );

          /*
          RESET FORM
          */

          setFormData({

            full_name: "",

            gender: "",

            age: "",

            education: "",

            phone: "",

            whatsapp: "",

            email: "",

            country: "",

            city: "",

            state: "",

            address: "",

            message: ""

          });

        } else {

          setResponseMessage(

            response.data.message ||
            "❌ Failed To Submit Form"

          );

        }

      } catch (error) {

        console.error(error);

        setResponseMessage(
          "❌ Server Error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
      <Helmet>

        <title>
          Nadi Pariksha Registration Form | Join Ayurveda Workshop
        </title>

        <meta
          name="description"
          content="
          Register for Nadi Pariksha and Ayurveda workshops by Nadi Vaidya Gurukul.
          Join authentic pulse diagnosis training and holistic wellness programs.
          "
        />

        <meta
          name="keywords"
          content="
          Nadi Pariksha Form,
          Ayurveda Registration,
          Pulse Diagnosis Workshop,
          Ayurveda Course,
          Nadi Vaidya Gurukul,
          Dr Ajit Singh Yadav,
          Ayurvedic Workshop Form
          "
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
          href="https://nadivaidya.in/nadi-pariksha-form"
        />

        {/* OPEN GRAPH */}

        <meta
          property="og:title"
          content="Nadi Pariksha Registration Form"
        />

        <meta
          property="og:description"
          content="
          Join Nadi Pariksha workshops and Ayurveda wellness training.
          "
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://nadivaidya.in/nadi-pariksha-form"
        />

        {/* TWITTER */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Nadi Pariksha Registration Form"
        />

        <meta
          name="twitter:description"
          content="
          Join Ayurveda and Nadi Pariksha workshops by Nadi Vaidya.
          "
        />

      </Helmet>

      <main className="npf-page">

        {/* HERO */}
        <section className="npf-hero">

          <div className="container">

            <div className="npf-hero-content">

              <span className="npf-badge">
                Ayurveda • Nadi Pariksha • Wellness
              </span>

              <h1>
                Join Nadi Pariksha Workshop
              </h1>

              <p>
                Register now for authentic Ayurveda and pulse diagnosis
                workshops guided by experienced Ayurvedic experts.
              </p>

            </div>

          </div>

        </section>

        {/* FORM */}
        <section className="npf-form-section">

          <div className="container">

            <div className="npf-form-wrapper">

              {/* TOP */}
              <div className="npf-form-top">

                <span className="npf-mini-title">
                  Registration Form
                </span>

                <h2>
                  Join Us
                </h2>

                <p>
                  Fill in your details and become part
                  of our Ayurveda wellness mission.
                </p>

              </div>

              {/* FORM */}
              <form
                className="npf-form"
                onSubmit={handleSubmit}
              >

                <div className="npf-grid">

                  {/* FULL NAME */}
                  <div className="npf-field">

                    <label htmlFor="full_name">
                      Full Name
                    </label>

                    <input
                      id="full_name"
                      type="text"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* GENDER */}
                  <div className="npf-field">

                    <label htmlFor="gender">
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                  {/* AGE */}
                  <div className="npf-field">

                    <label htmlFor="age">
                      Age
                    </label>

                    <input
                      id="age"
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={handleChange}
                    />

                  </div>

                  {/* EDUCATION */}
                  <div className="npf-field">

                    <label htmlFor="education">
                      Education
                    </label>

                    <input
                      id="education"
                      type="text"
                      name="education"
                      placeholder="Education"
                      value={formData.education}
                      onChange={handleChange}
                    />

                  </div>

                  {/* PHONE */}
                  <div className="npf-field">

                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* WHATSAPP */}
                  <div className="npf-field">

                    <label htmlFor="whatsapp">
                      Whatsapp Number
                    </label>

                    <input
                      id="whatsapp"
                      type="tel"
                      name="whatsapp"
                      placeholder="Whatsapp Number"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="npf-field npf-full">

                    <label htmlFor="email">
                      Mail Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>

                  {/* COUNTRY */}
                  <div className="npf-field">

                    <label htmlFor="country">
                      Country
                    </label>

                    <input
                      id="country"
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                    />

                  </div>

                  {/* CITY */}
                  <div className="npf-field">

                    <label htmlFor="city">
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>

                  {/* STATE */}
                  <div className="npf-field">

                    <label htmlFor="state">
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />

                  </div>

                  {/* ADDRESS */}
                  <div className="npf-field npf-full">

                    <label htmlFor="address">
                      Address
                    </label>

                    <textarea
                      id="address"
                      rows="4"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>

                  </div>

                  {/* MESSAGE */}
                  <div className="npf-field npf-full">

                    <label htmlFor="message">
                      Type your message
                    </label>

                    <textarea
                      id="message"
                      rows="6"
                      name="message"
                      placeholder="Message..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="npf-submit-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Submitting..."
                    : "Submit Registration"}

                </button>

                {/* RESPONSE */}
                {responseMessage && (

                  <div className="npf-response-message">

                    {responseMessage}

                  </div>

                )}

              </form>

            </div>

          </div>

        </section>

      </main>
    </>

  );

}