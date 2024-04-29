import {
  createQuickLearn,
  getUserQuickLearning,
  updateQuickLearn,
} from "./../../api/course";
import { QuickLearnType } from "./../../types";
import { createSlice } from "@reduxjs/toolkit";

type QuickLearnSliceType = {
  quickLearnCourses: QuickLearnType[] | null;
  activeQuickLearnCourse: QuickLearnType | null;
  isLoading: boolean;
};
const initailState: QuickLearnSliceType = {
  quickLearnCourses: null,
  activeQuickLearnCourse: null,
  isLoading: false,
};

const checkExpiredToken = (payload: any) => {
  if (payload.code && payload.code === "token_not_valid") {
    window.location.replace("/auth/login");
  }
};

const quickLearnSlice = createSlice({
  name: "lesson",
  initialState: initailState,
  reducers: {
    handleGetSubject: (state, { payload }) => {
      const subjectId = payload.subjectId;
      if (state.quickLearnCourses) {
        const subject = state.quickLearnCourses.find(
          (obj: QuickLearnType) => obj.id === subjectId
        );
        subject ? (state.activeQuickLearnCourse = subject) : null;
      }
    },
  },
  extraReducers: (builder) => {
    /// SAVE QUICK LEARNING COURSE TO BE
    builder.addCase(createQuickLearn.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createQuickLearn.fulfilled, (state, { payload }) => {
        const userQuickCourses: QuickLearnType = payload;
        state.activeQuickLearnCourse = userQuickCourses;
        state.isLoading = false;
      }),
      builder.addCase(createQuickLearn.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// GET ALL USER QUICK LEARNING COURSES
    builder.addCase(getUserQuickLearning.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUserQuickLearning.fulfilled, (state, { payload }) => {
        const userQuickCourses: QuickLearnType[] = payload;
        state.quickLearnCourses = userQuickCourses;
        state.isLoading = false;
      }),
      builder.addCase(getUserQuickLearning.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// UPDATE QUICK LEARN
    builder.addCase(updateQuickLearn.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(updateQuickLearn.fulfilled, (state, { payload }) => {
        const userQuickCourses: QuickLearnType[] = payload;
        state.quickLearnCourses = userQuickCourses;
        state.isLoading = false;
      }),
      builder.addCase(updateQuickLearn.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { handleGetSubject } = quickLearnSlice.actions;
export default quickLearnSlice.reducer;
