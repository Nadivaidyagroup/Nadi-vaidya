// src/components/TeamSection.jsx

import Slider from "react-slick";

import "./team.css";

export default function TeamSection({
  team = []
}) {

  const settings = {

    dots: true,

    arrows: false,

    infinite: true,

    speed: 700,

    autoplay: true,

    autoplaySpeed: 3200,

    pauseOnHover: true,

    slidesToShow: 3,

    slidesToScroll: 1,

    adaptiveHeight: false,

    responsive: [

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      }

    ]

  };

  return (

    <section className="team-modern-section">

      <div className="container">

        {/* TOP */}

        <div className="team-top-wrap">

          <span className="team-mini-title">

            🌿 Ayurveda Experts

          </span>

          <h2 className="team-main-title">

            Meet Our Team

          </h2>

          <p className="team-main-text">

            Experienced Ayurveda wellness experts,
            healers and professionals dedicated
            to natural healthcare and holistic healing.

          </p>

        </div>

        {/* DESKTOP SLIDER */}

        <div className="desktop-team-slider">

          <Slider {...settings}>

            {team.map((member, index) => (

              <div
                className="team-slide-item"
                key={index}
              >

                <div className="team-modern-card">

                  <div className="team-image-wrap">

                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />

                    <div className="team-image-overlay"></div>

                  </div>

                  <div className="team-card-content">

                    <h3>

                      {member.name}

                    </h3>

                    <p>

                      {member.role}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </Slider>

        </div>

        {/* MOBILE GRID */}

        <div className="mobile-team-grid">

          {team.map((member, index) => (

            <div
              className="team-modern-card mobile-card"
              key={index}
            >

              <div className="team-image-wrap">

                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />

              </div>

              <div className="team-card-content">

                <h3>

                  {member.name}

                </h3>

                <p>

                  {member.role}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}