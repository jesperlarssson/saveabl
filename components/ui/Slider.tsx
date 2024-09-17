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
        spaceBetween={10} // Minskat avstånd för att passa bättre på mobilen
        slidesPerView={1} // Standard för små skärmar
        breakpoints={{
          // När fönsterbredden är >= 320px (mobil)
          320: {
            slidesPerView: 3, // Visa alla 3 slides på mobil
            spaceBetween: 10, // Mindre avstånd mellan slides på mobil
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
        onSlideChange={() => console.log("slide change")}
      >
        {childrenArray.map((child, i) => {
          return <SwiperSlide key={i}>{child}</SwiperSlide>;
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
