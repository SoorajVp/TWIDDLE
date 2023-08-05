import Post from "../models/postModel"
import ReportPost from "../models/reportModel";

export const PostRespository = () => {
    
    const createPost = async( post: {userId?: string, image: string, description: string}) => {
        const newPost = new Post(post);
        return await newPost.save();
    }

    const getAllPosts = async () => {
        return await Post.find({isBlocked: false}).populate('userId').populate({path:'comments.userId',select: 'name profilePic'} ).sort({_id: -1})
    }

    const getUserPosts = async ( id: string ) => {
        return await Post.find({ userId: id }).populate('userId')
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

    const deleteComment = async ( postId: string, commentId: string ) => {
        return await Post.findOneAndUpdate( { _id: postId }, { $pull: { comments: { _id: commentId } } }, { new: true })
    }

    const reportPost = async( reportData: {userId?: string, postId: string, reason: string } ) => {
        const report = new ReportPost(reportData);
        return await report.save();
    }

    const deletePost = async ( id: string ) => {
        return await Post.findByIdAndDelete({_id: id})
    }

    const getReports = async() => {
        return await ReportPost.find().populate('userId').populate('postId')
    }

    const blockPost = async ( postId: string ) => {
        return await Post.findByIdAndUpdate({ _id: postId}, { isBlocked: true}, { new: true })
    }





    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById, commentPost, getComments, reportPost, deletePost, getReports, deleteComment, blockPost };
}

export type PostRespositoryType = typeof PostRespository;