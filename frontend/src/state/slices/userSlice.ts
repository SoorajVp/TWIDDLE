/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interface/userInterface";

const initialState: AuthState = {
  darkMode: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: ( state, action ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: ( state ) => {
      state.user = null;
      state.token = null;
    }, 
    setTheme: (state) => {
      state.darkMode = !state.darkMode
    }
  },
});


export const { setLogin, setLogout, setTheme } = userSlice.actions;
export default userSlice.reducer;