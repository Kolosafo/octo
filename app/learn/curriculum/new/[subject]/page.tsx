"use client";
import LessonList from "@/app/_components/Lesson/LessonList";
import Loading from "@/app/_components/Loading";
import { handleGenerateCurriculum } from "@/gemini/curriculum/generateCurriculum";
import { GeneralCurriculumType } from "@/types";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { subject: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCurriculum, setGeneratedCurriculum] =
    useState<null | GeneralCurriculumType>(null);
  const decodeSubject = decodeURIComponent(params.subject);
  useEffect(() => {
    console.log("LOADING...");
    (async () => {
      setIsLoading(true);
      const response = await handleGenerateCurriculum({
        userId: 97,
        name: "Kirin",
        age: 11,
        gradeLevel: 5,
        schoolLevel: "middle school",
        gender: "male",
        country: "Nigeria",
        subject: decodeSubject,
      });
      console.log("DONE LOADING...", response);
      setGeneratedCurriculum(response);
      setIsLoading(false);
    })();
  }, [decodeSubject]);
  return (
    <div>
      {!generatedCurriculum || isLoading ? (
        <Loading lessonTitle={`${decodeSubject} Masterclass`} />
      ) : (
        generatedCurriculum.curriculum.map((item, index) => (
          <LessonList key={index} {...item} lastLessonLearnt="" />
        ))
      )}
    </div>
  );
};

export default Page;
