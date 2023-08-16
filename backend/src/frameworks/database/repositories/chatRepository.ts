import Chat from "../models/chatModel"

export const chatRepository = () => {
    
    const createChat = async( senderId: string, receiverId: string ) => {
        const newChat = new Chat({ members: [ senderId, receiverId ]})
        return await newChat.save();
    }

    const userChats = async( userId: string ) => {
        return Chat.find({ members: {$in: [userId]} }).sort({ updatedAt: -1 })
    }

    const findChat = async( firstId: string, secondId: string) => {
        return await Chat.findOne({ members: { $all: [ firstId, secondId ]}})
    }


    return { createChat, userChats, findChat }
}

export type chatRepositoryType = typeof chatRepository;