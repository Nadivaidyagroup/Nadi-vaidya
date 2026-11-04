// src/pages/VataDiet.jsx

import { Helmet } from "react-helmet-async";

import "./VataDiet.css";

const sections = [

  {
    title: "Fruits",
    icon: "🍎",

    favor: [
      "Apples",
      "Applesauce",
      "Apricots",
      "Berries",
      "Cherries",
      "Guava",
      "Peaches",
      "Pears",
      "Pomegranates",
      "Prunes"
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
      "Avocado",
      "Bananas",
      "Coconut",
      "Dates",
      "Melons",
      "Papaya",
      "Watermelon"
    ]
  },

  {
    title: "Vegetables",
    icon: "🥦",

    favor: [
      "Asparagus",
      "Beets",
      "Broccoli",
      "Carrots",
      "Garlic",
      "Green Beans",
      "Kale",
      "Lettuce",
      "Spinach",
      "Turnips"
    ],

    minor: [
      "Artichoke",
      "Parsnips",
      "Plantain",
      "Summer Squash"
    ],

    avoid: [
      "Cucumber",
      "Pumpkin",
      "Sweet Potatoes",
      "Tomatoes Raw",
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
      "Wild Rice",
      "Rye",
      "Spelt"
    ],

    minor: [
      "Corn",
      "Crackers",
      "Granola"
    ],

    avoid: [
      "Cooked Oats",
      "Pasta",
      "Rice Cakes",
      "Wheat",
      "Yeasted Bread"
    ]
  },

  {
    title: "Dairy",
    icon: "🥛",

    favor: [
      "Buttermilk",
      "Ghee",
      "Goat Cheese",
      "Goat Milk",
      "Fresh Yogurt"
    ],

    minor: [
      "Goat Milk",
      "Yogurt Drinks"
    ],

    avoid: [
      "Butter",
      "Cow Milk",
      "Ice Cream",
      "Sour Cream",
      "Frozen Yogurt"
    ]
  }

];

export default function VataDiet() {

  return (

    <>

      {/* SEO */}
      <Helmet>

        <title>
          Vata Diet Guide | Ayurveda Diet For Vata Dosha | Nadi Vaidya
        </title>

        <meta
          name="description"
          content="Explore the complete Ayurvedic Vata Diet Guide by Nadi Vaidya. Learn the best foods, fruits, vegetables, grains, dairy products, and lifestyle tips to balance Vata Dosha naturally."
        />

        <meta
          name="keywords"
          content="
            Vata Diet,
            Vata Dosha Diet,
            Ayurveda Diet,
            Ayurvedic Food Guide,
            Vata Balancing Foods,
            Vata Lifestyle,
            Ayurvedic Wellness,
            Nadi Vaidya,
            Ayurveda Nutrition,
            Holistic Healing
          "
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
          href="https://www.nadivaidya.in/vata-diet"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Vata Diet Guide | Ayurveda Nutrition & Wellness"
        />

        <meta
          property="og:description"
          content="Discover the best Ayurvedic foods and lifestyle practices to balance Vata Dosha naturally with the Vata Diet Guide from Nadi Vaidya."
        />

        <meta
          property="og:url"
          content="https://www.nadivaidya.in/vata-diet"
        />

        <meta
          property="og:site_name"
          content="Nadi Vaidya"
        />

        <meta
          property="og:image"
          content="https://www.nadivaidya.in/og-image.jpg?v=2"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Vata Diet Guide | Ayurvedic Wellness"
        />

        <meta
          name="twitter:description"
          content="Balance Vata Dosha with warm, grounding and nourishing foods using this Ayurvedic Vata Diet Guide."
        />

        <meta
          name="twitter:image"
          content="https://www.nadivaidya.in/og-image.jpg?v=2"
        />

        {/* STRUCTURED DATA */}
        <script type="application/ld+json">

          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "Article",

            "headline":
              "Vata Diet Guide",

            "description":
              "Ayurvedic Vata Diet Guide with foods, wellness tips and lifestyle recommendations for balancing Vata Dosha naturally.",

            "author": {
              "@type": "Organization",
              "name": "Nadi Vaidya"
            },

            "publisher": {
              "@type": "Organization",
              "name": "Nadi Vaidya",

              "logo": {
                "@type": "ImageObject",
                "url":
                  "https://www.nadivaidya.in/logo.png"
              }
            },

            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id":
                "https://www.nadivaidya.in/vata-diet"
            }

          })}

        </script>

      </Helmet>

      <div className="vata-page">

        {/* HERO */}
        <section className="vata-hero">

          <div className="container">

            <div className="vata-badge">
              Ayurveda • Vata Balance
            </div>

            <h1>
              Vata Diet Guide
            </h1>

            <p>
              Balance Vata dosha with warm,
              grounding and nourishing foods.
              This Ayurvedic guide supports calmness,
              digestion and overall wellness.
            </p>

          </div>

        </section>

        {/* INTRO */}
        <section className="vata-intro">

          <div className="container">

            <div className="intro-card">

              <div className="intro-left">

                <h2>
                  What is Vata Dosha?
                </h2>

                <p>
                  Vata is connected with movement,
                  dryness and lightness. When imbalanced
                  it may cause anxiety, bloating,
                  dry skin and irregular digestion.
                </p>

              </div>

              <div className="intro-right">

                <div className="dosha-points">

                  <div className="point">
                    ✅ Warm Foods
                  </div>

                  <div className="point">
                    ✅ Grounding Meals
                  </div>

                  <div className="point">
                    ✅ Healthy Oils
                  </div>

                  <div className="point">
                    ❌ Cold Dry Foods
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FOOD SECTION */}
        <section className="vata-foods">

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

                  {/* MINOR */}
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
        <section className="vata-tips">

          <div className="container">

            <div className="tips-box">

              <h2>
                Daily Vata Lifestyle Tips
              </h2>

              <div className="tips-grid">

                <div className="tip-item">
                  🌞 Follow a regular routine
                </div>

                <div className="tip-item">
                  🥣 Eat warm cooked meals
                </div>

                <div className="tip-item">
                  🧘 Practice meditation
                </div>

                <div className="tip-item">
                  💤 Get enough sleep
                </div>

                <div className="tip-item">
                  🍵 Drink warm herbal tea
                </div>

                <div className="tip-item">
                  🚶 Gentle yoga & walking
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </>

  );

}