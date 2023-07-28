
import {  AiOutlineHeart, AiOutlineHome, AiOutlinePlusSquare, AiOutlineSearch  } from 'react-icons/ai';
import { BsGrid1X2 } from 'react-icons/bs';
import { RiMailSendLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/interface/userInterface';
import { Link } from 'react-router-dom';





const Navbar = () => {
  const { user, darkMode } =useSelector((store: RootState) => store.user )
  const Navlinks = [
    { name: "Home", href: "/", icon: <AiOutlineHome size={30} /> },
    { name: "Message", href: "/", icon: <RiMailSendLine size={30} /> },
    { name: "Create", href: "/create", icon: <AiOutlinePlusSquare size={30} /> },
    { name: "Notification", href: "/", icon: <AiOutlineHeart size={30} /> },
    { name: "Profile", href: `/${user.name}`, icon: <img src={user?.profilePic} className="w-6 h-6 border rounded-full" alt="ProfilePic" />},
  ];

  let color: string, bgColor: string, hover: string;
  if (darkMode) {
    (color = "text-white"),
      (bgColor = "bg-gray-950"),
      (hover = "hover:bg-gray-800 rounded-md");
  } else {
    (color = "text-gray-950"),
      (bgColor = "bg-white"),
      (hover = "hover:bg-gray-100");
  }

  return (
    <>
    <nav className={`${bgColor} ${color} fixed top-0 w-full border-b py-4 sm:hidden`}>
        <div className="container flex px-8 justify-between">
           <div className="font-bold flex gap-2 text-blue-600" > <BsGrid1X2 size={30} /> TWIDDLE</div> 
            
           <div><Link to="/search"><AiOutlineSearch size={30} /> </Link></div> 
        </div>
      </nav>

      <nav className={`${bgColor} ${color} fixed bottom-0 w-full border-t  py-4 sm:hidden`}>
        <div className="container mx-auto">
          <ul className="flex justify-between px-8">
            {Navlinks.map((item) => (
              <li key={item.name} className={hover}>
                <Link to={item.href} >{item.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
