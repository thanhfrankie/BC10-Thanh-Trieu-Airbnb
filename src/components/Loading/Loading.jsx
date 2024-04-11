import React from "react";

const Loading = () => {
  return (
    <div
      className="h-screen w-full bg-slate-100 flex items-center justify-center fixed top-0 left-0"
      style={{ zIndex: 9999 }}
    >
      Loading
    </div>
  );
};

export default Loading;
