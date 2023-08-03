import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interface/userInterface";

const initialState: AdminState = {
  admin: null,
  token: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLogin: (state: AdminState, action: PayloadAction<AdminState>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
  },
});

export const { setAdminLogin } = adminSlice.actions;
export default adminSlice.reducer;
