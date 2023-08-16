import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { messageDbRepositoryType } from "../../repositories/messageDbRepository";


export const addMessage = async( chatId: string, senderId: string, text: string, repository: ReturnType<messageDbRepositoryType> ) => {
    const message = await repository.addMessage( chatId, senderId, text );
    if( !message ) {
        throw new AppError("Message is not found", HttpStatus.OK);
    } 
    return message;
}

export const getMessages = async( chatId: string, repository: ReturnType<messageDbRepositoryType> ) => {
    const messages = await repository.getMessages( chatId );
    if( !messages ) {
        throw new AppError("Messages are not found", HttpStatus.OK);
    }
    return messages
}