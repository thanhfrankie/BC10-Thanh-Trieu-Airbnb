import React from "react";

const ButtonCustom = ({
  classNameBtn = "",
  classNameSpan = "",
  value,
  onClick,
  span = "",
}) => {
  return (
    <button
      className={`btn py-2 px-4 rounded-full text-start ${classNameBtn}`}
      onClick={onClick}
    >
      {value}

      <span className={`block text-start ${classNameSpan}`}>{span}</span>
    </button>
  );
};
export default ButtonCustom;
