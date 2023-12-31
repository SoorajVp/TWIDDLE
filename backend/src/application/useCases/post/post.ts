import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { postDbRepositoryType } from "../../repositories/postDbRepository";
import { cloudServiceType } from "../../services/cloudServiceInterface";
import { CustomRequest } from "../../../types/interface/customeRequest";
// import { adminDbInterface } from "../../repositories/adminDbRepository";

export const postCreate = async (
  req: CustomRequest,
  repository: ReturnType<postDbRepositoryType>,
  service: ReturnType<cloudServiceType>
) => {
  
  const result = await service.uploadAndGetUrl(req?.file);
  const post: { userId?: string; image: string; description: string } = {
    userId: req.userId?.toString(),
    image: result.imgUrl.toString(),
    description: req.body.description,
  };
  const newPost = repository.createPost(post);
  if (!newPost) {
    throw new AppError("Something went wrong !", HttpStatus.BAD_REQUEST);
  }
  return newPost;
};

export const editPost = async (
  postId: string, text: string,
  repository: ReturnType<postDbRepositoryType>
) => {
  return await repository.editPost( postId, text );
};


export const getAllPosts = async (
  repository: ReturnType<postDbRepositoryType>
) => {
  const posts = await repository.getAllPosts();
  if (!posts) {
    throw new AppError("Something went wrong !", HttpStatus.BAD_REQUEST);
  }
  return posts;
};

export const getUserPosts = async (
  userId: string,
  repository: ReturnType<postDbRepositoryType>
) => {
  const posts = await repository.getUserPosts(userId);
  return posts;
};

export const getFollowPosts = async ( userId: string | undefined, repository: ReturnType<postDbRepositoryType> ) => {
  const posts = await repository.getFollowPosts( userId );
  return posts;
}

export const likePost = async (
  req: CustomRequest,
  repository: ReturnType<postDbRepositoryType>
) => {
  const { postId, postUserId } = req.params;
  const userId = req.userId?.toString();
  await repository.likePost(postId, userId, postUserId );
  const post = await repository.getPostById(postId);
  return post;
};

export const unlikePost = async(req: CustomRequest, repository: ReturnType<postDbRepositoryType> ) => {
  const { postId, postUserId } = req.params;
  const userId = req.userId?.toString();
  await repository.unlikePost(postId, userId, postUserId );
  const post = await repository.getPostById(postId);
  return post;
}

export const commentPost = async ( comment: {userId?: string, comment: string}, postId: string, postUserId:string, repository: ReturnType<postDbRepositoryType> ) => {
  const result = await repository.commentPost(comment, postId, postUserId );
  return result;
}

export const getComments = async ( postId: string, repository: ReturnType<postDbRepositoryType> ) => {
  const result = await repository.getComments(postId)
  return result;
}

export const deleteComment = async (postId: string, postUserId: string, commentId: string, userId: string, repository: ReturnType<postDbRepositoryType> ) => {
  const result = await repository.deleteComment(postId, postUserId, commentId, userId)
  return result;
}

export const reportPost = async( reportData: { userId?: string, postId: string, reason: string}, repository: ReturnType<postDbRepositoryType> ) => {
  return await repository.reportPost(reportData);
}
 
export const deletePost = async( id: string, key: string, repository: ReturnType<postDbRepositoryType>, service: ReturnType<cloudServiceType> ) => {
  await service.removeFile(key)
  return await repository.deletepost(id);
}

export const getReports =async ( repository: ReturnType<postDbRepositoryType> ) => {
  return await repository.getReports();
}

export const blockPost =async ( postId: string, repository: ReturnType<postDbRepositoryType> ) => {
  return await repository.blockPost(postId);
}

