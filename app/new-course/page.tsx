"use client";
import React, { useState } from "react";
import SubjectSearchSelect from "../_components/subjectSearchSelect";
import { SUBJECTS_LIST } from "@/mockups/subjects";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "@/api/course";
import { useRouter } from "next/navigation";
import { IRootState } from "@/redux/store";
import Loading from "../_components/Loading";

const Page = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading } = useSelector((store: IRootState) => store.lesson);
  const [errorMsg, setError] = useState("");
  const router = useRouter();
  const handleCreateCourses = (selectedSubject: string) => {
    setError("");
    dispatch(createCourse({ subject: selectedSubject }))
      .then(({ payload }) => {
        if (payload === "You have already started learning this course") {
          setError(payload);
          return;
        }
        router.push(`/learn/curriculum/new/${payload.subject}/${payload.id}`); // COURSE SUBJECT AND ID must be passed
        console.log("CHECKING PAYLOAD: ", payload)
      })
      .catch((e) => {
        console.log("CHECKING ERROR: ", e);
        setError("Login Required!");
        router.push(`/auth/login`);
      });
  };
  return (
    <div>
      <span>{errorMsg}</span>
      <span>Select a subject</span>
      {isLoading ? (
        <Loading lessonTitle="Loading..." /> // SHOULD BE CHANGED WITH THE LOADING ANIMATION KIRIN BUILT
      ) : (
        <SubjectSearchSelect
          subjects={SUBJECTS_LIST}
          handleCreateCourses={handleCreateCourses}
        />
      )}
    </div>
  );
};

export default Page;
