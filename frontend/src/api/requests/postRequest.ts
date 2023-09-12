import { api } from "../instance/user";

const blockFunction = () => {
  localStorage.removeItem('token');
  // location.reload()
}

export const postRequest = {
  
  getAllPosts: async () => {
    const response = await api.get("/post");
    console.log(response.data)
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  editPost: async (payload: object) => {
    const response = await api.put("/post/update-post", payload);
    console.log(response.data)
    if (response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getFollowPosts: async () => {
    const response = await api.get("/post/following-posts");
    console.log(response.data)
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  CreatePost: async (payload: object) => {
    const response = await api.post("/post", payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  likePost: async (postId: string, postUserId: string ) => {
    const response = await api.put(`/post/${postId}/${postUserId}/like`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  unlikePost: async (postId: string, postUserId: string) => {
    const response = await api.put(`/post/${postId}/${postUserId}/unlike`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getComment: async (postId: string) => {
    const response = await api.get(`/post/${postId}/comment`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  commentPost: async ( payload: { id: string; comment: string, postUserId: string  }) => {
    const response = await api.post(`/post/${payload.id}/comment`, payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  deleteComment: async (postId: string, commentId: string, userId: string ) => {
    const response = await api.delete(`/post/${postId}/${commentId}/${userId}`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  savePost: async (id: string) => {
    const response = await api.put(`/user/${id}/save`);
    return response.data;
  },

  reportPost: async (payload: object) => {
    const response = await api.post(`/post/report`, payload);
     if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  deletePost: async (postId: string, key: string) => {
    const response = await api.put(`/post/${postId}/${key}`);
     if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },



};
