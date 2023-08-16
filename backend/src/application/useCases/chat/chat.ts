import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { chatDbRepositoryType } from "../../repositories/chatDbRepository";

export const createChat = async ( senderId: string, receiverId: string, repository: ReturnType<chatDbRepositoryType>) => {

    const chat = await repository.findChats( senderId, receiverId );

    if(chat) {
        console.log("Chat is already exists -------")
        return chat;
    } 
    const newChat = await repository.createChat( senderId, receiverId );
    console.log("New Chat created  -------")

    if(!newChat) {
        throw new AppError("User not found", HttpStatus.OK);
    }
    return newChat;
}

export const userChats =async ( userId: string, repository: ReturnType<chatDbRepositoryType> ) => {
    const chatList = await repository.userChats( userId );
    if(!chatList) {
        throw new AppError('Chats are not available', HttpStatus.OK);
    }
    return chatList;
}

export const findChats = async( firstId: string, secondId: string,  repository: ReturnType<chatDbRepositoryType> ) => {
    const chats = await repository.findChats( firstId, secondId );
    if(!chats) {
        throw new AppError('Chats are not available', HttpStatus.OK);
    }
    return chats;
}