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
 
    return { createPost, getAllPosts, getUserPosts, likePost, unlikePost, getPostById };
}

export type postDbRepositoryType = typeof postDbRepository;