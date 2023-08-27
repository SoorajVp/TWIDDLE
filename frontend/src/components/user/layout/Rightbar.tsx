import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { Link } from "react-router-dom";

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
        <div className={`border ${border} max-w-sm mx-8 rounded overflow-hidden shadow-lg`}>
          <img
            className="w-full"
            src="https://www.searchenginejournal.com/wp-content/uploads/2023/03/paid-verification-programs-twitter-blue-meta-verified-641e2764953c9-sej.jpg"
            alt="Mountain"
          />
          <div className="px-6 pt-6 text-center">
            <div className="font-bold text-base mb-2">Make Verify your Account</div>
            <p className="text-sm">
              Just wait for the new incoming feature. Make something more about your account with verified mark. 
            </p>
          </div>
          <div className="px-6 py-4">
           <Link to='/payment'>
            <button className="bg-green-600 hover:bg-green-700 text-white w-full py-1 rounded-md shadow-md"> Verify account now</button>
           </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
