import { AssessmentType } from "@/types";

export const AssessmentDummyData: AssessmentType = {
  instruction: "Please solve the following problem",
  question:
    "If I have 10 oranges, and I give 2 to my siblings, how many oranges would I have left?",
  options: [
    { id: "a", value: "23" },
    { id: "b", value: "10" },
    { id: "c", value: "8" },
    { id: "d", value: "0" },
  ],
  answer: "8",
  timeout: 20000,
};
