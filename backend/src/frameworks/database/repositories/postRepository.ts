import Post from "../models/postModel"

export const PostRespository = () => {
    
    const createPost = async( post: {userId?: string, image: string, description: string}) => {
        const newPost = new Post(post);
        return await newPost.save();
    }
    const getAllPosts =async () => {
        return await Post.find().sort({ _id: -1});
    }

    return { createPost, getAllPosts };
}

export type PostRespositoryType = typeof PostRespository;