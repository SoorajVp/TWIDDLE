import { useState, useRef } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { postRequest } from "../../api/requests/postRequest";
import Loading from "../shimmer/Loading";
import { RiImageEditLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setAction } from "../../state/slices/userSlice";

const customStyles = {
    content: {
        top: "45%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

interface ReportPostResponse {
    status: string;
    message: string;
    description: string
}

const EditPost = ({
    postId,
    description,
    darkMode
}: {
    postId: string;
    description: string
    darkMode: boolean;
}) => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>(description);
    const subtitleRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = "#f00";
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    const HandleEditPost = async () => {
        if (text && text !== " ") {
            console.log(text);
            setLoading(true)
            const data: { postId: string; text: string } = {
                postId: postId,
                text: text,
            };
            const response: ReportPostResponse = await postRequest.editPost(data);
            setLoading(false)
            if (response.status === "success") {
                dispatch(setAction());
                closeModal();
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                });
            } else {
                toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                });
            }
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <li
                onClick={openModal}
                className={`${darkMode
                    ? "hover:bg-gray-800 hover:text-gray-100"
                    : "hover:bg-gray-100 hover:text-gray-900"
                    } block px-4 py-1 text-sm hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
            >
                Edit
            </li>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="w-72 py-1 text-center ">
                    <div className="flex justify-center text-gray-400">

                    <RiImageEditLine size={50} />
                    </div>
                    <h3 className="py-2 text-sm font-normal text-gray-500 ">
                        Edit your post description
                    </h3>

                    <textarea
                        id="message"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="block p-2.5 my-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your description..."
                    ></textarea>

                    <div className="flex gap-1 justify-around">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium w-full py-1.5 focus:z-10"
                        >
                            Discard
                        </button>
                        <button
                            type="button"
                            onClick={HandleEditPost}
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium w-full py-1.5 focus:z-10"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditPost



