/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState, useRef } from "react";
import Modal from "react-modal";
import PostCard from "../user/posts/PostCard";
import { PostInterface } from "../../state/interface/postInterface";



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

const PostSingleView = ({
  _id,
  image,
  createdAt,
  description,
  likes,
  comments,
  userId,
}: PostInterface) => {
  const post = { _id, image, createdAt, description, likes, comments, userId };
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

  return (
    <>

      <div onClick={openModal}>
        <img
          src={image}
          alt="Post"
          className="min-w-full min-h-full cursor-pointer bg-gray-500"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div className="sm:w-96 w-screen h-auto -m-4 -mb-8 rounded-md bg-slate-600">
          <PostCard {...post} />
        </div>

      </Modal>

    </>
  );
};

export default PostSingleView;
