import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  classNameLabel = "",
  name,
  onChange,
  value,
  onBlur,
  error,
  touched,
  readOnly,
  type = "text",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`inputLabel px-4 block text-sm font-medium text-gray-900 ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        readOnly={readOnly ? true : false}
        id={id}
        className={`inputCustom min-w-sm border text-gray-700 text-sm rounded-lg block w-full  ${className}`}
        placeholder={placeholder}
      />
     
    </div>
  );
};

export default InputCustom;
