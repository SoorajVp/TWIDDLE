import express from "express";
import postController from "../../../adapters/controllers/postController";
import { cloudService } from "../../../application/services/cloudServiceInterface";
import { s3CloudService } from "../../services/s3CloudService";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { PostRespository } from "../../database/repositories/postRepository";
import adminController from "../../../adapters/controllers/adminController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryDb } from "../../database/repositories/userRepository";

const adminRouter = () => {
    const router = express.Router();

    const controller = adminController( userDbRepository, userRepositoryDb, cloudService, s3CloudService, postDbRepository, PostRespository);

    router.get("/list", controller.getAllUserList);

    router.get('/reports', controller.postReports);

    router.put('/block-post/:postId', controller.postBlock);

    router.put('/block-user/:userId', controller.blockUserById);

    router.put('/:postId/:key', controller.postDelete);

    

    return router;
}

export default adminRouter;