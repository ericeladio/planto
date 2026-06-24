import './App.css'

const LOGO_PLANT =
  'https://api.builder.io/api/v1/image/assets/TEMP/feb0cdd5abc33a006541acaa2d41286c5d672234?width=96'
const SEARCH_ICON =
  'https://api.builder.io/api/v1/image/assets/TEMP/319c48270f0c481659c695639b3bc2a1642b117a?width=52'
const HERO_PLANT =
  'https://api.builder.io/api/v1/image/assets/TEMP/ef8a32dcec484a9b60dbaa0f8ae73718cced7c81?width=918'
const PRODUCT_LEFT =
  'https://api.builder.io/api/v1/image/assets/TEMP/763dd970ada067132be533eb7ebccbde943dae86?width=1202'
const PRODUCT_RIGHT =
  'https://api.builder.io/api/v1/image/assets/TEMP/e44f8798449db0c15aa91c37cdce7c11975284dd?width=1464'
const BAG_ICON =
  'https://api.builder.io/api/v1/image/assets/TEMP/550025c01c74d82d9dbe574de8b950c0151eab35?width=68'
const CARD_BAG_ICON =
  'https://api.builder.io/api/v1/image/assets/TEMP/3b491c1d487508b9e434593922617afb444ba3cb?width=54'
const O2_PLANT =
  'https://api.builder.io/api/v1/image/assets/TEMP/fa3a58342254182b92a36092f9d4f5a0b11ecf6a?width=1789'
const ARROW_LEFT =
  'https://api.builder.io/api/v1/image/assets/TEMP/6792e81bb7bd6c1ddcd98456c914e058ea9a3aad?width=48'
const ARROW_RIGHT =
  'https://api.builder.io/api/v1/image/assets/TEMP/9ab8fa0d2ad0f76b4bb2040e01428dff6b091bec?width=50'

const CUSTOMER_REVIEWS = [
  {
    name: 'Maxn Raval',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#5a3a28',
  },
  {
    name: 'venely k',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#7a4a3a',
  },
  {
    name: 'Lii thakur',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#4a5a6a',
  },
]

const TOP_SELLING_PLANTS = [
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/d335a913dbba57246363adb5f6b65028d5a6abad?width=918',
  },
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/c3deee742429635aa5bd0be3d16a82edce2457f3?width=918',
  },
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/31e5e608156f09389c0ac4e8bbdd7ff4b9fbb4be?width=918',
  },
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/12f34ae16439ae788c3fa31722bfa3b1a7a67fd9?width=918',
  },
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/b02a0413d3df262c6f931e3fa9ee7c1f1626f2f7?width=918',
  },
  {
    name: 'Calathea plant',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 'Rs. 359/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/5316816ff52ae9b3ef62af45bfce99cb08476b4c?width=918',
  },
]

