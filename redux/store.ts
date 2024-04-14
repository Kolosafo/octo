import { configureStore, combineReducers } from "@reduxjs/toolkit";
import lessonSlice from "./lesson/lessonSlice";

const Allreducer = combineReducers({
  lesson: lessonSlice,
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
