/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BiSolidVideoPlus } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { userRequest } from "../../../api/requests/userRequest";
import { RootState, userInterface } from "../../../state/interface/userInterface";
import { chatRequest } from "../../../api/requests/chatRequest";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";
import InputEmoji from "react-input-emoji";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { Link } from "react-router-dom";
import { ZIM } from "zego-zim-web"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {
  ChatListInterface,
  MessageInterface,
  activeUsersType,
} from "../../../state/interface/chatInterface";
import { useSelector } from "react-redux";

type PropsTypes = {
  chat: ChatListInterface;
  currentUserId: string;
  onlineUsers: activeUsersType[];
  setSendMessage: React.Dispatch<React.SetStateAction<sendMessageType>>;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatListInterface>>;
  receiveMessage: MessageInterface;
};

type ApiUserReponse = {
  user: userInterface;
  status: string;
};

interface ApiChatResponse {
  status: string;
  messages: MessageInterface[];
}

interface ApiMessageResponse {
  status: string;
  message: MessageInterface;
}

type sendMessageType = {
  senderId: string;
  text: string;
  chatId: string;
  receiverId?: string;
};

const Messages: React.FC<PropsTypes> = ({
  chat,
  setCurrentChat,
  onlineUsers,
  currentUserId,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState<userInterface>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const { user } = useSelector((store: RootState) => store.user)
  const [newMessage, setNewMessage] = useState<string>("");
  const scroll = useRef<HTMLDivElement | null>(null);

  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null)


  const appID = 1123183254;
  const serverSecret = "17d4269f2ff9f62fc4715c910b7a7135";
  const userID = currentUserId;
  const roomId = chat?._id;



  useEffect(() => {
    const fetchMessages = async () => {
      const response = (await chatRequest.getMessages(
        chat._id
      )) as ApiChatResponse;
      setMessages(response.messages);
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
 

  useEffect(() => {
    console.log("message receiving useEffect ..... ", receiveMessage)
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      const currentDate = new Date();
      receiveMessage.createdAt = currentDate.toISOString();
      setMessages([...messages, receiveMessage]);
    }
  }, [ receiveMessage ]);



  useEffect(() => {
    const chatUserId = chat?.members.find((id) => id !== currentUserId);
    const getChatUser = async (chatUserId: string) => {
      const response = (await userRequest.getUserById(
        chatUserId
      )) as ApiUserReponse;
      setUserData(response.user);
    };
    if (chat !== null) getChatUser(chatUserId);
  }, [chat, currentUserId]);



  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };





  const HandleMessageSend = async () => {
    if (newMessage) {
      try {
        const message = {
          senderId: currentUserId,
          text: newMessage,
          chatId: chat._id,
        };
        const response = (await chatRequest.addMessage( message )) as ApiMessageResponse;
        setMessages([...messages, response.message]);
        setNewMessage("");
        const receiverId = chat?.members?.find((id) => id !== currentUserId);
        setSendMessage({ ...message, receiverId });
      } catch (error) {
        console.log(error);
      }
    }
  };




  const checkOnline = (chat: ChatListInterface) => {
    const chatMembers = chat.members.find((member) => member !== currentUserId)
    const online = onlineUsers.find(
      (userData) => userData.userId === chatMembers
    );
    return online ? true : false;
  };




  const startVideoCall = () => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, user?.name);

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(kitToken);
    zeroCloudInstance.current.addPlugins({ ZIM })


    zeroCloudInstance.current.sendCallInvitation({
        callees: [{ userID: userData._id, userName: "user_" + roomId }],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        timeout: 60,
      })
      .then((res) => {
        console.log(res);
        if (res.errorInvitees.length) {
          alert("The user dose not exist or is offline.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <div className="">
      {chat ? (
        <div className="flex-1 justify-between flex flex-col h-screen pt-14 sm:pt-0 pb-8 sm:pb-0">
          {/* Chat Header  */}
          <div className="flex sm:items-center top-0 justify-between border-b-2 border-gray-200">
            <div className="relative flex items-center py-2 space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentChat(null)}
                  type="button"
                  className="inline-flex lg:hidden items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-200 focus:outline-none"
                >
                  <AiOutlineArrowLeft size={30} />
                </button>
              </div>
              <Link to={`/${userData?.name}`} >
                <img
                  src={userData?.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <Link to={`/${userData?.name}`} >
                <div className="flex flex-col leading-tight">
                  <div className="text-base mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">{userData?.name}</span>
                  </div>
                  <span className="text-xs text-green-600">
                    {checkOnline(chat) && "Active now"}
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={startVideoCall}
                type="button"
                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-blue-700 hover:bg-gray-200 focus:outline-none"
              >
                <BiSolidVideoPlus size={34} />
              </button>
            </div>

          </div>
          {messages.length === 0 ? (
            <div className="flex justify-center justify-items-center">
              Start Messaging
            </div>
          ) : (
            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {messages?.map((message) => (
                <>
                  {message?.senderId === currentUserId ? (
                    <div
                      className="chat-message"
                      ref={scroll}
                      key={message._id}
                    >
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2  max-w-xs mx-2 order-1 items-start">
                          <div>
                            <span className="px-4 py-2 text-sm rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {message?.text} <br />
                              <span
                                className="text-xs text-gray-200 flex justify-end"
                                style={{ fontSize: "11px" }}
                              >
                                {lastTimeFormat(message.createdAt.toString())}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="chat-message"
                      ref={scroll}
                      key={message?._id}
                    >
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-800">
                              {message?.text}
                              <span
                                className="text-xs text-gray-500 flex justify-start"
                                style={{ fontSize: "11px" }}
                              >
                                {lastTimeFormat(message.createdAt.toString())}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}

          <div className="border-t-2 border-gray-200  pb-5 mb-1 sm:mb-0">
            <div className="relative flex">
              <div className="flex w-full text-base">
                <InputEmoji value={newMessage} onChange={handleChange} />
              </div>
              <div className=" right-0 items-center inset-y-0 ">
                <button onClick={HandleMessageSend} type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-blue-700 hover:bg-slate-100" >
                  <MdSend size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center  mt-10">
          <div className="text-center">
            <img src="../../../../public/chat-image.png" alt="" width={430} />
            <p className="text-lg text-gray-500 font-mono">Tap on chat to start conversation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
