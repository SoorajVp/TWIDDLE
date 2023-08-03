import { Application } from "express";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import { adminAuthMiddleware, userAuthMiddleware } from "./middlewares/authMiddleware";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";

const routes = ( app: Application ) => {

    app.use("/api/auth", authRouter());

    app.use("/api/admin", adminAuthMiddleware, adminRouter())

    app.use("/api/post", userAuthMiddleware, postRouter());

    app.use("/api/user", userAuthMiddleware, userRouter())


    
}

export default routes;