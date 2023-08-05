import { userInterface } from "./userInterface";

export interface PostInterface {
  _id: string;
  isBlocked?: boolean;
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
   _id: string
    userId: { _id: string, name:string, profilePic: string};
    comment?: string;
    createdAt: Date;
}


export interface ReportPosts {
  _id: string,
  userId?: userInterface,
  postId?: PostInterface,
  reason?: string,
  createdAt?: string
}
