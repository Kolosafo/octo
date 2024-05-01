import React from "react";
// pass props to change different properties e.g placeholder, styles, type etc
const CustomInput = ({ placeholder, type = "text", ...props }: any) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-gray-300 p-4 text-gray-700 focus:outline-none focus:border-transparent rounded-xl m-3"
      {...props}
    />
  );
};

export default CustomInput;
