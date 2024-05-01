"use client";
import Error from "@/app/_components/Error";
import InteractiveLesson from "@/app/_components/Lesson/InteractiveLesson";
import useGeneratePractice from "@/app/_hooks/AI/generatePracticeHook";
import Skeleton from "@/components/skeleton";
import { handleGetSingleCourseCompletedTopics } from "@/redux/learn/learnSlice";
import { IRootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }: { params: { courseTitle: string } }) => {
  const { finishedFullCourseTopics } = useSelector(
    (store: IRootState) => store.lesson
  );
  const {
    error,
    practiceQuestions,
    isStateLoading,
    questionLength,
    setPracticeQuestions,
  } = useGeneratePractice({
    finishedFullCourseTopics,
  });
  const course = params.courseTitle;
  const [isPracticeEnded, setIsPracticeEnded] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleIsComplete = (id: string | number) => {
    const updatedLessonObjectList = practiceQuestions?.questions.map((item) =>
      item.id === id ? { ...item, isComplete: true } : item
    );
    if (updatedLessonObjectList) {
      setPracticeQuestions(
        (prev) =>
          prev && {
            ...prev,
            questions: updatedLessonObjectList,
          }
      );
    }

    if (activeLessonIndex + 1 === questionLength) {
      setActiveLessonIndex(activeLessonIndex);
      return;
    }
    setActiveLessonIndex(activeLessonIndex + 1);
  };

  const handleToggleLesson = (id: string | number) => {
    const findItem = practiceQuestions?.questions.findIndex(
      (question) => question.id === id
    );
    if (findItem !== undefined) {
      setActiveLessonIndex(findItem);
    }
  };

  useEffect(() => {
    dispatch(handleGetSingleCourseCompletedTopics(course));
  }, [dispatch, course]);
  return (
    <div className="relative min-h-screen gradient">
      <div className="sticky top-0 min-h-[20vh] flex flex-col items-center justify-center p-5">
        <h1 className="capitalize text-mainTxt text-2xl lg:text-4xl font-bold text-center">
          {course}
        </h1>
      </div>

      <section className="relative p-6 bg-white min-h-[80vh]">
        {error ? (
          <Error />
        ) : isStateLoading || !practiceQuestions ? (
          <div className="max-w-screen-md mx-auto min-h-[60vh] flex flex-col gap-8 text-center">
            <p>Professor Octo is cooking your practice questions</p>
            <Skeleton type="lesson" />
          </div>
        ) : (
          <>
            <div className="max-w-screen-md mx-auto">
              <div className="flex items-center justify-center gap-8">
                {practiceQuestions.questions.map((questions, index: number) => (
                  <button
                    type="button"
                    title={"Question " + index}
                    key={questions.id}
                    className={`w-5 h-5 rounded-full border-none bg-main outline-none transition duration-300${
                      activeLessonIndex === index
                        ? "bg-main outline-2 outline-main outline-offset-2"
                        : "outline-transparent"
                    }`}
                    onClick={() => handleToggleLesson(questions.id)}
                  ></button>
                ))}
              </div>
              <div className={`flex flex-col gap-1 absolute top-7 right-10`}>
                <span className=" text-white violet-bg px-4 py-2 rounded-md">
                  Question {activeLessonIndex + 1} of {questionLength}
                </span>
              </div>

              <InteractiveLesson
                handleIsComplete={handleIsComplete}
                props={practiceQuestions.questions[activeLessonIndex]}
              />
            </div>
            {questionLength === activeLessonIndex + 1 && (
              <button
                onClick={() => {
                  setIsPracticeEnded(true);
                  // router.push("/practice");
                }}
                className="absolute bottom-5 right-5 text-white violet-bg px-4 rounded-md"
              >
                Finish
              </button>
            )}
          </>
        )}
      </section>
      {isPracticeEnded && (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full w-screen bg-black/70">
          <span className="text-white text-2xl px-4 py-2 light-peach-bg">
            Practice Complete!
          </span>
  
          <span
            onClick={() => router.push("/practice")}
            className="cursor-pointer mt-4 text-base font-semibold text-neutral-200"
          >
            Exit
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
