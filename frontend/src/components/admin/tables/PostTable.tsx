/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { apiCalls } from "../../../api/admin/apiCalls";
import { ReportPosts } from "../../../state/interface/postInterface";
import { lastTimeFormat } from "../../../utils/lastTimeFormat";
import { useDispatch, useSelector } from "react-redux";
import { setAction } from "../../../state/slices/userSlice";
import { RootState } from "../../../state/interface/userInterface";


  const PostTable = () => {
    const [items, setItems] = useState<ReportPosts[]>([])
    const { actions } = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch()
    useEffect(() => {
      console.log("render")
      fetchUserList()
    }, [actions])

    const fetchUserList =async (): Promise<any> => {
        console.log("fetchinggg.....")
      const response : { status: string, reports: ReportPosts[]}  = await apiCalls.getReports();
      console.log(response);
      setItems(response?.reports)
    }

    const HandlePostBlock = async(postId: string): Promise<void> => {
      console.log("renderinggggggggggggggggggggggggggggggggggg")
      console.log("Clicked -----", postId)
      const response: {status: string} = await apiCalls.blockPost(postId);
      console.log("blocked -----", response)
      if(response.status == 'success') {
        dispatch(setAction())
      }
    }

    return (
      <div className="flex justify-center mt-8">
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
                      Description
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
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hanlde
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center divide-y divide-gray-100">
                  {items.map((item) => (
                   <tr key={item._id} className={`${ item.postId.isBlocked && "bg-gray-200"}  `}>
                   <td className="px-3 py-2 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0">
                         <img className="w-16" src={item?.postId.image} alt="" />
                       </div>
                       {/* <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{item?.postId.description}</div>
                       </div> */}
                     </div>
                   </td>
                   <td className="px-6 py-2 whitespace-nowrap">
                   <div className="text-sm text-gray-500">{item?.postId.description}</div>

                   </td>
                   
                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                     {item?.userId.name}
                   </td>
                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                     {item?.reason}
                   </td>

                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                     {lastTimeFormat(item?.createdAt)}
                   </td>
                   <td className="px-6 py-1 whitespace-nowrap text-center text-xs font-semibold">
                     { item.postId.isBlocked ? 
                     <div onClick={ () =>HandlePostBlock(item.postId._id)} className="text-gray-800 bg-gray-300 py-1.5 px-3 rounded-md shadow-md hover:text-black hover:bg-gray-400 cursor-pointer" >
                       Delete
                     </div> :
                     <div onClick={ () =>HandlePostBlock(item.postId._id)} className="text-red-700 bg-red-100 py-1.5 px-3 rounded-md shadow-md hover:text-red-900 hover:bg-red-200 cursor-pointer" >
                       Block
                     </div> }
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
  