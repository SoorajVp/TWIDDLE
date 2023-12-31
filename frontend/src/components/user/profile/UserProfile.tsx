import { BiBookmark } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { RiTable2 } from "react-icons/ri";
import { useEffect, useState } from "react";
import PostList from "../posts/PostList";
import { userRequest } from "../../../api/requests/userRequest";
import { userInterface } from "../../../state/interface/userInterface";
import { PostInterface } from "../../../state/interface/postInterface";
import Settings from "./Settings";
import EditProfile from "../../modal/EditProfile";
import { chatRequest } from "../../../api/requests/chatRequest";
import { ChatListInterface } from "../../../state/interface/chatInterface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLastChat, setUserFollow, setUserUnfollow } from "../../../state/slices/userSlice";
import { MdVerified } from "react-icons/md";

type profileInterface = {
  accountProfile: boolean;
  userData: userInterface;
  stateUser: userInterface;
  userPosts: PostInterface[];
  savedPosts: PostInterface[];
  darkMode: boolean;
  isFollowing: boolean;
  followBack: boolean;
};

type ApiResponse = {
  status: string;
  newChat: ChatListInterface;
};

const UserProfile = ({
  accountProfile,
  userData,
  userPosts,
  stateUser,
  savedPosts,
  darkMode,
  isFollowing,
  followBack,
}: profileInterface) => {
  const [postItems, setPostItems] = useState<PostInterface[]>(userPosts);
  const [savedButton, setSavedButton ] = useState<boolean>(false)
  const [follow, setFollow] = useState<boolean>(isFollowing);
  const [followers, setFollowers] = useState<number>(userData.followers.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let color: string, hover: string, active: string ;

  if (darkMode) {
    (color = "text-white"), (hover = "hover:bg-black rounded-lg"), (active= "bg-gray-800");
  } else {
    (color = "text-gray-950"), (hover = "hover:bg-gray-100 rounded-lg"), (active = "bg-gray-100");
  }

  const PostsClick = () => {
    setSavedButton(false)
    setPostItems(userPosts.reverse());
  };

  const SavedClick = () => {
    setSavedButton(true)
    setPostItems(savedPosts.reverse());
  };
  useEffect(() => {
    setPostItems(userPosts);
    setFollowers(userData.followers.length);
  }, [userData]);

  const HandleFollow = async (): Promise<void> => {
    setFollow(!follow);
    await userRequest.followUser(userData._id);
    setFollowers(followers + 1);
    dispatch(setUserFollow({ userId: userData._id }))
  };

  const HandleUnfollow = async (): Promise<void> => {
    setFollow(!follow);
    await userRequest.unFollowUser(userData._id);
    setFollowers(followers - 1);
    dispatch(setUserUnfollow({ userId: userData._id }))
  };

  const HandleSendMessage = async () => {
    const data = {
      senderId: stateUser._id,
      receiverId: userData._id,
    };
    const response = (await chatRequest.createChat(data)) as ApiResponse;
    if (response.status === "success") {
      const { newChat } = response;
      dispatch(setLastChat({ newChat: newChat }));
      navigate("/messages");
    }
  };

  return (
    <div className={`${color} lg:mx-5 mt-3 md:mt-5`}>
      <div className="grid grid-cols-4">
        <div className="">
          <img
            className="rounded-full border"
            src={accountProfile ? stateUser?.profilePic : userData.profilePic}
            alt="ProfilePic"
          />
        </div>
        <div className="col-span-3 md:mt-4">
          <div className=" flex lg:justify-between md:px-8 justify-end">
            <div className="hidden lg:block">
              <div className="p-2 font-medium flex text-base">

              <h3>
                {accountProfile ? stateUser?.name : userData.name}
              </h3> 
                {userData.verfied && 
                <div className="p-1 text-blue-600"><MdVerified /></div> }
                
              </div>
            </div>
            <div className="flex gap-1 justify-between">
              {accountProfile ? (
                <EditProfile />
              ) : (
                <div>
                  {follow ? (
                    <button
                      className="border border-blue-500 text-blue-500 text-xs px-5 rounded"
                      style={{ height: "44px" }}
                      onClick={HandleUnfollow}
                    >
                      FOLLOWING
                    </button>
                  ) : (
                    <button
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-5 rounded"
                      style={{ height: "44px" }}
                      onClick={HandleFollow}
                    >
                      {followBack ? "FOLLOW BACK" : "FOLLOW"}
                    </button>
                  )}
                </div>
              )}
              {!accountProfile && (
                <div>
                  <button onClick={HandleSendMessage}
                    className="border text-white bg-slate-500 py-2.5 text-xs font-medium rounded px-3 lg:px-5"
                  >
                    MESSAGE
                  </button>
                </div>
              )}
              {accountProfile ? (
                <Settings />
              ) : (
                <div className={`${hover} pt-1`}>
                  <FiMoreVertical size={31} />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 flex justify-around text-center m-5 md:px-8">
            <p className="text-xs text-gray-500">
              <span className={`${color} font-medium text-sm`}>
                {userPosts?.length}
              </span>
              <br />
              Posts
            </p>
            <p className="text-xs text-gray-500">
              <span className={`${color} font-medium text-sm`}>
                {followers}
              </span>
              <br />
              Followers
            </p>
            <p className="text-xs text-gray-500">
              <span className={`${color} font-medium text-sm`}>
                {userData?.following.length}
              </span>
              <br />
              Following
            </p>
          </div>
        </div>
      </div>
      <div className="lg:pl-5 lg: pt-3">
        <p className="text-base ">
          {accountProfile ? stateUser?.name : userData.name}
        </p>
        <p className="text-xs py-1 pb-5">
          {accountProfile ? stateUser?.bio : userData.bio}
        </p>
      </div>
      <hr />
      <div className="flex justify-around py-1 ">
        <div
          className={`${ !savedButton && active } rounded-md flex gap-1 py-1 px-7 cursor-pointer text-sm`}
          onClick={PostsClick}
        >
          POSTS <RiTable2 size={25} />
        </div>
        {accountProfile && (
          <div
            className={`${savedButton && active } rounded-md flex gap-1 py-1 px-7 cursor-pointer text-sm`}
            onClick={SavedClick}
          >
            SAVED <BiBookmark size={25} />
          </div>
        )}
      </div>
      <hr />

      <PostList items={postItems} />
    </div>
  );
};

export default UserProfile;
