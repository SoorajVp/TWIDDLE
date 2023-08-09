/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { apiCalls } from "../../../api/admin/apiCalls";
import {
  RootState,
  userInterface,
} from "../../../state/interface/userInterface";
import { BlockUser } from "../../modal/BlockUser";
import { useSelector } from "react-redux";

const UserTable = () => {

  const { actions } = useSelector((store: RootState) => store.user);

  const [users, setUsers] = useState<userInterface[]>([]);

  useEffect(() => {
    fetchUserList();
  }, [actions]);

  const fetchUserList = async (): Promise<any> => {
    const resposnse: { status: string; users: userInterface[] } =
      await apiCalls.getAllUsers();
    console.log(resposnse);
    setUsers(resposnse.users);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="table-auto w-full divide-y divide-gray-200 sm:w-full sm:max-w-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Followers
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Following
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Handle
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((person) => (
                  <tr key={person?._id}>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-9 w-9">
                          <img
                            className="h-9 w-9 rounded-full"
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
                      <BlockUser userId={person?._id} isBlocked={person?.isBlocked} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
