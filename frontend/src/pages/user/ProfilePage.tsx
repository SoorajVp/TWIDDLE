/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Params, useParams } from 'react-router-dom';
import UserProfile from '../../components/user/profile/UserProfile'
import { useEffect, useState } from 'react';
import { apiCalls } from '../../api/user/apiCalls';
import { useSelector } from 'react-redux';
import { RootState, userInterface } from '../../state/interface/userInterface';
import { PostInterface } from '../../state/interface/postInterface';
import { PageLoading } from '../../components/shimmer/Loading';

type responseInterface = {
  status: string,
  posts: PostInterface[];
  saved?: PostInterface[];
  user: userInterface
}

const ProfilePage = () => {
  const { user, darkMode } =useSelector((store: RootState) => store.user );

    const [ accountProfile, setAccountProfile ] = useState<boolean>(false)
    const [ userData, setUserData ] = useState<userInterface>(null)
    const [ userPosts, setuserPosts ] = useState<PostInterface[]>([])
    const [ savedPosts, setSavedPosts ] = useState<PostInterface[]>([])
    const [ isFollowing, setFollowing ] =useState<boolean>(false)
    const [ followBack, setFollowBack ] =useState<boolean>(false)
    const { userName } = useParams<Params>();

    useEffect(() => {
      fetchUserData(userName)
    }, [userName])

    const fetchUserData = async(name: string): Promise<void> => {
      const response: responseInterface = await apiCalls.getUserByName(name);
      console.log("This is response  - - - - -",response)
      if( response.user.name == user.name ) {
        setAccountProfile(true)
      }
      if(response.user.followers.includes(user._id)) {
        setFollowing(true);
      }
      if(response.user.following.includes(user._id)) {
        setFollowBack(true)
      }
      if(response.saved) {
        setSavedPosts(response.saved)
      }

      setUserData(response.user);
      setuserPosts(response.posts);
    }

    if(!userData) {
      return <PageLoading />
    }

    
   return (
    <div>
      
      { userData &&
        <UserProfile accountProfile={accountProfile} userData={userData} userPosts={userPosts} savedPosts={savedPosts} darkMode={darkMode} isFollowing={isFollowing} followBack={followBack} />
      }
    </div>
  )
}

export default ProfilePage;