"use client";
import { createCurriculum } from "@/api/course";
import LessonList from "@/app/_components/Lesson/LessonList";
import LessonLoading from "@/app/_components/Loading";
import Loading from "@/app/loading";
import { handleGenerateCurriculum } from "@/gemini/curriculum/generateCurriculum";
import { BackendCurriculumRequestType, GenCurriculumListType } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { courseObj: string[] } }) => {
  const router = useRouter();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<
    null | GenCurriculumListType[]
  >(null);
  const decodeSubject = decodeURIComponent(params.courseObj[0]);
  const courseId = decodeURIComponent(params.courseObj[1]);

  useEffect(() => {
    const handleSaveCreatedCurriculum = (
      payload: BackendCurriculumRequestType[]
    ) => {
      dispatch(createCurriculum(payload)).then(({ payload }) => {
        if (payload.length > 0) {
          router.push(`/learn`);
        }
      });
    };
    console.log("LOADING...");
    (async () => {
      setIsLoading(true);
      const response = await handleGenerateCurriculum({
        courseId: parseInt(courseId),
        name: "Kirin",
        age: 11,
        gradeLevel: 5,
        schoolLevel: "middle school",
        gender: "male",
        country: "Nigeria",
        subject: decodeSubject,
      });
      console.log("AI RESPONSE: ", response);
      handleSaveCreatedCurriculum(response);
      // setGeneratedCurriculum()
      setIsLoading(false);
    })();
  }, [decodeSubject, courseId, dispatch, router]);
  return (
    <div>
      {!generatedCurriculum || isLoading ? (
        <div className="h-60 w-full flex flex-col relative justify-center items-center gap-6">
          <span className="absolute top-0"></span>
          <Loading
            loadMsg={`Professor Octo is generating your ${decodeSubject} Masterclass`}
          />
        </div>
      ) : (
        generatedCurriculum?.map((item, index) => (
          <LessonList courseTitle={decodeSubject} key={index} {...item} courseId={parseInt(courseId)} />
        ))
      )}
    </div>
  );
};

export default Page;
