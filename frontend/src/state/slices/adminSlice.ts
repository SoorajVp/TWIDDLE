/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../interface/userInterface";

const initialState: AdminState = {
    admin: null,
    token: null
}

const adminSlice = createSlice({
    name: "admin",
  initialState,
  reducers: {
    setAdminLogin: ( state, action ) => {
        state.admin = action.payload.admin;
        state.token = action.payload.token;
    },      
  },
})

export const { setAdminLogin } = adminSlice.actions;
export default adminSlice.reducer;


