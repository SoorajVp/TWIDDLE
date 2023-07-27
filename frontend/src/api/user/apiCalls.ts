/* eslint-disable @typescript-eslint/no-unsafe-return */
// import { AuthResponse } from "../../state/interface/userInterface";

import { api } from "../instance";

export const apiCalls = {

  Login: async (payload: object) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  Register: async (payload: object) => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  googleAuth: async (payload: object) => {
    const response = await api.post("/auth/googleLogin", payload);
    return response.data;
  },

  CreatePost:async (payload: object) => {
    const response = await api.post("/post", payload);
    return response.data;
  },

  getAllPosts:async () => {
    const response = await api.get("/post");
    return response.data;
  },

  searchUser:async (payload: object) => {
    const response = await api.post("/user/search", payload);
    return response.data;
  }
  
};
