import SideBar from "../../components/user/layout/Sidebar";
import Navbar from "../../components/user/layout/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { useEffect } from "react";
import RightBar from "../../components/user/layout/rightBar/Rightbar";


const UserLayout = () => {
  
  const { darkMode, user } = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });


  let color: string, bgColor: string;
  if (darkMode) {
    (color = "text-white"), (bgColor = "bg-gray-950");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white");
  }

  return (


    <>
      <div className={`${bgColor} ${color} sm:grid-cols-7 grid-cols-5 grid gap-2  overflow-hidden h-screen`} >

        <SideBar />

        {
          location.pathname !== '/messages' ?

            <div className={location.pathname !== '/messages' ? `${user?.verfied ? '2xl:px-32 sm:col-span-5' : 'sm:col-span-6 xl:col-span-4 2xl:px-10' }  col-span-7 px-2 my-12 pt-4 sm:my-0 overflow-auto` : 
              `lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-6  overflow-auto`} >
              <Outlet />
            </div> :
            <Outlet />
        }

        { user?.verfied == false && 
          location.pathname !== '/messages' && <RightBar /> 
        }

      </div>

      <Navbar />
    </>
  );
};

export default UserLayout;
