/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { api } from "../instance/user";

const blockFunction = () => {
  localStorage.removeItem('token');
  // location.reload()
}

export const userRequest = {
  
  getUserById: async (id: string) => {
    const response = await api.get(`/user/find/${id}`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  searchUser: async (payload: object) => {
    const response = await api.post("/user/search", payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getUserByName: async (name: string) => {
    const response = await api.get(`/user/${name}`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  updateProfile: async (payload: object) => {
    const response = await api.post("/user/update-profile", payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  checkPassword: async (password: string) => {
    const response = await api.get(`/user/${password}/password`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  changePassword: async (payload: object) => {
    const response = await api.put(`/user/change-password`, payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  changeProfilePic: async (payload: object) => {
    const response = await api.put(`/user/change-profile`, payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  followUser: async (id: string) => {
    const response = await api.put(`/user/${id}/follow`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  unFollowUser: async (id: string) => {
    const response = await api.put(`/user/${id}/unfollow`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  notifications: async() => {
    const response = await api.get(`/user/notifications/list`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data; 
  },

  clearNotifications: async () => {
    const response = await api.delete(`/user/clear-notifications`);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  payment: async (payload: object) => {
    const response = await api.post(`/user/payment`, payload);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  }



};
