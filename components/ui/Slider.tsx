"use client";
import React, { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import IconButton from "./IconButton";

interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const swiper = useSwiper();
  const swiperRef = useRef<any>(null);

  // Definiera responsiva stilar inline
  const imageStyle = {
    width: '200px',
    height: 'auto',
    '@media (max-width: 640px)': {
      width: '100px',
    },
  };

  return (
    <div className="relative flex items-center">
      <IconButton
        onClick={() => swiperRef.current.slidePrev()}
        className="hidden sm:flex absolute left-0 -ml-10"
      >
        <BsChevronLeft size={28} />
      </IconButton>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={30} // Standard avstånd mellan slides
        slidesPerView={1} // Standard för små skärmar
        breakpoints={{
          // När fönsterbredden är >= 320px (mobil)
          320: {
            slidesPerView: 3, // Visa 3 slides på små skärmar (mobiler)
            spaceBetween: 30, // Behåll standard avstånd
          },
          // När fönsterbredden är >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // När fönsterbredden är >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {childrenArray.map((child, i) => {
          return (
            <SwiperSlide key={i}>
              <div style={imageStyle}>{child}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <IconButton
        onClick={() => swiperRef.current.slideNext()}
        className="hidden sm:flex absolute right-0 -mr-10"
      >
        <BsChevronRight size={28} />
      </IconButton>
    </div>
  );
};

export default Slider;
