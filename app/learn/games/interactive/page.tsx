import InteractiveImage from "@/app/_components/InteractiveImage";
import { interactiveDummyResponse } from "@/game_utils/interactive/dummyData";
import Image from "next/image";
import React from "react";
const Page = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center px-10 py-10">
      <span className="text-2xl font-semibold">
        {interactiveDummyResponse.displayQuestion.aiText}
      </span>
      {interactiveDummyResponse.question && (
        <span className="italic underline">
          QUESTION: {interactiveDummyResponse.question}
        </span>
      )}

      <div className="flex flex-wrap gap-10">
        {interactiveDummyResponse.displayQuestion.image?.map((imgProp) => {
          return (
            <InteractiveImage
              id={imgProp.id}
              label={imgProp.label}
              key={imgProp.id}
              src={imgProp.src}
              name={imgProp.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
