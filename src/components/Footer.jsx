// src/components/Footer.jsx

import { Link } from "react-router-dom";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLeaf,
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

import {
  MdHealthAndSafety
} from "react-icons/md";

import {
  GiMedicines
} from "react-icons/gi";

import {
  PiStudentFill
} from "react-icons/pi";

import logoUrl from "../assets/logo/logo.png";

import FloatingContactButtons from "./FloatingContactButtons.jsx";

import "./footer.css";

export default function Footer() {

  const year =
    new Date().getFullYear();

  return (

    <footer className="footer-modern">

      <div className="footer-overlay"></div>

      <div className="container footer-container">

        <div className="footer-grid">

          {/* =========================================
          ABOUT
          ========================================= */}
          <div className="footer-col footer-about">

            <img
              src={logoUrl}
              alt="Nadi Vaidya Logo"
              className="footer-logo"
            />

            <p className="footer-desc">

              Nadi Vaidya Gurukul Pvt. Ltd,
              Nadi Vaidya Pharmacy Pvt. Ltd,
              and Nadi Vaidya Trust are dedicated
              to spreading Ayurveda, Nadi Pariksha,
              wellness awareness, and holistic healing
              across India.

            </p>

            {/* SOCIAL */}
            <div className="footer-socials">

              <a
                href="https://www.facebook.com/share/18zanZCXcq/"
                aria-label="Facebook"
              >

                <FaFacebookF />

              </a>

              <a
                href="https://www.instagram.com/nadi_vaidya_ajit_singh_yadav?igsh=amJhMDQ0ZGhwcXNs"
                aria-label="Instagram"
              >

                <FaInstagram />

              </a>

              <a
                href="https://youtube.com/@nadivaidyaajitsinghyadav8641?si=QWytqkbfsDmoFlu5"
                aria-label="YouTube"
              >

                <FaYoutube />

              </a>

            </div>

          </div>

          {/* =========================================
          QUICK LINKS
          ========================================= */}
          <div className="footer-col">

            <h4>

              Quick Links

            </h4>

            <ul className="footer-links">

              <li>

                <Link to="/">

                  Home

                </Link>

              </li>

              <li>

                <Link to="/about-us">

                  About Us

                </Link>

              </li>

              <li>

                <Link to="/gallery">

                  Gallery

                </Link>

              </li>

              <li>

                <Link to="https://www.nadivaidya.com/">

                  Free Workshop

                </Link>

              </li>

              <li>

                <Link to="/dosha-quiz">

                  Dosha Quiz

                </Link>

              </li>

              <li>

                <Link to="/news-blogs">

                  News & Blogs

                </Link>

              </li>

              <li>

                <Link to="/contact-us">

                  Contact Us

                </Link>

              </li>

            </ul>

          </div>

          {/* =========================================
          CONTACT INFO
          ========================================= */}
          <div className="footer-col">

            <h4>

              Contact Info

            </h4>

            <div className="footer-contact-list">

              {/* PHONE */}
              <div className="footer-contact-item">

                <div className="footer-contact-icon">

                  <FaPhoneAlt />

                </div>

                <div>

                  <a href="tel:+918950770385">

                    +91 8950770385

                  </a>

                  <a href="tel:+919992242267">

                    +91 9992242267

                  </a>

                </div>

              </div>

              {/* EMAIL */}
              <div className="footer-contact-item">

                <div className="footer-contact-icon">

                  <FaEnvelope />

                </div>

                <div>

                  <a href="mailto:nadivaidyapharmacy@gmail.com">

                    nadivaidyapharmacy@gmail.com

                  </a>

                  <a href="mailto:nadivaidyatrust@gmail.com">

                    nadivaidyatrust@gmail.com

                  </a>

                </div>

              </div>

              {/* LOCATION */}
              <div className="footer-contact-item">

                <div className="footer-contact-icon">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <span className="footer-location">

                    Karnal, Haryana, India

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =========================================
          ORGANIZATIONS
          ========================================= */}
          <div className="footer-col">

            <h4>

              Our Organizations

            </h4>

            <ul className="footer-org-list">

              <li>

                <span className="org-icon">

                  <PiStudentFill />

                </span>

                <a href="tel:+918950770385">

                  Nadi Vaidya Gurukul Pvt Ltd

                </a>

              </li>

              <li>

                <span className="org-icon">

                  <GiMedicines />

                </span>

                <a href="tel:+917015614500">

                  Nadi Vaidya Pharmacy Pvt Ltd

                </a>

              </li>

              <li>

                <span className="org-icon">

                  <MdHealthAndSafety />

                </span>

                <a href="tel:+919992242267">

                  Nadi Vaidya Trust

                </a>

              </li>

              <li>

                <span className="org-icon">

                  <FaLeaf />

                </span>

                <a href="tel:+918950770385">

                  AyurVaidya Wellness

                </a>

              </li>

            </ul>

          </div>

        </div>

        {/* =========================================
        FOOTER BOTTOM
        ========================================= */}
        <div className="footer-bottom">

          <p>

            © {year} Nadi Vaidya.
            All Rights Reserved.

          </p>

        </div>

      </div>

      <FloatingContactButtons />

    </footer>

  );

}