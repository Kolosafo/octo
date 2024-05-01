"use client";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generateQuestions } from "@/gemini/practice/prompt";
import { PracticeObjectType } from "@/types";

const useGeneratePractice = ({
  finishedFullCourseTopics,
}: {
  finishedFullCourseTopics: string[] | null;
}) => {
  const [error, setError] = useState(false);
  const [practiceQuestions, setPracticeQuestions] =
    useState<PracticeObjectType | null>(null);
  const [questionLength, setQuestionLength] = useState(0);

  const { isLogged, user } = useSelector((store: IRootState) => store.user);
  const router = useRouter();
  const [isStateLoading, setIsStateLoading] = useState(false);

  useEffect(() => {
    console.log("LOADING...");
    if (isLogged) {
      (async () => {
        setIsStateLoading(true);
        if (finishedFullCourseTopics) {
          const response = await generateQuestions({
            subjectsStudied: finishedFullCourseTopics,
            student: user.firstName,
          }).catch(() => {
            setError(true);
            setIsStateLoading(false);
          });
          if (response) {
            console.log("DONE LOADING...", response);
            setIsStateLoading(false);
            setPracticeQuestions(response);
          }
        }
      })();
    } else {
      router.push("/auth/login");
    }
  }, [finishedFullCourseTopics, isLogged, router, user.firstName]);
  useEffect(() => {
    if (practiceQuestions?.questions) {
      setQuestionLength(practiceQuestions.questions.length);
    }
  }, [practiceQuestions]);
  return {
    isStateLoading,
    error,
    setPracticeQuestions,
    practiceQuestions,
    questionLength
  };
};

export default useGeneratePractice;
