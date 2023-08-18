/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react"
import { Link } from "react-router-dom"
import { NotificationInterface } from "../../../state/interface/notificationsInterface"
import { lastTimeFormat } from "../../../utils/lastTimeFormat"
import { userRequest } from "../../../api/requests/userRequest"
import { useDispatch } from "react-redux"
import { setAction } from "../../../state/slices/userSlice"

type propsType = {
    notifications: NotificationInterface[]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationList: React.FC<propsType> = ({ notifications, setLoading }) => {

    const dispatch = useDispatch()

    const HandleClear = async() => {
        setLoading(true)
        await userRequest.clearNotifications();
        setLoading(false)
        dispatch(setAction())
    }
    return (
        <div className="sm:mx-8">
            <div className="flex justify-end">
                <div onClick={HandleClear} className="text-red-600 bg-slate-50 text-sm font-semibold px-3 py-1 my-1 cursor-pointer hover:bg-slate-100 hover:text-red-500  rounded-md shadow-sm">
                    <p>{notifications.length > 0 && "Clear all"}</p>
                </div>
            </div>
            { notifications.map((item) => (
                <div className="p-2 mt-1 flex items-center justify-between bg-gray-50 border rounded-md cursor-pointer hover:bg-gray-200">

                    <Link to={`/${item.user.name}`} className="flex items-center">
                        <img className="rounded-full h-7 w-7 sm:h-9 sm:w-9" src={item.user.profilePic} />
                        <div className="ml-2 flex flex-col">
                            <div className="leading-snug text-sm text-gray-800 font-bold">{item.user.name}</div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 pl-1">{ item.follow && "started following you ."} </p>
                        <p className="text-xs sm:text-sm text-gray-700 pl-1">{item.liked && "liked your post ."} </p>
                        <p className="text-xs sm:text-sm text-gray-700 pl-1">{item.comment && `commented : ${item.comment.text}` } </p>
                        <p className="text-xs text-gray-500 pl-1">{lastTimeFormat(item.createdAt)} </p>
                    </Link>

                    {item.follow && 
                    <button className="h-8 px-3 text-sm font-bold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100">Follow</button> }
                    { item.liked && <img className="h-10 w-10" src={item.liked.image} /> }
                    {item.comment && <img className="h-10 w-10" src={item.comment.postId.image} />}

                </div>
            )) }

        </div>
    )
}

export default NotificationList