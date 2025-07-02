import React from "react";

import Lottie from "lottie-react";
import animationData from "../../assets/animations/loading.json";

const LoadingAnimation = () => {
  return (
    <div className="w-full fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center ">
      <div className="w-1/3">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
