import AdminLogin from "../../pages/admin/AdminLogin";
import Dashboard from "../../pages/admin/Dashboard";
import PostList from "../../pages/admin/PostList";
import UserList from "../../pages/admin/UserList";
import AdminLayout from "../../pages/layout/AdminLayout";

export const adminLogin = {
  path: "/admin/login",
  element: <AdminLogin />,
};

export const dashboard = {
  path: "/admin/",
  element: <AdminLayout />,
  children: [
    {
      path: "/admin/",
      element: <Dashboard />
    },
    {
      path: "/admin/users",
      element: <UserList />,
    },
    {
      path: "/admin/posts",
      element: <PostList />,
    }
  ]
}