import asyncHandler from "express-async-handler";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { Request, Response } from "express";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import {
  commentPost,
  getAllPosts,
  getComments,
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
    const post = await likePost(req, dbRepositoryPost);
    res.status(200).json({ status: "liked" });
  });

  const postUnlike = asyncHandler(async(req: CustomRequest, res: Response) => {
    const post = await unlikePost(req, dbRepositoryPost);
    res.status(200).json({ status: "unliked" });
  })

  const PostComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    // const comment: { postId: string, userId?: string, comment: string} = { postId: req.params.postId, userId: req.userId, comment: req.body.comment } 
    const comment: { userId?: string, comment: string, createdAt: Date} = { userId: req.userId, comment: req.body.comment, createdAt:  new Date()}
    const result = await commentPost( comment, req.params.postId, dbRepositoryPost );
    res.status(200).json({status: "success"});
  })

  const getPostComments = asyncHandler(async(req: Request, res: Response ) => {
    console.log("this is actual working function - - - - - -")
    const comments = await getComments(req.params.postId, dbRepositoryPost );
    console.log("this is post comments list - - - - -", comments)
    res.status(200).json({status: "success", comments: comments})
  })





  return { createPost, getPosts, postLike, postUnlike, PostComment, getPostComments };
};

export default postController;
