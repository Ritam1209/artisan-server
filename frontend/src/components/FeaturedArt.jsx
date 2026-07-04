function FeaturedArt() {

  return (

    <section className="featured">

      <h2>Featured Artworks</h2>

      <div className="art-grid">

        <div className="art-card">
          <img src="/art1.jpg" />
          <h4>Modern Bronze Sculpture</h4>
          <p>$1200</p>
        </div>

        <div className="art-card">
          <img src="/art2.jpg" />
          <h4>Abstract Painting</h4>
          <p>$950</p>
        </div>

        <div className="art-card">
          <img src="/art3.jpg" />
          <h4>Luxury Interior Piece</h4>
          <p>$2100</p>
        </div>

      </div>

    </section>

  );

}

export default FeaturedArt;