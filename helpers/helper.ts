import { BalloonObject } from "@/app/learn/games/octoCrush/page";
import {
  AllCoursesResponseType,
  GenCurriculumListType,
  GeneralCurriculumType,
  SubjectLessonType,
} from "@/types";
import moment from "moment";
import { ImageLoaderProps } from "next/image";

export const ROOT_ULR = "https://gemina-api-875e2fb4c9be.herokuapp.com"; //"https://gemina-api-875e2fb4c9be.herokuapp.com";

export function getLessonCompletionPercentage(lessons: SubjectLessonType[]) {
  const totalLessons = lessons.length;

  // Count the number of completed lessons
  const completedLessons = lessons.filter(
    (lesson) => lesson.isLesson_completed || lesson.isLessonCompleted
  ).length;

  const percentage =
    totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

  return `${percentage.toFixed(0)}% completed`;
}

export const curriculumCompletionPercentage = (
  curriculum: GenCurriculumListType[] | null
) => {
  console.log("CHECKING LESSONS: " + curriculum);
  if (curriculum == null) return 0;
  const totalLessons = curriculum.length;

  // Count the number of completed lessons
  const completedLessons = curriculum.filter(
    (lesson) => lesson.isSectionCompleted || lesson.isSection_completed
  ).length;

  console.log("CHECKING LESSONS: " + curriculum);
  const percentage =
    totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

  return percentage;
};

export function calculateCourseCompletion(
  courseId: number | string,
  courseData: AllCoursesResponseType[] | null
) {
  let totalLessons = 0;
  let completedLessons = 0;

  // Find the course in the courseData
  const course = courseData?.find((course) => course.course.id === courseId);

  if (course) {
    // Iterate through each section in the course curriculum
    course.curriculum.forEach((section) => {
      totalLessons += section.lessons.length; // Count total lessons

      // Iterate through each lesson in the section
      section.lessons.forEach((lesson) => {
        if (lesson.isLesson_completed) {
          completedLessons++; // Count completed lessons
        }
      });
    });

    // Calculate percentage completion
    let percentageCompletion = 0;
    if (totalLessons !== 0) {
      percentageCompletion = (completedLessons / totalLessons) * 100;
    }

    return percentageCompletion > 0 ? percentageCompletion.toFixed(0) : 0;
  } else {
    // Course not found
    return -1;
  }
}

export const checkNumberOfLessons = (
  courseId: number | string,
  courseData: AllCoursesResponseType[] | null
) => {
  const course = courseData?.find((course) => course.course.id === courseId);
  if (course) {
    return course.curriculum.length;
  } else {
    return 0;
  }
};

export function getPreviousLessonTitle(
  lessonTitle: string,
  courseData: GenCurriculumListType[]
) {
  //   // WE WANT TO RETURN THE LAST LESSON LEARNT AND IF THE LESSON IS THE FIRST OF THE SECTION, RETURN THE LAST SECTION TITLE
  // WE NEED THIS TO IMPROVE THE AI
  let previousCourse;

  for (const course of courseData) {
    const lessons = course.lessons;
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      if (lesson.title === lessonTitle) {
        if (i === 0) {
          // Check if it's the first lesson and there's a previous course
          if (previousCourse) {
            return `just finished a section titled: ${
              previousCourse.sectionTitle ?? previousCourse.section_title
            }`; // Return previous section title
          } else {
            // No previous section found
            return "This is the first lesson and section of the course.";
          }
        } else {
          return lessons[i - 1].title; // Return title of previous lesson
        }
      }
      previousCourse = course; // Update previousCourse for next iteration
    }
  }
  return "This is the first lesson and section of the course."; // Lesson not found
}

export const ImgLoader = ({ src }: ImageLoaderProps) => {
  const loaderUrl = `${src}`;
  return loaderUrl;
};

export const calculateAgeFromDate = (date: string): number => {
  return moment().diff(moment(date), "years");
};

export function filterLessonsById(
  dataObj: GenCurriculumListType[]
): GenCurriculumListType[] {
  return dataObj.map((section) => {
    const { lessons, ...rest } = section; // Destructure lessons and other properties
    return {
      ...rest,
      lessons: lessons.sort((a: any, b: any) => a.id - b.id),
    };
  });
}

export function findSlowestBalloon(
  balloons: [BalloonObject, BalloonObject, BalloonObject, BalloonObject]
) {
  return balloons.reduce((slowest, current) => {
    return current.movementSpeed > slowest.movementSpeed ? current : slowest;
  }, balloons[0]); // Provide an initial value (first element)
}
