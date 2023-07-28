import UserLayout from "../../pages/layout/UserLayout";
import CreatePage from "../../pages/user/CreatePage";
import HomePage from "../../pages/user/HomePage";
import LoginPage from "../../pages/user/LoginPage";
import ProfilePage from "../../pages/user/ProfilePage";
import SearchPage from "../../pages/user/SearchPage";
import SignupPage from "../../pages/user/SignupPage";

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
  children: [
    {
      path: "/",
      element: <HomePage />,
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
    
  ],
};
