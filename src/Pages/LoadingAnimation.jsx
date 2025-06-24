import React from "react";

import Lottie from "lottie-react";
import animationData from "../assets/animations/loading.json";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center ">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LoadingAnimation;
