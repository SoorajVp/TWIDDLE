/* eslint-disable @typescript-eslint/no-misused-promises */
import { BiBookmark } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { RiTable2 } from "react-icons/ri";
import { useState } from "react";
import PostList from "../posts/PostList";
import { apiCalls } from "../../../api/user/apiCalls";
import { userInterface } from "../../../state/interface/userInterface";
import { PostInterface } from "../../../state/interface/postInterface";
import Settings from "./Settings";
import EditProfile from "../../modal/EditProfile";

type profileInterface = {
  accountProfile: boolean;
  userData: userInterface;
  userPosts: PostInterface[];
  savedPosts: PostInterface[];
  darkMode: boolean;
  isFollowing: boolean;
  followBack: boolean;
};

const UserProfile = ({
  accountProfile,
  userData,
  userPosts,
  savedPosts,
  darkMode,
  isFollowing,
  followBack,
}: profileInterface) => {
  console.log(userPosts);
  const [postItems, setPostItems] = useState<PostInterface[]>(userPosts);
  const [follow, setFollow] = useState<boolean>(isFollowing);
  const [followers, setFollowers] = useState<number>(userData.followers.length);
  let color: string, hover: string;

  if (darkMode) {
    (color = "text-white"), (hover = "hover:bg-black rounded-lg");
  } else {
    (color = "text-gray-950"), (hover = "hover:bg-gray-100 rounded-lg");
  }
  const PostsClick = () => {
    setPostItems(userPosts.reverse());
  };

  const SavedClick = () => {
    setPostItems(savedPosts.reverse());
  };

  const HandleFollow = async (): Promise<void> => {
    setFollow(!follow);
    await apiCalls.followUser(userData._id);
    setFollowers(followers + 1);
  };
  const HandleUnfollow = async (): Promise<void> => {
    setFollow(!follow);
    await apiCalls.followUser(userData._id);
    setFollowers(followers - 1);
  };


  return (
    <div className={`${color} lg:mx-5 mt-3 md:mt-5`}>
      <div className="grid grid-cols-4">
        <div className="">
          <img
            className="rounded-full border"
            src={userData?.profilePic}
            alt="ProfilePic"
          />
        </div>
        <div className="col-span-3 md:mt-4">
          <div className=" flex lg:justify-between md:px-8 justify-end">
            <div className="hidden lg:block">
              <h3 className="p-2 font-medium text-base">{userData?.name}</h3>
            </div>
            <div className="flex gap-1 justify-between">
              {accountProfile ? (
                // <button className="border h-9 border-blue-500  text-blue-500 text-xs font-semibold px-3 lg:px-5 rounded">
                //   EDIT PROFILE
                // </button>
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
              <div>
                <button className="border border-gray-900 text-white bg-slate-500 py-2.5 text-xs font-medium rounded px-3 lg:px-5">
                  MESSAGE
                </button>
              </div>
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
      <div className="pl-5">
        <p className="text-base ">{userData?.name}</p>
        <p className="text-xs py-1 pb-5">{userData?.bio} </p>
      </div>
      <hr />
      <div className="flex justify-around  py-2">
        <div className="flex gap-1 cursor-pointer text-sm" onClick={PostsClick}>
          POSTS <RiTable2 size={25} />
        </div>
        {accountProfile && (
          <div
            className="flex gap-1 cursor-pointer text-sm"
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
