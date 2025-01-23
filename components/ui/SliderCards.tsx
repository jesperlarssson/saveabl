"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper";

interface SliderCardsProps {
  children: React.ReactNode;
  onActiveIndexChange?: (index: number) => void; // Callback för aktivt index
}

const SliderCards: React.FC<SliderCardsProps> = ({ children, onActiveIndexChange }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      <Swiper
        initialSlide={1}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 2,
            width: 480,
          },
          640: {
            slidesPerView: 2,
            width: 640,
          },
          768: {
            slidesPerView: 3,
            width: 768,
          },
          980: {
            slidesPerView: 3,
            width: 980,
          },
          1200: {
            slidesPerView: 3,
            width: 1200,
          },
        }}
        width={340}
        coverflowEffect={{
          depth: 100,
        }}
        modules={[EffectCoverflow]}
        className=""
        onSlideChange={(swiper) => {
          if (onActiveIndexChange) {
            onActiveIndexChange(swiper.activeIndex); // Skicka aktiv index till callback
          }
        }}
      >
        {childrenArray.map((child, i) => {
          return (
            <SwiperSlide className="my-8" key={i}>
              {child}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SliderCards;
