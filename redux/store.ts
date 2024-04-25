import { configureStore, combineReducers } from "@reduxjs/toolkit";
import lessonSlice from "./lesson/lessonSlice";
import authSlice from "./auth/authSlice";

const Allreducer = combineReducers({
  user: authSlice,
  lesson: lessonSlice,
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
