"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCourses } from "@/api/course";

import { GiBrain } from "react-icons/gi";
import { ImInfo } from "react-icons/im";

import CoursesList from "../../_components/coursesList";
import PracticeInfoCard from "../../_components/practiceInfoCard";
import Loader from "@/components/loader";

const Page = ({ params }: { params?: { newCourse: string } }) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const { courses, isLoading, combinedCourseAndCurriculumObject } = useSelector(
    (store: IRootState) => store.lesson
  );
  const { isLogged, authLoading } = useSelector(
    (store: IRootState) => store.user
  );

  useEffect(() => {
    isLogged && !courses ? dispatch(getCourses()) : null;
  }, [dispatch, isLogged, courses]);

  return (
    <div className="relative min-h-screen gradient">
      <section className="sticky top-0 min-h-[30vh] flex items-center justify-center">
        <div className="sticky top-0 min-h-[30vh] flex flex-col items-center justify-center p-5">
          <h1 className=" text-mainTxt text-2xl lg:text-4xl font-bold text-center">
            Ready to practice?
          </h1>
          <span className="text-mainTxt text-sm mt-2">
            {" "}
            Practicing helps you retain information
          </span>
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
          <Loader label="Loading..." />
        ) : (
          <div className="max-w-screen-md mx-auto flex flex-col gap-8 bg-white min-h-full">
            <div className="w-full flex items-center justify-between">
              <div className="">
                {/* <ImInfo className="cursor-pointer" color="#8a4c7d" size={30} /> */}
                <PracticeInfoCard
                  text="Practice questions are based on only completed lessons from a course. Also, you can only practice Full Courses at the moment."
                  icon={<ImInfo size={25} className="group-hover:text-main" />}
                />
              </div>
              <div className="relative self-end">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-2 px-4 py-2 bg-main text-white font-semibold rounded-md self-end"
                  disabled
                >
                  <GiBrain size={20} />
                  <span>Practice all courses learnt</span>
                </button>
              </div>
            </div>
            <CoursesList
              displayType="practice"
              courses={courses}
              isLogged={isLogged}
              combinedCourses={combinedCourseAndCurriculumObject}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
