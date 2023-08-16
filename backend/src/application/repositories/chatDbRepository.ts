import { chatRepositoryType } from "../../frameworks/database/repositories/chatRepository"

export const chatDbRepository = ( repository: ReturnType<chatRepositoryType>) => {

    const createChat = async( senderId: string, receiverId: string ) => {
        return await repository.createChat( senderId, receiverId );
    }

    const userChats = async(userId: string ) => {
        return await repository.userChats(userId);
    }

    const findChats = async( firstId: string, secondId: string ) => {
        return await repository.findChat( firstId, secondId );
    }

    return { createChat, userChats, findChats }
}

export type chatDbRepositoryType = typeof chatDbRepository