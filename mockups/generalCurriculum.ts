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
      learningType: "interactive",
      isSectionCompleted: false,
    },
    {
      sectionTitle: "Multiderivative Calculus",
      sectionId: 2,
      lessons: [
        {
          title: "Introduction to Multivariable Functions and Differentiation",
          isLessonCompleted: false,
          id: 1,
        },
        {
          title: "Gradient and its Applications",
          isLessonCompleted: false,
          id: 2,
        },
        {
          title: "Directional Derivatives and the Divergence",
          isLessonCompleted: false,
          id: 3,
        },
        {
          title: "Line Integrals and Conservative Vector Fields",
          isLessonCompleted: false,
          id: 4,
        },
        {
          title: "Double Integrals and Applications",
          isLessonCompleted: false,
          id: 5,
        },
      ],
      learningType: "interactive",
      isSectionCompleted: false,
    },
  ],
  isSubjectCompleted: false,
};
