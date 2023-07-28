import { Application } from "express";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import authMiddleware from "./middlewares/authMiddleware";
import userRouter from "./routes/user";

const routes = ( app: Application ) => {

    app.use("/api/auth", authRouter());

    app.use("/api/post",authMiddleware, postRouter());

    app.use("/api/user", authMiddleware, userRouter())
    
}

export default routes;