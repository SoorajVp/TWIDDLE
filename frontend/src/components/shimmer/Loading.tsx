import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";



export const PageLoading = () => {
  return (
    <div className="flex justify-center items-center -mt-20 h-full">
      <img
        className="w-12 md:w-16 fixed "
        src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
        alt="Loading"
      />
    </div>
  )
}

const Loading = () => {
  const { darkMode } = useSelector((store: RootState) => store.user)
  const bgColor = darkMode ? "bg-gray-950" : "bg-white"
  
  return (
    <div>
      <div className={`fixed inset-0 z-50 flex justify-center items-center ${bgColor} bg-opacity-50`}>
        <div className="flex justify-center items-center h-full">
          <img
            className="h-16 w-16 fixed "
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
            alt="Loading"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;




