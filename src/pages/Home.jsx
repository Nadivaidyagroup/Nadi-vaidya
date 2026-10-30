// src/pages/Home.jsx

import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import HomeSlider from "../components/HomeSlider.jsx";

import "./home.css";

import section2 from "../assets/images/section2.jpg";
import section3 from "../assets/images/section3.jpg";
import section4 from "../assets/images/section4.jpg";
import section5 from "../assets/images/section5.jpg";

import ProductSection from "../components/ProductSection";
import DietSection from "../components/DietSection";
import TeamSection from "../components/TeamSection";
import SmartLeasing from "../components/SmartLeasing";

/* DATA */
import {
  products,
  diets,
  team
} from "../data/homeData";

export default function Home() {

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Nadi Vaidya | Ayurveda, Nadi Pariksha & Holistic Wellness
        </title>

        <meta
          name="description"
          content="
            Explore Ayurveda, Nadi Pariksha,
            Dosha Diet Plans, Wellness Workshops,
            Ayurvedic Products and Holistic Healing
            with Nadi Vaidya.
          "
        />

      </Helmet>

      {/* HERO SLIDER */}
      <HomeSlider />

      {/* JOIN SECTION */}
      <section className="home-image-section join-section">

        {/* FULL IMAGE CLICK */}
        <Link
          to="https://www.nadivaidya.com/"
          className="image-link"
        >

          <img
            src={section2}
            alt="Nadi Vaidya Workshop"
            loading="lazy"
          />

        </Link>

        {/* BUTTON */}
        <div className="image-btn-wrap left-bottom-btn">

          <Link
            className="image-section-btn join-btn"
            to="https://www.nadivaidya.com/"
          >

            Join Workshop

          </Link>

        </div>

      </section>

      {/* SHOP SECTION */}
      <section className="home-image-section shop-section">

        {/* FULL IMAGE CLICK */}
        <a
          href="https://nadivaidyapharmacy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="image-link"
        >

          <img
            src={section3}
            alt="Nadi Vaidya Pharmacy"
            loading="lazy"
          />

        </a>

        {/* BUTTON */}
        <div className="image-btn-wrap left-bottom-btn">

          <a
            className="image-section-btn shop-btn"
            href="https://nadivaidyapharmacy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >

            Shop Now

          </a>

        </div>

      </section>

      {/* HEAL INDIA */}
      <SmartLeasing/>

      {/* CONTACT SECTION */}
    

      {/* PRODUCTS */}
      <ProductSection products={products} />

      {/* DIET */}
      <DietSection diets={diets} />

      {/* TEAM */}
      <TeamSection team={team} />

    </>

  );

}