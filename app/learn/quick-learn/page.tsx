"use client";
import { updateQuickLearn } from "@/api/course";
import Error from "@/app/_components/Error";
import InteractiveLesson from "@/app/_components/Lesson/InteractiveLesson";
import useGenerateQuickLesson from "@/app/_hooks/AI/generateQuickLessonHook";
import PromptModal from "@/components/modal";
import Modal from "@/components/modal";
import Skeleton from "@/components/skeleton";
import { GeneralInteractiveLessonType } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { MdCancel } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";

const Page = () => {
  const searchParams = useSearchParams();
  // PARAMETER ORDER: subjectId, lesson, subject, isComplete
  const subject = searchParams.get("subject") ?? "";
  const subjectId = searchParams.get("subjectId") ?? "";
  const isLessonCompleted = searchParams.get("isComplete") ?? "";
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const {
    isStateLoading,
    isRegeneration,
    showDontUnderstand,
    activeLessonIndex,
    fullLessonObject,
    isSavingLesson,
    lessonObjectList,
    reason,
    lessonLength,
    error,
    setLessonObjectList,
    setShowDontUnderstand,
    setIsSavingLesson,
    setActiveLessonIndex,
    regenerateLesson,
    setReason,
  } = useGenerateQuickLesson({
    subjectId,
    subject,
    isLessonCompleted,
  });
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

  const modalRef = useRef<HTMLDialogElement>(null);

  const close = () => {
    modalRef.current?.close();
  };
  const showModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className="relative min-h-screen gradient">
      <div className="sticky top-0 min-h-[20vh] flex flex-col items-center justify-center p-5">
        <h1 className="capitalize text-mainTxt text-2xl lg:text-4xl font-bold text-center">
          {subject}
        </h1>
      </div>

      <section className="relative p-6 bg-white min-h-[80vh]">
        {error ? (
          <Error />
        ) : isStateLoading || !lessonObjectList ? (
          <div className="max-w-screen-md mx-auto min-h-[60vh] flex flex-col gap-8 text-center">
            <p>
              Professor Octo is{" "}
              {isRegeneration ? "re-generating" : "generating"} your lesson
            </p>
            <Skeleton type="lesson" />
          </div>
        ) : (
          <>
            <div className="max-w-screen-md mx-auto">
            <div className='flex flex-col gap-6 justify-center'>
                <div className='flex items-center justify-center gap-8'>
                  {lessonObjectList.map(
                    (lessonObj: GeneralInteractiveLessonType, index: number) => (
                      <button
                        type='button'
                        title={'Question ' + index}
                        key={lessonObj.id}
                        className={`w-5 h-5 rounded-full border-none bg-main outline-none transition duration-300${
                          activeLessonIndex === index
                            ? 'bg-main outline-2 outline-main outline-offset-2'
                            : 'outline-transparent'
                        }`}
                        onClick={() => handleToggleLesson(lessonObj.id)}
                      ></button>
                    )
                  )}
                </div>

                {activeLessonIndex > 1 && (
                  <button
                    type='button'
                    onClick={showModal}
                    className='ml-auto w-fit text-altTxt flex items-center gap-4 p-3 rounded-md border-2 border-blue-500 bg-blue-500/20 focus-visible:bg-blue-500/20 focus-visible:border-dotted outline-none transition duration-300'
                  >
                    I don&apos;t understand
                  </button>
                )}
              </div>

              <PromptModal ref={modalRef}>
                <div className='max-w-[400px] bg-white p-5 rounded-lg'>
                  <h2 className='text-main text-xl font-bold'>
                    I dont&apos;t understand
                  </h2>
                  <p className='text-altTxt my-5'>
                    Please explain what you don&apos;t understand so that octo
                    can improve its explanation for you.
                  </p>
                  <form className='flex flex-col gap-4'>
                    <label
                      htmlFor='explanation'
                      title='explain to octo what you dont understand in this lesson'
                      className='p-3 bg-mainBg rounded-md outline-main outline-offset-1 outline-1 focus-within:outline-dashed transition duration-300'
                    >
                      <input
                        name='subject'
                        placeholder='I dont understand 1 + 1...'
                        className='w-full bg-transparent placeholder:text-sm border-none outline-none'
                      />
                    </label>
                    <div className='flex gap-4 uppercase text-white text-sm'>
                      <button
                        type='button'
                        className='w-full bg-red-400 px-3 py-3 rounded-md uppercase'
                        onClick={close}
                      >
                        cancel
                      </button>
                      <button
                        type='submit'
                        className='w-full bg-green-400 px-3 py-3 rounded-md uppercase transition'
                        onClick={regenerateLesson}
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </PromptModal>

              {/* <div
                style={{ display: activeLessonIndex > 1 ? "flex" : "none" }} // ask user if they dont understand after at least one lesson
                className="flex flex-col gap-1 absolute top-7 right-10"
              >
                <button
                  onClick={() => setShowDontUnderstand(true)}
                  className=" text-white violet-bg px-4 py-2 rounded-md"
                >
                  I don&apos;t understand
                </button>

                <div
                  style={{ display: showDontUnderstand ? "flex" : "none" }}
                  className="relative flex flex-col gap-4 w-40 py-2 bg-white px-2 border-[1px] border-neutral-500"
                >
                  <MdCancel
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={() => setShowDontUnderstand(false)}
                  />
                  <span className="text-xs">
                    Tell Octo what you don&apos;t understand in this lesson so
                    it can improve immediately
                  </span>
                  <input
                    className="text-xs rounded-lg w-full p-1 bg-black/60 outline-none text-mainTxt placeholder:text-mainTxt"
                    type="text"
                    placeholder="unclear explanation"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason ?? ""}
                  />
                  <button
                    disabled={reason ? false : true}
                    className="text-white bg-orange-500 px-2 rounded-md"
                    onClick={regenerateLesson}
                  >
                    Submit
                  </button>
                </div>
              </div> */}

              <InteractiveLesson
                handleIsComplete={handleIsComplete}
                props={lessonObjectList[activeLessonIndex]}
              />
            </div>
            {lessonLength === activeLessonIndex + 1 && (
              <button
                onClick={() => {
                  if (fullLessonObject && isLessonCompleted !== "complete") {
                    setIsSavingLesson(true);
                    dispatch(
                      updateQuickLearn({
                        id: parseInt(subjectId),
                        lessonDetails: fullLessonObject.lessonDetails,
                      })
                    ).then(({ payload }) => {
                      setIsSavingLesson(true);
                      // console.log("LESSON SAVED: ", payload);
                      router.push(`/learn?quickLearn=true`);
                    });
                  } else {
                    router.push(`/learn?quickLearn=true`);
                  }
                }}
                className="absolute bottom-5 right-5 text-white violet-bg px-4 rounded-md"
                disabled={isSavingLesson}
              >
                {isSavingLesson ? (
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#ffffff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Finish"
                )}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
