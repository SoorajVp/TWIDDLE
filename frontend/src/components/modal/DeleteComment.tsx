import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../../state/slices/userSlice";
import { RootState } from "../../state/interface/userInterface";
import { SlOptionsVertical } from "react-icons/sl";
import { postRequest } from "../../api/requests/postRequest";


const CommentOption = ({
    userId,
    postId,
    commentId,
    postUserId
}: {
    userId: string;
    postId: string;
    commentId: string;
    postUserId: string
}) => {
    const { darkMode, user } = useSelector((store: RootState) => store.user);
    const [commentOption, setCommentOption] = useState<boolean>(false);

    const dispatch = useDispatch();
    const commentOptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                commentOptionRef.current &&
                !commentOptionRef.current.contains(event.target as Node)
            ) {
                setCommentOption(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [commentOptionRef]);

    let color: string;
    let bgColor: string;

    if (darkMode) {
        (color = "text-slate-200"), (bgColor = "bg-gray-950");
    } else {
        (color = "text-gray-950"), (bgColor = "bg-white");
    }


    const deleteComment = async () => {
        const response: { status: string; message: string } =
            await postRequest.deleteComment(postId, commentId, postUserId);
        setCommentOption(false);
        dispatch(setAction());
        toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
        });
    };

    return (
        <div ref={commentOptionRef} className="relative inline-block text-left">

            {commentOption && (
                <div
                    className={`${darkMode && bgColor} ${color} ${userId == user?._id &&
                        "origin-top-right absolute right-0 mr-6 w-24 min-w-1/2 max-w-screen-md shadow-lg ring-gray-200 ring-opacity-5"
                        }`}
                >
                    <ul
                        className={` ${userId == user?._id && "py-0.5 border rounded-md"}`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {userId == user?._id && (
                            <li
                                onClick={deleteComment}
                                className={`${darkMode
                                    ? "hover:bg-gray-900 hover:text-white"
                                    : "hover:bg-gray-100 hover:text-gray-900"
                                    } block px-4 py-1 text-sm hover:bg-gray-100 hover:text-gray-900`}
                                role="menuitem"
                            >
                                Delete
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <div
                className="p-2 cursor-pointer"
                onClick={() => setCommentOption(true)}
            >
                <SlOptionsVertical />
            </div>
        </div>
    );
};

export default CommentOption;