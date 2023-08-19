import Post from "../models/postModel"
import User from "../models/userModel";
import ReportPost from "../models/reportModel";
import Notification from "../models/notificationModel";
import { userDataInterface } from "../../../types/interface/userInterface";

export const PostRespository = () => {
    
    const createPost = async( post: {userId?: string, image: string, description: string}) => {
        const newPost = new Post(post);
        return await newPost.save();
    }

    const getAllPosts = async () => {
        return await Post.find({isBlocked: false}).populate('userId').populate({path:'comments.userId',select: 'name profilePic'} ).sort({_id: -1})
    }

    const getUserPosts = async ( id: string ) => {
        return await Post.find({ userId: id }).populate('userId').populate({ path: 'comments.userId', select: 'name profilePic' }).sort({_id: -1})
    }

    const getFollowPosts = async ( userId?: string ) => {
        const user: userDataInterface | null = await User.findById(userId);
        if (user) {
            const followingArray: string[] = user.following as string[];
            userId && followingArray?.push(userId)
            return await Post.find({ userId: { $in: user.following } }).populate("userId").populate({path:'comments.userId',select: 'name profilePic'} ).sort({_id: -1})
        }
    }

    const getPostById = async ( id: string ) => {
        return await Post.findById(id)
    }
 
    const likePost = async ( postId: string, userId?: string, postUserId?:string ) => {
        if( userId !== postUserId ) {
            const notify = {
                userId: postUserId,
                user: userId,
                liked: postId
            }
            const notification = new Notification(notify) 
            await notification.save()
        }
        return await Post.findByIdAndUpdate({ _id: postId}, { $push: {likes: userId}}, { new: true })
    }

    const unlikePost = async ( postId: string, userId?: string, postUserId?:string ) => {
        await Notification.findOneAndDelete({ userId: postUserId, user: userId, liked: postId })
        return await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}}, { new: true })
    }

    const commentPost = async ( comment: { userId?: string, comment: string}, postId: string, postUserId: string ) => {
        if (comment.userId !== postUserId ) {
            const notify = {
                userId: postUserId,
                user: comment.userId,
                comment: {
                    postId: postId,
                    text: comment.comment
                }
            }
            const notification = new Notification(notify)
            await notification.save()
        }
        return await Post.findByIdAndUpdate({ _id: postId}, {$push: {comments: comment}}, { new: true })
    }

    const getComments = async( postId: string ) => {
        return await Post.findById({ _id: postId}).populate({ path: 'comments.userId', select: 'name profilePic' })
    }

    const deleteComment = async (postId: string, postUserId: string, commentId: string, userId: string ) => {
        await Notification.findOneAndDelete({ userId: postUserId, user: userId, 'comment.postId': postId })
        return await Post.findOneAndUpdate( { _id: postId }, { $pull: { comments: { _id: commentId } } }, { new: true })
    }

    const reportPost = async( reportData: {userId?: string, postId: string, reason: string } ) => {
        const report = new ReportPost(reportData);
        return await report.save();
    }

    const deletePost = async ( id: string ) => {
        await Notification.deleteMany({ $or: [{ liked: id }, { 'comment.postId': id }] });
        await ReportPost.deleteMany({ postId: id })
        return await Post.findByIdAndDelete({ _id: id })
    }

    const getReports = async() => {
        return await ReportPost.find().populate('userId').populate('postId')
    }

    const blockPost = async ( postId: string ) => {
        return await Post.findByIdAndUpdate({ _id: postId}, { isBlocked: true}, { new: true })
    }





    return { createPost, getAllPosts, getUserPosts, getFollowPosts, likePost, unlikePost, getPostById, commentPost, getComments, reportPost, deletePost, getReports, deleteComment, blockPost };
}

export type PostRespositoryType = typeof PostRespository;