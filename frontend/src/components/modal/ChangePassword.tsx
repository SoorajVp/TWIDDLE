import { useState, useRef } from "react";
import Modal from "react-modal";
import EditForm from "../user/profile/EditForm";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import PasswordForm from "../user/profile/PasswordForm";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ChangePassword = () => {
  const { darkMode, user } = useSelector((store: RootState) => store.user);

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

  let color: string, bgColor: string, hover: string;

  if (darkMode) {
    (color = "text-white"),
      (bgColor = "bg-gray-950"),
      (hover = "hover:bg-black");
  } else {
    (color = "text-gray-950"),
      (bgColor = "bg-white"),
      (hover = "hover:bg-gray-100");
  }

  return (
    <>
      <li
        className={`${color} ${hover} ${bgColor} py-1 rounded-r-lg`}
        onClick={openModal}
      >
        <div className={` px-3 cursor-pointer flex items-center py-1`}>
          <div className="">
            <BiSolidLockOpenAlt size={23} />
          </div>
          <span className="ml-3">Security</span>
        </div>
      </li>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <PasswordForm setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default ChangePassword;
