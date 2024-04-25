// user authentication redux slice
import { loginUser, registerUser } from "@/api/account";
import { BackendUserType, USER } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type InitialStateType = {
  isLogged: boolean;
  user: USER;
  error: any;
  isLoading: boolean;
};
const initialState: InitialStateType = {
  isLogged: false,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profile_picture: null,
    dob: null,
    country: null,
    educationLevel: null,
    gradeLevel: null,
  },
  error: null,
  isLoading: false,
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
          id: rawUserData.id,
          country: rawUserData.country,
          firstName: rawUserData.first_name,
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
      builder.addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        console.log("REJECTED PAYLOAD", payload);
        state.isLoading = false;
        state.error = true;
      });
  },
});

// You can use the logout action below to simply log the user out
export const { activeLoading } = authSlice.actions;
export default authSlice.reducer;
