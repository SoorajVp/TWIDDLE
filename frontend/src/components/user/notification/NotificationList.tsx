/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react"
import { NotificationInterface } from "../../../state/interface/notificationsInterface"
import { userRequest } from "../../../api/requests/userRequest"
import { useDispatch, useSelector } from "react-redux"
import { setAction } from "../../../state/slices/userSlice"
import { RootState } from "../../../state/interface/userInterface"
import NotificationCard from "./NotificationCard"

type propsType = {
    notifications: NotificationInterface[]
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationList: React.FC<propsType> = ({ notifications, setLoading }) => {
    const { user } = useSelector((store: RootState) => store.user);
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
                <NotificationCard item={item} user={user} />
            )) }

        </div>
    )
}

export default NotificationList