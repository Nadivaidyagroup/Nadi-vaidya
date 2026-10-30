import Slider from "react-slick";
import "./banner.css";

import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import banner5 from "../assets/images/banner5.jpg";
import banner6 from "../assets/images/banner6.jpg";
import banner7 from "../assets/images/banner7.jpg";

export default function HomeSlider() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false
  };

  const slides = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

  return (
    <section className="home-slider">
      <Slider {...settings}>
        {slides.map((image, index) => (
          <div className="hero-slide" key={image}>
            <a
              href="https://www.nadivaidyapharmacy.com/"
              target="_blank"
              rel="noreferrer"
              className="hero-banner-link"
            >
              <img
                className="hero-banner-img"
                src={image}
                alt={`Nadi Vaidya banner ${index + 1}`}
              />
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
}
