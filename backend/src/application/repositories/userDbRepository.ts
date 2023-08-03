import { editUserInterface, registerInterface } from "../../types/interface/userInterface";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<userRepositoryDbType>
) => {

  const getAllUser = async () => {
    return await repository.getAllUser();
  };

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

  const updateProfile = async ( userData: editUserInterface ) => {
    console.log("funtion - 2")
    return await repository.updateProfile(userData)
  }

  const followUser = async( id: string, userId?: string ) => {
    return await repository.followUser( id, userId )
  }

  const unfollowUser = async( id: string, userId?: string ) => {
    return await repository.unfollowUser( id, userId )
  }

  const blockUser = async( id: string) => {
    return await repository.blockUser(id);
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

  return { getAllUser, addUser, getUserByEmail, getUserByName, getUserById, userSearch, updateProfile, followUser, unfollowUser, blockUser, savePost, unSavePost, getSavedPost };
};

export type userDbInterface = typeof userDbRepository;
