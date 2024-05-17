import React, { forwardRef } from "react";

const InputSearchBar = forwardRef(({
  id,
  label,
  placeholder,
  className = "",
  classNameLabel = "",
  name,
  onChange,
  value,
  type = "text",
  ref
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`input-label px-4  block text-sm font-medium text-gray-900 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
    ref={ref}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        className={`border text-gray-700 text-sm rounded-lg block w-full  ${className} input-search__bar `}
        placeholder={placeholder}
      />
  
    </div>
  );
});

export default InputSearchBar;
