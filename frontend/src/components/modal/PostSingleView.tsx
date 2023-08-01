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
  console.log("this is props - -  -");
  const [modalIsOpen, setIsOpen] = useState(false);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  function openModal() {
    console.log("this is modal - - - -", post);
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
    <>

      {/* <div
        onClick={openModal}
        className={`flex cursor-pointer items-center p-2 pt-3 rounded-lg group`}
      >
        <div>
          <BiLogOut size={30} />{" "}
        </div>
        <span className="ml-3 hidden lg:block"> Logout</span>
      </div> */}

      <div onClick={openModal}>
        {/* <PostSingleView post={post} /> */}
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
