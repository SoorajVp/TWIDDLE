import { Params, useParams } from "react-router-dom";
import UserProfile from "../../components/user/profile/UserProfile";
import { useEffect, useState } from "react";
import { userRequest } from "../../api/requests/userRequest";
import { useSelector } from "react-redux";
import { RootState, userInterface } from "../../state/interface/userInterface";
import { PostInterface } from "../../state/interface/postInterface";
import { PageLoading } from "../../components/shimmer/Loading";
import ErrorElement from "../error/ErrorElement";

type responseInterface = {
  status: string;
  posts?: PostInterface[];
  saved?: PostInterface[];
  user?: userInterface;
};

const ProfilePage = () => {
  const { user, darkMode, actions } = useSelector((store: RootState) => store.user);

  const [isloading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [accountProfile, setAccountProfile] = useState<boolean>(false);
  const [userData, setUserData] = useState<userInterface>(null);
  const [userPosts, setuserPosts] = useState<PostInterface[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostInterface[]>([]);
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const [followBack, setFollowBack] = useState<boolean>(false);
  const { userName } = useParams<Params>();

  useEffect(() => {
    console.log("fetching");
    fetchUserData(userName);
  }, [userName, actions]);

  const fetchUserData = async (name: string): Promise<void> => {
    setLoading(true)
    const response: responseInterface = await userRequest.getUserByName(name);
    console.log(response);
    setLoading(false)
    if(response.status == "success") {
      if (response.user?.name == user.name) {
        setAccountProfile(true);
      }
      if (response.user?.followers.includes(user._id)) {
        setFollowing(true);
      }
      if (response.user?.following.includes(user._id)) {
        setFollowBack(true);
      }
      if (response.saved) {
        setSavedPosts(response.saved);
      }
      setUserData(response.user);
      setuserPosts(response.posts);

    } else {
      setNotFound(true)
    }
    

  };

  if(notFound) {
    return <ErrorElement />
  }
  

  return (
    <>

    
        {!userData || isloading ? (
          <PageLoading />
        ) : (
          <UserProfile
            accountProfile={accountProfile}
            userData={userData}
            stateUser={user}
            userPosts={userPosts}
            savedPosts={savedPosts}
            darkMode={darkMode}
            isFollowing={isFollowing}
            followBack={followBack}
          />
        )}
    </>
  );
};

export default ProfilePage;
