export default function Navbar({ page, setPage, totalItems }) {
  return (
    <header className="top-navbar">
      <div className="top-navbar-inner">
        <button
          type="button"
          className="store-logo"
          onClick={() => setPage("shop")}
          aria-label="Good Form Tech home"
        >
          <span className="store-logo-mark">g.</span>
          <span className="store-logo-text">goodform<span> tech</span></span>
        </button>

        <nav className="top-nav-links" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => setPage("shop")}
            className={`nav-tab-btn ${page === "shop" ? "active" : ""}`}
          >
            Shop
          </button>

          <button
            type="button"
            onClick={() => setPage("cart")}
            className={`nav-tab-btn ${page === "cart" ? "active" : ""}`}
          >
            <span>Bag</span>
            <span className="nav-cart-count">{totalItems}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}