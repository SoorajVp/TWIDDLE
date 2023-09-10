import { Link } from "react-router-dom"
import { NotificationInterface } from "../../../state/interface/notificationsInterface"
import { lastTimeFormat } from "../../../utils/lastTimeFormat"
import { userInterface } from "../../../state/interface/userInterface"
import { useDispatch } from "react-redux"
import { setUserFollow, setUserUnfollow } from "../../../state/slices/userSlice"
import { userRequest } from "../../../api/requests/userRequest"
import { useState } from "react"
import { MdVerified } from "react-icons/md"

type propsType ={
    item: NotificationInterface,
    user: userInterface
}

const NotificationCard: React.FC<propsType> = ({ item, user }) => {
    const [isFollowing, setFollowing] = useState<boolean>(user?.following.includes(item.user._id))
    const dispatch = useDispatch()


    const HandleFollow = async (userId: string): Promise<void> => {
        setFollowing(true)
        await userRequest.followUser(userId);
        dispatch(setUserFollow({ userId: userId }))
    };

    const HandleUnfollow = async (userId: string): Promise<void> => {
        setFollowing(false)
        await userRequest.unFollowUser(userId);
        dispatch(setUserUnfollow({ userId: userId }));
    };

  return (
    <div>
          <div className="p-2 mt-1 flex items-center justify-between bg-gray-50 border rounded-md cursor-pointer hover:bg-gray-100" key={item._id}>

              <Link to={`/${item.user.name}`} className="flex items-center">
                  <img className="rounded-full h-7 w-7 sm:h-9 sm:w-9" src={item.user.profilePic} />
                  <div className="ml-2 flex">
                      <div className="leading-snug text-sm text-gray-800 font-bold">{item.user.name}</div>
                      {item.user.verfied && <div className=" pl-1 pt-0.5 text-blue-600"><MdVerified size={18} /></div>}
                  <p className="text-xs sm:text-sm text-gray-700 pl-1">{item.follow && "started following you ."} </p>
                  <p className="text-xs sm:text-sm text-gray-700 pl-1">{item.liked && "liked your post ."} </p>
                  <p className="text-xs sm:text-sm text-gray-700 pl-1">{item.comment && `commented : ${item.comment.text} .`} </p>
                  <p className="text-xs text-gray-500 p-0.5">{lastTimeFormat(item.createdAt)} </p>
                  </div>
              </Link>

              {item.follow &&
                  <>{ isFollowing ?
                    <button onClick={() => HandleUnfollow(item.user._id)} className="h-8 px-3 text-sm font-bold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700">Following</button> :
                    <button onClick={() => HandleFollow(item.user._id)} className="h-8 px-3 text-sm font-bold text-white bg-blue-600 border border-white rounded-md hover:bg-blue-500">Follow</button>}
                  </>
              }
              {item.liked && <img className="h-10 w-10" src={item.liked?.image} />}
              {item.comment && <img className="h-10 w-10" src={item.comment?.postId?.image} />}

          </div>
    </div>
  )
}

export default NotificationCard