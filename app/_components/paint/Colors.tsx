import React from "react";

const Colors = ({
  colors,
  handleSetColor,
}: {
  colors: string[];
  handleSetColor: (color: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <span className="text-lg font-semibold">Pick Brush Color</span>
      <div className="flex gap-16 justify-center">
        {colors.map((color) => (
          <div
            key={color}
            className="p-10 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              console.log("CLICKED: ", color);
              handleSetColor(color);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Colors;
