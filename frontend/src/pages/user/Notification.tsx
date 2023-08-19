/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react"
import RightBar from "../../components/user/layout/Rightbar"
import NotificationList from "../../components/user/notification/NotificationList"
import { NotificationInterface } from "../../state/interface/notificationsInterface"
import { userRequest } from "../../api/requests/userRequest"
import { PageLoading } from "../../components/shimmer/Loading"
import NotificationEmpty from "../../components/user/notification/NotificationEmpty"
import { useSelector } from "react-redux"
import { RootState } from "../../state/interface/userInterface"

type ApiResponse = {
    status: string,
    notifications: NotificationInterface[]
}


const Notification = () => {
    const { actions } = useSelector((store: RootState) => store.user);

    const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
    const [isLoading, setLoading ] = useState<boolean>(false)

    useEffect(() => {
        fetchNotifications()
    }, [actions])

    const fetchNotifications = async () => {
        setLoading(true)
        const response = await userRequest.notifications() as ApiResponse;
        console.log("this is reposne - ", response.notifications)
        setNotifications(response.notifications);
        setLoading(false)
    }

    return (
        <>
            <div className="lg:px-10 px-2 col-span-7 my-12 pt-4 sm:my-0 sm:col-span-4 overflow-auto ">
                { isLoading ? <PageLoading /> :
                <>
                    {notifications.length == 0 && <NotificationEmpty />}
                    <NotificationList notifications={notifications} setLoading={setLoading} />
                </>}
            </div>
            <RightBar />
        </>
    )
}

export default Notification