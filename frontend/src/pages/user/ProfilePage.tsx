/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import UserProfile from '../../components/user/profile/UserProfile'
import { useEffect, useState } from 'react';
import { apiCalls } from '../../api/user/apiCalls';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/interface/userInterface';

const ProfilePage = () => {
  const { user, darkMode } =useSelector((store: RootState) => store.user );

    const [ accountProfile, setAccountProfile ] = useState<boolean>(false)
    const [ userData, setUserData ] = useState<object>(null)
    const [ userPosts, setuserPosts ] = useState<[]>([])
    const { userName } = useParams<Params>();

    useEffect(() => {
      fetchUserData(userName)
    }, [])

    const fetchUserData = async(name: string): Promise<void> => {
      const response = await apiCalls.getUserByName(name);
      if( response.user.name == user.name ) {
        setAccountProfile(true)
      }
      setUserData(response.user);
      setuserPosts(response.posts);
    }

    
   return (
    <div>
      { userData &&

        <UserProfile accountProfile={accountProfile} userData={userData} userPosts={userPosts} darkMode={darkMode} />
      }
    </div>
  )
}

export default ProfilePage;