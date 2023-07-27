import { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/admin/tables/UserTable";



const Dashboard = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("adminToken")) {
        navigate('/admin/login')
    }
  })

  const handleDrawerToggle = () => {
    setShowDrawer((prevShowDrawer) => !prevShowDrawer);
  };

  return (
    <div>
      {/* drawer init and show */}
      <div className="p-4 px-7 bg-slate-700 shadow-lg flex justify-between">
        <div className="mr-3 font-bold text-2xl text-white">
          ADMIN
        </div>
        <div className="ml-3 text-white cursor-pointer" onClick={handleDrawerToggle}>
          { showDrawer ?  <GrClose size={35} /> : <TfiMenu size={35}/>  }
        </div>
      </div>

    <div className="flex justify-center pt-10">

    <UserTable />
    </div>


      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen border p-4 overflow-y-auto transition-transform ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        } bg-white`}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
          onClick={handleDrawerToggle}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            {/* Add other menu items as required */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
