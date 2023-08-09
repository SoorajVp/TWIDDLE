/* eslint-disable @typescript-eslint/no-unsafe-return */

import { api } from "./instance";

export const apiCalls = {

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
  },

  getUserByName:async ( name: string) => {
    const response = await api.get(`/user/${name}`);
    return response.data;
  },

  updateProfile:async (payload: object) => {
    const response = await api.post("/user/update-profile", payload);
    return response.data;
  },

  checkPassword: async ( password: string) => {
    const response = await api.get(`/user/${password}/password`);
    return response.data;
  },

  changePassword: async ( payload: object) => {
    const response = await api.put(`/user/change-password`, payload);
    return response.data;
  },

  changeProfilePic:async (payload:object) => {
    const response = await api.put(`/user/change-profile`, payload);
    return response.data;
  },

  likePost:async ( id: string ) => {
    const response = await api.put(`/post/${id}/like`);
    return response.data;
  },

  unlikePost:async ( id:string ) => {
    const response = await api.put(`/post/${id}/unlike`);
    return response.data;
  },

  followUser:async ( id:string ) => {
    const response = await api.put(`/user/${id}/follow`);
    return response.data;
  },

  unFollowUser:async ( id:string ) => {
    const response = await api.put(`/user/${id}/unfollow`);
    return response.data;
  },

  getComment:async ( postId:string) => {
    const response = await api.get(`/post/${postId}/comment`);
    return response.data;
  },

  commentPost:async (payload: {id: string, comment: string } ) => {
    const reponse = await api.post(`/post/${payload.id}/comment`, payload );
    return reponse.data;
  },

  deleteComment:async (postId: string, commentId: string) => {
    const reponse = await api.delete(`/post/${postId}/${commentId}` );
    return reponse.data;
  },

  savePost:async (id:string) => {
    const response = await api.put(`/user/${id}/save`);
    return response.data;
  },

  reportPost:async (payload: object ) => {
    const response = await api.post(`/post/report`, payload );
    return response.data;
  },

  deletePost:async (postId:string, key: string) => {
    const response = await api.put(`/post/${postId}/${key}`);
    return response.data;
  },


  
};
