import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

/* images */
import img1 from "../assets/featured1.avif";
import img2 from "../assets/featured2.avif";
import img3 from "../assets/featured3.avif";
import img4 from "../assets/featured4.avif";
import img5 from "../assets/featured5.avif";
import img6 from "../assets/featured6.avif";
import img7 from "../assets/featured7.avif";
import img8 from "../assets/featured8.avif";
import img9 from "../assets/featured9.avif";
import img10 from "../assets/featured10.avif";
import img11 from "../assets/featured11.avif";
import img12 from "../assets/featured12.avif";
import img13 from "../assets/featured13.avif";

const images = [
img1,img2,img3,img4,img5,img6,img7,
img8,img9,img10,img11,img12,img13
];

function FeaturedSlider(){

return(

<section className="featured-slider-wrapper">

<div className="featured-slider-header">

<h2>Featured Gallery</h2>

<p className="slider-subtitle">

Preview some of our most prestigious artworks

</p>

</div>


<Swiper

modules={[Navigation, Pagination, Autoplay]}

spaceBetween={40}

slidesPerView={3}

navigation

pagination={{ clickable:true }}

autoplay={{ delay:3200 }}

loop={true}

centeredSlides={true}

breakpoints={{

640:{slidesPerView:1},

768:{slidesPerView:2},

1024:{slidesPerView:3}

}}

>

{images.map((img,index)=>(

<SwiperSlide key={index}>

<div className="featured-slide-card">

<img src={img} alt="featured artwork"/>

<div className="slide-overlay"></div>

</div>

</SwiperSlide>

))}

</Swiper>

</section>

);

}

export default FeaturedSlider;