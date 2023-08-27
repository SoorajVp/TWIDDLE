/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import ChatList from "../../components/user/chats/ChatList";
import Messages from "../../components/user/chats/Messages";
import { RootState } from "../../state/interface/userInterface";
import { SOCKET_URL } from "../../constants";
import { chatRequest } from "../../api/requests/chatRequest";
import {
  ChatListInterface,
  MessageInterface,
  activeUsersType,
} from "../../state/interface/chatInterface";

type ApiReponse = {
  status: string;
  chats: ChatListInterface[];
};

type sendMessageType = {
  senderId: string;
  text: string;
  chatId: string;
  receiverId?: string;
};

const ChatPage = () => {
  const { user, darkMode, lastChat } = useSelector((store: RootState) => store.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState<ChatListInterface>(null);
  const [onlineUsers, setOnlineUsers] = useState<activeUsersType[]>([]);
  const [sendMessage, setSendMessage] = useState<sendMessageType>(null);
  const [receiveMessage, setReceiveMessage] = useState<MessageInterface>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    if (lastChat) {
      setCurrentChat(lastChat);
    }
    const getChats = async () => {
      const response = (await chatRequest.getUserChats(user._id)) as ApiReponse;
      console.log(response);
      setChats(response.chats);
      console.log(chats);
    };
    getChats();
  }, []);

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users: activeUsersType[]) => {
      console.log("Online user ----", users);
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("receive-message", (data: MessageInterface) => {
      console.log("message receiving -----", data);
      setReceiveMessage(data);
      console.log("Received messages -----", receiveMessage);
    });
  },[]);


  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);



  return (
    <>
      <div
        className={` ${
          !currentChat ? "hidden" : "col-span-7"
        } md:block lg:px-10 px-2 md:col-span-4 overflow-auto`}
      >

        <Messages
          chat={currentChat}
          setCurrentChat={setCurrentChat}
          onlineUsers={onlineUsers}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>

      <div
        className={`${
          currentChat && "hidden"
        } lg:block col-span-7 my-5 sm:my-0 sm:col-span-4 lg:col-span-2 sticky h-screen lg:border-l`}
      >
        <ChatList
          chats={chats}
          userId={user._id}
          onlineUsers={onlineUsers}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          darkMode={darkMode}
        />
      </div>
    </>
  );
};

export default ChatPage;
