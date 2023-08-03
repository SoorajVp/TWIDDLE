import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interface/userInterface";

const initialState: AuthState = {
  darkMode: false,
  user: null,
  token: null,
  actions: 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: ( state: AuthState, action: PayloadAction<AuthState> ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.actions = 0;
    },
    updateUser: ( state: AuthState, action: PayloadAction<AuthState>  ) => {
      state.user = action.payload.user;
    },
    setSavePost: ( state: AuthState, action: PayloadAction<{postId: string}>  ) => {
      state.user.saved.push(action.payload.postId)
    },
    setunSavePost: ( state: AuthState, action: PayloadAction<{postId: string}>  ) => {
      state.user.saved = state.user.saved.filter(item => item !== action.payload.postId);
    },
    setLogout: ( state: AuthState ) => {
      state.user = null;
      state.token = null;
    }, 
    setTheme: (state: AuthState) => {
      state.darkMode = !state.darkMode
    },
    setAction: (state: AuthState) => {
      state.actions ++;
    }
  },
});


export const { setLogin, updateUser, setSavePost, setunSavePost, setLogout, setTheme, setAction } = userSlice.actions;
export default userSlice.reducer;
