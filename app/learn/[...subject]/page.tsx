"use client";
import InteractiveLesson from "@/app/_components/Lesson/InteractiveLesson";
import Loading from "@/app/_components/Loading";
import { generateLearnLesson } from "@/gemini/lesson/learn";
import { GeneralLesson } from "@/mockups/dummyLesson";
import { handleLessonComplete } from "@/redux/lesson/lessonSlice";
import { GeneralInteractiveLessonType, LessonObjectType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const Page = ({ params }: { params: { subject: string[] } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fullLessonObject, setFullLessonObject] =
    useState<LessonObjectType | null>(null);
  const [lessonObjectList, setLessonObjectList] = useState<
    GeneralInteractiveLessonType[] | null
  >(null);
  const [lessonLength, setLessonLength] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const decodeLessonToLearn = decodeURIComponent(params.subject[0]);
  const decodeSubject = decodeURIComponent(params.subject[1]);
  console.log("SUBJECT TO LEARN: ", decodeSubject);
  const decodeLastLessonLearnt = decodeURIComponent(params.subject[2]);

  const handleIsComplete = (id: string | number) => {
    const updatedLessonObjectList = lessonObjectList?.map((item) =>
      item.id === id ? { ...item, isComplete: true } : item
    );
    if (updatedLessonObjectList) {
      setLessonObjectList(updatedLessonObjectList);
    }

    if (activeLessonIndex + 1 === lessonLength) {
      setActiveLessonIndex(activeLessonIndex);
      return;
    }
    setActiveLessonIndex(activeLessonIndex + 1);
  };

  const handleToggleLesson = (id: string | number) => {
    const findItem = lessonObjectList?.findIndex((lesson) => lesson.id === id);
    if (findItem !== undefined) {
      setActiveLessonIndex(findItem);
    }
  };

  // console.log("LESSON LENGTH: ", lessonLength, activeLessonIndex);
  useEffect(() => {
    console.log("LOADING...");
    (async () => {
      setIsLoading(true);
      const response = await generateLearnLesson({
        lessonToLearn: decodeLessonToLearn,
        name: "Kirin",
        age: 11,
        gradeLevel: 5,
        schoolLevel: "middle school",
        gender: "male",
        country: "Nigeria",
        currentLessonId: 4,
        lastLessonLearnt: decodeLastLessonLearnt,
        subject: decodeSubject,
      });
      console.log("DONE LOADING...", response);
      setLessonObjectList(response.lessonDetails);
      setIsLoading(false);
      setFullLessonObject(response);
    })();
  }, [decodeLessonToLearn, decodeSubject, decodeLastLessonLearnt]);

  useEffect(() => {
    if (lessonObjectList) {
      setLessonLength(lessonObjectList.length);
    }
  }, [lessonObjectList]);
  return (
    <div className="relative py-10 px-5">
      <span> {decodeLessonToLearn}</span>
      {isLoading || !lessonObjectList ? (
        <Loading lessonTitle={`${decodeLessonToLearn} lessons`} />
      ) : (
        <>
          {" "}
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
                    lessonId: fullLessonObject?.lessonId,
                  })
                );
                router.push(`/learn/curriculum/${GeneralLesson.subject}`);
              }}
              className="absolute bottom-5 right-5 bg-orange-500 px-4 rounded-md"
            >
              Finish
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
