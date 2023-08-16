
import {  AiOutlineHeart, AiOutlineHome, AiOutlinePlusSquare, AiOutlineSearch  } from 'react-icons/ai';
import { BsGrid1X2 } from 'react-icons/bs';
import { RiMailSendLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/interface/userInterface';
import { Link, useLocation } from 'react-router-dom';





const Navbar = () => {
  const { user, darkMode } =useSelector((store: RootState) => store.user )
  const location = useLocation()
  const Navlinks = [
    { name: "Home", href: "/", icon: <AiOutlineHome size={30} /> },
    { name: "Message", href: "/messages", icon: <RiMailSendLine size={30} /> },
    { name: "Create", href: "/create", icon: <AiOutlinePlusSquare size={30} /> },
    { name: "Notification", href: "/notifications", icon: <AiOutlineHeart size={30} /> },
    { name: "Profile", href: `/${user?.name}`, icon: <img src={user?.profilePic} className="w-6 h-6 border rounded-full" alt="ProfilePic" />},
  ];

  let color: string, bgColor: string, hover: string;
  if (darkMode) {
    (color = "text-white"),
      (bgColor = "bg-gray-950"),
      (hover = "bg-gray-800");
  } else {
    (color = "text-gray-950"),
      (bgColor = "bg-white"),
      (hover = "bg-gray-100");
  }

  return (
    <>
    <nav className={`${bgColor} ${color} fixed top-0 w-full border-b py-4 sm:hidden`}>
        <div className="container flex px-8 justify-between">
           <div className="font-bold flex gap-2" > <div className='text-blue-600'><BsGrid1X2 size={28} /></div> TWIDDLE</div> 
            
           <div><Link to="/search"><AiOutlineSearch size={30} /> </Link></div> 
        </div>
      </nav>

      <nav className={`${bgColor} ${color} fixed bottom-0 w-full border-t sm:hidden`}>
        <div className="container mx-auto">
          <ul className="flex justify-between px-3 py-2">
            {Navlinks.map((item) => (
              <Link to={item.href} >
              <li key={item.name} className={`${location.pathname == item.href && hover } hover:${hover} px-3 py-2 rounded-md`}>
                {item.icon}
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
