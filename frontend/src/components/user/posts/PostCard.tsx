/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCalls } from "../../../api/user/apiCalls";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";
import { RootState } from "../../../state/interface/userInterface";
import { setAction, setSavePost, setunSavePost } from "../../../state/slices/userSlice";
import {
  CommentInterface,
  PostInterface,
} from "../../../state/interface/postInterface";
import { CommentOption, DeletePost, ReportPost } from "../../modal/PostOptions";


const PostCard = ({
  _id,
  createdAt,
  image,
  description,
  likes,
  comments,
  userId,
}: PostInterface) => {

  const [CommentBox, setCommentBox] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes?.length);
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentInterface[]>(comments);

  const [dropDown, setDropDown] = useState<boolean>(false);


  const { darkMode, user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setCommentList(comments)
    if (likes?.includes(user._id)) {
      setLiked(true);
    }
    if (user?.saved?.includes(_id)) {
      setSaved(true);
    }
  }, [comments]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const commentBoxRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      //   setDropDown(false);
      // }

      if (commentBoxRef.current && !commentBoxRef.current.contains(event.target as Node)) {
        setCommentBox(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, setDropDown]);

  const lastTime: string = lastTimeFormat(createdAt);

  const HandleLike = async (): Promise<void> => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    await apiCalls.likePost(_id);
  };

  const HandleUnlike = async (): Promise<void> => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    await apiCalls.unlikePost(_id);
  };

  const HandleComment = async () => {
    if (comment) {
      const data: { id: string; comment: string } = {
        id: _id,
        comment: comment,
      };

      await apiCalls.commentPost(data);
      dispatch(setAction())
      setComment("");
    }
  };

  const HandleSaved = async () => {
    setSaved(true);
    dispatch(setSavePost({ postId: _id }));
    await apiCalls.savePost(_id);
    dispatch(setSavePost({ postId: _id }));
  };

  const HandleUnSave = async () => {
    setSaved(false);
    dispatch(setunSavePost({ postId: _id }));
    await apiCalls.savePost(_id);
  };

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
        className={`${bgColor} ${color} mb-4  p-2 rounded-lg shadow flex flex-col bg-clip-border`}
      >
        <div className="flex pb-2 items-center justify-between">
          <div className="flex">
            <Link to={`/${userId?.name}`} className="inline-block mr-4 mt-1">
              <img
                className="rounded-full border max-w-none w-9 h-9"
                src={userId?.profilePic}
                alt="Profile"
              />
            </Link>
            <div className="flex flex-col">
              <div>
                <Link
                  to={`/${userId?.name}`}
                  className="inline-block text-sm font-medium"
                >
                  {userId?.name}
                </Link>
              </div>
              <div className="text-slate-500" style={{ fontSize: "13px" }}>
                {lastTime}
              </div>
            </div>
          </div>
          <div>
            <div ref={dropdownRef} className="relative inline-block text-left">
              {dropDown && (
                <div className={`${darkMode && "bg-black" } ${color} origin-top-right absolute -mt-2 right-0 mr-8 w-24 min-w-1/2 max-w-screen-md shadow-lg ring-1 ring-gray-200 ring-opacity-5`}>
                  <ul
                    className="py-1 border rounded-md"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    { userId?._id == user?._id ?
                    <DeletePost postId={_id} darkMode={darkMode} image={image} /> :
                    <ReportPost userId={user?._id} postId={_id} darkMode={darkMode} /> }
                    
                  </ul>
                </div>
              )}
              <div className="pr-2 cursor-pointer" onClick={()=> setDropDown(!dropDown)}>
                <SlOptionsVertical />
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => setDropDown(false)}>
          <div className="flex justify-between gap-1 mb-1">
            <div
              className="flex cursor-pointer"
              style={{ width: "100%", height: "auto" }}
            >
              <img 
                className={`w-full h-full object-cover ${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
                src={image}
                alt="Image 1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="py-1">
            <div className="inline-flex items-center">
              {liked ? (
                <span
                  className="mr-2  cursor-pointer text-blue-500"
                  onClick={HandleUnlike}
                >
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
              <span className="text-base text-gray-500">
                {comments?.length}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center cursor-pointer">
              {saved ? (
                <span onClick={HandleUnSave}>
                  <BsBookmarkFill size={26} />
                </span>
              ) : (
                <span onClick={HandleSaved}>
                  <BsBookmark size={26} />
                </span>
              )}
            </div>
          </div>
        </div>

        {description && (
          <div className="text-sm pl-1">
            <span className="pr-2 font-medium">{userId?.name}</span>
            {description}
          </div>
        )}

        {CommentBox && (
          <div ref={commentBoxRef} className="" >
            <div className="relative pt-1">
              <input className={`${
                  darkMode ? "bg-slate-800" : "bg-slate-100"
                } pt-2 pb-1 pl-3 w-full h-9 text-sm rounded-lg placeholder:text-slate-500 pr-20`}
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment"
              />
              <span className="flex absolute right-3 top-2/4 -mt-2 items-center"
                onClick={HandleComment} >
                {/* <svg
                  className="mr-2"
                  style={{ width: "26px", height: "26px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
                  />
                </svg> */}
                <svg
                  className="fill-blue-700 cursor-pointer"
                  style={{ width: "25px", height: "24px" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                </svg>
              </span>
            </div>

            <ul className="space-y-3 mt-3 text-xs max-h-40 overflow-y-auto">
              {commentList.map((item, index) => (
                <li className="w-full pl-2 flex justify-between" key={index}>
                <div className="flex">
                <Link
                    to={`/${item?.userId?.name}`} className="flex" >
                  <img
                    className="rounded-full border max-w-none w-7 h-7"
                    src={item?.userId?.profilePic}
                    alt="Profile"
                  />
                   <div className="flex-2 pl-2">
                        <p className="text-sm font-medium">
                        {item?.userId?.name}
                        </p>
                        <p className="text-gray-500 truncate"  style={{ fontSize: "13px" }}>
                            {lastTimeFormat(item.createdAt.toString())}
                        </p>
                    </div>
                    </Link>

                  <p className="pt-0.5 pl-3 text-sm">{item?.comment}</p>
                  </div>

                  <CommentOption userId={item.userId._id} postId={_id} commentId={item._id} />

                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  );
};

export default PostCard;
