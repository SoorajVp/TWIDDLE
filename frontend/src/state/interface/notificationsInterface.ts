
type postType = {
    _id: string,
    image: string
}

type userType = {
    _id: string,
    name: string,
    profilePic: string,
    verfied: boolean
}

type CommentType = {
    postId: postType;
    text: string;
}


export interface NotificationInterface {
    _id: string,
    userId: string;
    user: userType | null;
    comment?: CommentType | null;
    follow?: boolean;
    liked?: postType | null;
    createdAt: string
}

