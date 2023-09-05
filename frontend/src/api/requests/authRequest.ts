import { api } from "../instance/user";

export const authRequest = {
  
  isBlockedUser: async () => {
    const response = await api.get("/user/is-blocked");
    return response.data;
  },

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
};
