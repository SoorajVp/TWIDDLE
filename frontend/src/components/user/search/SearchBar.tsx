import { useEffect, useRef, useState } from "react";
import { userRequest } from "../../../api/requests/userRequest";
import { userInterface } from "../../../state/interface/userInterface";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const SearchBar = () => {
  const [value, setValue] = useState<string>(null);
  const [users, setUser] = useState<[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      fetchUsers();
    } else {
      setUser([]);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setValue(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value, searchRef]);

  const fetchUsers = async (): Promise<void> => {
    const response = await userRequest.searchUser({ name: value });
    if (response.status == "success") {
      setUser(response.users);
    }
  };

  return (
    <>
      <div className="">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={value !== null ? value : ""}
            autoComplete="off"
            // onBlur={()=> setUser(null)}
            onChange={(e) => setValue(e.target.value)}
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search user name..."
          />
        </div>
      </div>

      <div className="flex justify-center" ref={searchRef}>
        <ul className="w-full md:w-[51%] absolute rounded-md shadow-sm bg-white overflow-y-scroll ">
          {value &&
            users?.map((user: userInterface) => {
              return (
                <li
                  className="py-2 pl-4 hover:bg-slate-200 cursor-pointer"
                  key={user._id}
                  onClick={() => navigate(`/${user.name}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full border"
                        src={user?.profilePic}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      { user.verfied && <div className="pl-1 text-blue-600"><MdVerified /></div>}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
