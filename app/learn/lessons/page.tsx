"use client";
import { GeneralCurriculum } from "@/mockups/generalCurriculum";

import React from "react";
import LessonList from "@/app/_components/Lesson/LessonList";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
const Curriculum = () => {
  const { curriculum } = useSelector((store: IRootState) => store.lesson);

  return (
    <div className="py-10">
      <span className="text-2xl pl-10">{GeneralCurriculum.subject}</span>
      <div className="px-20 py-10 gap-5 flex flex-col">
        {curriculum?.curriculum.map((item, index) => (
          <LessonList key={index} {...item} />
          // <div key={index}>
          //   <div className="flex gap-5 justify-between px-8">
          //     <span className="font-bold text-lg">{item.sectionTitle}</span>
          //     <div className="gap-4 flex">
          //       <span>{getLessonCompletionPercentage(item.lessons)}</span>
          //       <FaChevronDown className="cursor-pointer" size={25} />
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default Curriculum;
