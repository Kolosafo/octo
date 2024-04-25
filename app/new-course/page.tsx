import React from "react";
import SubjectSearchSelect from "../_components/subjectSearchSelect";
import { SUBJECTS_LIST } from "@/mockups/subjects";

const Page = () => {
  return (
    <div>
      <span>Select a subject</span>
      <SubjectSearchSelect subjects={SUBJECTS_LIST} />
    </div>
  );
};

export default Page;
