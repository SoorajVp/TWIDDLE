import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { BiMenu } from "react-icons/bi";
import { BsGrid1X2 } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlinePlusSquare,
  AiOutlineSearch,
} from "react-icons/ai";



const SideBar = () => {
  const { user, darkMode } =useSelector((store: RootState) => store.user )
  const [subItems, setSubItems] = useState<boolean>(false);

  const MenuLists = [
    { name: "Home", href: "/", icon: <AiOutlineHome size={30} /> },
    { name: "Search", href: "/search", icon: <AiOutlineSearch size={30} /> },
    { name: "Create", href: "/create", icon: <AiOutlinePlusSquare size={30} /> },
    { name: "Notification", href: "/", icon: <AiOutlineHeart size={30} /> },
    { name: "Messages", href: "/messages", icon: <RiMailSendLine size={28} /> },
    { name: "Profile", href: `/${user.name}`, icon: <img src={user?.profilePic} className="w-6 h-6 rounded-full border" alt="ProfilePic" /> },
  ];

 
  
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
      <div className="hidden sm:block">
        <div
          className={`${bgColor} ${color} flex justify-center sticky h-screen pt-3 border-r overflow-hidden`}
        >
          <ul className="space-y-4">
            <li>
              <div
                className={`${color} flex cursor-pointer items-center p-2 rounded-lg group`}
                onContextMenu={() => {
                  console.log("right clicked");
                }}
              >
                <div className="lg:hidden text-blue-600">
                  <BsGrid1X2 size={30} />
                </div>
                <span className="ml-3 hidden font-bold lg:block">TWIDDLE</span>
              </div>
            </li>
            <hr />

            {MenuLists?.map((item, index) => (
              <li key={index}>
                <Link to={item.href}
                  className={`${color} ${hover} cursor-pointer flex items-center p-2 rounded-lg group`}
                >
                  <div>{item.icon}</div>
                  <span className="ml-3 hidden lg:block">{item.name}</span>
                </Link>
              </li>
            ))}

            <li className="absolute pb-4 bottom-0">
              <div
                onClick={() => setSubItems(!subItems)}
                className={`${color} ${hover} cursor-pointer flex items-center p-2 rounded-lg group`}
              >
                <div>
                  <BiMenu size={30} />{" "}
                </div>
                <span className="ml-3 hidden lg:block"> More</span>
              </div>
            </li>

            {/* { subItems && (
              <div>
                <li>
                  <div
                    className={`${color} ${hover} cursor-pointer flex items-center p-2 rounded-lg group`}
                  >
                    <div>
                      <AiOutlineSetting size={30} />
                    </div>
                    <span className="ml-3 hidden lg:block">Settings</span>
                  </div>
                </li>

                <li>
                  <div
                    className={`${color} ${hover} cursor-pointer flex items-center p-2 rounded-lg group`}
                    onClick={() => dispatch(setTheme())}
                  >
                    <div>
                      {darkMode ? (
                        <MdOutlineDarkMode size={30} />
                      ) : (
                        <MdDarkMode size={30} />
                      )}
                    </div>
                    <span className="ml-3 hidden lg:block">Theme</span>
                  </div>
                </li>

                <li>
                  <LogoutModal />
                </li>
              </div>
            )} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
