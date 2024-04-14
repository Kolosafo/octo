"use client";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { getLessonCompletionPercentage } from "@/helpers/helper";
import { GenCurriculumListType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

const LessonList = ({
  sectionTitle,
  lessons,
  exercise,
  learningType,
  isSelectionCompleted,
}: GenCurriculumListType) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((open) => !open)}
      className="w-full p- transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
    >
      <div className="px-4 py-5 bg-gray-100 border-2 border-indigo-600 first-letter:md:px-8 md:py-7 bg-opacity-60 rounded-2xl shadow-10xl">
        <div className="flex flex-wrap justify-between -m-2">
          <div className="flex-1 relative">
            <div className="flex justify-between w-full p-2 cursor-pointer">
              <h3 className="font-semibold leading-normal uppercase md:text-lg ">
                {sectionTitle}
              </h3>
              <div className="flex items-center  h-full justify-center gap-2">
                <span>{getLessonCompletionPercentage(lessons)}</span>
                {!open ? (
                  <IoIosArrowDropdownCircle
                    size={30}
                    className=" cursor-pointer"
                  />
                ) : (
                  <IoIosArrowDropupCircle
                    size={30}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>

            {open
              ? lessons.map((lesson) => (
                  <div key={lesson.title} className="p-3">
                    <hr className="border-1 border-gray-500" />
                    <div className="bg-gray-700 p-1 py-3 my-2 text-white flex justify-between px-4">
                      <span>{lesson.title}</span>
                      <div className="flex items-center gap-3">
                        <FaPlayCircle
                          onClick={() => {
                            router.push(`/learning/${lesson.title}`);
                          }}
                          size={25}
                          className="cursor-pointer"
                        />
                        {lesson.isLessonCompleted && (
                          <FaCheckCircle size={25} color="lightgreen" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonList;
