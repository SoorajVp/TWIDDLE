import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../shimmer/Loading";
import Modal from "react-modal";
import { FiLogOut } from "react-icons/fi";

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

const AdminLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const submitLogout = () => {
    setLoading(true);
    setIsOpen(false);
    setTimeout(() => {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }, 2000);
  };

  return (
    <>
      {loading && <Loading />}
              <div onClick={openModal}
                className="flex items-center p-2 text-red-600 rounded-lg hover:bg-gray-100 group"
              >
                <FiLogOut size={30} />
                <span className="ml-3">Logout</span>
              </div>

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
            <h3 className="mb-5 text-xs font-normal text-gray-500 ">
              Are you sure <br />
              Do you want to logout this account?
            </h3>
            <button
              type="button"
              onClick={submitLogout}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-8 py-1.5 text-center mr-2"
            >
              Logout
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-1.5 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminLogout;


