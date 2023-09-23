import { Link } from "react-router-dom"
import { RootState } from "../../../state/interface/userInterface";
import { useSelector } from "react-redux";

const PostEmpty = () => {

  const { darkMode } = useSelector((store: RootState) => store.user);

  return (
    <>
      <div className="flex justify-center mt-24 w-full ">
        <div className="text-center">
          <div className="flex justify-center">
            <img className="w-[60%]  -m-8" src="post-image.png" alt="Loading" />
          </div><br />

          <h2 className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-base`}>Discover new friends <br /> Connections in our vibrant community.</h2>
          <Link to="/search" >
            <button className="py-1 px-7 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-700 mt-3 rounded transition duration-300 ease-in">Explore</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default PostEmpty