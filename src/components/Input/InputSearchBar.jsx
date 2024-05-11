import React from "react";

const InputSearchBar = ({
  id,
  label,
  placeholder,
  className = "",
  classNameLabel = "",
  name,
  onChange,
  value,
  onBlur,
  type = "text",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`inputLabel px-4  block text-sm font-medium text-gray-900 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        className={` min-w-sm border text-gray-700 text-sm rounded-lg block w-full  ${className} InputSearchBar `}
        placeholder={placeholder}
      />
  
    </div>
  );
};

export default InputSearchBar;
