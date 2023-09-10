import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { userInterface } from "../../../../state/interface/userInterface"
import { userRequest } from "../../../../api/requests/userRequest"
import { setUserFollow, setUserUnfollow } from "../../../../state/slices/userSlice"

type propsType = {
    userData: userInterface,
    currentUser: userInterface
}

const SuggestionCard: React.FC<propsType> = ({ userData, currentUser }) => {

    const [isFollowing, setFollowing] = useState<boolean>(currentUser?.following.includes(userData._id))
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
        <>
            <div className="p-2 mt-1 flex items-center justify-between bg-gray-50 border rounded-md cursor-pointer hover:bg-gray-100" >

                <Link to={`/${userData.name}`} className="flex items-center">
                    <img className="rounded-full h-7 w-7 sm:h-9 sm:w-9" src={userData.profilePic} />
                    <div className="ml-2 flex flex-col">
                        <div className="leading-snug text-sm text-gray-800 font-bold">{userData.name}</div>
                    </div>
                </Link>

                <>{isFollowing ?
                    <button onClick={() => HandleUnfollow(userData._id)} className="h-8 px-3 text-sm font-bold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-700">Following</button> :
                    <button onClick={() => HandleFollow(userData._id)} className="h-8 px-3 text-sm font-bold text-white bg-blue-600 border border-white rounded-md hover:bg-blue-500">Follow</button>}
                </>

            </div>
        </>
    )
}

export default SuggestionCard