// src/components/FloatingContactButtons.jsx

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaTimes
} from "react-icons/fa";

import {
  IoSparkles
} from "react-icons/io5";

import "./floatingContactButtons.css";

export default function FloatingContactButtons() {

  /*
  =========================================
  MENU STATE
  =========================================
  */

  const [open, setOpen] =
    useState(false);

  /*
  =========================================
  AUTO POPUP STATE
  =========================================
  */

  const [autoOpened, setAutoOpened] =
    useState(false);

  /*
  =========================================
  TIMER REF
  =========================================
  */

  const autoCloseTimer =
    useRef(null);

  /*
  =========================================
  AUTO OPEN AFTER 15 SEC
  =========================================
  */

  useEffect(() => {

    /*
    ONLY FIRST TIME
    */

    if (
      sessionStorage.getItem(
        "floatingPopupShown"
      )
    ) {
      return;
    }

    /*
    OPEN AFTER 15 SEC
    */

    const timer =
      setTimeout(() => {

        setOpen(true);

        setAutoOpened(true);

        /*
        SAVE SESSION
        */

        sessionStorage.setItem(
          "floatingPopupShown",
          "true"
        );

        /*
        AUTO CLOSE AFTER 10 SEC
        */

        autoCloseTimer.current =
          setTimeout(() => {

            setOpen(false);

          }, 10000);

      }, 15000);

    return () => {

      clearTimeout(timer);

      clearTimeout(
        autoCloseTimer.current
      );

    };

  }, []);

  /*
  =========================================
  HANDLE TOGGLE
  =========================================
  */

  const handleToggle = () => {

    /*
    IF USER CLICKED
    STOP AUTO CLOSE
    */

    if (
      autoCloseTimer.current
    ) {

      clearTimeout(
        autoCloseTimer.current
      );

    }

    setOpen(!open);

  };

  /*
  =========================================
  HANDLE CLOSE
  =========================================
  */

  const handleClose = () => {

    if (
      autoCloseTimer.current
    ) {

      clearTimeout(
        autoCloseTimer.current
      );

    }

    setOpen(false);

  };

  return (

    <div className="floating-contact-area">

      {/* BACKDROP */}
      <div
        className={`floating-backdrop ${
          open ? "show" : ""
        }`}
        onClick={handleClose}
      ></div>

      {/* NOTIFICATION */}
      {!open && !autoOpened && (

        <div className="floating-notification">

          Need Help? 👋

        </div>

      )}

      {/* MAIN BUTTON */}
      <button
        className={`floating-trigger ${
          open ? "active" : ""
        }`}
        onClick={handleToggle}
      >

        {/* RING */}
        <span className="trigger-wave"></span>

        {/* ICON */}
        <span className="trigger-icon">

          {open
            ? <FaTimes />
            : <IoSparkles />
          }

        </span>

        {/* ONLINE DOT */}
        <span className="online-dot"></span>

      </button>

      {/* MENU */}
      <div
        className={`floating-menu-box ${
          open ? "open" : ""
        }`}
      >

        {/* MESSAGE */}
        <div className="welcome-box">

          <p>

            👋 Welcome to Nadi Vaidya.
            How can we help you today?

          </p>

        </div>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/918950770385"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-card whatsapp-card"
        >

          <div className="floating-card-icon">

            <FaWhatsapp />

          </div>

          <div className="floating-card-content">

            <h4>
              WhatsApp Chat
            </h4>

            <span>
              Instant Support
            </span>

          </div>

          <div className="floating-arrow">

            ↗

          </div>

        </a>

        {/* CALL */}
        <a
          href="tel:+918950770385"
          className="floating-card call-card"
        >

          <div className="floating-card-icon">

            <FaPhoneAlt />

          </div>

          <div className="floating-card-content">

            <h4>
              Call Expert
            </h4>

            <span>
              Talk Directly
            </span>

          </div>

          <div className="floating-arrow">

            ↗

          </div>

        </a>

        {/* EMAIL */}
        <a
          href="mailto:nadivaidyapharmacy@gmail.com"
          className="floating-card email-card"
        >

          <div className="floating-card-icon">

            <FaEnvelope />

          </div>

          <div className="floating-card-content">

            <h4>
              Email Us
            </h4>

            <span>
              Send Inquiry
            </span>

          </div>

          <div className="floating-arrow">

            ↗

          </div>

        </a>

        {/* CONTACT PAGE */}
        <Link
          to="/contact-us"
          className="floating-card website-card"
        >

          <div className="floating-card-icon">

            <FaGlobe />

          </div>

          <div className="floating-card-content">

            <h4>
              Contact Page
            </h4>

            <span>
              More Information
            </span>

          </div>

          <div className="floating-arrow">

            ↗

          </div>

        </Link>

      </div>

    </div>

  );

}