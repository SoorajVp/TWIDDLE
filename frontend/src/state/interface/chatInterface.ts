export interface ChatListInterface {
    _id: string;
    members: string[];
    createdAt: string ;
    updatedAt: string;
    __v: number;
  }
  
 export interface MessageInterface {
    _id?: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt?: string | number;
    updatedAt?: string;
    __v?: number;
  }

  export type activeUsersType = {
    userId: string,
    socketId: string
  }