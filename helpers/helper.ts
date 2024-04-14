import { GeneralCurriculumType, SingleLessonType } from "@/types";

export function getLessonCompletionPercentage(lessons: SingleLessonType[]) {
  const totalLessons = lessons.length;

  // Count the number of completed lessons
  const completedLessons = lessons.filter(
    (lesson) => lesson.isLessonCompleted
  ).length;

  const percentage =
    totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

  return `${percentage.toFixed(0)}% completed`;
}

export function handleUpdateLessonComplete(
  curriculumIndex: number,
  lessonIndex: number,
  curriculum: GeneralCurriculumType
) {
  curriculum.curriculum[curriculumIndex].lessons[
    lessonIndex
  ].isLessonCompleted = true;
  return curriculum;
}
