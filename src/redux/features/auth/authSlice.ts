import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
// import { persistStore } from "redux-persist";

export interface user {
  userId: string;
  username: string;
  email: string;
  role: string;
  gender: string;
  profileImage: string;
  iat: number;
  exp: number;
}

type TAuthState = {
  user: user | null;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
