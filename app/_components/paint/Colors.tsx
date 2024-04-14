"use client";
import React, { useState } from "react";

const Colors = ({
  colors,
  handleSetColor,
  correctColor,
}: {
  colors: string[];
  handleSetColor: (color: string) => void;
  correctColor: string;
}) => {
  const [feedback, setFeedback] = useState("");
  return (
    <div className="flex flex-col gap-8 items-center">
      <span className="text-lg font-semibold">Pick Brush Color</span>
      {feedback && <span> {feedback}</span>}
      <div className="flex gap-16 justify-center">
        {colors.map((color) => (
          <div
            key={color}
            className="p-10 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              console.log("CLICKED: ", color);
              if (color !== correctColor) {
                setFeedback(
                  `That is the color ${color}, now find the color ${correctColor}`
                );
                handleSetColor("#ffffff00");
              } else {
                setFeedback(
                  `Great! That is color ${correctColor}, now you can start painting.`
                );
                handleSetColor(color);
              }
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Colors;
