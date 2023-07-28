/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { apiCalls } from "../../../api/user/apiCalls";
import { userInterface } from "../../../state/interface/userInterface";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState<string>(null);
  const [users, setUser] = useState<[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(value);
    if (value) {
      fetchUsers();
    } else {
      setUser([]);
    }
  }, [value]);

  const fetchUsers = async (): Promise<void> => {
    const response = await apiCalls.searchUser({ name: value });
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
            value={value}
            autoComplete="off"
            // onBlur={()=> setUser(null)}
            onChange={(e) => setValue(e.target.value)}
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search user name..."
          />
        </div>
      </div>

      <div className="flex justify-center">
        <ul className="w-full md:w-[51%] absolute rounded-b-md shadow-sm bg-white">

          {users?.map((user: userInterface ) => {
            return (
              <li className="py-2 pl-4 hover:bg-slate-200 cursor-pointer" key={user._id} onClick={()=> navigate(`/${user.name}`)}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full border"
                      src={user?.profilePic}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
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
