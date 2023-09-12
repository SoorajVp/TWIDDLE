import { api } from "../instance/admin";

const blockFunction = () => {
  console.log("blocked user - - -")
  localStorage.removeItem('adminToken');
  location.reload()
}
export const adminRequest = {

  adminLogin: async (payload: object) => {
    const response = await api.post("/auth/admin/login", payload);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getAllUsers:async () => {
    const response = await api.get("/admin/list");
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getVerifiedUsers: async () => {
    const response = await api.get("/admin/verified-list");
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  blockUser: async (userId: string) => {
    const response = await api.put(`/admin/block-user/${userId}`);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getReports: async () => {
    const response = await api.get(`/admin/reports`);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  blockPost: async (postId: string) => {
    const response = await api.put(`/admin/block-post/${postId}`);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  deletePost:async (postId:string, key: string) => {
    const response = await api.put(`/admin/${postId}/${key}`);
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },
  
};
