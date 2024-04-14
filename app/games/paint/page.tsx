"use client";
import React from "react";
import usePaintCustomHook from "../../_hooks/paintCustomHook";
import SideToolBar from "@/app/_components/paint/SideToolBar";
import CanvasPreview from "@/app/_components/paint/CanvasPreview";
import { dummyPaintData } from "@/game_utils/paint/dummyData";
const Page = () => {
  const [{ canvasRef, ...states }, { init, handleColor, ...handleFn }] =
    usePaintCustomHook();
  return (
    <div className="flex h-screen">
      <SideToolBar {...handleFn} {...states} />
      <CanvasPreview
        canvasRef={canvasRef}
        init={init}
        eraser={states.isEraser}
        thickness={states.thickness}
        handleColor={handleColor}
        colors={dummyPaintData.colors}
        imgSrc={dummyPaintData.objectSrc}
        instruction={dummyPaintData.instruction}
        answer={dummyPaintData.answer}
      />
    </div>
  );
};

export default Page;
