import Comment from "../models/commentModel";
import Post from "../models/postModel"

export const PostRespository = () => {
    
    const createPost = async( post: {userId?: string, image: string, description: string}) => {
        const newPost = new Post(post);
        return await newPost.save();
    }

    const getAllPosts = async () => {
        return await Post.find().populate('userId').populate({path:'comments.userId',select: 'name profilePic'} ).sort({_id: -1})
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
        return await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}}, { new: true })
    }

    const commentPost = async ( comment: { userId?: string, comment: string}, postId: string ) => {
        return await Post.findByIdAndUpdate({ _id: postId}, {$push: {comments: comment}}, { new: true })
    }

    const getComments = async( postId: string ) => {
        return await Post.findById({ _id: postId}).populate({ path: 'comments.userId', select: 'name profilePic' })
    }

    



    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById, commentPost, getComments };
}

export type PostRespositoryType = typeof PostRespository;