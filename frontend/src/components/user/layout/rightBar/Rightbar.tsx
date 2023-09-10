import { useSelector } from "react-redux";
import { RootState } from "../../../../state/interface/userInterface";
import VerifyAds from "./VerifyAds";

const RightBar = () => {

  const { darkMode, user } = useSelector((store: RootState) => store.user);

  let color: string, bgColor: string, border: string;

  if (darkMode) {
    (color = "text-white"), (bgColor = "bg-gray-950"), (border = "border-gray-500");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white"), (border = "border-gray-500");
  }


  return (
    <>
      <div className={`${bgColor} ${color} ${border} border-l hidden col-span-2 xl:block sticky h-screen`}>

        {
          user.verfied == false &&
          <VerifyAds border={border} />
        }

      </div>
    </>

  );
};

export default RightBar;
