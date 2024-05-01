// "use client";
// import { AssessmentDummyData } from "@/mockups/assessment";
// import React, { useState } from "react";
// import AnswerOption from "../_components/AnswerOption";
// const Page = () => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedOption(event.target.value);
//   };
//   return (
//     <div className="flex flex-col">
//       <span>
//         In Order to personalize your learning experience, we need to assess your
//         level of knowledge on this subject with a quiz
//       </span>
//       <div>
//         <div className="flex gap-2 items-center">
//           <span className="font-lg text-rose-400">Instruction: </span>
//           <span>{AssessmentDummyData.instruction}</span>
//         </div>
//         <div>
//           <span className="font-lg text-rose-400">Question: </span>
//           <span>{AssessmentDummyData.question}</span>
//         </div>
//         <div className="flex flex-col ">
//           <AnswerOption
//             handleSubmit={() => {}}
//             handleChange={handleChange}
//             selectedOption={selectedOption}
//             options={AssessmentDummyData.options}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
import React from "react";

const Page = () => {
  return <div></div>;
};

export default Page;
