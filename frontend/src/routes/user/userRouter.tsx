import { Suspense, lazy } from "react";
// import HomeLazy from "../../components/lazy/HomeLazy";
import { PageLoading } from "../../components/shimmer/Loading";
import UserLayout from "../../pages/layout/UserLayout";
import CreatePage from "../../pages/user/CreatePage";
// import HomePage from "../../pages/user/HomePage";
import LoginPage from "../../pages/user/LoginPage";
import ProfilePage from "../../pages/user/ProfilePage";
import SearchPage from "../../pages/user/SearchPage";
import SignupPage from "../../pages/user/SignupPage";
import SecretToken from "../../pages/user/SecretToken";

const HomePage = lazy(() => import('../../pages/user/HomePage'));

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
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={ <PageLoading /> }>
          <HomePage />
        </Suspense>
      ),
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
      element: <PageLoading />,
    },
    
  ],
};
