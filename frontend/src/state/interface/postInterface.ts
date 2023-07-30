export interface PostInterface {
  _id: string;
  userId: string;
  image: string;
  description?: string;
  likes?: string[];
  comment?: CommentInterface[];
  report?: string[];
  createdAt: Date;
  __v: number;
}

export interface CommentInterface {
    userId: { _id: string, name:string, profilePic: string};
    comment?: string;
    createdAt: Date;
}

