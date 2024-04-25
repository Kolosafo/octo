import { GeneralCurriculumType, SubjectLessonType } from "@/types";

export const ROOT_ULR = "http://127.0.0.1:8000"

export function getLessonCompletionPercentage(lessons: SubjectLessonType[]) {
  const totalLessons = lessons.length;

  // Count the number of completed lessons
  const completedLessons = lessons.filter(
    (lesson) => lesson.isLessonCompleted
  ).length;

  const percentage =
    totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

  return `${percentage.toFixed(0)}% completed`;
}



