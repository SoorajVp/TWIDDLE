import express from "express"
import postController from "../../../adapters/controllers/postController";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { PostRespository } from "../../database/repositories/postRepository";
import { cloudService } from "../../../application/services/cloudServiceInterface";
import { s3CloudService } from "../../services/s3CloudService";
import upload from "../middlewares/multer";

const postRouter = () => {

    const router = express.Router();

    const controller = postController( cloudService, s3CloudService, postDbRepository, PostRespository);

    router.post('/',upload.single("image"), controller.createPost);
    
    router.get('/', controller.getPosts);

    router.put('/:postId/like', controller.postLike);

    router.put('/:postId/unlike', controller.postUnlike);

    router.get('/:postId/comment', controller.getPostComments);

    router.post('/:postId/comment', controller.PostComment);

    router.post('/report', controller.postReport);

    router.delete('/:postId/:key', controller.postDelete);








    return router;
}

export default postRouter;