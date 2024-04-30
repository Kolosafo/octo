"use client";
import {
  MATHS_SUBJECTS_LIST,
  ENVIRONMENTAL_EDU_SUBJECT_LIST,
  BIOLOGY_SUBJECT_LIST,
  PHYSICAL_EDU_SUBJECT_LIST,
  PHYSICS_SUBJECT_LIST,
  FOREIGN_LANGUAGS_SUBJECT_LIST,
  CHEMISTRY_SUBJECT_LIST,
  SOCIAL_STUDIES_SUBJECTS_LIST,
  COMPUTER_SCIENCE_SUBJECT_LIST,
  TECHNOLOGY_SUBJECT_LIST,
  LANGUAGE_ARTS_SUBJECTS_LIST,
} from "@/mockups/subjects";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
const SubjectSearchSelect = ({
  subjects,
  handleCreateCourses,
}: {
  subjects: string[];
  handleCreateCourses: (subject: string) => void;
}) => {
  const topicDropDownRef = useRef<any>(null);
  const [showTopicDropDown, setShowTopicDropDown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [subjectsTopic, setSubjectsTopic] = useState<string[] | null>(null);
  const [subjectsTopicUnchanged, setSubjectsTopicUnchanged] = useState<
    string[] | null
  >(null);

  const [searchTopicValue, setSearchTopicValue] = useState("");

  const handleSelectSubject = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        setSubjectsTopic(MATHS_SUBJECTS_LIST);
        setSubjectsTopicUnchanged(MATHS_SUBJECTS_LIST);
        break;
      case "Physics":
        setSubjectsTopic(PHYSICS_SUBJECT_LIST);
        setSubjectsTopicUnchanged(PHYSICS_SUBJECT_LIST);
        break;
      case "Biology":
        setSubjectsTopic(BIOLOGY_SUBJECT_LIST);
        setSubjectsTopicUnchanged(BIOLOGY_SUBJECT_LIST);
        break;
      case "Chemistry":
        setSubjectsTopic(CHEMISTRY_SUBJECT_LIST);
        setSubjectsTopicUnchanged(CHEMISTRY_SUBJECT_LIST);
        break;
      case "Language Arts":
        setSubjectsTopic(LANGUAGE_ARTS_SUBJECTS_LIST);
        setSubjectsTopicUnchanged(LANGUAGE_ARTS_SUBJECTS_LIST);
        break;
      case "Social Studies":
        setSubjectsTopic(SOCIAL_STUDIES_SUBJECTS_LIST);
        setSubjectsTopicUnchanged(SOCIAL_STUDIES_SUBJECTS_LIST);
        break;
      case "Foreign Languages":
        setSubjectsTopic(FOREIGN_LANGUAGS_SUBJECT_LIST);
        setSubjectsTopicUnchanged(FOREIGN_LANGUAGS_SUBJECT_LIST);
        break;
      case "Physical Education / Health Education":
        setSubjectsTopic(PHYSICAL_EDU_SUBJECT_LIST);
        setSubjectsTopicUnchanged(PHYSICAL_EDU_SUBJECT_LIST);
        break;
      case "Computer Science / Information Technology":
        setSubjectsTopic(COMPUTER_SCIENCE_SUBJECT_LIST);
        setSubjectsTopicUnchanged(COMPUTER_SCIENCE_SUBJECT_LIST);
        break;
      case "Environmental Education":
        setSubjectsTopic(ENVIRONMENTAL_EDU_SUBJECT_LIST);
        setSubjectsTopicUnchanged(ENVIRONMENTAL_EDU_SUBJECT_LIST);
        break;
      case "Technology Education":
        setSubjectsTopic(TECHNOLOGY_SUBJECT_LIST);
        setSubjectsTopicUnchanged(TECHNOLOGY_SUBJECT_LIST);
        break;
      default:
        null;
    }
    setTimeout(() => {
      topicDropDownRef.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleTopicInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTopicValue(e.target.value);
  };

  useEffect(() => {
    if (subjectsTopicUnchanged) {
      setSubjectsTopic(
        subjectsTopicUnchanged.filter((subject) =>
          subject.toLowerCase().startsWith(searchTopicValue.toLowerCase())
        )
      );
    }

    console.log("Checking endless loop...");
  }, [searchTopicValue, subjectsTopicUnchanged]);
  return (
    <div className="w-full ">
      <div className="w-full  min-h-screen flex items-center justify-center">
        <div className="relative flex flex-col justify-center gap-6">
          <span className="self-center">Select a subject</span>
          <div
            id="dropdown-menu"
            className="relative border-2 h-[70vh] overflow-y-scroll border-black right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
          >
            {subjects.map((subject, index) => (
              <span
                key={index}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                onClick={() => {
                  handleSelectSubject(subject);
                  setShowTopicDropDown(true);
                  setSelectedSubject(subject);
                }}
              >
                {subject}
              </span>
            ))}
          </div>

          <div
            className={`flex flex-col gap-2 mt-10 ${
              showTopicDropDown ? "visible" : "hidden"
            }`}
          >
            <span className="self-center">
              Choose a {selectedSubject} Topic To Learn
            </span>
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
              type="text"
              onChange={handleTopicInputChange}
              value={searchTopicValue}
              placeholder="Search items"
              autoComplete="off"
            />
            <div
              id="dropdown-menu"
              className="relative border-2 h-[70vh] overflow-y-scroll border-black right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
              ref={topicDropDownRef}
            >
              {/* <!-- Search input --> */}

              {/* <!-- Dropdown content goes here --> */}
              {subjectsTopic && subjectsTopic.length > 0
                ? subjectsTopic.map((subject, index) => (
                    <span
                      key={index}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                      onClick={() => setSelectedTopic(subject)}
                    >
                      {subject}
                    </span>
                  ))
                : null}
            </div>
          </div>

          {selectedTopic && (
            <button
              onClick={() => handleCreateCourses(selectedTopic)}
              disabled={!selectedTopic ? true : false}
              className="p-1 bg-orange-500 px-4 rounded-md text-white font-bold hover:bg-orange-600 transition-all delay-100"
            >
              Proceed to learning {selectedTopic}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectSearchSelect;
