import React from "react";

const ButtonCustom = ({
  classNameBtn = "",
  classNameSpan = "",
  value,
  onClick,
  span = "",
  ...rest
}) => {
  return (
    <button
      className={`btn-search h-full py-2 px-4 rounded-full  ${classNameBtn}`}
      {...rest}
      onClick={onClick}
    >
      {value}

      <span className={`btnLabel block text-start text-sm font-medium ${classNameSpan}`}>{span}</span>
    </button>
  );
};
export default ButtonCustom;
