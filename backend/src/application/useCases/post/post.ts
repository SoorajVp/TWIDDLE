import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { postDbRepositoryType } from "../../repositories/postDbRepository";
import { cloudServiceType } from "../../services/cloudServiceInterface";
import { CustomRequest } from "../../../types/interface/customeRequest";

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

export const likePost = async (
  req: CustomRequest,
  repository: ReturnType<postDbRepositoryType>
) => {
  const postId: string = req.params.postId;
  const userId = req.userId?.toString();
  await repository.likePost(postId, userId);
  const post = await repository.getPostById(postId);
  return post;
};

export const unlikePost = async(req: CustomRequest, repository: ReturnType<postDbRepositoryType> ) => {
  const postId: string = req.params.postId;
  const userId = req.userId?.toString();
  await repository.unlikePost(postId, userId);
  const post = await repository.getPostById(postId);
  return post;
}
