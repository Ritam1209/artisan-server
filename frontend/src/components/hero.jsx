import heroImage from "../assets/hero.jpg"
import sculpture from "../assets/sculpture.jpg";
import painting from "../assets/painting.jfif";
import interior from "../assets/Interior.jfif";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Home() {

const { isSignedIn } = useUser();
const navigate = useNavigate();

const handleExplore = () => {
if (isSignedIn) {
navigate("/home");
} else {
navigate("/signup");
}
};

return (

<div className="home-container">

  {/* HERO SECTION */}
  <section
    className="hero"
    style={{ backgroundImage: `url(${heroImage})` }}
  >

    <div className="hero-overlay"></div>

    <div className="hero-content">

      <p className="hero-tag">
        ✦ PREMIUM ART & DESIGN ✦
      </p>

      <h1>
        Sculpting Spaces. <br />
        <span>Creating Art.</span>
      </h1>

      <p>
        Discover an exquisite collection of sculptures, paintings and
        interior design masterpieces that transform spaces into
        extraordinary experiences.
      </p>

      <div className="hero-buttons">

        <button
          className="primary-btn"
          onClick={handleExplore}
        >
          Explore Collection →
        </button>

        <Link
          to="/signup"
          className="outline-btn"
        >
          Sign Up
        </Link>

      </div>

    </div>

  </section>


  {/* WHY CHOOSE SECTION */}
  <section className="why-section">

    <h2 className="why-title">
      Why Choose <span>Artellier</span>
    </h2>

    <p className="why-subtitle">
      We curate exclusive collections that bring luxury and artistry to your space
    </p>

    <div className="why-grid">

      <div className="why-card">
        <div className="why-icon"></div>

        <h3>Curated Excellence</h3>

        <p>
          Each piece is carefully selected by expert curators to ensure exceptional quality and artistry.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon"></div>

        <h3>Personalized Service</h3>

        <p>
          Direct consultation through WhatsApp for a seamless and personalized inquiry experience.
        </p>
      </div>

      <div className="why-card">
        <div className="why-icon"></div>

        <h3>Timeless Design</h3>

        <p>
          Invest in pieces that transcend trends and create lasting impressions for generations.
        </p>
      </div>

    </div>

  </section>


  {/* FEATURED COLLECTIONS */}
  <section className="collections-section">

    <h2 className="collections-title">Featured Work</h2>

    <div className="collections-grid">

      <div className="collection-card">

        <img src={sculpture} alt="Sculpture" />

        <div className="collection-overlay">
          <h3>Sculpture</h3>
          <p>Handcrafted artistic sculptures</p>
        </div>

      </div>


      <div className="collection-card">

        <img src={painting} alt="Painting" />

        <div className="collection-overlay">
          <h3>Painting</h3>
          <p>Modern and classical paintings</p>
        </div>

      </div>


      <div className="collection-card">

        <img src={interior} alt="Interior Design" />

        <div className="collection-overlay">
          <h3>Interior Design</h3>
          <p>Luxury interior installations</p>
        </div>

      </div>

    </div>

  </section>


</div>

);
}

export default Home;
