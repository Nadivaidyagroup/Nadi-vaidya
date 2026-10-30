// src/pages/KaphaDiet.jsx

import { Helmet } from "react-helmet-async";

import "./kaphaDiet.css";

const sections = [

  {
    title: "Fruits",
    icon: "🍎",

    favor: [
      "Apples",
      "Apricots",
      "Berries",
      "Cherries",
      "Peaches",
      "Pears",
      "Pomegranates",
      "Prunes",
      "Raisins",
      "Raspberries"
    ],

    minor: [
      "Kiwi",
      "Lemons",
      "Limes",
      "Mango",
      "Oranges",
      "Strawberries"
    ],

    avoid: [
      "Bananas",
      "Coconut",
      "Dates",
      "Melons",
      "Papaya",
      "Pineapple",
      "Watermelon",
      "Avocado"
    ]
  },

  {
    title: "Vegetables",
    icon: "🥦",

    favor: [
      "Broccoli",
      "Carrots",
      "Spinach",
      "Garlic",
      "Green Beans",
      "Kale",
      "Leafy Greens",
      "Onions",
      "Radishes",
      "Turnips"
    ],

    minor: [
      "Artichoke",
      "Parsnips",
      "Summer Squash",
      "Zucchini"
    ],

    avoid: [
      "Cucumber",
      "Sweet Potatoes",
      "Pumpkin",
      "Tomatoes (raw)",
      "Zucchini"
    ]
  },

  {
    title: "Grains",
    icon: "🌾",

    favor: [
      "Barley",
      "Buckwheat",
      "Millet",
      "Quinoa",
      "Rye",
      "Spelt",
      "Wild Rice"
    ],

    minor: [
      "Corn",
      "Crackers",
      "Granola"
    ],

    avoid: [
      "Pasta",
      "Rice Cakes",
      "Whole Wheat Flour",
      "White Rice",
      "Yeasted Bread"
    ]
  },

  {
    title: "Dairy",
    icon: "🥛",

    favor: [
      "Buttermilk",
      "Ghee",
      "Goat Milk",
      "Fresh Yogurt"
    ],

    minor: [
      "Goat Cheese",
      "Yogurt Drinks"
    ],

    avoid: [
      "Butter",
      "Cheese",
      "Ice Cream",
      "Cow Milk",
      "Frozen Yogurt"
    ]
  },

  {
    title: "Spices",
    icon: "🌶️",

    favor: [
      "Black Pepper",
      "Cardamom",
      "Cinnamon",
      "Cloves",
      "Cumin",
      "Garlic",
      "Ginger",
      "Turmeric"
    ],

    minor: [
      "Fennel",
      "Fenugreek",
      "Mint"
    ],

    avoid: [
      "Salt",
      "Mango Powder"
    ]
  },

  {
    title: "Beverages",
    icon: "🍵",

    favor: [
      "Apple Juice",
      "Carrot Juice",
      "Herbal Tea",
      "Pomegranate Juice",
      "Warm Spiced Tea"
    ],

    minor: [
      "Almond Milk",
      "Vegetable Broth"
    ],

    avoid: [
      "Cold Drinks",
      "Coffee",
      "Chocolate Drinks",
      "Carbonated Drinks",
      "Iced Tea"
    ]
  }

];

export default function KaphaDiet() {

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Kapha Diet Guide | Ayurveda Kapha Dosha Food List & Lifestyle Tips
        </title>

        <meta
          name="description"
          content="Explore the complete Kapha Diet Guide with Ayurvedic foods, lifestyle tips, Kapha balancing meals, spices, beverages and wellness recommendations for healthy digestion and energy."
        />

        <meta
          name="keywords"
          content="Kapha Diet, Kapha Dosha, Ayurveda Diet, Ayurvedic Food List, Kapha Foods, Kapha Lifestyle Tips, Ayurveda Wellness, Kapha Balance, Ayurvedic Nutrition"
        />

        <meta
          name="author"
          content="Nadi Vaidya"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.nadivaidya.in/kapha-diet"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Kapha Diet Guide | Ayurveda Wellness"
        />

        <meta
          property="og:description"
          content="Discover Ayurvedic Kapha balancing foods, lifestyle practices and wellness tips for better digestion, metabolism and energy."
        />

        <meta
          property="og:url"
          content="https://www.nadivaidya.in/kapha-diet"
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
          content="Kapha Diet Guide"
        />

        <meta
          name="twitter:description"
          content="Ayurvedic Kapha Dosha food guide with balanced diet and lifestyle recommendations."
        />

        <meta
          name="twitter:image"
          content="https://www.nadivaidya.in/og-image.jpg"
        />

        {/* SCHEMA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "Article",

            "headline": "Kapha Diet Guide",

            "description":
              "Complete Ayurvedic Kapha Diet Guide including foods to favor, moderate and avoid along with Kapha lifestyle recommendations.",

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
              "https://www.nadivaidya.in/kapha-diet"

          })}

        </script>

      </Helmet>

      <div className="kapha-page">

        {/* HERO */}
        <section className="kapha-hero">

          <div className="container">

            <div className="kapha-badge">
              Ayurveda • Kapha Balance
            </div>

            <h1>
              Kapha Diet Guide
            </h1>

            <p>
              Balance Kapha dosha with light,
              warm and energizing foods.
              This Ayurvedic guide supports
              digestion, metabolism, wellness
              and overall vitality naturally.
            </p>

          </div>

        </section>

        {/* INTRO */}
        <section className="kapha-intro">

          <div className="container">

            <div className="intro-card">

              <div className="intro-left">

                <h2>
                  What is Kapha Dosha?
                </h2>

                <p>
                  Kapha dosha represents stability,
                  structure and nourishment in Ayurveda.
                  When imbalanced, Kapha may cause
                  sluggish digestion, heaviness,
                  low energy and weight gain.
                </p>

              </div>

              <div className="intro-right">

                <div className="dosha-points">

                  <div className="point">
                    ✅ Warm Foods
                  </div>

                  <div className="point">
                    ✅ Light Meals
                  </div>

                  <div className="point">
                    ✅ Spicy Flavors
                  </div>

                  <div className="point">
                    ❌ Cold Drinks
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FOOD SECTION */}
        <section className="kapha-foods">

          <div className="container">

            {sections.map((section, index) => (

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

                      {section.favor.map(
                        (item, i) => (

                          <li key={i}>
                            {item}
                          </li>

                        )
                      )}

                    </ul>

                  </div>

                  {/* MODERATE */}
                  <div className="diet-card minor">

                    <div className="card-head">

                      <h3>
                        Moderate
                      </h3>

                    </div>

                    <ul>

                      {section.minor.map(
                        (item, i) => (

                          <li key={i}>
                            {item}
                          </li>

                        )
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

                      {section.avoid.map(
                        (item, i) => (

                          <li key={i}>
                            {item}
                          </li>

                        )
                      )}

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
                Daily Kapha Lifestyle Tips
              </h2>

              <div className="tips-grid">

                <div className="tip-item">
                  🌞 Wake up early daily
                </div>

                <div className="tip-item">
                  🚶 Exercise regularly
                </div>

                <div className="tip-item">
                  🌶️ Eat warm spicy foods
                </div>

                <div className="tip-item">
                  🧊 Avoid cold heavy meals
                </div>

                <div className="tip-item">
                  🍵 Drink herbal tea
                </div>

                <div className="tip-item">
                  🧘 Practice yoga & meditation
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </>

  );

}