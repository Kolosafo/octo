import Image from "next/image";
import React from "react";

const SubjectCard = () => {
  return (
    <div className="h-[40%] w-full rounded-md border-2 bg-white text-black border-white px-10 py-10">
      <div className="flex justify-between bg-">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Mathematics</span>
          <span className="font-semibold">6 lessons</span>
        </div>

        <div>
          <Image
            src={"/img/darkArrow.png"}
            alt="arrow"
            width={25}
            height={25}
            className="object-contain cursor-pointer"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SubjectCard;
