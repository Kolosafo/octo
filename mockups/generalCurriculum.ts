import { GeneralCurriculumType } from "@/types";

export const GeneralCurriculum: GeneralCurriculumType = {
  userId: 1,
  subject: "Calculus",
  curriculum: [
    {
      sectionTitle: "Introduction to Calculus",
      sectionId: 1,
      lessons: [
        { title: "What is calculus?", isLessonCompleted: true, id: 1 },
        { title: "Introduction to Calculus", isLessonCompleted: false, id: 2 },
        { title: "basic calculus", isLessonCompleted: false, id: 3 },
      ],
      exercise: "",
      learningType: "interactive",
      isSelectionCompleted: false,
    },
    {
      sectionTitle: "Multiderivative Calculus",
      sectionId: 2,
      lessons: [
        { title: "What is calculus?", isLessonCompleted: false, id: 1 },
        { title: "Introduction to Calculus", isLessonCompleted: false, id: 2 },
        { title: "basic calculus", isLessonCompleted: false, id: 3 },
      ],
      exercise: "",
      learningType: "interactive",
      isSelectionCompleted: false,
    },
  ],
  isCompleted: false,
};
