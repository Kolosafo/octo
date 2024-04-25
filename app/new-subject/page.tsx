import React from "react";
import SubjectSearchSelect from "../_components/subjectSearchSelect";
import { SUBJECTS } from "@/mockups/subjects";

const Page = () => {
  return (
    <div>
      <span>Select a subject</span>
      <SubjectSearchSelect subjects={SUBJECTS} />
    </div>
  );
};

export default Page;
