import { createSlice } from "@reduxjs/toolkit";

const initailState: IUserProvider = {
  isLogged: false,
  user: {
    username: "",
    email: "",
    id: 0,
  },
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initailState,
  reducers: {
    logout: (state) => {},
    activeLoading: (state, { payload }) => {},
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //     }),
  //       builder.addCase(loginUser.fulfilled, (state, { payload }) => {}),
  //       builder.addCase(loginUser.rejected, (state, { payload }) => {});
  //   },
});

export const { logout, activeLoading } = userSlice.actions;
export default userSlice.reducer;
