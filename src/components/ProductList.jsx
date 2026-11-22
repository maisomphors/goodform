export default function ProductList({ products, addToCart }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Better gear.<br /><span>Better days.</span></h1>
          <p className="hero-description">
            The everyday tech essentials you need, picked with care and priced
            to make sense.
          </p>
          <a className="hero-link" href="#products">
            Shop the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-product hero-laptop">💻</div>
          <div className="hero-product hero-mouse">🖱️</div>
          <div className="hero-note"><strong>4</strong><span>daily<br />essentials</span></div>
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-sparkle sparkle-two">✦</span>
        </div>
      </section>

      <section className="collection-section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE SHORTLIST</p>
            <h2>Small collection. Big upgrade.</h2>
          </div>
          <span className="product-count">0{products.length} essentials</span>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article key={product.id} className="product-card">
              <div className={`product-art product-art-${product.color}`}>
                <span className="product-number">0{index + 1}</span>
                <span className="product-icon" role="img" aria-label={product.title}>
                  {product.icon}
                </span>
                <span className="product-art-caption">{product.category}</span>
              </div>
              <div className="product-body">
                <div className="product-details">
                  <div>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                  </div>
                  <p className="product-price">${product.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="add-btn"
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to cart <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="store-footer">
        <span>Good tech. Good days.</span>
        <span>Thoughtful essentials for your everyday setup.</span>
      </footer>
    </>
  );
}