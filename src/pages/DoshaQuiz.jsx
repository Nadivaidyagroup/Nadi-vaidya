// src/pages/DoshaQuiz.jsx

import {
  useState
} from "react";

import axios from "axios";

import {
  Helmet
} from "react-helmet-async";

import "./doshaQuiz.css";

import vataImg from "../assets/images/vata.png";
import pittaImg from "../assets/images/pitta.png";
import kaphaImg from "../assets/images/kapha.png";

import doshaQuestions from "../data/doshaQuestions";

export default function DoshaQuiz() {

  /*
  =========================================
  STATES
  =========================================
  */

  const [startQuiz, setStartQuiz] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState("");

  /*
  =========================================
  ANSWERS
  =========================================
  */

  const [answers, setAnswers] =
    useState({});

  /*
  =========================================
  USER FORM
  =========================================
  */

  const [user, setUser] =
    useState({

      name: "",

      email: "",

      phone: ""

    });

  /*
  =========================================
  HANDLE ANSWER
  =========================================
  */

  const handleAnswer =
    (index, value) => {

      setAnswers({

        ...answers,

        [index]: value

      });

    };

  /*
  =========================================
  CALCULATE DOSHA
  =========================================
  */

  const calculateDosha = () => {

    let vata = 0;

    let pitta = 0;

    let kapha = 0;

    Object.values(answers).forEach((ans) => {

      if (ans === "a") vata++;

      if (ans === "b") pitta++;

      if (ans === "c") kapha++;

    });

    if (
      vata >= pitta &&
      vata >= kapha
    ) {

      return "VATA";

    }

    if (
      pitta >= vata &&
      pitta >= kapha
    ) {

      return "PITTA";

    }

    return "KAPHA";

  };

  const result =
    calculateDosha();

  /*
  =========================================
  RESULT CONTENT
  =========================================
  */

  const resultContent = {

    VATA: {

      image: vataImg,

      title: "VATA",

      short:
        "Creative, energetic, active and sensitive Ayurvedic body type."

    },

    PITTA: {

      image: pittaImg,

      title: "PITTA",

      short:
        "Focused, intelligent, confident and naturally driven personality."

    },

    KAPHA: {

      image: kaphaImg,

      title: "KAPHA",

      short:
        "Calm, grounded, stable and emotionally balanced personality."

    }

  };

  /*
  =========================================
  SUBMIT RESULT
  =========================================
  */

  const handleSubmit =
    async () => {

      if (
        !user.name ||
        !user.email ||
        !user.phone
      ) {

        setStatus(
          "❌ Please fill all fields"
        );

        return;

      }

      setLoading(true);

      setStatus("");

      try {

        const response =
          await axios.post(

            "/api/submit/dosha-submit.php",

            {

              name:
                user.name,

              email:
                user.email,

              phone:
                user.phone,

              result:
                result

            }

          );

        if (
          response.data.success
        ) {

          setShowResult(true);

          setStatus(
            "✅ Result Generated Successfully"
          );

        } else {

          setStatus(

            response.data.message ||
            "❌ Failed To Submit"

          );

        }

      } catch (error) {

        console.error(error);

        setStatus(
          "❌ Server Error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Ayurveda Dosha Quiz | Discover Your Vata, Pitta & Kapha Body Type
        </title>

        <meta
          name="description"
          content="
          Take the Ayurvedic Dosha Quiz by Nadi Vaidya
          and discover your Vata, Pitta or Kapha body constitution.
          "
        />

        <meta
          name="keywords"
          content="
          Ayurveda Dosha Quiz,
          Vata Quiz,
          Pitta Quiz,
          Kapha Quiz,
          Ayurvedic Body Type Test,
          Nadi Pariksha,
          Ayurveda Wellness
          "
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.nadivaidya.in/dosha-quiz"
        />

      </Helmet>

      <main className="dosha-page">

        {/* HERO */}
        <section className="dosha-hero">

          <div className="container">

            <span className="hero-tag">
              Ayurveda • Mind • Body • Balance
            </span>

            <h1>
              Discover Your Ayurvedic Dosha
            </h1>

            <p>
              Take this Ayurveda Dosha Quiz
              and discover whether your
              body constitution is Vata,
              Pitta or Kapha.
            </p>

            {!startQuiz && (

              <button
                className="start-btn"
                onClick={() =>
                  setStartQuiz(true)
                }
              >

                Start Dosha Quiz

              </button>

            )}

          </div>

        </section>

        {/* DOSHA INFO */}
        {!startQuiz && (

          <section className="dosha-info-section">

            <div className="container dosha-grid">

              {/* VATA */}
              <article className="dosha-card">

                <img
                  src={vataImg}
                  alt="
                  Vata Dosha Ayurveda Body Type
                  "
                  loading="lazy"
                />

                <h2>
                  VATA DOSHA
                </h2>

                <p>
                  Air + Ether energy.
                  Creative, active and energetic personality.
                </p>

              </article>

              {/* PITTA */}
              <article className="dosha-card">

                <img
                  src={pittaImg}
                  alt="
                  Pitta Dosha Ayurveda Body Type
                  "
                  loading="lazy"
                />

                <h2>
                  PITTA DOSHA
                </h2>

                <p>
                  Fire + Water energy.
                  Sharp mind and leadership qualities.
                </p>

              </article>

              {/* KAPHA */}
              <article className="dosha-card">

                <img
                  src={kaphaImg}
                  alt="
                  Kapha Dosha Ayurveda Body Type
                  "
                  loading="lazy"
                />

                <h2>
                  KAPHA DOSHA
                </h2>

                <p>
                  Earth + Water energy.
                  Stable, calm and grounded personality.
                </p>

              </article>

            </div>

          </section>

        )}

        {/* QUIZ */}
        {startQuiz &&
          !showForm &&
          !showResult && (

          <section className="quiz-section">

            <div className="container">

              <div className="quiz-heading">

                <h2>
                  Ayurveda Dosha Quiz Questions
                </h2>

                <p>
                  Select the option that best
                  matches your personality,
                  body type and lifestyle.
                </p>

              </div>

              {doshaQuestions.map(
                (item, index) => (

                  <div
                    className="quiz-card"
                    key={index}
                  >

                    <h3>
                      {index + 1}.
                      {" "}
                      {item.question}
                    </h3>

                    {/* OPTION A */}
                    <label>

                      <input
                        type="radio"
                        name={`q-${index}`}
                        checked={
                          answers[index] === "a"
                        }
                        onChange={() =>
                          handleAnswer(index, "a")
                        }
                      />

                      {item.options.a}

                    </label>

                    {/* OPTION B */}
                    <label>

                      <input
                        type="radio"
                        name={`q-${index}`}
                        checked={
                          answers[index] === "b"
                        }
                        onChange={() =>
                          handleAnswer(index, "b")
                        }
                      />

                      {item.options.b}

                    </label>

                    {/* OPTION C */}
                    <label>

                      <input
                        type="radio"
                        name={`q-${index}`}
                        checked={
                          answers[index] === "c"
                        }
                        onChange={() =>
                          handleAnswer(index, "c")
                        }
                      />

                      {item.options.c}

                    </label>

                  </div>

                )
              )}

              {/* BUTTON */}
              <div className="quiz-result-btn">

                <button
                  onClick={() =>
                    setShowForm(true)
                  }
                >

                  Show My Dosha Result

                </button>

              </div>

            </div>

          </section>

        )}

        {/* FORM */}
        {showForm &&
          !showResult && (

          <section className="result-form-section">

            <div className="container">

              <div className="result-form-box">

                <h2>
                  Get Your Dosha Result
                </h2>

                <p>
                  Enter your details to
                  view your Ayurvedic
                  body constitution result.
                </p>

                {/* NAME */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) =>
                    setUser({

                      ...user,

                      name:
                        e.target.value

                    })
                  }
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({

                      ...user,

                      email:
                        e.target.value

                    })
                  }
                />

                {/* PHONE */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({

                      ...user,

                      phone:
                        e.target.value

                    })
                  }
                />

                {/* BUTTON */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                >

                  {loading
                    ? "Please Wait..."
                    : "View My Result"}

                </button>

                {/* STATUS */}
                {status && (

                  <div className="quiz-status">

                    {status}

                  </div>

                )}

              </div>

            </div>

          </section>

        )}

        {/* RESULT */}
        {showResult && (

          <section
            className={`
            modern-result-section
            ${result.toLowerCase()}
            `}
          >

            <div className="container">

              <div className="modern-result-header">

                {/* IMAGE */}
                <div className="modern-result-image">

                  <img
                    src={
                      resultContent[result].image
                    }
                    alt={`
                    ${result} Dosha Result
                    `}
                    loading="lazy"
                  />

                </div>

                {/* INFO */}
                <div className="modern-result-info">

                  <span className="result-tag">

                    YOUR AYURVEDIC BODY TYPE

                  </span>

                  <h2>

                    {
                      resultContent[result].title
                    }
                    {" "}
                    DOSHA

                  </h2>

                  <p className="result-short">

                    {
                      resultContent[result].short
                    }

                  </p>

                </div>

              </div>

            </div>

          </section>

        )}

      </main>

    </>

  );

}