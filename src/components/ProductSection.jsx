import Slider from "react-slick";

export default function ProductSection({ products = [] }) {

  const chunkSize = 8;

  // ✅ FIX: make products loop (no empty spaces)
  const filledProducts = [...products];

  while (filledProducts.length % chunkSize !== 0) {
    filledProducts.push(...products);
  }

  // group into slides
  const groupedProducts = [];
  for (let i = 0; i < filledProducts.length; i += chunkSize) {
    groupedProducts.push(filledProducts.slice(i, i + chunkSize));
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className="product-section">
      <div className="container-fluid">
        <h2 className="home-big-title">Nadi Vaidya Products</h2>

        <Slider {...settings}>
          {groupedProducts.map((group, index) => (
            <div key={index} className="product-group">

              {/* ROW 1 */}
              <div className="product-row">
                {group.slice(0, 4).map((product, i) => (
                  <ProductCard key={product.id + "-" + i} product={product} />
                ))}
              </div>

              {/* ROW 2 */}
              <div className="product-row">
                {group.slice(4, 8).map((product, i) => (
                  <ProductCard key={product.id + "-b-" + i} product={product} />
                ))}
              </div>

            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
}


/* CARD */
function ProductCard({ product }) {
  return (
    <div className="product-slide">
      <a href={product.link} target="_blank" rel="noreferrer">
        <div className="product-card">

          <img src={product.image} alt={product.name} loading="lazy" />

          <h4 className="product-name">{product.name}</h4>

          <div className="product-price">
            {product.price}
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice}</span>
            )}
          </div>

        </div>
      </a>
    </div>
  );
}