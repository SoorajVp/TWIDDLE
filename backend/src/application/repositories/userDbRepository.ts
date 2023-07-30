import { registerInterface } from "../../types/interface/userInterface";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<userRepositoryDbType>
) => {
  const addUser = async (user: registerInterface) => {
    return await repository.addUser(user);
  };

  const getUserByEmail = async (email: string) => {
    return await repository.getUserByEmail(email);
  };

  const getUserByName = async (name: string) => {
    return await repository.getUserByName(name);
  };

  const getUserById = async (id: string ) => {
    return await repository.getUserById(id);
  }

  const userSearch = async (name: string) => {
    return await repository.userSearch(name);
  };

  const followUser = async( id: string, userId?: string ) => {
    console.log("function -3")
    return await repository.followUser( id, userId )
  }

  const unfollowUser = async( id: string, userId?: string ) => {
    return await repository.unfollowUser( id, userId )
  }

  const savePost = async( postId: string, userId?: string ) => {
    return await repository.savePost( postId, userId )
  }

  const getSavedPost = async( id: string) => {
    return await repository.getSavedPost(id);
  }

  const unSavePost = async( postId: string, userId?: string ) => {
    return await repository.unSavePost( postId, userId )
  }

  return { addUser, getUserByEmail, getUserByName, getUserById, userSearch, followUser, unfollowUser, savePost, unSavePost, getSavedPost };
};

export type userDbInterface = typeof userDbRepository;
