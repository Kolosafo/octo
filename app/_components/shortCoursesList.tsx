import { QuickLearnType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import TopicCard from "./TopicCard";
import PracticeCard from "./practiceCard";

export const ShortCoursesList = ({
  shortCourses,
  isLogged,
  displayType,
}: {
  shortCourses: QuickLearnType[] | null;
  isLogged: boolean;
  displayType: "learn" | "practice";
}) => {
  const router = useRouter();
  return !shortCourses || shortCourses.length === 0 ? (
    <div className="flex flex-col gap-4 items-center">
      <span>You haven&lsquo;t started learning any topics yet</span>
      <button
        className="violet-bg text-white px-4 py-2 rounded-md"
        onClick={() => {
          !isLogged
            ? router.push("/auth/login")
            : router.push("/learn/new-course?quickLearn=true");
        }}
      >
        Take A Short Course
      </button>
    </div>
  ) : (
    shortCourses.map((course) =>
      displayType === "learn" ? (
        <TopicCard
          key={course.id}
          subject={course.subject}
          courseId={course.id ?? 0}
          progressPercentage={100}
          type="Short course"
        />
      ) : (
        <PracticeCard key={course.id} subject={course.subject} />
      )
    )
  );
};
