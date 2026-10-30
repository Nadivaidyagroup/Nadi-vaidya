// src/pages/PittaDiet.jsx

import React from "react";
import { Helmet } from "react-helmet-async";

import "./PittaDiet.css";

const dietData = [

  {
    title: "Fruits",
    icon: "🍎",

    favor: [
      "Generally most sweet fruit",
      "Sweet Apples",
      "Apricots",
      "Sweet Berries",
      "Sweet Cherries",
      "Coconut",
      "Dates",
      "Fresh Figs",
      "Sweet Grapes",
      "Guava",
      "Ripe Mango",
      "Melons",
      "Sweet Oranges",
      "Papaya",
      "Pears",
      "Sweet Pineapple",
      "Pomegranates",
      "Prunes",
      "Raisins",
      "Watermelon",
    ],

    minor: [
      "Avocado",
      "Dried Sweet Fruits",
      "Kiwi",
      "Lemons",
      "Limes",
      "Sweet Quince",
      "Sweet Strawberries",
      "Tamarind",
    ],

    avoid: [
      "Sour Fruits",
      "Bananas",
      "Cranberries",
      "Grapefruit",
      "Green Grapes",
      "Green Mango",
      "Peaches",
      "Persimmons",
      "Rhubarb",
      "Soursop",
    ],
  },

  {
    title: "Vegetables",
    icon: "🥦",

    favor: [
      "Sweet & Bitter Vegetables",
      "Asparagus",
      "Broccoli",
      "Cabbage",
      "Cauliflower",
      "Cucumber",
      "Green Beans",
      "Kale",
      "Leafy Greens",
      "Lettuce",
      "Mushrooms",
      "Okra",
      "Peas",
      "Sweet Potatoes",
      "Zucchini",
    ],

    minor: [
      "Bamboo Shoots",
      "Carrots",
      "Celery",
      "Fresh Corn",
      "Escarole",
      "Parsley",
      "Pumpkin",
      "Spinach",
    ],

    avoid: [
      "Pungent Vegetables",
      "Eggplant",
      "Garlic",
      "Green Chilies",
      "Hot Peppers",
      "Raw Onions",
      "Raw Radishes",
      "Tomatoes",
      "Turnips",
    ],
  },

  {
    title: "Grains",
    icon: "🌾",

    favor: [
      "Amaranth",
      "Barley",
      "Basmati Rice",
      "Couscous",
      "Granola",
      "Oats",
      "Pasta",
      "Quinoa",
      "Rice Cakes",
      "Spelt",
      "Wheat",
    ],

    minor: [
      "Sushi Rice",
      "Brown Rice"
    ],

    avoid: [
      "Buckwheat",
      "Corn",
      "Millet",
      "Muesli",
      "Polenta",
      "Rye",
      "Yeasted Bread",
    ],
  },

  {
    title: "Legumes",
    icon: "🫘",

    favor: [
      "Black Beans",
      "Chickpeas",
      "Kidney Beans",
      "Brown Lentils",
      "Mung Beans",
      "Navy Beans",
      "Pinto Beans",
      "Soy Beans",
      "Tempeh",
      "Tofu",
    ],

    minor: [
      "Tempeh",
      "Cooked Tofu"
    ],

    avoid: [
      "Miso",
      "Red Lentils",
      "Soy Meats",
      "Soy Sauce",
      "Urad Dal",
      "Tur Dal",
    ],
  },

  {
    title: "Dairy",
    icon: "🥛",

    favor: [
      "Unsalted Butter",
      "Soft Cheese",
      "Cottage Cheese",
      "Raw Cow Milk",
      "Ghee",
      "Soft Goat Cheese",
    ],

    minor: [
      "Goat Milk",
      "Homemade Ice Cream",
      "Sweet Yogurt",
    ],

    avoid: [
      "Salted Butter",
      "Buttermilk",
      "Hard Cheese",
      "Frozen Yogurt",
      "Sour Cream",
      "Store Yogurt",
    ],
  }

];

