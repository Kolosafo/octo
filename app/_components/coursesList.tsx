import { AllCoursesResponseType, GeneralCurriculumType } from "@/types";
import React from "react";
import TopicCard from "./TopicCard";
import {
  calculateCourseCompletion,
  checkNumberOfLessons,
} from "@/helpers/helper";
import { useRouter } from "next/navigation";
import PracticeCard from "./practiceCard";

const CoursesList = ({
  courses,
  combinedCourses,
  isLogged,
  displayType,
}: {
  courses: GeneralCurriculumType[] | null;
  combinedCourses: AllCoursesResponseType[] | null;
  isLogged: boolean;
  displayType: "learn" | "practice";
}) => {
  const router = useRouter();
  return !courses || courses.length === 0 ? (
    <div className="flex flex-col gap-4 items-center">
      <span>You haven&lsquo;t started learning any topics yet</span>
      <button
        className="violet-bg text-white px-4 py-2 rounded-md"
        onClick={() => {
          !isLogged ? router.push("/auth/login") : router.push("/learn/new-course");
        }}
      >
        Start Learning
      </button>
    </div>
  ) : (
    courses.map((course) =>
      displayType === "learn" ? (
        <TopicCard
          key={course.id}
          subject={course.subject}
          courseId={course.id}
          numOfLessons={checkNumberOfLessons(course.id, combinedCourses)}
          progressPercentage={calculateCourseCompletion(
            course.id,
            combinedCourses
          )}
          type="Full course"
        />
      ) : (
        <PracticeCard key={course.id} subject={course.subject} />
      )
    )
  );
};

export default CoursesList;
