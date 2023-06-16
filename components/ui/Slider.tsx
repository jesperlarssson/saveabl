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
        className="absolute left-0  -ml-10"
      >
        <BsChevronLeft size={28} />
      </IconButton>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
      >
        {childrenArray.map((child, i) => {
          return <SwiperSlide key={i}>{child}</SwiperSlide>;
        })}
      </Swiper>
      <IconButton
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-0  -mr-10"
      >
        <BsChevronRight size={28} />
      </IconButton>
    </div>
  );
};

export default Slider;
