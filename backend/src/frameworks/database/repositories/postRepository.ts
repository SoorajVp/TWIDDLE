import Post from "../models/postModel"

export const PostRespository = () => {
    
    const createPost = async( post: {userId?: string, image: string, description: string}) => {
        const newPost = new Post(post);
        return await newPost.save();
    }

    const getAllPosts = async () => {
        return await Post.find().populate('userId').sort({_id: -1})
    }

    const getUserPosts = async ( id: string ) => {
        return await Post.find({ userId: id })
    }

    const getPostById = async ( id: string ) => {
        return await Post.findById(id)
    }
 
    const likePost = async ( postId: string, userId?: string ) => {
        return await Post.findByIdAndUpdate({ _id: postId}, {$push: {likes: userId}}, { new: true })
    }

    const unlikePost = async ( postId: string, userId?: string ) => {
        console.log("unlike")
        return await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}}, { new: true })
    }

    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById };
}

export type PostRespositoryType = typeof PostRespository;