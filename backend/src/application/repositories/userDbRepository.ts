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
    return await repository.updateProfile(userData)
  }

  const newProfilePic = async ( userId: string, imgUrl: string) => {
    return await repository.newProfilePic(userId, imgUrl);
  }

  const newPassword = async ( userId: string, password: string ) => {
    return await repository.newPassword( userId, password )
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

  const unBlockUser = async( id: string) => {
    return await repository.unBlockUser(id);
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

  const getNotifications = async ( userId: string ) => {
        console.log("function ---- 3")
    return await repository.getNotifications( userId );
  }

  const clearNotification = async( userId: string ) => {
    return await repository.clearNotification( userId );
  }



  return { 
    getAllUser, 
    addUser, 
    getUserByEmail, 
    getUserByName, 
    getUserById, 
    userSearch, 
    updateProfile, 
    newProfilePic, 
    newPassword, 
    followUser, 
    unfollowUser, 
    blockUser, 
    unBlockUser, 
    savePost, 
    unSavePost, 
    getSavedPost, 
    getNotifications,
    clearNotification
  };
};

export type userDbInterface = typeof userDbRepository;
