"use client";
import InteractiveLesson from "@/app/_components/Lesson/InteractiveLesson";
import { GeneralLesson } from "@/mockups/dummyLesson";
import { handleLessonComplete } from "@/redux/lesson/lessonSlice";
import { GeneralInteractiveLessonType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const Page = ({ params }: { params: { subject: string } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lessonObjectList, setLessonObjectList] = useState(
    GeneralLesson.lessonObj
  );
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const lessonLength = lessonObjectList.length;
  const decodeSubject = decodeURIComponent(params.subject);
  const handleIsComplete = (id: string | number) => {
    const updatedLessonObjectList = lessonObjectList.map((item) =>
      item.id === id ? { ...item, isComplete: true } : item
    );
    setLessonObjectList(updatedLessonObjectList);

    if (activeLessonIndex + 1 === lessonLength) {
      setActiveLessonIndex(activeLessonIndex);
      return;
    }
    setActiveLessonIndex(activeLessonIndex + 1);
  };

  const handleToggleLesson = (id: string | number) => {
    const findItem = lessonObjectList.findIndex((lesson) => lesson.id === id);
    setActiveLessonIndex(findItem);
  };

  console.log("LESSON LENGTH: ", lessonLength, activeLessonIndex);
  return (
    <div className="relative py-10 px-5">
      <span> {decodeSubject}</span>

      <div className="">
        <div className="flex gap-1">
          {lessonObjectList.map(
            (lessonObj: GeneralInteractiveLessonType, index: number) => (
              <div
                key={lessonObj.id}
                className={`p-3 cursor-pointer rounded-full  ${
                  activeLessonIndex === index
                    ? "bg-orange-800 border-[.5px] border-white"
                    : "bg-orange-500"
                }`}
                onClick={() => handleToggleLesson(lessonObj.id)}
              ></div>
            )
          )}
        </div>
        <InteractiveLesson
          handleIsComplete={handleIsComplete}
          props={lessonObjectList[activeLessonIndex]}
        />
      </div>
      {lessonLength === activeLessonIndex + 1 && (
        <button
          onClick={() => {
            dispatch(
              handleLessonComplete({
                sectionId: GeneralLesson.sectionId,
                lessonId: GeneralLesson.sectionLessonId,
              })
            );
            router.push("/learning/curriculum");
          }}
          className="absolute bottom-5 right-5 bg-orange-500 px-4 rounded-md"
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default Page;
