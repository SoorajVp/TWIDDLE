import { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";
import { RootState } from "../../../state/interface/userInterface";
import {
  setAction,
  setSavePost,
  setunSavePost,
} from "../../../state/slices/userSlice";
import {
  CommentInterface,
  PostInterface,
} from "../../../state/interface/postInterface";
import { postRequest } from "../../../api/requests/postRequest";
import { MdSend, MdVerified } from "react-icons/md";
import CommentOption from "../../modal/DeleteComment";
import { DeletePost } from "../../modal/DeletePostUser";
import ReportPost from "../../modal/ReportPost";
import EditPost from "../../modal/EditPost";
import { socket } from "../../../socket";

type notificationType = {
  receiverId: string,
  text: string
}
 

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
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState <notificationType>(null)

  const { darkMode, user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  

  useEffect(() => {
    setCommentList(comments);
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

      if (
        commentBoxRef.current &&
        !commentBoxRef.current.contains(event.target as Node)
      ) {
        setCommentBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setDropDown]);

  const lastTime: string = lastTimeFormat(createdAt);

  const HandleLike = async (): Promise<void> => {
    setLiked(true);
    setLikeCount(likeCount + 1);
    await postRequest.likePost(_id, userId._id);
    const message = {
      receiverId: userId._id,
      text: `${user.name} liked your post`
    }
    setNotification(message)
    dispatch(setAction());
  };

  const HandleUnlike = async (): Promise<void> => {
    setLiked(false);
    setLikeCount(likeCount - 1);
    await postRequest.unlikePost(_id, userId._id);
    dispatch(setAction());
  };

  const HandleComment = async () => {
    setButtonLoading(true)
    if (comment) {
      const data: { id: string; comment: string, postUserId: string } = {
        id: _id,
        comment: comment,
        postUserId: userId._id
      };
      await postRequest.commentPost(data);
      setComment("");
      setButtonLoading(false)
      const message = {
        receiverId: userId._id,
        text: `${user.name} comment on your post`
      }
      setNotification(message)
      dispatch(setAction());
    }
  };

  const HandleSaved = async () => {
    setSaved(true);
    dispatch(setSavePost({ postId: _id }));
    await postRequest.savePost(_id);
  };

  const HandleUnSave = async () => {
    setSaved(false);
    dispatch(setunSavePost({ postId: _id }));
    await postRequest.savePost(_id);
    dispatch(setAction());
  };

  useEffect(() => {
    socket.emit("new-user-add", user._id);
    if (notification && userId._id !== user._id) {
      socket.emit("notification", notification);
    }
  }, [notification]);

  const handleCommentText = (newMessage: string) => {
    setComment(newMessage);
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
              <img className="rounded-full border max-w-none w-9 h-9"
                src={userId?.profilePic}
                alt="Profile"
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex">
                <Link
                  to={`/${userId?.name}`}
                  className="inline-block text-sm font-medium"
                >
                  {userId?.name}
                </Link>
                {userId.verfied &&
                  <div className=" pl-1 pt-0.5 text-blue-600"><MdVerified size={19} /></div>}
              </div>
              <div className="text-slate-500" style={{ fontSize: "13px" }}>
                {lastTime}
              </div>
            </div>
          </div>
          <div>
            <div ref={dropdownRef} className="relative inline-block text-left">
              {dropDown && (
                <div
                  className={`${darkMode && "bg-black"
                    } ${color} origin-top-right absolute -mt-2 right-0 mr-8 w-24 min-w-1/2 max-w-screen-md shadow-lg ring-1 ring-gray-200 ring-opacity-5`}
                >
                  <ul
                    className={`${darkMode ? "bg-black" : "bg-gray-50"} py-1 border  rounded-md`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {userId?._id == user?._id ? (
                      <>
                        <DeletePost
                          postId={_id}
                          darkMode={darkMode}
                          image={image}
                        />
                        <EditPost
                          postId={_id}
                          description={description}
                          darkMode={darkMode}
                        />
                      </>
                    ) : (
                      <ReportPost
                        userId={user?._id}
                        postId={_id}
                        darkMode={darkMode}
                      />
                    )}
                  </ul>
                </div>
              )}
              <div
                className="pr-2 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              >
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
                className={`w-full h-full object-cover ${darkMode ? "bg-gray-800" : "bg-gray-200"
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
                <span className="mr-2  cursor-pointer text-blue-500"
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

            <div className="inline-flex items-center pl-4 cursor-pointer"
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
          <div ref={commentBoxRef} >
            <div className="flex pt-1">
              <InputEmoji value={comment} onChange={handleCommentText} placeholder="Type your comment..."
                className="" />
              <button onClick={HandleComment} type="button"
                className="inline-flex items-center justify-center rounded-lg px-2 text-blue-700 hover:text-blue-500" >
                {  buttonLoading ?
                <img className="w-7" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
                alt="Loading"
                /> :
                <MdSend size={35} /> 
                }
              </button>
            </div>

            <ul className="space-y-3 mt-3 text-xs max-h-40 overflow-y-auto">
              {commentList.map((item, index) => (
                <li className="w-full pl-2 flex justify-between" key={index}>
                  <div className="flex">
                    <Link to={`/${item?.userId?.name}`} className="flex">
                      <img
                        className="rounded-full border max-w-none w-7 h-7"
                        src={item?.userId?.profilePic}
                        alt="Profile"
                      />
                      <div className="flex-2 pl-2">
                        <div className="flex">
                          <p className="text-sm font-medium">
                            {item?.userId?.name}
                          </p>
                          {item?.userId?.verfied && <div className=" pl-1 pt-0.5 text-blue-600"><MdVerified size={18} /></div>}
                        </div>
                        <p className="text-gray-500 truncate"
                          style={{ fontSize: "13px" }}
                        >
                          {lastTimeFormat(item?.createdAt?.toString())}
                        </p>
                      </div>
                    </Link>



                    <p className="pt-0.5 pl-3 text-sm">{item?.comment}</p>
                  </div>

                  <CommentOption
                    userId={item?.userId?._id}
                    postId={_id}
                    commentId={item?._id}
                    postUserId={userId?._id}
                  />
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
