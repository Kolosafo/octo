import React from "react";
import { RotatingTriangles } from "react-loader-spinner";

const LessonLoading = ({
  lessonTitle,
  regeneration,
}: {
  lessonTitle: string;
  regeneration?: boolean;
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span>
        Professor Octo is {regeneration ? "re-generating" : "generating"} your{" "}
        {lessonTitle}
      </span>
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

export default LessonLoading;
