import { Application } from "express";
import { adminAuthMiddleware, userAuthMiddleware } from "./middlewares/authMiddleware";
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import adminRouter from "./routes/admin";
import messageRouter from "./routes/message";

const routes = ( app: Application ) => {

    app.use("/api/auth", authRouter());

    app.use("/api/admin", adminAuthMiddleware, adminRouter())

    app.use("/api/post", userAuthMiddleware, postRouter());

    app.use("/api/user", userAuthMiddleware, userRouter());

    app.use("/api/chat", userAuthMiddleware, chatRouter())

    app.use("/api/message", userAuthMiddleware, messageRouter());



    
}

export default routes;