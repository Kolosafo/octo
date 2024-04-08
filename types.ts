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

export type StudentResponseType = {
  responseType: "text" | "voice";
};
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

export type AiGridResponseType = {
  question: string;
  displayQuestion: GridType;
  answer: string;
  hint: string;
  note: string;
  timeout: number;
};

export type AiInteractiveLearningResponseType = {
  question?: string;
  displayQuestion: InteractiveLearningType;
  answer: string;
  hint: string;
  note: string;
  timeout: number;
};
