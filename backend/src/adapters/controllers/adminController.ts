import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { blockPost, deletePost, getReports } from "../../application/useCases/post/post";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import { blockUser, getAllUser, unBlockUser, userById } from "../../application/useCases/user/user";
import { userDataInterface } from "../../types/interface/userInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";


const adminController = (
    userDbRepository: userDbInterface, 
    userRepositoryDb: userRepositoryDbType,
    cloudService: cloudServiceType,
    s3CloudService: s3ServiceType,
    postDbRepository: postDbRepositoryType,
    postRespository: PostRespositoryType
) => {
    const dbRepositoryPost = postDbRepository(postRespository());
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const postService = cloudService(s3CloudService());
 
    const getAllUserList = asyncHandler(async (req: Request, res: Response ) => {
    console.log("function 1 ----")
        const users = await getAllUser( dbRepositoryUser )
        console.log("this is user list - - - --", users);
        res.status(200).json({ status: "success", users })
    })

    const blockUserById = asyncHandler(async (req: Request, res: Response ) => {
        const user: userDataInterface | null = await userById( req.params.userId, dbRepositoryUser )
        if(!user) {
            throw new AppError("Something went wrong !", HttpStatus.OK);
        }
        if(user.isBlocked) {
            await unBlockUser( req.params.userId, dbRepositoryUser )
            res.status(200).json({ status: "success", message: "Unblocked successfully" })
        } else {
            await blockUser( req.params.userId, dbRepositoryUser )
            res.status(200).json({ status: "success", message: "Blocked user successfully" })
        }
        
    })

  const postReports = asyncHandler(async (req: Request, res: Response ) => {
    const result = await getReports( dbRepositoryPost);
    res.status(200).json({status: "success", reports: result })
  })

  const postBlock = asyncHandler(async (req: Request, res: Response ) => {
    await blockPost( req.params.postId, dbRepositoryPost);
    res.status(200).json({status: "success", message: "Post blocked successfully"})
  })

  const postDelete = asyncHandler(async (req: Request, res: Response ) => {
    const { postId, key } = req.params;
    await deletePost( postId, key, dbRepositoryPost, postService );
    res.status(200).json({status: "success", message: "Post deleted successfully"})
  })

  


  

  return { getAllUserList, blockUserById, postReports, postBlock, postDelete };

};

export default adminController;
