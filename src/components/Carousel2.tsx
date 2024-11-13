// components/Carousel2.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Carousel2.css"; // Tambahkan file CSS untuk styling khusus

interface Carousel2Props {
  images: { url: string}[];
}

const Carousel2: React.FC<Carousel2Props> = ({ images }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={3} // Menampilkan 3 gambar sekaligus
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="carousel2-card">
            <img src={image.url} alt='image' className="carousel2-image" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel2;
