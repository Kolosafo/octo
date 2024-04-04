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
export type InteractiveLearningType = {
  image?: string;
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
  question: InteractiveLearningType;
  note: string;
  hint: string;
  timeout: number;
};
