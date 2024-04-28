"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

const SubjectSearchSelect = ({
  subjects,
  handleCreateCourses,
}: {
  subjects: string[];
  handleCreateCourses: (subject: string) => void;
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showSubjects, setShowSubjects] = useState(subjects);
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setShowSubjects(
      subjects.filter((subject) =>
        subject.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
    console.log("Checking endless loop...");
  }, [searchValue, subjects]);
  return (
    <div className="w-full ">
      <div className="w-full  min-h-screen flex items-center justify-center">
        <div className="relative flex flex-col justify-center gap-6">
          <input
            id="search-input"
            className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            onChange={handleInputChange}
            value={searchValue}
            placeholder="Search items"
            autoComplete="off"
          />
          <div
            id="dropdown-menu"
            className="relative border-2 h-[70vh] overflow-y-scroll border-black right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
          >
            {/* <!-- Search input --> */}

            {/* <!-- Dropdown content goes here --> */}
            {showSubjects.length > 0 ? (
              showSubjects.map((subject, index) => (
                <span
                  key={index}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </span>
              ))
            ) : (
              <span
                onClick={() => setSelectedSubject(searchValue)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {searchValue}
              </span>
            )}
          </div>
          {selectedSubject && (
            <button
              onClick={() => handleCreateCourses(selectedSubject)}
              disabled={!selectedSubject ? true : false}
              className="p-1 bg-orange-500 px-4 rounded-md text-white font-bold hover:bg-orange-600 transition-all delay-100"
            >
              Proceed to learning {selectedSubject}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectSearchSelect;
