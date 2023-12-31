import express from "express";
import authController from "../../../adapters/controllers/authController";
import { userRepositoryDb } from "../../../frameworks/database/repositories/userRepository";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../application/services/authServiceInterface";

const authRouter = () => {
  const router = express.Router();
  const controller = authController( authServiceInterface, authService, userDbRepository, userRepositoryDb, );

  router.post("/register", controller.registerUser );

  router.post("/login", controller.loginUser);

  router.post("/googleLogin", controller.googleLogin);

  router.post("/admin/login", controller.adminlogin);



  return router;
  
};
export default authRouter;
