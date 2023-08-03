/* eslint-disable @typescript-eslint/no-unsafe-return */

import { api } from "../instance";

export const apiCalls = {

  adminLogin: async (payload: object) => {
    const response = await api.post("auth/admin/login", payload);
    return response.data;
  },

  getReports: async () => {
    const response = await api.get(`/post/reports`);
    return response.data;
  },
  
};
