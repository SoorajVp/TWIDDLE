import express from "express";
import chatController from "../../../adapters/controllers/chatController";
import { chatDbRepository } from "../../../application/repositories/chatDbRepository";
import { chatRepository } from "../../database/repositories/chatRepository";

const chatRouter = () => {

    const router = express.Router();

    const controller = chatController( chatDbRepository, chatRepository);

    
    router.post("/", controller.ChatCreate);

    router.get("/:userId", controller.getUserChats);
    
    router.get("/find/:firstId/:secondId", controller.getChats);




    return router;
}

export default chatRouter;