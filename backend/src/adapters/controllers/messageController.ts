
import asyncHandler from "express-async-handler";
import { messageDbRepositoryType } from "../../application/repositories/messageDbRepository";
import { messageRepositoryType } from "../../frameworks/database/repositories/messageRepository";
import { Request, Response } from "express";
import { addMessage, getMessages } from "../../application/useCases/message/message";

const messageController = (messageDbrepository: messageDbRepositoryType, messageRepository: messageRepositoryType ) => {

    const dbMessageRepository = messageDbrepository(messageRepository())


    const addNewMessage = asyncHandler(async( req: Request, res: Response ) =>{
        const {chatId, senderId, text } = req.body;
        const message = await addMessage( chatId, senderId, text, dbMessageRepository)
        res.status(200).json({ status: "success", message })
    })

    const getAllMessages = asyncHandler(async(req: Request, res: Response ) => {
        const { chatId } = req.params;
        const messages = await getMessages( chatId, dbMessageRepository );
        res.status(200).json({ status: "success", messages})
    })


    return { addNewMessage, getAllMessages }
}

export default messageController;