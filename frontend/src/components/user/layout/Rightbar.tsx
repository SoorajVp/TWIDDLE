import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";

const RightBar = () => {

  const theme = useSelector((store: RootState) => store.user.darkMode);
  let color: string, bgColor: string, border: string;
  if (theme) {
    (color = "text-white"), (bgColor = "bg-gray-950"), (border = "border-gray-500");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white"), (border = "border-gray-500");
  }

  return (
    <div className={`${bgColor} ${color} ${border}  hidden col-span-2 md:block sticky h-screen border-l`}>
      <div className="p-4">
        <div className={`border ${border} max-w-sm rounded overflow-hidden shadow-lg`}>
          <img
            className="w-full"
            src="https://www.searchenginejournal.com/wp-content/uploads/2023/03/paid-verification-programs-twitter-blue-meta-verified-641e2764953c9-sej.jpg"
            alt="Mountain"
          />
          <div className="px-6 py-6">
            <div className="font-bold text-base mb-2">Make Verify your Account</div>
            <p className="text-sm">
              Just wait for the new incoming feature. Make something more about your account with verified mark. 
            </p>
          </div>
          <div className="px-6 pt-2 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2">
              #verifyTick
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
