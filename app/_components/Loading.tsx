import React from "react";
import { RotatingTriangles } from "react-loader-spinner";

const Loading = ({ lessonTitle }: { lessonTitle: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span>Professor Octo is generating your {lessonTitle}</span>
      <RotatingTriangles
        visible={true}
        height="200"
        width="200"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
    </div>
  );
};

export default Loading;
