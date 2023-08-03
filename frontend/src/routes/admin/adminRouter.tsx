import PostTable from "../../components/admin/tables/PostTable";
import UserTable from "../../components/admin/tables/UserTable";
import AdminLogin from "../../pages/admin/AdminLogin";
import AdminLayout from "../../pages/admin/AdminLayout";
// import Dashboard from "../../pages/admin/Layout";

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
      element: <div>Dashboard</div> ,
    },
    {
      path: "/admin/users",
      element: <UserTable />,
    },
    {
      path: "/admin/posts",
      element: <PostTable />,
    }
  ]
}