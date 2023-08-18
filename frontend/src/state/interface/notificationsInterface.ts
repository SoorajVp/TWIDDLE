
type postType = {
    _id: string,
    image: string
}

type userType = {
    name: string,
    profilePic: string
}

type CommentType = {
    postId: postType;
    text: string;
}


export interface NotificationInterface {
    userId: string;
    user: userType | null;
    comment?: CommentType | null;
    follow?: boolean;
    liked?: postType | null;
    createdAt: string
}

