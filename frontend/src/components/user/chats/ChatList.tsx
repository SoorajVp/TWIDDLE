import { ChatListInterface, activeUsersType } from "../../../state/interface/chatInterface";
import ChatUser from "./ChatUser";

type PropsTypes = {
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatListInterface>>;
  chats: ChatListInterface[];
  onlineUsers: activeUsersType[];
  currentChat: ChatListInterface;
  userId: string;
  darkMode: boolean;
};

const ChatList: React.FC<PropsTypes> = ({
  chats,
  userId,
  onlineUsers,
  currentChat,
  setCurrentChat,
  darkMode,
}) => {

  const checkOnlineStatus = ( chat: ChatListInterface ) => {
    const chatMembers = chat.members.find((member) => member!== userId)
    const online = onlineUsers.find((userData) => userData.userId === chatMembers );
    return online ? true : false;
  }

  let color: string, bgColor: string, hover: string, border: string;
  if (darkMode) {
    (color = "text-white"),
      (bgColor = "bg-gray-950"),
      (hover = "bg-gray-900"),
      (border = "border-gray-500");
  } else {
    (color = "text-gray-950"),
      (bgColor = "bg-white"),
      (hover = "bg-gray-100"),
      (border = "border-gray-500");

  }

  return (
    <div className={`${bgColor} ${color} ${border}`}>
      <h2 className="ml-6 my-3 text-lg font-semibold">Conversations</h2>

      <div className="relative mx-5 my-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search user" required />
    </div>

      <div className="md:max-w-sm mx-5 border rounded-md">

        {chats.map((chat) => (
          <div onClick={() => setCurrentChat(chat)}  key={chat._id} className={`${currentChat == chat && hover} hover:${hover}  rounded-md`} >
            <ChatUser chats={chat} userId={userId} online={checkOnlineStatus(chat)} />
          </div>
        ))}
       
      </div>

    </div>
  );
};

export default ChatList;
