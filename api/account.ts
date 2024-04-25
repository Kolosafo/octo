import { ROOT_ULR } from "@/helpers/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RegisterUserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
  profile_picture?: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload: RegisterUserType) => {
    return fetch(`${ROOT_ULR}/account/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload: LoginUserType) => {
    return fetch(`${ROOT_ULR}/account/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
);
