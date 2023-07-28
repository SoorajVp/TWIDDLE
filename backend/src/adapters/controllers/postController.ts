import asyncHandler from "express-async-handler";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { Request, Response } from "express";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import {
  getAllPosts,
  likePost,
  postCreate,
  unlikePost,
} from "../../application/useCases/post/post";
import { CustomRequest } from "../../types/interface/customeRequest";

const postController = (
  cloudService: cloudServiceType,
  s3CloudService: s3ServiceType,
  postDbRepository: postDbRepositoryType,
  postRespository: PostRespositoryType
) => {
  const dbRepositoryPost = postDbRepository(postRespository());
  const postService = cloudService(s3CloudService());

  const createPost = asyncHandler(async (req: CustomRequest, res: Response) => {
    const result = await postCreate(req, dbRepositoryPost, postService);
    res
      .status(200)
      .json({
        status: "success",
        message: "Post created successfully",
        data: result,
      });
  });

  const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await getAllPosts(dbRepositoryPost);
    res.status(200).json({ status: "success", posts });
  });

  const postLike = asyncHandler(async (req: CustomRequest, res: Response) => {
    console.log(req.params.postId, "--------", req.userId);
    const post = await likePost(req, dbRepositoryPost);
    console.log(" this is single post by id  - - -", post);
    res.status(200).json({ status: "liked" });
  });

  const postUnlike = asyncHandler(async(req: CustomRequest, res: Response) => {
    console.log(req.params.postId, "--------", req.userId);
    const post = await unlikePost(req, dbRepositoryPost);
    console.log(" this is single post by id  - - -", post);
    res.status(200).json({ status: "unliked" });
  })

  return { createPost, getPosts, postLike, postUnlike };
};

export default postController;
