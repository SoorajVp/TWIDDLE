import { useEffect, useState } from "react";
import { adminRequest } from "../../../api/requests/adminRequests";
import { BlockUser } from "../../modal/BlockUser";
import { useSelector } from "react-redux";
import Loading from "../../shimmer/Loading";
import { BsSearch } from "react-icons/bs";
import {
  RootState,
  userInterface,
} from "../../../state/interface/userInterface";


const UserTable = () => {
  const { actions } = useSelector((store: RootState) => store.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<userInterface[]>([]);
  // const [searchText, setSearchText ] = useState<string>(null)
  const [searchItems, setSearchItems] = useState<userInterface[]>(users)

  useEffect(() => {
    fetchUserList();
  }, [actions]);

  const fetchUserList = async (): Promise<any> => {
    setLoading(true)
    const resposnse: { status: string; users: userInterface[] } = await adminRequest.getAllUsers();
    setUsers(resposnse.users.reverse());
    setSearchItems(resposnse.users)
    setLoading(false)
  };

  const handleSearchUsers = (value: string) => {
    if (value) {
      setSearchItems(users.filter((user) => 
        user.name.toLowerCase().includes(value.toLowerCase())
      ))
    } else {
      setSearchItems(users)
    }
  }

  return (
    <>
      <div className='flex justify-center my-4'>
        <div className="pt-2 relative mx-auto text-gray-600">
          <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search" name="search" placeholder="Search" onChange={(e) => handleSearchUsers(e.target.value)} />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <BsSearch />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {isLoading && <Loading />}
        <div className="flex overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              <table className="table-auto w-full divide-y divide-gray-200 sm:w-full sm:max-w-xl">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Followers
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Following
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Handle
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchItems?.map((person) => (
                    <tr key={person?._id} className=" text-center">
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-9 w-9">
                            <img
                              className="h-9 w-9 rounded-full bg-slate-300"
                              src={person?.profilePic}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {person?.email}
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {person?.followers.length}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {person?.following.length}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-center text-xs font-medium">
                        <BlockUser
                          userId={person?._id}
                          isBlocked={person?.isBlocked}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default UserTable;
