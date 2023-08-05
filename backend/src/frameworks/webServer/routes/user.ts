import express from "express"
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryDb } from "../../database/repositories/userRepository";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { PostRespository } from "../../database/repositories/postRepository";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authService } from "../../services/authService";
import { cloudService } from "../../../application/services/cloudServiceInterface";
import { s3CloudService } from "../../services/s3CloudService";
import upload from "../middlewares/multer";

const userRouter = () => {
    const router = express.Router();
    const controller = userController( userDbRepository, userRepositoryDb, postDbRepository, PostRespository, authServiceInterface, authService, cloudService, s3CloudService );

    router.get("/list", controller.getAllUserList);

    router.post("/search", controller.searchUser);

    router.post("/update-profile", upload.single("profilePic"), controller.profileUpdate);

    router.get("/:password/password", controller.checkPassword);

    router.put("/change-password", controller.changePassword);

    // router.put("/change-profile", controller);

    router.get("/:userName", controller.getUserByName );

    router.put("/:id/follow", controller.userFollow);

    router.put("/:id/unfollow", controller.userUnfollow);

    router.put("/:postId/save", controller.postSave);

    router.put("/:id/block", controller.blockUserById);


    
    
    return router;
}

export default userRouter;