export default function PittaDiet() {

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Pitta Diet Guide | Ayurveda Pitta Dosha Food List & Lifestyle Tips
        </title>

        <meta
          name="description"
          content="Discover the complete Ayurvedic Pitta Diet Guide with cooling foods, balanced meal recommendations, lifestyle tips, herbal teas and foods to avoid for balancing Pitta dosha naturally."
        />

        <meta
          name="keywords"
          content="Pitta Diet, Pitta Dosha, Ayurveda Diet, Ayurvedic Nutrition, Cooling Foods, Pitta Foods, Ayurveda Wellness, Pitta Lifestyle Tips, Ayurvedic Food Guide"
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
          href="https://www.nadivaidya.in/pitta-diet"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Pitta Diet Guide | Ayurveda Wellness"
        />

        <meta
          property="og:description"
          content="Balance excess heat and inflammation naturally with Ayurvedic Pitta balancing foods, herbs and lifestyle guidance."
        />

        <meta
          property="og:url"
          content="https://www.nadivaidya.in/pitta-diet"
        />

        <meta
          property="og:image"
          content="https://www.nadivaidya.in/og-image.jpg"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Pitta Diet Guide"
        />

        <meta
          name="twitter:description"
          content="Ayurvedic Pitta diet food list with cooling lifestyle and wellness recommendations."
        />

        <meta
          name="twitter:image"
          content="https://www.nadivaidya.in/og-image.jpg"
        />

        {/* STRUCTURED DATA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "Article",

            "headline": "Pitta Diet Guide",

            "description":
              "Ayurvedic Pitta Dosha food guide with foods to favor, moderate and avoid along with cooling lifestyle tips.",

            "author": {
              "@type": "Organization",
              "name": "Nadi Vaidya"
            },

            "publisher": {
              "@type": "Organization",
              "name": "Nadi Vaidya",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.nadivaidya.in/logo.png"
              }
            },

            "mainEntityOfPage":
              "https://www.nadivaidya.in/pitta-diet"

          })}

        </script>

      </Helmet>

      <div className="kapha-page">

        {/* HERO */}
        <section className="kapha-hero">

          <div className="container">

            <div className="kapha-badge">
              Ayurvedic Nutrition Guide
            </div>

            <h1>
              Pitta Diet Guide
            </h1>

            <p>
              Balance excess heat, acidity and inflammation
              with cooling, nourishing and calming foods
              according to Ayurvedic wellness principles.
            </p>

          </div>

        </section>

        {/* INTRO */}
        <section className="kapha-intro">

          <div className="container">

            <div className="intro-card">

              <div className="intro-left">

                <h2>
                  Understanding Pitta Dosha
                </h2>

                <p>
                  Pitta dosha is connected with
                  fire and water elements.
                  Balanced Pitta supports
                  digestion, metabolism,
                  intelligence and vitality.
                  Excess Pitta may lead to
                  anger, acidity, inflammation,
                  skin sensitivity and overheating.
                </p>

              </div>

              <div className="dosha-points">

                <div className="point">
                  Cooling Foods
                </div>

                <div className="point">
                  Sweet & Bitter Taste
                </div>

                <div className="point">
                  Avoid Excess Spice
                </div>

                <div className="point">
                  Stay Hydrated
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* DIET SECTIONS */}
        <section className="kapha-foods">

          <div className="container">

            {dietData.map((section, index) => (

              <div
                className="diet-section"
                key={index}
              >

                <div className="section-title">

                  <span>
                    {section.icon}
                  </span>

                  <h2>
                    {section.title}
                  </h2>

                </div>

                <div className="diet-grid">

                  {/* FAVOR */}
                  <div className="diet-card favor">

                    <div className="card-head">

                      <h3>
                        Favor
                      </h3>

                    </div>

                    <ul>

                      {section.favor.map((item, i) => (

                        <li key={i}>
                          {item}
                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* MINOR */}
                  <div className="diet-card minor">

                    <div className="card-head">

                      <h3>
                        Moderate
                      </h3>

                    </div>

                    <ul>

                      {section.minor.length ? (

                        section.minor.map((item, i) => (

                          <li key={i}>
                            {item}
                          </li>

                        ))

                      ) : (

                        <li>
                          —
                        </li>

                      )}

                    </ul>

                  </div>

                  {/* AVOID */}
                  <div className="diet-card avoid">

                    <div className="card-head">

                      <h3>
                        Avoid
                      </h3>

                    </div>

                    <ul>

                      {section.avoid.map((item, i) => (

                        <li key={i}>
                          {item}
                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* TIPS */}
        <section className="kapha-tips">

          <div className="container">

            <div className="tips-box">

              <h2>
                Pitta Balancing Lifestyle Tips
              </h2>

              <div className="tips-grid">

                <div className="tip-item">
                  Prefer cooling and fresh meals
                </div>

                <div className="tip-item">
                  Reduce spicy & fried foods
                </div>

                <div className="tip-item">
                  Avoid excessive heat exposure
                </div>

                <div className="tip-item">
                  Drink room temperature water
                </div>

                <div className="tip-item">
                  Include sweet juicy fruits
                </div>

                <div className="tip-item">
                  Practice calming activities
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </>

  );

}