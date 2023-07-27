import { BiBookmark } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi"
import { RiTable2 } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { useState } from "react";
import PostList from "../posts/PostList";


const Posts = [
  "https://images.all-free-download.com/images/graphiclarge/iphone_6_sample_photo_566464.jpg",
  "https://images.all-free-download.com/images/graphiclarge/iphone_6_sample_photo_566464.jpg",
  "https://images.all-free-download.com/images/graphiclarge/iphone_6_sample_photo_566464.jpg",
  "https://images.all-free-download.com/images/graphiclarge/iphone_6_sample_photo_566464.jpg",
  "https://images.all-free-download.com/images/graphiclarge/iphone_6_sample_photo_566464.jpg",

]

const Saved = [
  "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
]

const UserProfile = ({accountProfile}) => {

  const { user, darkMode } =useSelector((store: RootState) => store.user )
  // const [ accountProfile, setAccountProfile ] = useState<boolean>(true);
  const [ postItems, setPostItems ] = useState<string[]>(Posts)

  let color: string, hover: string;

  const PostsClick = () => {
    setPostItems(Posts)
  }
  const SavedClick = () => {
    setPostItems(Saved)
  }

  if (darkMode) {
    (color = "text-white"), (hover = "hover:bg-black rounded-lg");
  } else {
    (color = "text-gray-950"), (hover = "hover:bg-gray-100 rounded-lg")
  }

  return (
    <div className={`${color} md:mx-14 md:mt-5`}>
      <div className="grid grid-cols-4">
        <div className="">
          <img
            className="rounded-full border"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
            alt="ProfilePic"
          />
        </div>
        <div className="col-span-3 md:mt-4">
          <div className=" flex md:justify-between px-8 justify-end">
            <div className="hidden sm:block">
              <h3 className="p-2 font-semibold text-sm md:text-base">
                {user.name}
              </h3>
            </div>
            <div className="flex gap-2 ">
              { accountProfile ? 
              <button className="bg-blue-700 text-white text-xs md:text-sm  px-4 rounded-md">
                Edit profile
              </button> :
              <button className="bg-blue-700 text-white text-xs md:text-sm  px-7 rounded-md">
                Follow
              </button>
              } { accountProfile ? 
              <div className={`${hover} pt-1`}>
                <IoMdSettings size={40} />
              </div> :
              <div className={`${hover} pt-1`}>
                <FiMoreVertical size={38} />
              </div>
              }
            </div>
          </div>
          <div className="col-span-3 flex justify-around text-center m-3">
            <p className="text-sm text-gray-500">
              <span className={`${color} font-semibold text-base`}>13</span><br />Posts
            </p>
            <p className="text-sm text-gray-500">
              <span className={`${color} font-semibold text-base`}>500</span><br />Followers
            </p>
            <p className="text-sm text-gray-500">
              <span className={`${color} font-semibold text-base`}>100</span><br />Following
            </p>
          </div>
        </div>
      </div>
      <div className="pl-2 pt-4" >
        <p className="text-sm ">Sooraj Vp</p>
        <p className="text-xs py-2 pb-5">Full stack developer </p>
      </div>
      <hr />
      <div className="flex justify-around  py-2">
        <div className="flex gap-1 cursor-pointer" onClick={PostsClick}>POSTS <RiTable2 size={29}/></div>
        { accountProfile && <div className="flex gap-1 cursor-pointer" onClick={SavedClick}>SAVED <BiBookmark size={29} /></div> }
      </div>
      <hr />
      <PostList items={postItems} />
    </div>
  );
};

export default UserProfile;
