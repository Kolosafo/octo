import { configureStore, combineReducers } from "@reduxjs/toolkit";
import lessonSlice from "./learn/learnSlice";
import authSlice from "./auth/authSlice";
import quickLearnSlice from "./quickLearn/quickLearnSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const lessonPersistConfig = {
  key: "lesson",
  storage,
  blacklist: ["lesson", "isLoading", "finishedFullCourseTopics"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ['user'],
};
const Allreducer = combineReducers({
  user: persistReducer(authPersistConfig, authSlice),  
  lesson: persistReducer(lessonPersistConfig, lessonSlice),
  quickLearn: quickLearnSlice
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
