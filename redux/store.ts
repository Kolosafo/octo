import { configureStore, combineReducers } from "@reduxjs/toolkit";
import lessonSlice from "./learn/learnSlice";
import authSlice from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const lessonPersistConfig = {
  key: "lesson",
  storage,
  blacklist: ["lesson", "isLoading"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["lesson", "isLoading"],
};
const Allreducer = combineReducers({
  user: authSlice,  
  lesson: persistReducer(lessonPersistConfig, lessonSlice),
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
