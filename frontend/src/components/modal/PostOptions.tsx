/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useRef } from "react";
import Modal from "react-modal";
import { apiCalls } from "../../api/user/apiCalls";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";
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
  // Other properties, if any
}

export const ReportPost = ({
  userId,
  postId,
  darkMode,
}: {
  userId: string;
  postId: string;
  darkMode: boolean;
}) => {

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

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

  const HandleReport = async () => {
    if (reason && reason !== " ") {
      console.log(reason);
      const data: { userId: string; postId: string; reason: string } = { userId: userId, postId: postId, reason: reason };
      const response: ReportPostResponse = await apiCalls.reportPost(data);
      if (response.status === "success") {
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
      <li
        onClick={openModal}
        className={`${
          darkMode
            ? "hover:bg-gray-800 hover:text-gray-100"
            : "hover:bg-gray-100 hover:text-gray-900"
        } block px-4 py-1 text-sm hover:bg-gray-100 hover:text-gray-900`}
        role="menuitem"
      >
        Report
      </li>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-80 py-1 text-center">
          <svg
            className="mx-auto mb-2 text-red-200 w-12 h-12"
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
          <h3 className="py-2 text-sm font-normal text-gray-500 ">
            Your reponse will forward to admin authorization
          </h3>


          <textarea
            id="message"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="block p-2.5 my-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your reason here..."
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
              onClick={HandleReport}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium w-full py-1.5 focus:z-10"
            >
              Report
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const DeletePost = ({
  postId,
  darkMode,
  image
}: {
  postId: string;
  darkMode: boolean;
  image: string;
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch()

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

  console.log(image.split("/").pop())
  const HandlePostDelete = async () => {
    const response: ReportPostResponse = await apiCalls.deletePost(postId, image.split("/").pop())
    console.log(response)
    dispatch(setAction())
    setIsOpen(false);
    toast.success(response.message, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
    });
  }
  return (
    <div>
      <li
        onClick={openModal}
        className={`${
          darkMode
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
        <div className={`${darkMode && "bg-black" } px-7 -m-4 w-72 py-5 text-center`}>
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
          ><GoTrash />
            Delete
          </button>
          <button
            onClick={closeModal}
            type="button"
            className={`${darkMode ? "text-gray-200 bg-gray-800 hover:bg-gray-700" : "text-gray-700 bg-white hover:bg-gray-100" }  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-7 py-1.5 focus:z-10`}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};