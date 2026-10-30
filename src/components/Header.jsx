// src/components/Header.jsx

import {
  Link,
  NavLink
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import logoUrl from "../assets/logo/logo.png";
import { OPD_TIME, todaysClinic, whatsappLink } from "../data/clinics.js";

import "./header.css";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Karnal Clinic", path: "/karnal-clinic" },
  { label: "Vrindavan Clinic", path: "/vrindavan-clinic" },
  { label: "About Us", path: "/about-us" },
  { label: "Dosha Quiz", path: "/dosha-quiz" },
  { label: "Contact", path: "/contact-us" }
];

export default function Header() {

  /*
  =========================================
  STATE
  =========================================
  */

  const [open, setOpen] =
    useState(false);

  /*
  =========================================
  BODY LOCK
  =========================================
  */

  useEffect(() => {

    if (open) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";

    }

  }, [open]);

  /*
  =========================================
  ACTIVE CLASS
  =========================================
  */

  const navClass = ({
    isActive
  }) =>

    isActive
      ? "ct-menu-link active"
      : "ct-menu-link";

  return (

    <header className="site-header">

      {/* TOP STRIP */}
      <div className="header-top-strip">

        <div className="container">

          <div className="top-strip-inner">

            <p className="top-strip-text">
              🕗 OPD {OPD_TIME.label} • Karnal 1–10 • Vrindavan 11–31
            </p>
            <a
              href={`tel:+91${todaysClinic().phone.replace(/\D/g, "")}`}
              className="top-call-link"
            >
              📞 {todaysClinic().city}: {todaysClinic().phone}
            </a>

          </div>

        </div>

      </div>

      {/* MAIN HEADER */}
      <div className="ct-header-main">

        <div className="container">

          <div className="ct-nav-row">

            {/* LEFT LOGO */}
            <div className="ct-header-branding">

              <Link
                to="/"
                onClick={() =>
                  setOpen(false)
                }
              >

                <img
                  src={logoUrl}
                  alt="Nadi Vaidya"
                />

              </Link>

            </div>

            {/* DESKTOP NAV */}
            <nav className="desktop-nav">

              <ul className="ct-main-menu">

                {menuItems.map(
                  (item) => (

                    <li
                      key={item.path}
                    >

                      <NavLink

                        end={
                          item.path === "/"
                        }

                        to={item.path}

                        className={navClass}

                      >

                        {item.label}

                      </NavLink>

                    </li>

                  )
                )}

              </ul>

            </nav>

            {/* RIGHT SIDE */}
            <div className="header-right">

              {/* STORE BUTTON */}
              <a
                href={whatsappLink(todaysClinic().phone, `${todaysClinic().city} clinic`)}
                target="_blank"
                rel="noreferrer"
                className="header-store-btn"
              >
                Appointment
              </a>

              {/* MOBILE MENU BUTTON */}
              <button
                aria-label="Open menu"
                className={`mobile-toggle1 ${
                  open
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setOpen(!open)
                }
              >

                <span></span>
                <span></span>
                <span></span>

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          open ? "show" : ""
        }`}
      >

        {/* TOP */}
        <div className="mobile-menu-header">

          <img
            src={logoUrl}
            alt="logo"
          />

          <button
            aria-label="Close menu"
            className="mobile-close-btn"
            onClick={() =>
              setOpen(false)
            }
          >

            ✕

          </button>

        </div>

        {/* LINKS */}
        <ul className="mobile-menu-links">

          {menuItems.map(
            (item) => (

              <li
                key={item.path}
              >

                <NavLink

                  end={
                    item.path === "/"
                  }

                  to={item.path}

                  className={navClass}

                  onClick={() =>
                    setOpen(false)
                  }

                >

                  {item.label}

                </NavLink>

              </li>

            )
          )}

        </ul>

        {/* BUTTON */}
        <a
          href={whatsappLink(todaysClinic().phone, `${todaysClinic().city} clinic`)}
          target="_blank"
          rel="noreferrer"
          className="mobile-shop-btn"
        >
          📲 WhatsApp Appointment
        </a>

      </div>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${
          open ? "show" : ""
        }`}
        onClick={() =>
          setOpen(false)
        }
      ></div>

    </header>

  );

}