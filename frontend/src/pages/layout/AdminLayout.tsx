import { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminLogout from "../../components/modal/AdminLogout";
import { MdVerified } from "react-icons/md";

const navItems = [
  { text: "Handle users", href: "/admin/users", icon: <FaUsers size={28} /> },
  { text: "Handle posts", href: "/admin/posts", icon: <BsFillCollectionFill size={28} /> },
  { text: "Account varify", href: "/admin/", icon: <MdVerified size={29} /> }


]

const AdminLayout = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setShowDrawer((prevShowDrawer) => !prevShowDrawer);
  };


  return (
    <>
      <div className="p-4 px-7 bg-slate-700 shadow-lg flex justify-between">
        <Link to="/admin" className="mr-3 font-bold text-2xl text-white">ADMIN</Link>
        <div
          className="ml-3 text-white cursor-pointer"
          onClick={handleDrawerToggle}
        >
          {showDrawer ? <GrClose size={35} /> : <TfiMenu size={35} />}
        </div>
      </div>

      
      <Outlet />


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
        <div className="mt-9 overflow-y-auto">
          <ul className="space-y-4 font-semibold text-sm">
            {navItems.map( item => (
              <li className={`${location.pathname == item.href && "bg-gray-100" } hover:bg-gray-100 rounded-lg`}>
                <Link to={item.href}
                className="flex items-center p-2 text-gray-700 group"
              >
                  {item.icon}
                  <span className="ml-3">{item.text}</span>
              </Link>
              </li>)) }

            

            <li>
              <AdminLogout />
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
