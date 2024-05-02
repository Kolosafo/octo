// user authentication redux slice
import {
  keepUserLogged,
  loginUser,
  registerUser,
  updateUserProfile,
} from "@/api/account";
import { BackendUserType, USER } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type InitialStateType = {
  isLogged: boolean;
  user: USER;
  error: any;
  isLoading: boolean;
  authLoading: boolean;
};
const initialState: InitialStateType = {
  isLogged: false,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: null,
    learningPace: null,
    profile_picture: null,
    dob: null,
    country: null,
    educationLevel: null,
    gradeLevel: null,
  },
  error: null,
  isLoading: false,
  authLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    activeLoading: (state, { payload }) => {
      if (payload === true) {
        state.isLoading = true;
      } else {
        state.isLoading = false;
      }
    },
    logout: (state) => {
      localStorage.removeItem("authTokens");
      state.isLogged = false;
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        learningPace: null,
        gender: null,
        profile_picture: null,
        dob: null,
        country: null,
        educationLevel: null,
        gradeLevel: null,
      };
      window.location.replace("/");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        const rawUserData: BackendUserType = jwtDecode(payload.access);
        localStorage.setItem("authTokens", JSON.stringify(payload));
        console.log(rawUserData);
        state.user = {
          email: rawUserData.email,
          gender: rawUserData.gender,
          id: rawUserData.id,
          country: rawUserData.country,
          firstName: rawUserData.first_name,
          learningPace: rawUserData.learningPace,
          profile_picture: rawUserData.profile_picture,
          lastName: rawUserData.last_name,
          dob: rawUserData.DOB,
          educationLevel: rawUserData.school_level,
          gradeLevel: rawUserData.grade_level,
        };
        state.isLoading = false;
        state.isLogged = true;
      }),
      builder.addCase(loginUser.rejected, (state, { payload }) => {
        console.log("REJECTED PAYLOAD", payload);
        state.isLoading = false;
        state.error = true;
      });

    // REGISTER USERS VIEW
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        const rawUserData: BackendUserType = payload.data;
        localStorage.setItem(
          "authTokens",
          JSON.stringify({ access: payload.access, refresh: payload.refresh })
        );
        state.user = {
          email: rawUserData.email,
          id: rawUserData.id,
          country: rawUserData.country,
          firstName: rawUserData.first_name,
          gender: rawUserData.gender,
          learningPace: rawUserData.learningPace,
          profile_picture: rawUserData.profile_picture,
          lastName: rawUserData.last_name,
          dob: rawUserData.DOB,
          educationLevel: rawUserData.school_level,
          gradeLevel: rawUserData.grade_level,
        };
        state.isLogged = true;
        state.isLoading = false;
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        console.log("REJECTED PAYLOAD", payload);
        state.isLoading = false;
        state.error = true;
      });

    // KEEP USER LOGGED BUILDERS
    builder.addCase(keepUserLogged.pending, (state) => {
      state.authLoading = true;
    }),
      builder.addCase(keepUserLogged.fulfilled, (state, { payload }) => {
        // console.log("RESPONSE: ", payload);
        if (!payload || !payload.access) {
          state.authLoading = false;
          state.isLogged = false;
          return;
        }
        const rawUserData: BackendUserType = jwtDecode(payload.access);
        localStorage.setItem("authTokens", JSON.stringify(payload));
        state.user = {
          email: rawUserData.email,
          gender: rawUserData.gender,
          id: rawUserData.id,
          country: rawUserData.country,
          firstName: rawUserData.first_name,
          learningPace: rawUserData.learningPace,
          profile_picture: rawUserData.profile_picture,
          lastName: rawUserData.last_name,
          dob: rawUserData.DOB,
          educationLevel: rawUserData.school_level,
          gradeLevel: rawUserData.grade_level,
        };
        state.authLoading = false;
        state.isLogged = true;
      }),
      builder.addCase(keepUserLogged.rejected, (state, { payload }) => {
        console.log("REJECTED PAYLOAD", payload);
        state.isLogged = false;
        state.user = {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          gender: null,
          learningPace: null,
          profile_picture: null,
          dob: null,
          country: null,
          educationLevel: null,
          gradeLevel: null,
        };
        state.authLoading = false;
        state.error = true;
        // window.location.repl
      });

    /// UPDATE PROFILE BUILDERS
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        const updatedUserProfile: BackendUserType = payload.data;
        state.user = {
          email: updatedUserProfile.email,
          gender: updatedUserProfile.gender,
          id: updatedUserProfile.id,
          country: updatedUserProfile.country,
          firstName: updatedUserProfile.first_name,
          learningPace: updatedUserProfile.learningPace,
          profile_picture: updatedUserProfile.profile_picture,
          lastName: updatedUserProfile.last_name,
          dob: updatedUserProfile.DOB,
          educationLevel: updatedUserProfile.school_level,
          gradeLevel: updatedUserProfile.grade_level,
        };
        state.isLoading = false;
        state.isLogged = true;
      }),
      builder.addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

// You can use the logout action below to simply log the user out
export const { activeLoading, logout } = authSlice.actions;
export default authSlice.reducer;
