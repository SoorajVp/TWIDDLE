import asyncHandler from "express-async-handler"
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { Request, Response } from "express";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import { getAllPosts, postCreate } from "../../application/useCases/post/post";
import { CustomRequest } from "../../types/interface/customeRequest";

const postController = ( cloudService: cloudServiceType, s3CloudService: s3ServiceType, postDbRepository: postDbRepositoryType, postRespository: PostRespositoryType  ) => {
    const dbRepositoryPost = postDbRepository(postRespository());
    const postService = cloudService(s3CloudService())

    const createPost = asyncHandler(async ( req: CustomRequest, res: Response ) => {
        const result = await postCreate( req, dbRepositoryPost, postService );
        console.log("This is result - - -",result)
        res.status(200).json({ status: "success", message: "Post created successfully", data: result })
    })

    const getPosts = asyncHandler(async ( req: CustomRequest, res: Response ) => {
        const posts = await getAllPosts( dbRepositoryPost );
        res.status(200).json({ status: "success", posts });
    })

    
    return { createPost, getPosts };
}

export default postController;