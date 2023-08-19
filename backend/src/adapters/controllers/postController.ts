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
  getFollowPosts,
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
    const result = await postCreate(req, dbRepositoryPost, postService);
    res.status(200).json({ status: "success", message: "Post Uploaded ", data: result});
  });

  const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await getAllPosts(dbRepositoryPost);
    res.status(200).json({ status: "success", posts });
  });

  const followPosts = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { userId } = req
    const posts = await getFollowPosts( userId, dbRepositoryPost );
    res.status(200).json({ status: "success", posts });
  });

  const postLike = asyncHandler(async (req: CustomRequest, res: Response) => {
    await likePost(req, dbRepositoryPost);
    res.status(200).json({ status: "liked" });
  });

  const postUnlike = asyncHandler(async(req: CustomRequest, res: Response) => {
    await unlikePost(req, dbRepositoryPost);
    res.status(200).json({ status: "unliked" });
  })

  const PostComment = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postUserId } = req.body;
    const comment: { userId?: string, comment: string, createdAt: Date} = { userId: req.userId, comment: req.body.comment, createdAt:  new Date()}
    console.log( "This is request -----",postUserId, comment )
    const result = await commentPost( comment, req.params.postId, postUserId, dbRepositoryPost );
    res.status(200).json({status: "success"});
  })

  const getPostComments = asyncHandler(async(req: Request, res: Response ) => {
    const comments = await getComments(req.params.postId, dbRepositoryPost );
    res.status(200).json({status: "success", comments: comments})
  })

  const commentDelete = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { postId, commentId, postUserId } = req.params
    const { userId } = req;
    if (userId) {
      await deleteComment(postId, postUserId, commentId, userId, dbRepositoryPost);
      res.status(200).json({status: "success", message: "Deleted successfully"})
    }
  })

  const postReport = asyncHandler (async( req: CustomRequest, res: Response) => {
    const { userId } = req;
    const reportData: { userId?: string, postId: string, reason: string} = { userId: userId, postId: req.body.postId, reason: req.body.reason};
    await reportPost( reportData, dbRepositoryPost);
    res.status(201).json({status: "success", message: "Reponse submitted"})
  })

  const postDelete = asyncHandler(async (req: CustomRequest, res: Response ) => {
    const { postId, key } = req.params;
    await deletePost( postId, key, dbRepositoryPost, postService );
    res.status(200).json({status: "success", message: "Post deleted successfully"})
  })

  

  

  

  



  return { createPost, getPosts, followPosts, postLike, postUnlike, PostComment, getPostComments, commentDelete, postReport, postDelete };
};

export default postController;
