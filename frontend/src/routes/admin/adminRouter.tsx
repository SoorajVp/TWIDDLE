import AdminLogin from "../../pages/admin/AdminLogin";
import Dashboard from "../../pages/admin/Layout";

export const adminLogin = {
  path: "/admin/login",
  element: <AdminLogin />,
};

export const dashboard = {
  path: "/admin/",
  element: <Dashboard />,
}