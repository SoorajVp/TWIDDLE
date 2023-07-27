import express from "express"
import userController from "../../../adapters/controllers/userController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryDb } from "../../database/repositories/userRepository";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = () => {
    const router = express.Router();
    const constroller = userController(userDbRepository, userRepositoryDb );

    router.post("/search", authMiddleware, constroller.searchUser);
    
    return router;
}

export default userRouter;