"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCourses, getUserQuickLearning } from "@/api/course";
import Loading from "../loading";
import { FiPlusCircle } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import CoursesList from "../_components/coursesList";
import { ShortCoursesList } from "../_components/shortCoursesList";

type typeCourseType = "Full Courses" | "Short Courses";

const Page = () => {
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
  console.log("FULL COURSES: ", combinedCourseAndCurriculumObject);
  return (
    <div className="relative min-h-screen gradient">
      <section className="sticky top-0 min-h-[30vh] flex items-center justify-center">
        <div className="sticky top-0 min-h-[30vh] flex items-center justify-center p-5">
          <h1 className=" text-mainTxt text-2xl lg:text-4xl font-bold text-center">
            Ready to learn?
          </h1>
        </div>
      </section>

      <section className="relative p-6 bg-white min-h-[70vh]">
        {!isLogged ? (
          <div className="flex w-full min-h-[50vh] justify-center items-center">
            <p className="max-w-screen-sm mx-auto text-center text-lg">
              Hi there, you need to be signed in for a personalized experience.
              please use the &quot;login&quot; button on the sidebar to
              continue.
            </p>
          </div>
        ) : isLoading || authLoading ? (
          <Loading />
        ) : (
          <div className="max-w-screen-md mx-auto flex flex-col gap-8 bg-white min-h-full">
            <div className="w-full flex justify-between">
              <div className="relative w-fit">
                <div
                  onClick={() => setShowChooseList(!showChooseList)}
                  className="cursor-pointer flex gap-3 justify-center items-center p-2 outline outline-1"
                >
                  <span>{courseType}</span>
                  <BiChevronDown size={25} />
                </div>
                <div
                  className={`${
                    showChooseList
                      ? "visible -translate-x-0 py-2 opacity-100"
                      : "invisible -translate-x-3 opacity-0"
                  } flex flex-col justify-center gap-4 items-center bg-white p-3 absolute bottom-full -left-6 mb-2`}
                >
                  <button
                    onClick={() => {
                      setCourseType("Full Courses");
                      setShowChooseList(false);
                    }}
                    className="flex items-center gap-2 px-4 whitespace-nowrap py-2 bg-main text-white font-semibold rounded-md"
                  >
                    Full Courses
                  </button>
                  <button
                    onClick={() => {
                      setCourseType("Short Courses");
                      setShowChooseList(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-main text-white font-semibold rounded-md"
                  >
                    Short Courses
                  </button>
                </div>
              </div>
              <div className="relative self-end">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-2 px-4 py-2 bg-main text-white font-semibold rounded-md self-end"
                >
                  <FiPlusCircle size={20} />
                  <span>New</span>
                </button>
                <div
                  className={`${
                    showMore
                      ? "visible -translate-x-0 py-2 opacity-100"
                      : "invisible -translate-x-3 opacity-0"
                  } flex flex-col justify-center gap-4 items-center bg-white p-3 absolute bottom-full -left-6 mb-2`}
                >
                  <button
                    onClick={() => {
                      !isLogged
                        ? router.push("/auth/login")
                        : router.push("/new-course");
                    }}
                    className="flex items-center gap-2 px-4 whitespace-nowrap py-2 bg-main text-white font-semibold rounded-md"
                  >
                    Full course
                  </button>
                  <button
                    onClick={() => {
                      !isLogged
                        ? router.push("/auth/login")
                        : router.push("/new-course?quickLearn=true");
                    }}
                    className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-main text-white font-semibold rounded-md"
                  >
                    Quick Learn
                  </button>
                </div>
              </div>
            </div>
            {courseType === "Full Courses" ? (
              <CoursesList
                displayType="learn"
                courses={courses}
                isLogged={isLogged}
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
