import SideBar from "../../components/user/layout/Sidebar";
// import RightBar from "../../components/user/layout/Rightbar";
import Navbar from "../../components/user/layout/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/interface/userInterface";
import { useEffect } from "react";

// interface ApiResponse {
//   status: string;
//   message: string;
// }

const UserLayout = () => {
  const { darkMode } = useSelector((store: RootState) => store.user);
  // const [userLoggedin, setUserLoggedin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
      if (!token ) {
        navigate("/login");
      } 
    // Middleware()
  }, []);

  // const Middleware = async (): Promise<void> => {
  //   const response = (await apiCalls.isBlockedUser()) as ApiResponse;
  //   console.log("blocked user ---------------", response )

  //   if(response.status == "success") {
  //     const token = localStorage.getItem("token");
  //     if (!token ) {
  //       navigate("/login");
  //     } else {
  //       setUserLoggedin(true);
  //     }
  //   } else {
  //     console.log("blocked user ---------------")
  //     localStorage.removeItem("token");
  //     toast.error( response.message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       hideProgressBar: true,
  //     });
  //     navigate("/login");
  //   }
  // };

  

  let color: string, bgColor: string;
  if (darkMode) {
    (color = "text-white"), (bgColor = "bg-gray-950");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white");
  }
  return (
    <>
      {  (
        <div>
          <div
            className={`${bgColor} ${color} lg:grid-cols-7 grid-cols-5 grid gap-2  overflow-hidden h-screen`}
          >
            <SideBar />

            {/* <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto "> */}
              
              <Outlet />

            {/* </div> */}

            {/* <ChatList /> */}

          </div>
          <Navbar />
        </div>
      )}
    </>
  );
};

export default UserLayout;
