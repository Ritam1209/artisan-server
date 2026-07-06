import sculptureImg from "../assets/art gallery sculpture.avif";
import paintingImg from "../assets/abstract Paining.avif";
import interiorImg from "../assets/Interior Design.avif";
import featuredImg from "../assets/Modern Sculpture.avif";
import paintingImag from "../assets/Painting colour.avif";
import sculptureImag from "../assets/Sculpture Work.avif";

function HomePage() {
  return (
    <div className="home-page">

      {/* HERO HEADER */}

      <section className="home-hero">

        <h1>
          Welcome to <span>Artellier</span>
        </h1>

        <p>
          Explore curated sculptures, paintings, interior design pieces
          and featured artworks from renowned artists worldwide.
        </p>

      </section>


      {/* COLLECTION GRID */}

      <section className="collections-grid">

        <div className="collection-card">

          <img src={sculptureImg} alt="Sculpture" />

          <div className="collection-overlay">
            <h3>Sculpture</h3>
          </div>

        </div>


        <div className="collection-card">

          <img src={paintingImg} alt="Painting" />

          <div className="collection-overlay">
            <h3>Painting</h3>
          </div>

        </div>


        <div className="collection-card">

          <img src={interiorImg} alt="Interior Design" />

          <div className="collection-overlay">
            <h3>Interior Design</h3>
          </div>

        </div>


        <div className="collection-card">

          <img src={featuredImg} alt="Featured Works" />

          <div className="collection-overlay">
            <h3>Featured Works</h3>
          </div>

        </div>
           <div className="collection-card">

          <img src={paintingImag} alt="Exclusive Painting" />

          <div className="collection-overlay">
            <h3>Stunning Painting</h3>
          </div>

        </div>
  <div className="collection-card">

          <img src={sculptureImag} alt="Statue" />

          <div className="collection-overlay">
            <h3>Statue</h3>
          </div>

        </div>
      </section>


     
<section className="transform-section">

  <h2 className="transform-title">
    Ready to Transform Your Space?
  </h2>

  <p className="transform-text">
    Browse our collections and connect with us directly via WhatsApp for
    personalized assistance and exclusive pricing.
  </p>

  <div className="transform-features">

    <div className="feature-item">
      <div className="feature-icon">🎨</div>
      <span>Curated Collections</span>
    </div>

    <div className="feature-item">
      <div className="feature-icon">💬</div>
      <span>WhatsApp Assistance</span>
    </div>

    <div className="feature-item">
      <div className="feature-icon">✨</div>
      <span>Premium Quality</span>
    </div>

  </div>

</section>

    </div>
  );
}

export default HomePage;