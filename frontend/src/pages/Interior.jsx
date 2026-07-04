import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import InteriorSlider from "../components/InteriorSlider"; // your slider

const InteriorDesign = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/?category=3")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error(err));
  }, []);

  return (

    <>
      {/* ===== HERO SECTION ===== */}
<section className="page-hero interior-hero">

  <div className="hero-content">

    <h1>Interior Design</h1>

    <p>
      Transform your space with our bespoke interior design solutions.
      From residential to commercial projects, we create environments that inspire.
    </p>

  </div>

</section>



      {/* ===== PRODUCT CARDS ===== */}
      <section className="products-section">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

<section className="services-section">

  <h2>Our Services</h2>

  <p className="services-subtitle">
    Comprehensive design solutions tailored to your vision
  </p>

  <div className="services-grid">

    <div className="service-card">
      <h3>Space Planning</h3>
      <p>
        Optimize your space with expert layout and flow design.
      </p>
    </div>

    <div className="service-card">
      <h3>Material Selection</h3>
      <p>
        Curated premium materials and finishes for lasting quality.
      </p>
    </div>

    <div className="service-card">
      <h3>Project Management</h3>
      <p>
        End-to-end coordination from concept to completion.
      </p>
    </div>

  </div>

</section>

      {/* ===== CTA SECTION ===== */}
      <section className="whatsapp-contact">
        <h2>Ready to Transform Your Space?</h2>
        <p>
          Schedule a consultation with our design team to discuss your project.
        </p>

        <a
          href={`https://wa.me/${import.meta.env.VITE_ADMIN_WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whatsapp-btn"
        >
          Contact Us on WhatsApp
        </a>
      </section>

      {/* ===== IMAGE SLIDER ===== */}
      <InteriorSlider />

      {/* ===== FOOTER automatically comes from layout ===== */}
    </>
  );
};

export default InteriorDesign;