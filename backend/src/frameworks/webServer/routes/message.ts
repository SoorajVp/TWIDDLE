import express from "express";
import messageController from "../../../adapters/controllers/messageController";
import { messageDbRepository } from "../../../application/repositories/messageDbRepository";
import { messageRepository } from "../../database/repositories/messageRepository";
 
const messageRouter = () => {
    const router = express.Router();
    const controller = messageController( messageDbRepository, messageRepository )

    router.post("/", controller.addNewMessage)
    
    router.get("/:chatId", controller.getAllMessages)

    return router;
}

export default messageRouter;