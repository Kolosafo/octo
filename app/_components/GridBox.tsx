import { GridBoxType } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

const GridBox: FC<GridBoxType> = (props) => {
  return (
    <div
      className="w-[31%] h-40 border-2 border-black flex fullCenter cursor-pointer"
      style={{ backgroundColor: props.color }}
      onClick={() => {
        if (props.onClick) props.onClick(props.value);
      }}
    >
      {props.type === "text" ? (
        <span className="text-2xl font-bold">{props.value}</span>
      ) : (
        props.image && (
          <Image src={props.image} alt={props.value} className="object-cover" />
        )
      )}
    </div>
  );
};

export default GridBox;
