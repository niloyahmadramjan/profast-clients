import React from "react";
import sliderImg01 from "../assets/banner/banner1.png";
import sliderImg02 from "../assets/banner/banner2.png";
import sliderImg03 from "../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
      <div className="my-10">
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} showStatus={false} showThumbs={false} useKeyboardArrows={true}>
        <div>
          <img src={sliderImg01} alt="" />
        </div>
        <div>
          <img src={sliderImg02} alt="" />
        </div>
        <div>
          <img src={sliderImg03} alt="" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
      </Carousel>
      </div>
  );
};

export default Hero;
