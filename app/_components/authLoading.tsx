import React from "react";
import { ThreeDots } from "react-loader-spinner";

const AuthLoading = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-300 opacity-70 flex justify-center items-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#8a4c7d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default AuthLoading;
