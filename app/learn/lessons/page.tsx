"use client";
import React, { useEffect, useState } from "react";
import TopicCard from "../../_components/TopicCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import {
  calculateCourseCompletion,
  curriculumCompletionPercentage,
} from "@/helpers/helper";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCourses, getUserQuickLearning } from "@/api/course";
import Loading from "../../loading";
import Link from "next/link";

import { FiPlusCircle } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import CoursesList from "../../_components/coursesList";
import { ShortCoursesList } from "../../_components/shortCoursesList";
import Loader from "@/components/loader";

type typeCourseType = "Full Courses" | "Short Courses";

const Page = ({ params }: { params?: { newCourse: string } }) => {
  const [showMore, setShowMore] = useState(false);
  const [showChooseList, setShowChooseList] = useState(false);
  const [courseType, setCourseType] = useState<typeCourseType>("Full Courses");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const { courses, isLoading, combinedCourseAndCurriculumObject } = useSelector(
    (store: IRootState) => store.lesson
  );
  const { quickLearnCourses } = useSelector(
    (store: IRootState) => store.quickLearn
  );
  const { isLogged, authLoading } = useSelector(
    (store: IRootState) => store.user
  );

  useEffect(() => {
    isLogged ? dispatch(getCourses()) : null;
  }, [dispatch, isLogged]);

  useEffect(() => {
    isLogged && courses ? dispatch(getUserQuickLearning()) : null; // we only want to get the Short courses when the courses have loaded:
    console.log("Endless loop check");
  }, [dispatch, isLogged, courses]); // THis is to prevent request overload to the DB

  return (
    <div className="relative min-h-screen gradient">
      <section className="sticky top-0 min-h-[30vh] flex items-center justify-center">
        <div className="sticky top-0 min-h-[30vh] flex items-center justify-center p-5">
          <h1 className=" text-mainTxt text-2xl lg:text-4xl font-bold text-center">
            Your lessons at a glance
          </h1>
        </div>
      </section>

      <section className="relative p-6 bg-white min-h-[70vh]">
        {!isLogged ? (
          <div className="flex w-full min-h-[50vh] justify-center items-center">
            <p className="max-w-screen-sm mx-auto text-center text-lg">
              You need to be signed in to view your lessons. please use the
              &quot;login&quot; button on the sidebar to continue.
            </p>
          </div>
        ) : isLoading || authLoading ? (
          <Loader label="Getting your lessons" />
        ) : (
          <div className="w-full flex flex-col gap-10 max-w-screen-md mx-auto">
            <div className="grid grid-cols-2 rounded-lg bg-white border border-main p-2">
              <button
                type="button"
                onClick={() => setCourseType("Full Courses")}
                className={`p-2 rounded-md transition duration-300 ${
                  courseType === "Full Courses" ? "bg-main/50 text-altTxt" : ""
                }`}
              >
                Full Lessons
              </button>
              <button
                type="button"
                onClick={() => setCourseType("Short Courses")}
                className={`p-2 rounded-md transition duration-300 ${
                  courseType === "Short Courses" ? "bg-main/50 text-altTxt" : ""
                }`}
              >
                Short Lessons
              </button>
            </div>
            {courseType === "Full Courses" ? (
              <CoursesList
                courses={courses}
                isLogged={isLogged}
                displayType="learn"
                combinedCourses={combinedCourseAndCurriculumObject}
              />
            ) : (
              <ShortCoursesList
                displayType="learn"
                shortCourses={quickLearnCourses}
                isLogged={isLogged}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
