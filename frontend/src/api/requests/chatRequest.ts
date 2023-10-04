import { api } from "../instance/user";

const blockFunction = () => {
  localStorage.removeItem('token');
  // location.reload()
}

export const chatRequest = {
  getUserChats: async (userId: string) => {
    const response = await api.get(`/chat/${userId}`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  createChat: async (payload: object) => {
    const response = await api.post(`/chat`, payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  getMessages: async (chatId: string) => {
    const response = await api.get(`/message/${chatId}`);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },

  addMessage: async (payload: object) => {
    const response = await api.post(`/message`, payload);
    if(response.data.status == "blocked") {
      blockFunction()
    }
    return response.data;
  },
};
