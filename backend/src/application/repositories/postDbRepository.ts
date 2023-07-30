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
 
    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById, commentPost, getComments };
}

export type postDbRepositoryType = typeof postDbRepository;