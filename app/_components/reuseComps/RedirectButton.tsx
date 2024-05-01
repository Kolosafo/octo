import React from "react";

// pass props to change other properties like href, placeholder etc
const RedirectButton = ({ href, children }: any) => {
  return (
    <div className=" relative  justify-center items-center flex-col  ">
      <a
        // href={href}
        className=" z-10"
      >
        <div className="  border-b-4 border-purple-600 absolute  w-[56px] bottom-0  z-1" />
        {/* {children} */}
        SIgn up
      </a>
    </div>
  );
};

export default RedirectButton;
