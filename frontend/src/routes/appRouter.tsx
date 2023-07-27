import { createBrowserRouter } from "react-router-dom";
import { userLogin, userRegister, userRouter } from "./user/userRouter";
import SecretToken from "../pages/user/SecretToken";
import { adminLogin, dashboard } from "./admin/adminRouter";
// import HomePage from "../pages/user/HomePage";


const routes = [
    adminLogin,
    userLogin,
    userRegister,
    userRouter,
    dashboard,
    { path: '/api/auth/:id/token', element: <SecretToken /> },
]

const appRouter = createBrowserRouter(routes);

export default appRouter;