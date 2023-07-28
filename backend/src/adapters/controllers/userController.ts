import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import asyncHandler from "express-async-handler"
import { userById, userByName, userSearch } from "../../application/useCases/user/user";
import { userDataInterface } from "../../types/interface/userInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { getUserPosts } from "../../application/useCases/post/post";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";

const userController = ( userDbRepository: userDbInterface, userRepositoryDb: userRepositoryDbType, postDbRepository: postDbRepositoryType, postRepository: PostRespositoryType ) => {
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const dbRepositoryPost = postDbRepository(postRepository())

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

    const getUserByName = asyncHandler( async (req: Request, res: Response) => {
        const { userName } = req.params;
        const user: userDataInterface | null = await userByName( userName, dbRepositoryUser )
        if(!user) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        const posts = await getUserPosts( user._id, dbRepositoryPost )
        
        res.status(200).json({ status: "success", user, posts })
    })

    return { searchUser, getUserById, getUserByName }
}

export default userController;