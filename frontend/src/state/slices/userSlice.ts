import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interface/userInterface";
import { ChatListInterface } from "../interface/chatInterface";

const initialState: AuthState = {
  darkMode: false,
  user: null,
  token: null,
  lastChat: null,
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

    setLastChat: ( state: AuthState, action: PayloadAction<{newChat: ChatListInterface}>  ) => {
      state.lastChat = action.payload.newChat
    },

    setunSavePost: ( state: AuthState, action: PayloadAction<{postId: string}>  ) => {
      state.user.saved = state.user.saved.filter(item => item !== action.payload.postId);
    },

    setLogout: ( state: AuthState ) => {
      state.lastChat = null;
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


export const { setLogin, updateUser, setSavePost, setunSavePost, setLastChat, setLogout, setTheme, setAction } = userSlice.actions;
export default userSlice.reducer;
