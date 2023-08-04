import asyncHandler from "express-async-handler";
import { postDbRepositoryType } from "../../application/repositories/postDbRepository";
import { PostRespositoryType } from "../../frameworks/database/repositories/postRepository";
import { Request, Response } from "express";
import { cloudServiceType } from "../../application/services/cloudServiceInterface";
import { s3ServiceType } from "../../frameworks/services/s3CloudService";
import { CustomRequest } from "../../types/interface/customeRequest";
import {
  commentPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getComments,
  getReports,
  likePost,
  postCreate,
  reportPost,
  unlikePost,
} from "../../application/useCases/post/post";


const postController = (
  cloudService: cloudServiceType,
  s3CloudService: s3ServiceType,
  postDbRepository: postDbRepositoryType,
  postRespository: PostRespositoryType
) => {
  const dbRepositoryPost = postDbRepository(postRespository());
  const postService = cloudService(s3CloudService());

  const createPost = asyncHandler(async (req: CustomRequest, res: Response) => {
    console.log("creating function  - - - - --")

    const result = await postCreate(req, dbRepositoryPost, postService);
    res.status(200)
      .json({
        status: "success",
        message: "Post Uploaded ",
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
    const comment: { userId?: string, comment: string, createdAt: Date} = { userId: req.userId, comment: req.body.comment, createdAt:  new Date()}
    const result = await commentPost( comment, req.params.postId, dbRepositoryPost );
    res.status(200).json({status: "success"});
  })

  const getPostComments = asyncHandler(async(req: Request, res: Response ) => {
    const comments = await getComments(req.params.postId, dbRepositoryPost );
    res.status(200).json({status: "success", comments: comments})
  })

  const commentDelete = asyncHandler(async (req: Request, res: Response) => {
    const { postId, commentId } = req.params
    await deleteComment(postId, commentId, dbRepositoryPost);
    res.status(200).json({status: "success", message: "Deleted successfully"})
  })

  const postReport = asyncHandler (async( req: CustomRequest, res: Response) => {
    const { userId } = req;
    const reportData: { userId?: string, postId: string, reason: string} = { userId: userId, postId: req.body.postId, reason: req.body.reason};
    await reportPost( reportData, dbRepositoryPost);
    res.status(201).json({status: "success", message: "Reponse submitted"})
  })

  const postDelete = asyncHandler(async (req: CustomRequest, res: Response ) => {
    console.log("function - 1")
    const { postId, key } = req.params;
    await deletePost( postId, key, dbRepositoryPost, postService );
    res.status(200).json({status: "success", message: "Post Deleted successfully"})
  })

  const postReports = asyncHandler(async (req: Request, res: Response ) => {
    const result =  await getReports( dbRepositoryPost);
    res.status(200).json({status: "success", reports: result })
  })



  return { createPost, getPosts, postLike, postUnlike, PostComment, getPostComments, commentDelete, postReport, postDelete, postReports };
};

export default postController;
