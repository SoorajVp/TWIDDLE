import { userInterface } from "./userInterface";

export interface PostInterface {
  _id: string;
  userId?: userInterface;
  image: string;
  description?: string;
  likes?: string[];
  comments?: CommentInterface[];
  report?: string[];
  createdAt: string;
  __v?: number;
}

export interface CommentInterface {
    userId: { _id: string, name:string, profilePic: string};
    comment?: string;
    createdAt: Date;
}

// _id: string;
//   createdAt: string;
//   image: string;
//   description: string;
//   likes: string[];
//   comments: CommentInterface[];
//   userId: userInterface;

