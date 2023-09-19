import asyncHandler from "express-async-handler"
import AppError from "../../utils/appError";
import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import { VerificationPayment, checkSubscription, clearNotification, followUser, getNotifications, getSavedPost, passwordChange, passwordCheck, savePost, unSavePost, unfollowUser, updateProfile, userById, userByName, userSearch, userSuggestions } from "../../application/useCases/user/user";
import { editUserInterface, userDataInterface } from "../../types/interface/userInterface";
import { HttpStatus } from "../../types/httpStatus";
import { getUserPosts } from "../../application/useCases/post/post";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { CustomRequest } from "../../types/interface/customeRequest";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../frameworks/services/authService";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import { paymentInterface } from "../../application/services/paymentServiceInterface";
import { paymentServiceType } from "../../frameworks/services/paymentService";


const userController = (userDbRepository: userDbInterface, userRepositoryDb: userRepositoryDbType, postDbRepository: postDbRepositoryType, postRepository: PostRespositoryType, authServiceInterface: authServiceInterfaceType, authServiceImpl: authServiceType, cloudService: cloudServiceType, s3CloudService: s3ServiceType, paymentInterface: paymentInterface, paymentServiceType: paymentServiceType ) => {
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const dbRepositoryPost = postDbRepository(postRepository())
    const authService = authServiceInterface(authServiceImpl());
    const s3CloudServices = cloudService(s3CloudService());
    const paymentService = paymentInterface(paymentServiceType())

    const isBlockedUser = asyncHandler(async (req: CustomRequest, res: Response ) => {
        const {userId} = req;
        if(!userId) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        const user = await userById( userId, dbRepositoryUser )
        if(user?.isBlocked) {
            throw new AppError("Account action blocked !", HttpStatus.OK);
        } 
        res.status(200).json({ status: "success", message: "User found" })

    })

    const searchUser = asyncHandler(async (req: Request, res: Response ) => {
        const name: string = req.body.name;
        const users = await userSearch( name, dbRepositoryUser )
        res.status(200).json({ status: "success", users })
    })

    const getUserById = asyncHandler( async (req: Request, res: Response) => {
        const { userId } = req.params;
        const user: userDataInterface | null = await userById(userId, dbRepositoryUser )
        if(!user) {
            res.json({ status: "failed", message: "user not found" })
        }
        res.status(200).json({ status: "success", user })
    })

    const getUserData = asyncHandler(async (req: CustomRequest, res: Response) => {
        const { userId } = req;
        if(userId) {
            const user: userDataInterface | null = await userById(userId, dbRepositoryUser)
            if (!user) {
                res.json({ status: "failed", message: "user not found" })
            }
            res.status(200).json({ status: "success", user })
        }
    })

    const getUserByName = asyncHandler( async (req: CustomRequest, res: Response) => {
        const { userName } = req.params;
        const user: userDataInterface | null = await userByName( userName, dbRepositoryUser )
        if(!user) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        const posts = await getUserPosts( user._id, dbRepositoryPost )
        if(user._id == req.userId ) {
            const result = await getSavedPost( req.userId , dbRepositoryUser );
            res.status(200).json({ status: "success", user, posts, saved: result?.saved })
        }
        res.status(200).json({ status: "success", user, posts})
    })

    const profileUpdate = asyncHandler(async (req: CustomRequest, res: Response ) => {
        const { userId }: any = req; 
        const userData: editUserInterface = { id: userId, key: req.body.key, profilePic: req?.file, name: req.body.name, email: req.body.email, bio: req.body.bio};
        await updateProfile( userData, dbRepositoryUser, s3CloudServices );
        const user: userDataInterface | null = await userById( userId, dbRepositoryUser )
        res.status(200).json({status: "success", message: "Profile updated ", user })
    })

    const checkPassword = asyncHandler(async(req: CustomRequest, res: Response) => {
        const { password } = req.params;
        const { userId } = req
        if(userId) {
            await passwordCheck( userId, password, dbRepositoryUser, authService )
            res.status(200).json({status: "success", message: "Password Checked"})
        } else {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
      })

    const changePassword = asyncHandler(async (req: CustomRequest,res: Response) => {
        const { password } = req.body;
        const { userId } = req
        if(userId) {
            await passwordChange( userId, password, dbRepositoryUser, authService );
            res.status(200).json({status: "success", message: "Password Changed "})
        } else {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
    })


    const userFollow = asyncHandler(async(req: CustomRequest, res: Response ) => {
        const { userId }: any = req;
        await followUser( req.params.id, userId, dbRepositoryUser );
        res.status(200).json({ status: "success", message: "followed"})
    })

    const userUnfollow = asyncHandler(async(req: CustomRequest, res: Response ) => {
        const { userId }: any = req;
        await unfollowUser( req.params.id, userId, dbRepositoryUser );
        res.status(200).json({ status: "success", message: "Unfollowed"})
    })

    const postSave = asyncHandler(async(req: CustomRequest, res: Response) => {
        const { userId }: any = req;
        const user: userDataInterface | null = await userById( userId, dbRepositoryUser );
        const result = user?.saved?.includes(req.params.postId);
        if(result) {
            await unSavePost( req.params.postId, userId, dbRepositoryUser );
        } else {
            await savePost( req.params.postId, userId, dbRepositoryUser );
        }
    })

    const notifications = asyncHandler( async( req: CustomRequest, res: Response ) => {
        const { userId } = req
        if( userId ){
            const results = await getNotifications( userId, dbRepositoryUser )
            res.status(200).json({ status: "success", notifications: results })
        }
    })
    

    const clearUserNotification = asyncHandler(async (req: CustomRequest, res: Response) => {
        const { userId } = req;
        if (userId) {
            await clearNotification(userId, dbRepositoryUser)
            res.status(200).json({ status: "success"})
        }
    })

    const verifySubscription = asyncHandler( async (req: CustomRequest, res: Response) => {
        const { userId } = req
        if(userId) {
            const sesssionId = await VerificationPayment(userId, paymentService );
            res.status(200).json({ status: "success", sesssionId })
        }
    })

    const subscriptionStatus = asyncHandler(async(req: CustomRequest, res: Response) => {
        const { userId } = req
        const { sessionId } = req.params;
        if(userId) {
            const result = await checkSubscription( sessionId, userId, dbRepositoryUser, paymentService ) 
            if(result) {
                res.status(200).json({ status: "success", message: "Verification success" });
            } else {
                throw new AppError("Something went wrong !", HttpStatus.OK);
            }
        }
    })

    const randomUserSuggestions = asyncHandler(async(req: Request, res: Response) => {
        const users = await userSuggestions(dbRepositoryUser);
        res.status(200).json({status: "success", users })
    })

    

    return { 
        isBlockedUser, 
        searchUser, 
        getUserById, 
        getUserData,
        profileUpdate, 
        checkPassword, 
        changePassword, 
        getUserByName, 
        userFollow, 
        userUnfollow, 
        postSave, 
        notifications, 
        clearUserNotification, 
        verifySubscription,
        subscriptionStatus,
        randomUserSuggestions 
    }

}


export default userController;