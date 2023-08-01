import { BiSolidLockOpenAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import LogoutModal from "../../modal/Logout";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { setTheme } from "../../../state/slices/userSlice";

const Settings = () => {
  const { darkMode } = useSelector((store: RootState) => store.user);

  const dispatch = useDispatch();
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
      <div>
        <div className="dropdown inline-block relative pr-2">
          <button className="font-semibold p-1 rounded inline-flex">
            <IoMdSettings size={35} />
          </button>
          <ul className="dropdown-menu absolute right-0 hidden pt-1 pr-3 text-sm rounded-md border">
            <li className={`${color} ${hover} ${bgColor} py-1 rounded-r-lg`}>
              <div
                className={` px-3 cursor-pointer flex items-center py-1`}
              >
                <div className="">
                  <BiSolidLockOpenAlt size={23} />
                </div>
                <span className="ml-3">Security</span>
              </div>
            </li>

            <li className={`${color} ${hover} ${bgColor} py-1 rounded-r-lg`}>
              <div
                className={`${color} px-3 cursor-pointer flex items-center p-1`}
                onClick={() => dispatch(setTheme())}
              >
                <div className="">
                  {darkMode ? (
                    <MdOutlineDarkMode size={24} />
                  ) : (
                    <MdDarkMode size={24} />
                  )}
                </div>
                <span className="ml-3 ">Theme</span>
              </div>
            </li>
            <li className={`text-red-800 ${hover} ${bgColor} py-1 pl-1 rounded-r-lg`}>
              <LogoutModal />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Settings;
