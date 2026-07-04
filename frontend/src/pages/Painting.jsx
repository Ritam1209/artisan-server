import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import PaintingSlider from "../components/PaintingSlider"; // ✅ add this
import { getProducts } from "../services/api";

function Painting(){

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{

    getProducts(2)
      .then(data => {

        console.log("Painting API Response:", data); // DEBUG

        if(data && data.products){
          setProducts(data.products);
        } else {
          setProducts([]);
        }

      })
      .catch(err => {
        console.error("Painting Fetch Error:", err);
        setError("Failed to load paintings");
      })
      .finally(() => {
        setLoading(false);
      });

  },[]);

  /* ✅ FIX: Proper WhatsApp URL with message + safety */
  const whatsappNumber = import.meta.env.VITE_ADMIN_WHATSAPP;

  const message = encodeURIComponent(
    "Hello Artellier, I am interested in your paintings. Please share more details."
  );

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${message}`
    : "#";

  return(

    <>
      {/* ===== HERO SECTION ===== */}
      <section className="painting-hero">
        <div className="painting-hero-content">
          <h1>Painting Collection</h1>
          <p>
            Explore breathtaking paintings from renowned artists. From classical oil
            paintings to modern abstract works, find the perfect piece for your collection.
          </p>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="products-section">

        {loading && (
          <h2 style={{textAlign:"center", marginTop:"40px"}}>
            Loading paintings...
          </h2>
        )}

        {error && (
          <h2 style={{textAlign:"center", marginTop:"40px", color:"red"}}>
            {error}
          </h2>
        )}

        {!loading && !error && products.length === 0 && (
          <h2 style={{textAlign:"center", marginTop:"40px"}}>
            No paintings found
          </h2>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products}/>
        )}

      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="whatsapp-contact">
        <h2>Looking for Something Unique?</h2>
        <p>
          We work with artists worldwide to bring you custom paintings tailored to your vision.
        </p>

        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whatsapp-btn"
        >
          Contact Us on WhatsApp
        </a>
      </section>

      {/* ===== PAINTING SLIDER ===== */}
      <PaintingSlider />

    </>
  );
}

export default Painting;