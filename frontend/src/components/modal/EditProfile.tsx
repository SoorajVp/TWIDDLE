import { useState, useRef } from "react";
import Modal from "react-modal";
import EditForm from "../user/profile/EditForm";

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

const EditProfile = () => {

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

  return (
    <div>
      <button
        className="border h-9 border-blue-500  text-blue-500 text-xs font-semibold px-3 lg:px-5 rounded"
        onClick={openModal}
      >
        EDIT PROFILE
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <EditForm setIsOpen={setIsOpen} />
        
      </Modal>
    </div>
  );
};

export default EditProfile;
