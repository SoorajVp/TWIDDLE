import Message from "../models/messageModel"

export const messageRepository = () => {
    
    const addMessage = async( chatId: string, senderId: string, text: string ) =>{
        const newMessage = new Message({ chatId, senderId, text })
        return await newMessage.save()
    }

    const getMessages = async( chatId: string ) => {
        return await Message.find({ chatId });
    }
    

    return { addMessage, getMessages }
}

export type messageRepositoryType = typeof messageRepository;