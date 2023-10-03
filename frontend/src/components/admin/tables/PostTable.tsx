import { useEffect, useState } from "react";
import { adminRequest } from "../../../api/requests/adminRequests";
import { ReportPosts } from "../../../state/interface/postInterface";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import { BlockPost } from "../../modal/BlockPost";
import { DeletePost } from "../../modal/DeletePostAdmin";
import Loading from "../../shimmer/Loading";

const PostTable = () => {
  const [items, setItems] = useState<ReportPosts[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { actions } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    fetchUserList();
  }, [actions]);

  const fetchUserList = async (): Promise<any> => {
    setLoading(true)
    const response: { status: string; reports: ReportPosts[] } =
      await adminRequest.getReports();
      setItems(response?.reports.reverse());
      setLoading(false)
  };

  return (
    <div className="flex justify-center mt-8">
      {isLoading && <Loading />}
      <div className="flex overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="table-auto w-full divide-y divide-gray-200 sm:w-full sm:max-w-xl">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Post
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reporteduser
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    reason
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hanlde
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-center divide-y divide-gray-100">
                {items?.map((item) => (
                  <tr
                    key={item._id}
                    className={`${item?.postId?.isBlocked && "bg-gray-100"}  `}
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="w-16 bg-gray-100"
                            src={item?.postId?.image}
                            alt=""
                          />
                        </div>
                        
                      </div>
                    </td>
                  
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {item?.userId?.name}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {item?.reason}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {lastTimeFormat(item?.createdAt)}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-center text-xs font-semibold">
                      {item?.postId?.isBlocked ? (
                        <DeletePost
                          postId={item?.postId?._id}
                          imgKey={item?.postId?.image.split("/").pop()}
                        />
                      ) : (
                        <BlockPost postId={item?.postId?._id} />
                      )}
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

export default PostTable;
