"use client";
import React, { useEffect } from "react";
import Colors from "./Colors";
import Image from "next/image";

export default function CanvasPreview({
  canvasRef,
  init,
  thickness,
  handleColor,
  colors,
  imgSrc,
  instruction,
  answer,
}: any) {
  const width = thickness;
  const widthHalf = width ? width / 2 : 0;

  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  useEffect(() => {
    init();
  }, []);

  return (
    <section className="p-6 w-full flex flex-col h-screen">
      <span>
        Instruction:{" "}
        <span className="font-bold" style={{ color: answer }}>
          {instruction}
        </span>{" "}
      </span>
      <div className="h-[80%] w-full relative flex justify-center items-center">
        <Image
          src={imgSrc}
          alt="logo"
          className="object-contain"
          width={500}
          height={500}
        />
        <canvas
          style={{ cursor, backgroundColor: "transparent" }}
          className="h-full w-full absolute bg-transparent border-2 border-white top-0 left-0 z-10 opacity-90"
          ref={canvasRef}
        />
      </div>

      <div className="border-2 border-neutral-600 py-2 z-20">
        <Colors
          correctColor={answer}
          colors={colors}
          handleSetColor={handleColor}
        />
      </div>
    </section>
  );
}
