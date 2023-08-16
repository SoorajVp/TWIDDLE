import { messageRepositoryType } from "../../frameworks/database/repositories/messageRepository";

export const messageDbRepository = ( repository: ReturnType<messageRepositoryType>) => {

    const addMessage = async( chatId: string, senderId: string, text: string ) => {
        return await repository.addMessage( chatId, senderId, text );
    };

    const getMessages = async( chatId: string ) => {
        return await repository.getMessages( chatId );
    };


    return { addMessage, getMessages };
}

export type messageDbRepositoryType = typeof messageDbRepository;