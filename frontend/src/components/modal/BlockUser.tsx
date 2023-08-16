/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAction } from "../../state/slices/userSlice";
import Loading from "../shimmer/Loading";
import Modal from "react-modal";
import { adminRequest } from "../../api/requests/adminRequests";
import { toast } from "react-toastify";

interface ApiResponse {
  status: string;
  message: string;
}

interface BlockPostProps {
  userId: string;
  isBlocked: boolean;
}

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const BlockUser: React.FC<BlockPostProps> = ({ userId, isBlocked }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
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

  const HandlePostBlock = async (): Promise<void> => {
    setLoading(true);
    const response = (await adminRequest.blockUser(userId)) as ApiResponse;
    console.log("this is response ----", response);
    if (response.status == "success") {
      setLoading(false);
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
  };

  return (
    <div>
      {loading && <Loading />}
      {isBlocked ? (
        <div
          onClick={openModal}
          className="text-orange-600 bg-orange-100 py-1.5 px-2 rounded-md shadow-md hover:text-orange-700 hover:bg-orange-200 cursor-pointer"
        >
          Unblock
        </div>
      ) : (
        <div
          onClick={openModal}
          className="text-red-700 bg-red-100 py-1.5 px-3 rounded-md shadow-md hover:text-red-800 hover:bg-red-200 cursor-pointer"
        >
          Block
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <div className="px-7 py-1 text-center">
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
            {isBlocked ? (
              <h3 className="mb-5 text-xs font-normal text-gray-500 ">
                Are you sure ? <br />
                It will unblock this user !
              </h3>
            ) : (
              <h3 className="mb-5 text-xs font-normal text-gray-500 ">
                Are you sure ? <br />
                It will block this user !
              </h3>
            )}
            <button
              type="button"
              onClick={HandlePostBlock}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-1.5 text-center mr-2"
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 focus:z-10"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// export const Unblock: React.FC<BlockPostProps> = ({ userId }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const dispatch = useDispatch();

//   const [modalIsOpen, setIsOpen] = useState(false);
//   const subtitleRef = useRef<HTMLDivElement | null>(null);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     if (subtitleRef.current) {
//       subtitleRef.current.style.color = "#f00";
//     }
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const HandlePostBlock = async (): Promise<void> => {
//     setLoading(true);
//     const response = (await apiCalls.blockUser(userId)) as ApiResponse;
//     console.log("this is response ----", response);
//     if (response.status == "success") {
//       setLoading(false);
//       dispatch(setAction());
//       toast.success(response.message, {
//         position: toast.POSITION.TOP_RIGHT,
//         hideProgressBar: true,
//       });
//     } else {
//       toast.error(response.message, {
//         position: toast.POSITION.TOP_RIGHT,
//         hideProgressBar: true,
//       });
//     }
//   };

//   return (
//     <div>
//       {loading && <Loading />}
//       <div
//         onClick={openModal}
//         className="text-red-700 bg-red-100 py-1.5 px-3 rounded-md shadow-md hover:text-red-800 hover:bg-red-200 cursor-pointer"
//       >
//         Block
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <div className="">
//           <div className="px-7 py-1 text-center">
//             <svg
//               className="mx-auto mb-2 text-red-200 w-12 h-12"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//             <h3 className="mb-5 text-xs font-normal text-gray-500 ">
//               Are you sure ? <br />
//               It will block this user !
//             </h3>
//             <button
//               type="button"
//               onClick={HandlePostBlock}
//               className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-1.5 text-center mr-2"
//             >
//               Block
//             </button>
//             <button
//               onClick={closeModal}
//               type="button"
//               className="text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 focus:z-10"
//             >
//               No, cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
