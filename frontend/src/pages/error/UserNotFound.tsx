import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";

const UserNotFound = () => {
  const { darkMode } = useSelector((store: RootState) => store.user);

  return (
    <div className="flex justify-center w-full mt-16">
      <div className="text-center">
        <div className="flex justify-center">
          <img className="w-[30%] -m-8" src="../../../../public/search-image.png" alt="Loading" />
        </div>
        <br />
        <h2 className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg font-mono font-medium`}>This user could not be found </h2>
      </div>
    </div>
  )
}

export default UserNotFound