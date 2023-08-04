import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import asyncHandler from "express-async-handler"
import { blockUser, followUser, getAllUser, getSavedPost, passwordChange, passwordCheck, savePost, unSavePost, unfollowUser, updateProfile, userById, userByName, userSearch } from "../../application/useCases/user/user";
import { editUserInterface, userDataInterface } from "../../types/interface/userInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { getUserPosts } from "../../application/useCases/post/post";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { CustomRequest } from "../../types/interface/customeRequest";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../frameworks/services/authService";

const userController = ( userDbRepository: userDbInterface, userRepositoryDb: userRepositoryDbType, postDbRepository: postDbRepositoryType, postRepository: PostRespositoryType, authServiceInterface: authServiceInterfaceType, authServiceImpl: authServiceType ) => {
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const dbRepositoryPost = postDbRepository(postRepository())
   const authService = authServiceInterface(authServiceImpl());

    const getAllUserList = asyncHandler(async (req: Request, res: Response ) => {
        const users = await getAllUser( dbRepositoryUser )
        res.status(200).json({ status: "success", users })
    })

    const searchUser = asyncHandler(async (req: Request, res: Response ) => {
        const name: string = req.body.name;
        const users = await userSearch( name, dbRepositoryUser )
        res.status(200).json({ status: "success", users })
    })

    const getUserById = asyncHandler( async (req: Request, res: Response) => {
        const { id } = req.params;
        const user: userDataInterface | null = await userById( id, dbRepositoryUser )
        if(!user) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        res.status(200).json({ status: "success", user })
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
        const userData: editUserInterface = { id: userId, name: req.body.name, email: req.body.email, bio: req.body.bio};
        await updateProfile( userData, dbRepositoryUser);
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
        console.log("function - 1 -", req.body)
        const { password } = req.body;
        const { userId } = req
        if(userId) {
            await passwordChange( userId, password, dbRepositoryUser, authService );
            console.log("function - 6 -")

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

    const blockUserById = asyncHandler(async (req: Request, res: Response ) => {
        await blockUser( req.params.id, dbRepositoryUser )
        res.status(200).json({ status: "success" })
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


    

    return { getAllUserList, searchUser, getUserById, profileUpdate, checkPassword, changePassword, getUserByName, userFollow, userUnfollow, blockUserById, postSave }
}


export default userController;