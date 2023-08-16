import asyncHandler from "express-async-handler"
import { chatDbRepositoryType } from "../../application/repositories/chatDbRepository";
import { chatRepositoryType } from "../../frameworks/database/repositories/chatRepository";
import { Request, Response } from "express";
import { createChat, findChats, userChats } from "../../application/useCases/chat/chat";



const chatController = ( chatDbRepository: chatDbRepositoryType, chatRepository: chatRepositoryType ) => {

    const dbChatRepository = chatDbRepository(chatRepository())

    const ChatCreate = asyncHandler(async(req: Request, res: Response) => {
        const { senderId, receiverId } = req.body;
        const newChat = await createChat( senderId, receiverId, dbChatRepository );
        console.log("this is new Chat - - - - - ", newChat )
        res.status(200).json({ status: "success", newChat })
    })

    const getUserChats = asyncHandler(async( req: Request, res: Response ) => {
        const { userId } = req.params;
        const chats = await userChats(userId, dbChatRepository );
        res.status(200).json({ status: "success", chats })
    })

    const getChats = asyncHandler(async(req: Request, res: Response ) =>{
        const { firstId, secondId }= req.params;
        const chats = await findChats( firstId, secondId, dbChatRepository );
        res.status(200).json({ status: "success", chats })
    })


    return { ChatCreate, getUserChats, getChats }
}

export default chatController;