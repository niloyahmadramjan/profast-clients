import React from "react";

import Lottie from "lottie-react";
import animationData from "../assets/animations/error.json";

const errorAnimation = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default errorAnimation;
