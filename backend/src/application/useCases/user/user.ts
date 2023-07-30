import { userDbInterface } from "../../repositories/userDbRepository";

export const userSearch = async( name: string, repository: ReturnType<userDbInterface> ) => {
    const users = await repository.userSearch(name);
    return users;
}

export const userById = async ( id: string, repository: ReturnType<userDbInterface> ) => {
    const user = await repository.getUserById( id );
    return user;
}

export const userByName = async ( name: string, repository: ReturnType<userDbInterface> ) => {
    const user = await repository.getUserByName( name );
    return user;
}

export const followUser = async( id: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    console.log("function -2")
    return await repository.followUser( id, userId)
}

export const unfollowUser = async( id: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.unfollowUser( id, userId)
}

export const savePost = async( postId: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.savePost(postId, userId )
}

export const unSavePost = async( postId: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.unSavePost(postId, userId )
}

export const getSavedPost = async( id: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.getSavedPost(id);
}
