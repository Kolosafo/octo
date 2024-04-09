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
