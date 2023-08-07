/* eslint-disable @typescript-eslint/no-unsafe-return */

import { api } from "../admin/instance";

export const apiCalls = {

  adminLogin: async (payload: object) => {
    const response = await api.post("auth/admin/login", payload);
    return response.data;
  },

  getReports: async () => {
    const response = await api.get(`/post/reports`);
    return response.data;
  },

  blockPost: async (postId: string) => {
    const response = await api.put(`/admin/block-post/${postId}`);
    return response.data;
  },

  deletePost:async (postId:string, key: string) => {
    const response = await api.put(`/admin/${postId}/${key}`);
    return response.data;
  },
  
};
