import React, { useEffect, useState, link } from "react";
import ProductCard from "../components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

/* IMPORT IMAGES FROM ASSETS */
import sculpture1 from "../assets/sculpture1.jpg";
import sculpture2 from "../assets/sculpture2.jpg";
import sculpture3 from "../assets/sculpture3.jpg";
import sculpture4 from "../assets/sculpture4.jpg";
import sculpture5 from "../assets/sculpture5.jpg";
import sculpture6 from "../assets/sculpture6.jpg";
import sculpture7 from "../assets/sculpture7.jpg";
import sculpture8 from "../assets/sculpture8.jpg";
import sculpture9 from "../assets/sculpture9.jpg";
import sculpture10 from "../assets/sculpture10.jpg";
import sculpture11 from "../assets/sculpture11.jpg";
import sculpture12 from "../assets/sculpture12.jpg";
import sculpture13 from "../assets/sculpture13.jpg";
import sculpture14 from "../assets/sculpture14.jpg";
import sculpture15 from "../assets/sculpture 15.jpg";

const Sculpture = () => {

const [products, setProducts] = useState([]);

useEffect(() => {

fetch("/api/products/?category=1")
  .then(res => {
    if (!res.ok) throw new Error("API failed");
    return res.json();
  })
  .then(data => {
    setProducts(data.products);
  })
  .catch(err => console.error(err));

}, []);


const sliderImages = [
sculpture1, sculpture2, sculpture3, sculpture4, sculpture5,
sculpture6, sculpture7, sculpture8, sculpture9, sculpture10,
sculpture11, sculpture12, sculpture13, sculpture14, sculpture15
];

return (

<div>
<div className="page-content">
  {/* HERO SECTION */}
<section className="sculpture-hero">

  <div className="sculpture-hero-content">

    <h1>Sculpture Collection</h1>

    <p>
      Discover our exquisite selection of sculptures crafted by master artisans.
      Each piece tells a story and transforms spaces into galleries.
    </p>

  </div>

</section>
</div>


  {/* PRODUCT GRID (UNCHANGED) */}
<section className="products-section">

<div className="products-grid">
  {products.map(product => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>

</section>


  {/* WHATSAPP CONTACT */}
 <section className="whatsapp-contact">

<h2>Can't Find What You're Looking For?</h2>

<p>
Contact us directly via WhatsApp for custom commissions and exclusive pieces.
</p>

<a 
  href="#"
  onClick={(e) => {
    e.preventDefault();

    const number = import.meta.env.VITE_ADMIN_WHATSAPP;

    if (!number) {
      alert("WhatsApp number not configured");
      return;
    }

    const message = encodeURIComponent(
      "Hello Artellier, I am interested in your artwork. Please share details."
    );

    const url = `https://wa.me/${number}?text=${message}`;

    window.open(url, "_blank");
  }}
  className="cta-whatsapp-btn"
>
  Contact Us on WhatsApp
</a>

</section>

  {/* IMAGE SLIDER */}
  <section className="sculpture-slider">

    <h2>Gallery Preview</h2>

   <Swiper
modules={[Navigation, Pagination, Autoplay]}
spaceBetween={30}
slidesPerView={3}
navigation
pagination={{ clickable: true }}
autoplay={{ delay: 3500 }}
loop={true}
breakpoints={{
640:{slidesPerView:1},
768:{slidesPerView:2},
1024:{slidesPerView:3}
}}
>

      {sliderImages.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} alt="sculpture artwork" />
        </SwiperSlide>
      ))}

    </Swiper>

  </section>

</div>

);
};

export default Sculpture;
