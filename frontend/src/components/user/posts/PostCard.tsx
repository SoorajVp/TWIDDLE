/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { BsBookmark } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import {
  RootState,
  userInterface,
} from "../../../state/interface/userInterface";
import { Link } from "react-router-dom";
import { apiCalls } from "../../../api/user/apiCalls";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";

const PostCard = ({
  _id,
  createdAt,
  image,
  description,
  likes,
  userId,
}: {
  _id: string,
  createdAt: string;
  image: string;
  description: string;
  likes: string[];
  userId: userInterface;
}) => {
  const [CommentBox, setCommentBox] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount ] = useState<number>(likes.length)
  const { darkMode, user } = useSelector((store: RootState) => store.user);
  useEffect(() => {
    if (likes.includes(user._id)) {
      setLiked(true);
    }
  }, []);

  const lastTime: string = lastTimeFormat(createdAt)
  console.log(lastTime)

  const HandleLike = async(): Promise<void> => {
    console.log("like - - - -")
    setLiked(true)
    setLikeCount(likeCount+1)
    const response = await apiCalls.likePost(_id);
    console.log("this is response --------", response)
  }

  const HandleUnlike = async(): Promise<void> => {
    console.log("unlike - - - -")
    setLiked(false)
    setLikeCount(likeCount-1)
    const response = await apiCalls.unlikePost(_id);
    console.log("this is response --------", response)
  }

  let color: string;
  let bgColor: string;

  if (darkMode) {
    (color = "text-slate-200"), (bgColor = "bg-gray-950");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white");
  }
  return (
    <>
      <article
        className={`${bgColor} ${color} mb-4 break-inside p-2 rounded-lg shadow flex flex-col bg-clip-border`}
      >
        <div className="flex pb-3 items-center justify-between">
          <div className="flex">
            <Link to={`/${userId.name}`} className="inline-block mr-4">
              <img
                className="rounded-full max-w-none w-9 h-9"
                src={userId?.profilePic}
                alt="Profile"
              />
            </Link>
            <div className="flex flex-col">
              <div>
                <Link
                  to={`/${userId.name}`}
                  className="inline-block text-sm font-medium"
                >
                  {userId?.name}
                </Link>
              </div>
              <div className="text-slate-500 text-xs ">{lastTime}</div>
            </div>
          </div>
          <div className="pr-2">
            <SlOptionsVertical />
          </div>
        </div>

        <div className="pb-2">
          <div className="flex justify-between gap-1 mb-1">
            <div
              className="flex cursor-pointer"
              style={{ width: "100%", height: "auto" }}
            >
              <img
                className="w-full h-full object-cover  bg-gray-200"
                src={image}
                alt="Image 1"
              />
            </div>
          </div>
        </div>
        <p className="text-sm">{description}</p>
        <div className="flex justify-between">
          <div className="py-2">
            <div className="inline-flex items-center">
              {liked ? (
                <span className="mr-2  cursor-pointer text-blue-500" onClick={HandleUnlike}>
                  <AiFillHeart size={32} />
                </span>
              ) : (
                <span className="mr-2  cursor-pointer " onClick={HandleLike}>
                  <AiOutlineHeart size={32} />
                </span>
              )}
              <span className="text-base text-gray-500">{likeCount}</span>
            </div>

            <div
              className="inline-flex items-center pl-4 cursor-pointer"
              onClick={() => setCommentBox(!CommentBox)}
            >
              <span className="mr-2">
                <HiOutlineChatBubbleLeft size={30} />
              </span>
            </div>
          </div>

          <div className="py-2">
            <a className="inline-flex items-center" href="#">
              <span className="mr-2">
                <BsBookmark size={30} />
              </span>
            </a>
          </div>
        </div>

        {CommentBox && (
          <div className="relative">
            <input
              className={`${
                darkMode ? "bg-slate-800" : "bg-slate-100"
              } pt-2 pb-2 pl-3 w-full h-11   rounded-lg placeholder:text-slate-500 pr-20`}
              type="text"
              // onBlur={() => setCommentBox(false)}
              placeholder="Write a comment"
            />
            <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
              <svg
                className="mr-2"
                style={{ width: "26px", height: "26px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
                />
              </svg>
              <svg
                className="fill-blue-500 "
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
              </svg>
            </span>
          </div>
        )}
      </article>
    </>
  );
};

export default PostCard;
