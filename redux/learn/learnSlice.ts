import {
  createCourse,
  createCurriculum,
  getCourseCurriculum,
  getCourses,
  getLesson,
  saveLessonLearnt,
} from "@/api/course";
import { filterLessonsById } from "@/helpers/helper";
import {
  BackendCurriculumRequestType,
  GenCurriculumListType,
  GeneralCurriculumType,
  AllCoursesResponseType,
  LessonObjectType,
  SaveLessonBackendType,
} from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type LessonSliceType = {
  courses: GeneralCurriculumType[] | null;
  combinedCourseAndCurriculumObject: AllCoursesResponseType[] | null;
  activeCourseCurriculum: GenCurriculumListType[] | null;
  finishedFullCourseTopics: string[] | null;
  lesson: LessonObjectType | null;
  isLoading: boolean;
};
const initailState: LessonSliceType = {
  courses: null,
  combinedCourseAndCurriculumObject: null,
  lesson: null,
  isLoading: false,
  activeCourseCurriculum: null,
  finishedFullCourseTopics: null,
};

const checkExpiredToken = (payload: any) => {
  if (payload.code && payload.code === "token_not_valid") {
    window.location.replace("/auth/login");
  }
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState: initailState,
  reducers: {
    handleGetCurriculum: (state, { payload }) => {
      const parentCourseId = payload.courseId;
      if (state.combinedCourseAndCurriculumObject) {
        const courseCurriculum = state.combinedCourseAndCurriculumObject.find(
          (obj: AllCoursesResponseType) => obj.course.id === parentCourseId
        );
        state.activeCourseCurriculum = courseCurriculum
          ? filterLessonsById(courseCurriculum.curriculum) // WE HAVE TO ALWAYS FILTER THE CURRICULUM GOING INTO THE,
          : null; // ACTIVE CURRICULUM VALUE BECAUSE THE BACKEND SOMETIMES RETURNS AN UNSORTED LESSONS LIST
      }
    },
    handleGetCompletedTopics: (state) => {
      const completedLessonTitles: string[] = [];
      state.combinedCourseAndCurriculumObject?.forEach((course) => {
        course.curriculum.forEach((curriculum) => {
          curriculum.lessons.forEach((lesson) => {
            if (lesson.isLesson_completed) {
              completedLessonTitles.push(lesson.title);
            }
          });
        });
      });
      state.finishedFullCourseTopics = completedLessonTitles;
    },
  },
  extraReducers: (builder) => {
    /// COURSE CREATION BUILDERS
    builder.addCase(createCourse.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createCourse.fulfilled, (state, { payload }) => {
        // const userCourses: GeneralCurriculumType = payload;
        // state.courses = userCourses;
        state.isLoading = false;
      }),
      builder.addCase(createCourse.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// GET ALL USER COURSES BUILDERS
    builder.addCase(getCourses.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getCourses.fulfilled, (state, { payload }) => {
        // checkExpiredToken(payload);
        console.log("CHECKING COURSES: ", payload);
        if (
          payload.code === "user_not_found" ||
          payload.code === "token_not_valid"
        ) {
          state.isLoading = false;
          return;
        }
        const userCourses: AllCoursesResponseType[] = payload.data;
        console.log("ALL COURSE OBJ: ", userCourses);
        state.courses = userCourses.map((course) => course.course);
        state.combinedCourseAndCurriculumObject = userCourses;
        console.log("ALL COURSES: ", userCourses);
        state.isLoading = false;
      }),
      builder.addCase(getCourses.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("REJECTED PAYLOAD: ", payload);
      });

    /// CREATE CURRICULUM BUILDERS
    builder.addCase(createCurriculum.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createCurriculum.fulfilled, (state, { payload }) => {
        checkExpiredToken(payload);
        const courseCurriculum: BackendCurriculumRequestType[] = payload;
        console.log("CREATED CURRICULIM: ", courseCurriculum);
        const makeStateCurriculumType = courseCurriculum.map((curriculum) => {
          return {
            sectionId: curriculum.id ? curriculum.id : 0,
            sectionTitle: curriculum.section_title,
            lessons: curriculum.lessons,
            exercise: curriculum.exercise ? curriculum.exercise : null,
            learningType: curriculum.learningType,
            isSectionCompleted: curriculum.isSection_completed
              ? curriculum.isSection_completed
              : false,
          };
        });
        state.activeCourseCurriculum = filterLessonsById(
          makeStateCurriculumType
        );
        state.isLoading = false;
      }),
      builder.addCase(createCurriculum.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// GET CURRICULUM BUILDERS
    builder.addCase(getCourseCurriculum.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getCourseCurriculum.fulfilled, (state, { payload }) => {
        checkExpiredToken(payload);
        const courseCurriculum: BackendCurriculumRequestType[] = payload.data;
        const makeStateCurriculumType = courseCurriculum.map((curriculum) => {
          return {
            sectionId: curriculum.id ? curriculum.id : 0,
            sectionTitle: curriculum.section_title,
            lessons: curriculum.lessons,
            exercise: curriculum.exercise ? curriculum.exercise : null,
            learningType: curriculum.learningType,
            isSectionCompleted: curriculum.isSection_completed
              ? curriculum.isSection_completed
              : false,
          };
        });
        state.activeCourseCurriculum = filterLessonsById(
          makeStateCurriculumType
        );
        console.log("COURSE CURRICULIM: ", courseCurriculum);
        state.isLoading = false;
      }),
      builder.addCase(getCourseCurriculum.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// SAVE LESSON LEARNT
    builder.addCase(saveLessonLearnt.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(saveLessonLearnt.fulfilled, (state, { payload }) => {
        checkExpiredToken(payload);
        state.isLoading = false;
      }),
      builder.addCase(saveLessonLearnt.rejected, (state, { payload }) => {
        state.isLoading = false;
      });

    /// GET LESSON LEARNT
    builder.addCase(getLesson.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getLesson.fulfilled, (state, { payload }) => {
        checkExpiredToken(payload);
        const response: SaveLessonBackendType = payload.data;
        state.lesson = {
          subject: response.lesson_title,
          lessonTitle: response.lesson_title,
          lessonSlug: response.lesson_slug,
          lessonId: response.lesson_id,
          lessonDetails: response.lesson_details,
        };
        state.isLoading = false;
      }),
      builder.addCase(getLesson.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { handleGetCurriculum, handleGetCompletedTopics } =
  lessonSlice.actions;
export default lessonSlice.reducer;
