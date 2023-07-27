// import { useState } from 'react';
import UserProfile from '../../components/user/profile/UserProfile'

const ProfilePage = () => {
    const accountProfile = true;
  return (
    <div>
        <UserProfile accountProfile={accountProfile} />
    </div>
  )
}

export default ProfilePage;