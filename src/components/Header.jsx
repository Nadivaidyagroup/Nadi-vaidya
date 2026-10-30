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

import "./header.css";

const menuItems = [

  {
    label: "Home",
    path: "/"
  },

  {
    label: "About Us",
    path: "/about-us"
  },

  {
    label: "Gallery",
    path: "/gallery"
  },

  {
    label: "Free Workshop",
    path: "https://www.nadivaidya.com/"
  },

  {
    label: "Dosha Quiz",
    path: "/dosha-quiz"
  },

  {
    label: "News & Blogs",
    path: "/news-blogs"
  },

  {
    label: "Contact Us",
    path: "/contact-us"
  }

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

              🌿 Ayurveda Wellness & Nadi Pariksha

            </p>

            <a
              href="tel:+918950770385"
              className="top-call-link"
            >

              📞 +91 8950770385

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
                href="https://nadivaidyapharmacy.com/"
                target="_blank"
                rel="noreferrer"
                className="header-store-btn"
              >

                Shop Now

              </a>

              {/* MOBILE MENU BUTTON */}
              <button
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
          href="https://nadivaidyapharmacy.com/"
          target="_blank"
          rel="noreferrer"
          className="mobile-shop-btn"
        >

          🛒 Visit Store

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