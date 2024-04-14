import { preSchoolCurriculumGameTypes } from "./game_utils/gameTypes";

///  USERTYPE

export type USER = {
  id: string | number;
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  city: string;
  educationLevel: "pre school" | "middle school" | "high school";
  gradeLevel: string;
  preferredLearningStyle: "visual" | "reading" | "hands-on";
  specificConceptsLeaned: string[] | null;
  strengthAndWeaknesses: string[] | null;
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
};

//// General Curriculum Type

export type GenCurriculumListType = {
  sectionId: number | string;
  sectionTitle: string;
  lessons: SubjectLessonType[];
  exercise: string;
  learningType: string;
  isSelectionCompleted: boolean;
};
export type GeneralCurriculumType = {
  userId: number | string;
  subject: string;
  curriculum: GenCurriculumListType[];
  isCompleted: boolean;
};

export type SubjectLessonType = {
  title: string;
  isLessonCompleted: boolean;
  id: string | number;
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
  sectionId: string | number;
  sectionLessonId: string | number;
  lessonObj: GeneralInteractiveLessonType[];
};
