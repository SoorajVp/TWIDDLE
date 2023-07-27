import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";

export const postDbRepository = ( repository: ReturnType<PostRespositoryType> ) => {

    const createPost = async (post: {userId?: string, image: string, description: string })  => {
        return await repository.createPost(post);
    }

    const getAllPosts =async () => {
        return await repository.getAllPosts();
    }

    return { createPost, getAllPosts };
}

export type postDbRepositoryType = typeof postDbRepository;