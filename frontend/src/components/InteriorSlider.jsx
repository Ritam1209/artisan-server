import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ✅ IMPORT IMAGES (VERY IMPORTANT — not string paths) */
import img1 from "../assets/interior1.avif";
import img2 from "../assets/interior2.avif";
import img3 from "../assets/interior3.avif";
import img4 from "../assets/interior4.avif";
import img5 from "../assets/interior5.avif";
import img6 from "../assets/interior6.avif";
import img7 from "../assets/interior7.avif";
import img8 from "../assets/interior8.avif";
import img9 from "../assets/interior9.avif";
import img10 from "../assets/interior10.avif";
import img11 from "../assets/interior11.avif";
import img12 from "../assets/interior12.avif";
/* IMAGE ARRAY */
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

function InteriorSlider() {
  return (

    <section className="interior-slider">

      <h2>Design Inspirations</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={25}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}

        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >

        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slider-card">
              <img src={img} alt="interior design" />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    </section>
  );
}

export default InteriorSlider;