"use client"
import { InteractiveLearningImageType } from "@/types";
import Image from "next/image";
import React from "react";

const InteractiveImage = (imgProp: InteractiveLearningImageType) => {
  return (
    <div
      onClick={() => {
        if (imgProp.onClick) imgProp.onClick(imgProp.label);
      }}
      className="p-16 rounded-full relative bg-gray-700 dark:bg-white"
    >
      <span className="absolute top-4 left-4 font-bold px-3 py-1 rounded-full bg-white dark:bg-gray-700">
        {imgProp.label}
      </span>
      <Image
        alt={imgProp.name}
        src={imgProp.src}
        width={100}
        height={100}
        className="min-w-[33%] object-contain"
      />
    </div>
  );
};

export default InteractiveImage;
