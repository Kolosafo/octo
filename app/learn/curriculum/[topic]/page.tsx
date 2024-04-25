"use client";

import React from "react";
import LessonList from "@/app/_components/Lesson/LessonList";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
const Curriculum = ({ params }: { params: { topic: string } }) => {
  const { curriculum } = useSelector((store: IRootState) => store.lesson);
  const decodeSubject = decodeURIComponent(params.topic);

  return (
    <div className="flex flex-col">
      <div className="relative violet-bg px-16 pt-20 pb-6 -mb-5">
        <span className="text-7xl font-bold text-white capitalize">
          {decodeSubject}
        </span>
      </div>
      <div className="h-full w-full rounded-t-3xl border-black flex flex-col gap-8 z-10 p-10 bg-white min-h-full">
        <div className="flex items-center h-full justify-center gap-2"></div>
        {curriculum?.curriculum.map((item, index) => (
          <LessonList key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
