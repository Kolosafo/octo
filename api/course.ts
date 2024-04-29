import { ROOT_ULR } from "@/helpers/helper";
import {
  BackendCurriculumRequestType,
  GeneralInteractiveLessonType,
  SaveLessonBackendType,
} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RegisterUserType = {
  first_name: string;
  last_name: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export const createCourse = createAsyncThunk(
  "learn/createCourse",
  async (payload: { subject: string }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/create_course/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const getCourses = createAsyncThunk("learn/getCourses", async () => {
  const getAccessToken = localStorage.getItem("authTokens") || "{}";
  return fetch(`${ROOT_ULR}/api/get_user_courses/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        getAccessToken && JSON.parse(getAccessToken).access
      }`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
});

export const createCurriculum = createAsyncThunk(
  "learn/createCurriculum",
  async (payload: BackendCurriculumRequestType[]) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/create_course_curriculum/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const getCourseCurriculum = createAsyncThunk(
  "learn/getCourseCurriculum",
  async (payload: { course_id: number }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/get_course_curriculum/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

/// LESSON OBJECT
export const saveLessonLearnt = createAsyncThunk(
  "learn/saveLessonLearnt",
  async (payload: SaveLessonBackendType) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/create_lesson/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const getLesson = createAsyncThunk(
  "learn/getLesson",
  async (payload: { course_id: number; parent_subject_lesson: number }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/get_lesson/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const createQuickLearn = createAsyncThunk(
  "quickLearn/getLesson",
  async (payload: { subject: string }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/create_quick_learn/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const getUserQuickLearning = createAsyncThunk(
  "quickLearn/getUserQuickLearning",
  async () => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/get_user_quick_learns/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
);

export const getSingleQuickLearn = createAsyncThunk(
  "quickLearn/getSingleQuickLearn",
  async (payload: { id: number }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/get_single_quick_learn/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
        body: JSON.stringify(payload),
      },
    }).then((res) => res.json());
  }
);

export const updateQuickLearn = createAsyncThunk(
  "quickLearn/updateQuickLearn",
  async (payload: {
    id: number;
    lessonDetails: GeneralInteractiveLessonType[];
  }) => {
    const getAccessToken = localStorage.getItem("authTokens") || "{}";
    if (!JSON.parse(getAccessToken) || getAccessToken === "{}") {
      window.location.replace("/auth/login");
      return;
    }
    return fetch(`${ROOT_ULR}/api/update_quick_learn/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          getAccessToken && JSON.parse(getAccessToken).access
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);
