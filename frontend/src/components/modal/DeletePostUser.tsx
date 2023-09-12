import { useState, useRef } from "react";
import Modal from "react-modal";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAction } from "../../state/slices/userSlice";
import { postRequest } from "../../api/requests/postRequest";
import Loading from "../shimmer/Loading";


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

export const DeletePost = ({
    postId,
    darkMode,
    image,
}: {
    postId: string;
    darkMode: boolean;
    image: string;
}) => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

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

    console.log(image.split("/").pop());
    const HandlePostDelete = async () => {
        setLoading(true)
        const response: { status: string; message: string } =
            await postRequest.deletePost(postId, image.split("/").pop());
        setLoading(false)

        console.log(response);
        dispatch(setAction());
        setIsOpen(false);
        toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
        });
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
                Delete
            </li>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div
                    className={`${darkMode && "bg-black"
                        } px-7 -m-4 w-72 py-5 text-center`}
                >
                    <svg
                        className="mx-auto mb-2 text-orange-300 w-12 h-12"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <h3 className="mb-5 text-xs font-normal text-gray-500 ">
                        Are you sure ? <br />
                        You can't recover this after delete this !
                    </h3>
                    <button
                        type="button"
                        onClick={HandlePostDelete}
                        className="text-white bg-red-600  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-8 py-1.5 text-center mr-2"
                    >
                        <GoTrash />
                        Delete
                    </button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className={`${darkMode
                            ? "text-gray-200 bg-gray-800 hover:bg-gray-700"
                            : "text-gray-700 bg-white hover:bg-gray-100"
                            }  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-7 py-1.5 focus:z-10`}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};
