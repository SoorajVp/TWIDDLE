import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";

export const postDbRepository = ( repository: ReturnType<PostRespositoryType> ) => {

    const createPost = async (post: {userId?: string, image: string, description: string })  => {
        return await repository.createPost(post);
    }

    const getAllPosts =async () => {
        return await repository.getAllPosts();
    }

    const getUserPosts = async ( id: string ) => {
        return await repository.getUserPosts(id)
    }

    const getPostById = async( id: string ) => {
        return await repository.getPostById(id);
    }

    const likePost = async ( postId: string, userId?: string   ) => {
        return await repository.likePost( postId, userId );
    }

    const unlikePost = async ( postId: string, userId?: string ) => {
        return await repository.unlikePost( postId, userId );
    }

    const commentPost = async ( comment: { userId?: string, comment: string}, postId: string ) => {
        return await repository.commentPost(comment, postId)
    }

    const getComments = async( postId: string ) => {
        return await repository.getComments(postId);
    }

    const deleteComment = async( postId: string, commentId: string ) => {
        return await repository.deleteComment(postId, commentId)
    }

    const reportPost = async ( reportData: {userId?: string, postId: string, reason: string}) => {
        return await repository.reportPost(reportData);
    }

    const deletepost = async ( id: string ) => {
    console.log("function - 6")

        return await repository.deletePost(id);
    }

    const getReports = async () => {
        return await repository.getReports();
    }


 
    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById, commentPost, getComments, deleteComment, reportPost, deletepost, getReports };
}

export type postDbRepositoryType = typeof postDbRepository;