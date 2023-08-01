import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import asyncHandler from "express-async-handler"
import { blockUser, followUser, getAllUser, getSavedPost, savePost, unSavePost, unfollowUser, userById, userByName, userSearch } from "../../application/useCases/user/user";
import { userDataInterface } from "../../types/interface/userInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { getUserPosts } from "../../application/useCases/post/post";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { CustomRequest } from "../../types/interface/customeRequest";

const userController = ( userDbRepository: userDbInterface, userRepositoryDb: userRepositoryDbType, postDbRepository: postDbRepositoryType, postRepository: PostRespositoryType ) => {
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const dbRepositoryPost = postDbRepository(postRepository())

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
        console.log("function  - 1")
        const user: userDataInterface | null = await userByName( userName, dbRepositoryUser )
        if(!user) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        console.log("function  - 2")

        const posts = await getUserPosts( user._id, dbRepositoryPost )
        console.log(user._id ,"---------------------------", req.userId)
        if(user._id == req.userId ) {
            console.log("function  - 3")

            const result = await getSavedPost( req.userId , dbRepositoryUser );
            console.log("this is saved posts  - - - - ", result );
            res.status(200).json({ status: "success", user, posts, saved: result?.saved })
        }
        console.log("function  - 4")

        res.status(200).json({ status: "success", user, posts })
    })

    const userFollow = asyncHandler(async(req: CustomRequest, res: Response ) => {
        const { userId }: any = req;
        const user: userDataInterface | null = await userById( req.params.id, dbRepositoryUser );
        const result = user?.followers?.includes(userId);
        if(result) {
            await unfollowUser( req.params.id, userId, dbRepositoryUser );
        } else {
            await followUser( req.params.id, userId, dbRepositoryUser );
        }
        res.status(200).json({ status: "success"})
    })

    const blockUserById = asyncHandler(async (req: Request, res: Response ) => {
        await blockUser( req.params.id, dbRepositoryUser )
        res.status(200).json({ status: "success" })
    })


    const postSave = asyncHandler(async(req: CustomRequest, res: Response) => {
        const { userId }: any = req;
        const user: userDataInterface | null = await userById( userId, dbRepositoryUser );
        console.log(user)
        const result = user?.saved?.includes(req.params.postId);
        if(result) {
            console.log("post saved already")
            await unSavePost( req.params.postId, userId, dbRepositoryUser );
        } else {
            await savePost( req.params.postId, userId, dbRepositoryUser );
            console.log("post saved")
        }
    })

    return { getAllUserList, searchUser, getUserById, getUserByName, userFollow, blockUserById, postSave }
}

export default userController;