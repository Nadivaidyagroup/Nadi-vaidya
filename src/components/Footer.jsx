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
import { OPD_TIME, clinics } from "../data/clinics.js";

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

              Nadi Vaidya clinics in Karnal and Vrindavan — traditional Nadi Pariksha and Ayurveda consultation with the Nadi Vaidya family. घर-घर नाड़ी • घर-घर आयुर्वेद

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
                <Link to="/karnal-clinic">
                  Karnal Clinic
                </Link>
              </li>
              <li>
                <Link to="/vrindavan-clinic">
                  Vrindavan Clinic
                </Link>
              </li>

              <li>
                <a href="https://nadivaidya.com/pages/gallery">
                  Gallery
                </a>
              </li>
              <li>
                <Link to="/dosha-quiz">
                  Dosha Quiz
                </Link>
              </li>

              <li>
                <a href="https://nadivaidya.com/blogs/ayurveda-gyanmala">
                  Ayurveda Gyanmala (Blog)
                </a>
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
              Our Clinics
            </h4>

            <div className="footer-contact-list">
              {clinics.map((c) => (
                <div className="footer-contact-item" key={c.slug}>
                  <div className="footer-contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <Link to={`/${c.slug}`}>
                      <strong>{c.name}</strong>
                    </Link>
                    <span className="footer-location">{c.address}</span>
                    <a href={`tel:+91${c.phone.replace(/\D/g, "")}`}>
                      <FaPhoneAlt /> {c.phone}
                    </a>
                  </div>
                </div>
              ))}
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaLeaf />
                </div>
                <div>
                  <span className="footer-location">
                    OPD {OPD_TIME.label} • {OPD_TIME.labelHi}
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