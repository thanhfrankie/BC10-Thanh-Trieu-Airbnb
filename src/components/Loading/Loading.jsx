import React from "react";
import * as loadingAnimation from "./../../assets/animation/loading.json";
import Lottie from "react-lottie";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    speed: 2.5
  };
  return (
    <div
      className="h-screen w-full bg-gray-200 flex items-center justify-center fixed top-0 left-0"
      style={{ zIndex: 9999 }}
    >
      <Lottie options={defaultOptions} height={450} width={450}/>
    </div>
  );
};

export default Loading;
