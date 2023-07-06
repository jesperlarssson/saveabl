"use client";
import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { EffectCoverflow } from 'swiper';



interface SliderCardsProps {
  children: React.ReactNode;
}

const SliderCards: React.FC<SliderCardsProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <>
      <Swiper
        initialSlide={1}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={
            3
        }
        coverflowEffect={{
        //   rotate: 5,
        //   stretch: 1,
           depth: 100,
        //   modifier: 1,
        }}       
        modules={[EffectCoverflow]}
        className=""
      >
        {childrenArray.map((child, i) => {
          return <SwiperSlide className="my-8" key={i}>{child}</SwiperSlide>;
        })}
      </Swiper>
    </>
  );
};

export default SliderCards;