function App() {
  return (
    <div className="page-wrapper">
      {/* ───── Navbar ───── */}
      <header className="navbar">
        <div className="nav-logo">
          <img src={LOGO_PLANT} alt="Planto plant icon" className="nav-logo-icon" />
          <span className="nav-brand">Planto.</span>
        </div>

        <nav className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <div className="nav-link nav-dropdown">
            Plants Type
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
              <path d="M6 7L0.803847 1.75L11.1962 1.75L6 7Z" fill="white" />
            </svg>
          </div>
          <a href="#" className="nav-link">More</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>

        <img src={SEARCH_ICON} alt="Search" className="nav-search-icon" />
      </header>

      <main>
        {/* ───── Hero ───── */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Breath Natureal</h1>
            <p className="hero-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="hero-cta">
              <button className="btn-outline-white">Explore</button>
              <button className="btn-demo">
                <span className="btn-demo-play">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                    <path
                      d="M15 7.268C16.333 8.033 16.333 9.967 15 10.732L3 17.66C1.667 18.425 0 17.45 0 15.928V2.072C0 0.55 1.667-0.425 3 0.34L15 7.268Z"
                      fill="white"
                      opacity="0.75"
                    />
                  </svg>
                </span>
                Live Demo...
              </button>
            </div>

            <div className="hero-reviewer">
              <div className="reviewer-avatar" aria-hidden="true" />
              <div className="reviewer-meta">
                <span className="reviewer-name">alena Patel</span>
                <div className="reviewer-stars" aria-label="4.5 stars">
                  {[0, 1, 2, 3].map((i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FFF84E">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.4l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                  ))}
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="half-star">
                        <stop offset="50%" stopColor="#FFF84E" />
                        <stop offset="50%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.4l-6.2 4.5 2.4-7.4L2 9.4h7.6z"
                      fill="url(#half-star)"
                      stroke="#FFF84E"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <p className="hero-review-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt...
            </p>
          </div>

          {/* Hero frosted glass card */}
          <div className="hero-visual">
            <img src={HERO_PLANT} alt="Calathea plant" className="hero-plant-img" />

            <div className="hero-glass-card">
              <svg
                className="hero-card-shape"
                viewBox="0 0 512 644"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="card-shadow" x="-5%" y="-2%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="9" stdDeviation="9.2" floodColor="rgba(0,0,0,0.25)" />
                  </filter>
                  <linearGradient id="card-stroke" x1="12" y1="60.5" x2="453" y2="620" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.2" />
                    <stop offset="0.52" stopOpacity="0" />
                    <stop offset="1" stopColor="white" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 92.3058C0 44.2507 43.5673 7.75052 91.1755 14.2889C142.448 21.3305 205.999 28.3316 256 28.3316C306.001 28.3316 369.552 21.3305 420.825 14.2889C468.433 7.75053 512 44.2507 512 92.3058V567C512 609.526 477.526 644 435 644H77C34.4741 644 0 609.526 0 567V92.3058Z"
                  fill="white"
                  fillOpacity="0.05"
                  filter="url(#card-shadow)"
                />
                <path
                  d="M420.961 15.2793C467.994 8.82018 511 44.8828 511 92.3057V567C511 608.974 476.974 643 435 643H77C35.0264 643 1 608.974 1 567V92.3057C1.00006 44.8828 44.0061 8.82017 91.0391 15.2793C142.32 22.3221 205.927 29.332 256 29.332C306.073 29.332 369.68 22.3221 420.961 15.2793Z"
                  stroke="url(#card-stroke)"
                  strokeWidth="2"
                />
              </svg>

              <div className="hero-card-info">
                <span className="plant-category">Trendy House Plant</span>
                <span className="plant-name">Calathea plant</span>
                <button className="btn-outline-white btn-buy-now">Buy Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Trending Plants ───── */}
        <section className="trending-section">
          <div className="section-header">
            <svg className="connector" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
              <path
                d="M0 0L0 46C0 58.7026 10.2975 69 23 69H68.5"
                stroke="url(#grad-conn-left)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad-conn-left" x1="-0.5" y1="-2" x2="68.5" y2="69" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000" />
                  <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#50790B" />
                </linearGradient>
              </defs>
            </svg>

            <h2 className="section-title">Our Trendy plants</h2>

            <svg className="connector" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
              <path
                d="M68.5 69L68.5 23C68.5 10.2974 58.2025 0 45.5 0L0 0"
                stroke="url(#grad-conn-right)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad-conn-right" x1="69" y1="71" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000" />
                  <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#50790B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Product Pill 1 */}
          <article className="product-pill">
            <div className="pill-ambient pill-ambient--tree" aria-hidden="true" />
            <div className="pill-glass" />

            <div className="pill-plant-slot pill-plant-slot--left">
              <img src={PRODUCT_LEFT} alt="Small decoration plant" className="pill-plant-img" />
            </div>

            <div className="pill-content pill-content--right">
              <h3 className="product-title">For Small Decs Ai Plat</h3>
              <p className="product-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua
              </p>
              <span className="product-price">Rs. 599/-</span>
              <div className="product-actions">
                <button className="btn-product-explore">Explore</button>
                <button className="btn-product-bag" aria-label="Add to bag">
                  <img src={BAG_ICON} alt="" width="34" height="34" />
                </button>
              </div>
            </div>
          </article>

          {/* Product Pill 2 */}
          <article className="product-pill product-pill--reverse">
            <div className="pill-ambient pill-ambient--glow" aria-hidden="true" />
            <div className="pill-glass" />

            <div className="pill-content pill-content--left">
              <h3 className="product-title">For Fresh Decs Ai Plat</h3>
              <p className="product-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua
              </p>
              <span className="product-price">Rs. 579/-</span>
              <div className="product-actions">
                <button className="btn-product-explore">Explore</button>
                <button className="btn-product-bag" aria-label="Add to bag">
                  <img src={BAG_ICON} alt="" width="34" height="34" />
                </button>
              </div>
            </div>

            <div className="pill-plant-slot pill-plant-slot--right">
              <img src={PRODUCT_RIGHT} alt="Fresh decoration plant" className="pill-plant-img" />
            </div>
          </article>

          <div className="carousel-dots">
            <span className="dot dot--wide" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </section>

        {/* ───── Top Selling Section ───── */}
        <section className="top-selling-section">
          <div className="top-selling-header">
            <svg className="ts-bracket ts-bracket--tr" width="70" height="50" viewBox="0 0 70 50" fill="none" aria-hidden="true">
              <path d="M69.5 49L69.5 14C69.5 6.268 63.232 0 55.5 0L1 0" stroke="url(#ts-grad-tr)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="ts-grad-tr" x1="70" y1="50" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000"/>
                  <stop offset="0.5" stopColor="white" stopOpacity="0.156"/>
                  <stop offset="1" stopColor="#50790B"/>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="section-title">Our Top Selling</h2>
            <svg className="ts-bracket ts-bracket--bl" width="70" height="50" viewBox="0 0 70 50" fill="none" aria-hidden="true">
              <path d="M0.5 1L0.5 36C0.5 43.732 6.768 50 14.5 50L69 50" stroke="url(#ts-grad-bl)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="ts-grad-bl" x1="0" y1="0" x2="70" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000"/>
                  <stop offset="0.5" stopColor="white" stopOpacity="0.156"/>
                  <stop offset="1" stopColor="#50790B"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="plant-cards-grid">
            {TOP_SELLING_PLANTS.map((plant, i) => (
              <article key={i} className="plant-card">
                <img src={plant.img} alt={plant.name} className="plant-card-img" />
                <div className="plant-card-body">
                  <h3 className="plant-card-name">{plant.name}</h3>
                  <p className="plant-card-desc">{plant.desc}</p>
                  <div className="plant-card-footer">
                    <span className="plant-card-price">{plant.price}</span>
                    <button className="plant-card-bag-btn" aria-label="Add to bag">
                      <img src={CARD_BAG_ICON} alt="" width="27" height="27" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* ───── Customer Reviews Section ───── */}
        <section className="reviews-section">
          <div className="section-header">
            <svg className="connector" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
              <path d="M0 0L0 46C0 58.7026 10.2975 69 23 69H68.5" stroke="url(#grad-rev-left)" strokeWidth="5" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad-rev-left" x1="-0.5" y1="-2" x2="68.5" y2="69" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000" />
                  <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#50790B" />
                </linearGradient>
              </defs>
            </svg>
            <h2 className="section-title">Customer Review</h2>
            <svg className="connector" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
              <path d="M68.5 69L68.5 23C68.5 10.2974 58.2025 0 45.5 0L0 0" stroke="url(#grad-rev-right)" strokeWidth="5" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad-rev-right" x1="69" y1="71" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000" />
                  <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#50790B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="review-cards-grid">
            {CUSTOMER_REVIEWS.map((review, i) => (
              <article key={i} className="review-card">
                <div className="review-card-header">
                  <div className="review-avatar" style={{ background: review.avatarColor }} />
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <div className="review-stars" aria-label={`${review.rating} stars`}>
                      {[0, 1, 2, 3].map((s) => (
                        <svg key={s} width="22" height="22" viewBox="0 0 24 24" fill="#FFF84E">
                          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.4l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                        </svg>
                      ))}
                      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <defs>
                          <linearGradient id={`half-rev-${i}`}>
                            <stop offset="50%" stopColor="#FFF84E" />
                            <stop offset="50%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.4l-6.2 4.5 2.4-7.4L2 9.4h7.6z" fill={`url(#half-rev-${i})`} stroke="#FFF84E" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ───── Our Best O2 Section ───── */}
        <section className="best-o2-section">
          <div className="section-header">
            <svg className="connector" width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true">
              <path d="M0 72.204L0 83.736C0 96.439 10.298 106.736 23 106.736H69.865" stroke="url(#o2-grad-left)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="o2-grad-left" x1="-0.51" y1="70.11" x2="71.72" y2="104.88" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000"/>
                  <stop offset="0.5" stopColor="white" stopOpacity="0.157"/>
                  <stop offset="1" stopColor="#50790B"/>
                </linearGradient>
              </defs>
            </svg>

            <h2 className="section-title">Our Best O2</h2>

            <svg className="connector" width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true">
              <path d="M69.865 34.532L69.865 22.999C69.865 10.297 59.567 0 46.865 0L0 0" stroke="url(#o2-grad-right)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="o2-grad-right" x1="70.37" y1="36.625" x2="-1.863" y2="1.852" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#55B000"/>
                  <stop offset="0.5" stopColor="white" stopOpacity="0.157"/>
                  <stop offset="1" stopColor="#50790B"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="best-o2-card">
            <img src={O2_PLANT} alt="O2 plant" className="best-o2-plant-img" />

            <div className="best-o2-content">
              <h3 className="best-o2-heading">We Have Small And Best O2 Plants Collection's</h3>
              <p className="best-o2-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua
              </p>
              <p className="best-o2-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <button className="btn-outline-white best-o2-explore-btn">Explore</button>
            </div>
          </div>

          <div className="o2-nav-row">
            <div className="carousel-dots">
              <span className="dot dot--wide" />
              <span className="dot" />
              <span className="dot" />
            </div>

            <div className="o2-arrows">
              <img src={ARROW_LEFT} alt="Previous" className="o2-arrow-icon" />
              <span className="o2-page-counter">
                <span className="o2-page-current">01/</span>
                <span className="o2-page-total">04</span>
              </span>
              <img src={ARROW_RIGHT} alt="Next" className="o2-arrow-icon" />
            </div>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <p className="footer-brand-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-heading">Quick Link's</h4>
            <nav className="footer-nav">
              <a href="#" className="footer-nav-link">Home</a>
              <a href="#" className="footer-nav-link">Type's Of plant's</a>
              <a href="#" className="footer-nav-link">Contact</a>
              <a href="#" className="footer-nav-link">Privacy</a>
            </nav>
          </div>

          <div className="footer-newsletter-col">
            <h4 className="footer-col-heading">For Every Update.</h4>
            <div className="newsletter-row">
              <div className="newsletter-input-wrapper">
                <input type="email" placeholder="Enter Email" className="newsletter-input" />
                <button className="newsletter-subscribe-btn">SUBSCRIBE</button>
              </div>
            </div>
            <p className="footer-copyright">planto © all right reserve</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
