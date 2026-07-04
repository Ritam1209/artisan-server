import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* ✅ IMPORT IMAGES */
import img1 from "../assets/gallery1.avif";
import img2 from "../assets/gallery2.avif";
import img3 from "../assets/gallery3.avif";
import img4 from "../assets/gallery4.avif";
import img5 from "../assets/gallery5.avif";
import img6 from "../assets/gallery6.avif";
import img7 from "../assets/gallery7.avif";
import img8 from "../assets/gallery8.avif";
import img9 from "../assets/gallery9.avif";
import img10 from "../assets/gallery10.avif";

const images = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10
];

function PaintingSlider(){
  return(
    <section className="painting-slider">

      <h2 className="slider-title">Painting Gallery</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        loop={true}
        breakpoints={{
          768:{slidesPerView:1},
          1024:{slidesPerView:2},
          1280:{slidesPerView:3}
        }}
      >
        {images.map((img, index)=>(
          <SwiperSlide key={index}>
            <div className="slider-card">
              <img src={img} alt="painting" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}

export default PaintingSlider;