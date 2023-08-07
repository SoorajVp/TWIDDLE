import { createBrowserRouter } from "react-router-dom";
import { secretPage, userLogin, userRegister, userRouter } from "./user/userRouter";
import { adminLogin, dashboard } from "./admin/adminRouter";

const routes = [

  // Admin Routes
  adminLogin,
  dashboard,

  // User Routes
  userLogin,
  userRegister,
  userRouter,
  secretPage
  
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
