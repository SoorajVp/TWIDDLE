import express from "express"
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryDb } from "../../database/repositories/userRepository";
import { postDbRepository } from "../../../application/repositories/postDbRepository";
import { PostRespository } from "../../database/repositories/postRepository";

const userRouter = () => {
    const router = express.Router();
    const controller = userController(userDbRepository, userRepositoryDb, postDbRepository, PostRespository );

    router.post("/search", controller.searchUser);

    router.get("/:userName", controller.getUserByName );

    router.put("/:id/follow", controller.userFollow);

    router.put("/:postId/save", controller.postSave);

    
    
    return router;
}

export default userRouter;