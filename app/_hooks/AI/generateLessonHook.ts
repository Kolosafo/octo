"use client";
import { getLesson } from "@/api/course";
import { generateLearnLesson, generateNewLesson } from "@/gemini/lesson/learn";
import { calculateAgeFromDate, getPreviousLessonTitle } from "@/helpers/helper";
import { IRootState } from "@/redux/store";
import { GeneralInteractiveLessonType, LessonObjectType } from "@/types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGenerateLesson = ({
  lessonToLearn,
  subject,
  currentLessonId,
  isLessonCompleted,
  courseId,
}: {
  lessonToLearn: string;
  subject: string;
  currentLessonId: string;
  isLessonCompleted: string;
  courseId: string;
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { user, isLogged } = useSelector((store: IRootState) => store.user);
  const { activeCourseCurriculum } = useSelector(
    (store: IRootState) => store.lesson
  );
  const router = useRouter();
  const [lessonLength, setLessonLength] = useState(0);
  const [error, setError] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isSavingLesson, setIsSavingLesson] = useState(false);
  const [isRegeneration, setIsRegeneration] = useState(false);
  const [showDontUnderstand, setShowDontUnderstand] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [reason, setReason] = useState<string | null>(null);
  const [fullLessonObject, setFullLessonObject] =
    useState<LessonObjectType | null>(null);
  const [lessonObjectList, setLessonObjectList] = useState<
    GeneralInteractiveLessonType[] | null
  >(null);
  const regenerateLesson = async () => {
    if (reason) {
      setIsRegeneration(true);
      setIsStateLoading(true);
      const response = await generateNewLesson({
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
    if (activeCourseCurriculum && isLogged) {
      const lastLearntLesson = getPreviousLessonTitle(
        lessonToLearn,
        activeCourseCurriculum
      );
      (async () => {
        if (isLessonCompleted === "complete") {
          return;
        }
        setIsStateLoading(true);
        const response = await generateLearnLesson({
          lessonToLearn: lessonToLearn,
          name: `${user.firstName} ${user.lastName}`,
          age: calculateAgeFromDate(user.dob ?? ""),
          gradeLevel: user.gradeLevel ?? 10,
          schoolLevel: user.educationLevel ?? "middle school",
          learningPace: user.learningPace ?? "Slow",
          gender: user.gender ?? "male",
          country: user.country ?? "USA",
          currentLessonId: currentLessonId,
          lastLessonLearnt: lastLearntLesson,
          subject: subject,
        }).catch(() => {
          setError(true);
          setIsStateLoading(false);
        });
        if (response) {
          setFullLessonObject(response);
          setLessonObjectList(response.lessonDetails);
        }
        console.log("PARAMETERS SENT", subject);
        console.log("DONE LOADING...", response);
        setIsStateLoading(false);
        // return;
      })();
    } else {
      router.push("/auth/login");
    }
  }, [
    lessonToLearn,
    isLessonCompleted,
    user,
    subject,
    activeCourseCurriculum,
    currentLessonId,
    isLogged,
    router,
  ]);

  useEffect(() => {
    // THIS USE EFFECT WILL RUN IF THE USER HAS FINISHED THE LESSON, SO IT WILL GET THE LESSON THEY LEARNT FROM THE BACKEND RATHER THA CREATING A NEW ONE
    if (isLessonCompleted === "complete") {
      setIsStateLoading(true);
      dispatch(
        getLesson({
          course_id: parseInt(courseId),
          parent_subject_lesson: parseInt(currentLessonId),
        })
      ).then(({ payload }) => {
        setFullLessonObject(payload.data);
        setLessonObjectList(payload.data.lesson_details);
        setIsStateLoading(false);
      });
    }
  }, [
    isLessonCompleted,
    currentLessonId,
    courseId,
    dispatch,
    setFullLessonObject,
    setIsStateLoading,
    setLessonObjectList,
  ]); // adding the lesson deoendency will cause endless loop

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
    error,
    setLessonObjectList,
    setShowDontUnderstand,
    setIsSavingLesson,
    setActiveLessonIndex,
    regenerateLesson,
    setReason,
  };
};

export default useGenerateLesson;
