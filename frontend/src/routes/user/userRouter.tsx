import UserLayout from "../../pages/layout/UserLayout";
import CreatePage from "../../pages/user/CreatePage";
import HomePage from "../../pages/user/HomePage";
import LoginPage from "../../pages/user/LoginPage";
import ProfilePage from "../../pages/user/ProfilePage";
import SearchPage from "../../pages/user/SearchPage";
import SignupPage from "../../pages/user/SignupPage";
import SecretToken from "../../pages/user/SecretToken";
import ErrorElement from "../../pages/error/ErrorElement";
import Notification from "../../pages/user/Notification";
import VideoCall from "../../components/user/videoCall/VideoCall";
import ChatPage from "../../pages/user/ChatPage";
import PaymentPage from "../../pages/user/PaymentPage";
import VerifySuccess from "../../components/user/verifyTic/VerifySuccess";

// const HomePage = lazy(() => import('../../pages/user/HomePage'));

export const secretPage = {
   path: "/api/auth/:id/token", 
   element: <SecretToken /> 
}

export const userLogin = {
  path: "/login",
  element: <LoginPage />,
};

export const userRegister = {
  path: "/register",
  element: <SignupPage />,
};



export const userRouter = {
  path: "/",
  element: <UserLayout />,
  errorElement: <ErrorElement />,
  children: [
    {
      path: "/",
      element: <HomePage />
    }, 
    {
      path: "/:userName",
      element: <ProfilePage />,
    },
    {
      path: "/create",
      element: <CreatePage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/messages",
      element: <ChatPage />,
    },
    {
      path: "/notifications",
      element: <Notification />,
    },
    {
      path: "/room/:roomId",
      element: <VideoCall />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/subscription/success",
      element: <VerifySuccess />
    }
    
  ],

};
 