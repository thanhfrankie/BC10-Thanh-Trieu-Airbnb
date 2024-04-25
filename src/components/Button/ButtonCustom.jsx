import React from "react";

const ButtonCustom = ({
  classNameBtn = "",
  classNameSpan = "",
  value,
  span = "",
  ...rest
}) => {
  return (
    <button
      className={`btn h-full py-2 px-4 rounded-full  ${classNameBtn}`}
      {...rest}
    >
      {value}

      <span className={`btnLabel block text-start text-base font-medium ${classNameSpan}`}>{span}</span>
    </button>
  );
};
export default ButtonCustom;
