/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { ChatListInterface } from "../../../state/interface/chatInterface";
import { userInterface } from "../../../state/interface/userInterface";
import { userRequest } from "../../../api/requests/userRequest";

type PropsTypes = {
  chats: ChatListInterface;
  userId: string;
  online: boolean;
};

type ApiReponse = {
  user: userInterface;
  status: string;
};

const ChatUser: React.FC<PropsTypes> = ({ chats, userId, online }) => {
  const [userData, setUserData] = useState<userInterface>(null);

  useEffect(() => {
    const chatUserId = chats.members.find((id) => id !== userId);
    getChatUser(chatUserId);
  }, []);

  const getChatUser = async (chatUserId: string) => {
    const response = (await userRequest.getUserById(chatUserId)) as ApiReponse;
    setUserData(response.user);
  };

  return (
    <div>
      <div className="p-3 flex items-center justify-between border-t cursor-pointer">
        <div className="flex items-center">
          <img
            className="rounded-full h-9 w-9 bg-gray-500"
            src={userData?.profilePic}
          />
          <div className="ml-2 flex flex-col">
            <div className="leading-snug text-sm font-bold">
              {userData?.name}
            </div>
            {online ? (
              <div className="leading-snug text-xs text-green-600">Online</div>
            ) : (
              <div className="leading-snug text-xs text-gray-500">Offline</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
