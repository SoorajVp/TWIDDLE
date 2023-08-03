import express from "express";
import postController from "../../../adapters/controllers/postController";
import { cloudService } from "../../../application/services/cloudServiceInterface";
import { s3CloudService } from "../../services/s3CloudService";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { PostRespository } from "../../database/repositories/postRepository";

const adminRouter = () => {
    const router = express.Router();

    const controller = postController( cloudService, s3CloudService, postDbRepository, PostRespository);

    router.get('/reports', controller.postReports);
    

    return router;
}

export default adminRouter;