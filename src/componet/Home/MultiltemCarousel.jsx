import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeel } from "./topMeel";
import Carouseltem from "./Carouseltem";
const MultiltemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div>
      <Slider {...settings}>
        {topMeel.map(item => (
          <Carouseltem image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default MultiltemCarousel;
