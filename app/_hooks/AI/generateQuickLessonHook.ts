"use client";
import { getLesson } from "@/api/course";
import { generateLearnLesson, generateNewLesson } from "@/gemini/lesson/learn";
import {
  generateQuickLesson,
  reGenerateNewQuickLesson,
} from "@/gemini/quickLearn/quickLearnPrompt";
import { calculateAgeFromDate, getPreviousLessonTitle } from "@/helpers/helper";
import { handleGetSubject } from "@/redux/quickLearn/quickLearnSlice";
import { IRootState } from "@/redux/store";
import {
  GeneralInteractiveLessonType,
  LessonObjectType,
  QuickLearnType,
} from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGenerateQuickLesson = ({
  subject,
  isLessonCompleted,
  subjectId,
}: {
  subject: string;
  isLessonCompleted: string;
  subjectId: string;
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { user, isLogged } = useSelector((store: IRootState) => store.user);
  const { activeQuickLearnCourse } = useSelector(
    (store: IRootState) => store.quickLearn
  );
  const router = useRouter();
  const [lessonLength, setLessonLength] = useState(0);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isSavingLesson, setIsSavingLesson] = useState(false);
  const [isRegeneration, setIsRegeneration] = useState(false);
  const [showDontUnderstand, setShowDontUnderstand] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [reason, setReason] = useState<string | null>(null);
  const [fullLessonObject, setFullLessonObject] =
    useState<QuickLearnType | null>(null);
  const [lessonObjectList, setLessonObjectList] = useState<
    GeneralInteractiveLessonType[] | null
  >(null);
  const regenerateLesson = async () => {
    if (reason) {
      setIsRegeneration(true);
      setIsStateLoading(true);
      const response = await reGenerateNewQuickLesson({
        reason,
        name: user.firstName,
        lastResponse: JSON.stringify(fullLessonObject),
      });
      setReason("");
      setShowDontUnderstand(false);
      setActiveLessonIndex(0);
      setLessonObjectList(response.lessonDetails);
      setIsStateLoading(false);
      setFullLessonObject(response);
      setIsRegeneration(false);
    }
  };
  // console.log("LESSON LENGTH: ", lessonLength, activeLessonIndex);
  useEffect(() => {
    console.log("LOADING...");
    if (isLogged) {
      (async () => {
        if (isLessonCompleted === "complete") {
          return;
        }
        setIsStateLoading(true);
        const response = await generateQuickLesson({
          name: `${user.firstName} ${user.lastName}`,
          age: calculateAgeFromDate(user.dob ?? ""),
          gradeLevel: user.gradeLevel ?? 10,
          schoolLevel: user.educationLevel ?? "middle school",
          gender: user.gender ?? "male",
          country: user.country ?? "Nigeria",
          subject: subject,
        });
        console.log("DONE LOADING...", response);
        setLessonObjectList(response.lessonDetails);
        setIsStateLoading(false);
        setFullLessonObject(response);
        // return;
      })();
    } else {
      router.push("/auth/login");
    }
  }, [isLessonCompleted, user, subject, isLogged, router]);

  useEffect(() => {
    // THIS USE EFFECT WILL RUN IF THE USER HAS FINISHED THE LESSON, SO IT WILL GET THE LESSON THEY LEARNT FROM THE BACKEND RATHER THA CREATING A NEW ONE
    if (isLessonCompleted === "complete") {
      dispatch(
        handleGetSubject({
          subjectId: parseInt(subjectId),
        })
      );
      setFullLessonObject(activeQuickLearnCourse);
      setLessonObjectList(activeQuickLearnCourse?.lessonDetails ?? null);
    }
  }, [isLessonCompleted, dispatch, subjectId, activeQuickLearnCourse]);

  useEffect(() => {
    if (lessonObjectList) {
      setLessonLength(lessonObjectList.length);
    }
  }, [lessonObjectList]);
  return {
    isStateLoading,
    isRegeneration,
    showDontUnderstand,
    activeLessonIndex,
    fullLessonObject,
    isSavingLesson,
    lessonObjectList,
    reason,
    lessonLength,
    setLessonObjectList,
    setShowDontUnderstand,
    setIsSavingLesson,
    setActiveLessonIndex,
    regenerateLesson,
    setReason,
  };
};

export default useGenerateQuickLesson;
