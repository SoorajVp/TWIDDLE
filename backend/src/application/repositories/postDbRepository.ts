import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";

export const postDbRepository = ( repository: ReturnType<PostRespositoryType> ) => {

    const createPost = async (post: {userId?: string, image: string, description: string })  => {
        return await repository.createPost(post);
    }

    const editPost = async ( postId: string, text: string ) => {
        return await repository.editPost( postId, text );
    }

    const getAllPosts =async () => {
        return await repository.getAllPosts();
    }

    const getUserPosts = async ( id: string ) => {
        return await repository.getUserPosts(id)
    }

    const getFollowPosts = async( id?: string ) => {
        return await repository.getFollowPosts( id );
    }

    const getPostById = async( id: string ) => {
        return await repository.getPostById(id);
    }

    const likePost = async ( postId: string, userId?: string, postUserId?: string  ) => {
        return await repository.likePost( postId, userId, postUserId );
    }

    const unlikePost = async ( postId: string, userId?: string, postUserId?: string ) => {
        return await repository.unlikePost( postId, userId , postUserId);
    }

    const commentPost = async ( comment: { userId?: string, comment: string}, postId: string, postUserId: string ) => {
        return await repository.commentPost(comment, postId, postUserId )
    }

    const getComments = async( postId: string ) => {
        return await repository.getComments(postId);
    }

    const deleteComment = async (postId: string, postUserId: string, commentId: string, userId: string ) => {
        return await repository.deleteComment(postId, postUserId, commentId, userId )
    }

    const reportPost = async ( reportData: {userId?: string, postId: string, reason: string}) => {
        return await repository.reportPost(reportData);
    }

    const deletepost = async ( id: string ) => {
        return await repository.deletePost(id);
    }

    const getReports = async () => {
        return await repository.getReports();
    }

    const blockPost = async ( postId: string ) => {
        return await repository.blockPost(postId);
    }


 
    return { 
        createPost, 
        editPost,
        getAllPosts, 
        getUserPosts, 
        getFollowPosts, 
        likePost, 
        unlikePost, 
        getPostById, 
        commentPost, 
        getComments, 
        deleteComment, 
        reportPost, 
        deletepost, 
        getReports, 
        blockPost 
    };
}

export type postDbRepositoryType = typeof postDbRepository;