import { preSchoolCurriculumGameTypes } from "./game_utils/gameTypes";

///  USERTYPE

export type USER = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string | null;
  learningPace: "Fast" | "Slow" | "I don't know" | null;
  gender: "male" | "female" | "prefer not to say" | null;
  profile_picture: string | null;
  country: string | null;
  educationLevel: "middle school" | "high school" | null;
  gradeLevel: string | null;
};

export type UpdateProfileReqType = {
  gender: "Female" | "Male" | "Prefer not to say" | "";
  DOB: string;
  school_level: "middle school" | "high school" | "";
  grade_level: number;
  country: string;
  learningPace: "Fast" | "Slow" | "I don't know";
};

export type BackendUserType = {
  id: string | number;
  email: string;
  first_name: string;
  profile_picture: string;
  last_name: string;
  learningPace: "Fast" | "Slow" | "I don't know" | null;
  gender: "male" | "female" | "prefer not to say";
  DOB: string;
  school_level: "middle school" | "high school";
  grade_level: string;
  country: string;
};
//// TODO: GRID TYPES

export type GridBoxType = {
  id: string;
  index: number;
  value: string;
  type: "image" | "text";
  color?: string;
  image?: string;
  onClick?: (param?: any) => void;
};

export type GridType = {
  draggable: boolean;
  length: number;
  boxes: GridBoxType[];
};
export type AiGridResponseType = {
  question: string;
  displayQuestion: GridType;
  answer: string;
  hint: string;
  note: string;
  timeout: number;
};

export type StudentResponseType = {
  responseType: "text" | "voice";
};

//// TODO: INTERACTIVE LEARNING TYPES

export type InteractiveLearningImageType = {
  src: string;
  name: string;
  label: string;
  id: string;
  onClick?: (param?: any) => void;
};
export type InteractiveLearningType = {
  image?: InteractiveLearningImageType[];
  aiText: string;
  studentResponse: StudentResponseType[] | null;
};

export type AiInteractiveLearningResponseType = {
  question?: string;
  displayQuestion: InteractiveLearningType;
  answer: string;
  hint: string;
  note: string;
  timeout: number;
};

//// TODO: DRAG AND DROP TYPES

export type DraggableItemType = {
  name: string;
  src: string;
};

export type DroppableItemType = {
  id: number;
  label: string;
  answer: string;
  insertedAnswer: string;
  answerImg: string;
  feedback: string;
};
export type DragandDropType = {
  instruction: string;
  id: string;
  length: number;
  draggableItems: DraggableItemType[];
  droppableItems: DroppableItemType[];
};

//// PAINT TYPES
export type PaintType = {
  instruction: string;
  colors: string[];
  objectSrc: string;
  selectedColor: string;
  answer: string;
};

/// GAME OVER TYPE
export type GameOverType = {
  activeGame: typeof preSchoolCurriculumGameTypes | null;
  gameOver: {
    isGameOver: boolean;
    reason: null | "timeout" | "gameWon";
    handleGameOver: () => void;
  };
  school: "preSchool" | "elementarySchool" | "highSchool" | null;
  gameDetail: any;
};

//// ASSESSMENT TYPE
export type AssessmentType = {
  instruction: string;
  question: string;
  options: AnswerOptionType[];
  answer: string;
  timeout: number;
};

export type AnswerOptionType = {
  id: string;
  value: string;
  feedback: string;
};

//// General Curriculum Type
export type AllCoursesResponseType = {
  course: GeneralCurriculumType;
  curriculum: GenCurriculumListType[];
};
export type GenCurriculumListType = {
  sectionId: number | string;
  sectionTitle: string;
  section_title?: string;
  lessons: SubjectLessonType[];
  exercise?: string;
  learningType: string;
  isSectionCompleted: boolean;
  isSection_completed?: boolean;
};
export type GeneralCurriculumType = {
  id: number | string;
  userId: number | string;
  subject: string;
  curriculum: GenCurriculumListType[] | null;
  isSubjectCompleted: boolean;
};

export type SubjectLessonType = {
  id?: string | number;
  title: string;
  isLessonCompleted?: boolean;
  isLesson_completed?: boolean;
  exercise?: string;
  learningType?: "text" | "auditory" | "interactive";
};
export type BackendSubjectLessonRequestType = {
  title: string;
  isLessonCompleted: boolean;
  exercise?: string;
  learningType?: "text" | "auditory" | "interactive";
};
export type BackendCurriculumRequestType = {
  id?: number;
  course_obj: number;
  section_title: string;
  lessons: {
    title: string;
    id?: number;
    isLesson_completed?: boolean;
    exercise?: any;
    learning_type?: "interactive";
  }[];
  learningType: "interactive";
  isSection_completed?: boolean;
  exercise?: any;
};
/// GENERAL INTERACTIVE LESSON

export type GeneralInteractiveLessonType = {
  // THE IDEA HERE IS THAT A LESSON MAY BE EITHER TEACHING LESSON OR A QUIZ
  id: string | number;
  title: string;
  details: string;
  image?: string;
  question?: string;
  answerType?: "options" | "input";
  options?: AnswerOptionType[];
  answer?: string;
  type: "lesson" | "quiz";
  timeout?: number;
  isComplete: boolean;
};

export type LessonObjectType = {
  subject: string;
  lessonTitle: string;
  lessonSlug: string;
  lessonId: string | number;
  lessonDetails: GeneralInteractiveLessonType[];
};

export type SaveLessonBackendType = {
  course: number;
  lesson_title: string;
  lesson_slug: string;
  lesson_id: string;
  lesson_details: GeneralInteractiveLessonType[];
  parent_subject_lesson: number;
};
/// PROMPT OBJECT
export type PromptCurriculumType = {
  sectionNumber: number;
  sectionTitle: string;
  lessons: SubjectLessonType[];
  isSectionCompleted: boolean;
};
export type PromptLessonLearnObjectType = {
  name: string;
  gradeLevel: number;
  schoolLevel: "high school" | "middle school";
  gender: "male" | "female" | "prefer not to say";
  age: number;
  subjectToLearn: string;
  curriculum: PromptCurriculumType[];
};

export type QuickLearnType = {
  user?: number | string;
  id?: number;
  subject: string;
  lessonDetails: GeneralInteractiveLessonType[];
};

export type PracticeObjectType = {
  score: string;
  questions: PracticeQuestionsType[];
};

export type PracticeQuestionsType = {
  id: string | number;
  title: string;
  details: string;
  question: string;
  answerType: "options";
  options: AnswerOptionType[];
  answer: string;
  type: "quiz";
  isComplete: boolean;
};
