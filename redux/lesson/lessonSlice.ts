import { handleUpdateLessonComplete } from "@/helpers/helper";
import { GeneralLesson } from "@/mockups/dummyLesson";
import { GeneralCurriculum } from "@/mockups/generalCurriculum";
import { GeneralCurriculumType, LessonObjectType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type LessonSliceType = {
  curriculum: GeneralCurriculumType | null;
  lesson: LessonObjectType | null;
};
const initailState: LessonSliceType = {
  curriculum: GeneralCurriculum,
  lesson: GeneralLesson,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState: initailState,
  reducers: {
    logout: (state) => {},
    handleLessonComplete: (state, { payload }) => {
      console.log("PAYLOAD: ", payload);
      const curriculumSectionId = payload.sectionId;
      const lessonId = payload.lessonId;
      const findSection = state.curriculum?.curriculum.findIndex(
        (item) => item.sectionId === curriculumSectionId
      );
      console.log("FOUNDE SECTION: ", findSection);
      if (findSection !== undefined) {
        console.log("FOUNDE SECTION");
        const findLesson = state.curriculum?.curriculum[
          findSection
        ].lessons.findIndex((item) => item.id === lessonId);
        if (state.curriculum && findLesson !== undefined) {
          state.curriculum.curriculum[findSection].lessons[
            findLesson
          ].isLessonCompleted = true;

          console.log(
            "CHECKING THE LESSON: ",
            state.curriculum.curriculum[findSection].lessons[findLesson]
          );
        }
      }
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //     }),
  //       builder.addCase(loginUser.fulfilled, (state, { payload }) => {}),
  //       builder.addCase(loginUser.rejected, (state, { payload }) => {});
  //   },
});

export const { logout, handleLessonComplete } = lessonSlice.actions;
export default lessonSlice.reducer;
