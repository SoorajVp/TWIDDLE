import ChatList from "../../components/user/chats/ChatList";
import Messages from "../../components/user/chats/Messages"

const ChatPage = () => {
  return (
    <>
    <div className="lg:px-10 px-2 col-span-7 sm:col-span-4 overflow-auto ">
        <Messages />
    </div>


    <ChatList />
    </>
  )
}

export default ChatPage;