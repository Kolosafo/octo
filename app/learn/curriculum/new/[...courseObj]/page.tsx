"use client";
import { createCurriculum } from "@/api/course";
import LessonList from "@/app/_components/Lesson/LessonList";
import LessonLoading from "@/app/_components/Loading";
import Loading from "@/app/loading";
import { handleGenerateCurriculum } from "@/gemini/curriculum/generateCurriculum";
import { BackendCurriculumRequestType, GenCurriculumListType } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/store";
import { calculateAgeFromDate } from "@/helpers/helper";

const Page = ({ params }: { params: { courseObj: string[] } }) => {
  const router = useRouter();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLogged } = useSelector((store: IRootState) => store.user);
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
        name: user.firstName,
        age: calculateAgeFromDate(user.dob ?? ""),
        gradeLevel: user.gradeLevel ?? "",
        learningPace: user.learningPace ?? "Slow",
        schoolLevel: user.educationLevel ?? "middle school",
        gender: user.gender ?? "male",
        country: user.country ?? "USA",
        subject: decodeSubject,
      });
      console.log("AI RESPONSE: ", response);
      handleSaveCreatedCurriculum(response);
      // setGeneratedCurriculum()
      setIsLoading(false);
    })();
  }, [decodeSubject, courseId, dispatch, router, user]);
  return (
    <div>
      {!generatedCurriculum || isLoading ? (
        <div className="h-60 w-full flex flex-col relative justify-center items-center gap-6">
          <span className="absolute top-0"></span>
          <Loading />
        </div>
      ) : (
        generatedCurriculum?.map((item, index) => (
          <LessonList
            courseTitle={decodeSubject}
            key={index}
            {...item}
            courseId={parseInt(courseId)}
          />
        ))
      )}
    </div>
  );
};

export default Page;
