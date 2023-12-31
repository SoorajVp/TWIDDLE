import { HttpStatus } from "../../../types/httpStatus";
import { editUserInterface, userDataInterface } from "../../../types/interface/userInterface";
import AppError from "../../../utils/appError";
import { userDbInterface } from "../../repositories/userDbRepository";
import { authServiceInterfaceType } from "../../services/authServiceInterface";
import { cloudServiceType } from "../../services/cloudServiceInterface";
import { paymentInterface } from "../../services/paymentServiceInterface";

export const getAllUser = async(repository: ReturnType<userDbInterface> ) => {
    const users = await repository.getAllUser()
    return users;
}

export const verfiedUsers = async (repository: ReturnType<userDbInterface> ) => {
    return await repository.verfiedUsers();
}

export const userSearch = async( name: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.userSearch(name);
}

export const userById = async ( id: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.getUserById( id );
}

export const userByName = async ( name: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.getUserByName( name );
}

export const updateProfile = async ( userData: editUserInterface, repository: ReturnType<userDbInterface>, service: ReturnType<cloudServiceType> ) => {
    const isEmailExists: userDataInterface | any = await repository.getUserByEmail( userData.email );
    if(isEmailExists && isEmailExists?._id != userData.id) {
        throw new AppError("Email is already exists", HttpStatus.OK);
    }
    const isNameExists: userDataInterface | any  = await repository.getUserByName( userData.name );
    if(isNameExists && isNameExists?._id != userData.id) {
        throw new AppError("Name is already exists", HttpStatus.OK);
    }
    
    if(userData.profilePic) {
        if(userData.key != "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg") {
            const key: string | undefined = userData.key.split("/").pop()?.toString()
            await service.removeFile(key)
        }
        const { imgUrl } = await service.uploadAndGetUrl(userData.profilePic);
        await repository.newProfilePic( userData.id, imgUrl)
    }
    
    return await repository.updateProfile(userData);
}



export const passwordCheck = async ( userId: any, password: string, repository: ReturnType<userDbInterface>, service: ReturnType<authServiceInterfaceType> ) => {
    const userData : userDataInterface | any = await repository.getUserById(userId)
    if(userData){
        const checkPassword: boolean  = await service.comparePassword( password, userData.password.toString());
        if(!checkPassword) {
          throw new AppError("Incorrect password !", HttpStatus.OK);
        }
        return
    }
}

export const passwordChange = async ( userId: string, password: string,repository: ReturnType<userDbInterface>, service: ReturnType<authServiceInterfaceType> ) => {
    password = await service.encryptPassword(password);
    return await repository.newPassword(userId, password);
  }

export const followUser = async( id: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.followUser( id, userId)
}

export const unfollowUser = async( id: string, userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.unfollowUser( id, userId)
}

export const blockUser = async( id: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.blockUser( id )
}

export const unBlockUser = async( id: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.unBlockUser( id )
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

export const getNotifications = async( userId: string, repository: ReturnType<userDbInterface> ) => {
    return await repository.getNotifications( userId );
}

export const clearNotification = async (userId: string, repository: ReturnType<userDbInterface>) => {
    return await repository.clearNotification(userId);
}


export const VerificationPayment = async ( userId: string, service: ReturnType<paymentInterface> ) => {
    const result = await service.payAmount(userId);
    if( result ) {
        return result;
    } else {
        throw new AppError ( "Something went wrong", HttpStatus.OK)
    }

}

export const checkSubscription = async (sessionId: string, userId: string, repository: ReturnType<userDbInterface>, service: ReturnType<paymentInterface> ) => {
    const paymentStatus = await service.checkSubscription(sessionId);
    if(paymentStatus === "paid") {
        await repository.verificationTick(userId);
        return true
    } else {
        throw new AppError("Invalid payment session", HttpStatus.OK)
    }
}

export const userSuggestions = async (repository: ReturnType<userDbInterface> ) => {
    return await repository.randomUser();
}