import { Link } from "react-router-dom";

export default function DietSection({ diets }) {

  return (

    <section className="dosha-diet-section">

      <div className="container">

        <h2 className="home-big-title">
          Doshic Diet
        </h2>

        <div className="row">

          {diets.map((diet) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={diet.title}
            >

              <div className="diet-card">

                <img
                  src={diet.image}
                  alt={diet.title}
                />

                <h3>
                  {diet.title}
                </h3>

                <p>
                  {diet.text}
                </p>

                <Link
                  className="diet-btn"
                  to={diet.link}
                >
                  Read More
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}