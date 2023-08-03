import { NextFunction, Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import { adminLogin, loginWithGoogle, userLogin, userRegister } from "../../application/useCases/auth/userAuth";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../frameworks/services/authService";
import asyncHandler from "express-async-handler";
// import { adminDbInterface } from "../../application/repositories/adminDbRepository";
// import { adminRepositoryInterface } from "../../frameworks/database/repositories/adminRepository";
// import { getReports } from "../../application/useCases/post/post";

const authController = (
  authServiceInterface: authServiceInterfaceType,
  authServiceImpl: authServiceType,
  userDbRepository: userDbInterface,
  userRepositoryDb: userRepositoryDbType,
  // adminDbRepository: adminDbInterface,
  // adminRepositoryImpl: adminRepositoryInterface
) => {
    
  const dbRespositoryUser = userDbRepository(userRepositoryDb());
  // const dbRespositoryAdmin = adminDbRepository(adminRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const registerUser = asyncHandler(
    async ( req: Request, res: Response, next: NextFunction ) => {
      const { name, email, password } = req.body;
      const user = { name, email, password };
      const result = await userRegister( user, dbRespositoryUser, authService );
      res.status(201).json({ status: "success", message: "Email send ! ", user: result.userData, token:result.token });
    }
  );

  const loginUser = asyncHandler(async ( req:Request, res: Response ) => {
    const { name, password } = req.body;
    const user = { name, password }
    const result = await userLogin( user, dbRespositoryUser, authService );
    res.status(200).json({ status: "success", message: "Loggedin successfully", user: result.userData, token:result.token })
  })

  const googleLogin = asyncHandler(async (req: Request, res: Response ) => {
    const result = await loginWithGoogle(req.body, dbRespositoryUser, authService  )
    res.status(200).json({ status: "success", message: "User loggedin successfully", user: result.userData, token:result.token })

  })

  const adminlogin = asyncHandler(async( req: Request, res: Response ) => {
    const { name, password } = req.body;
    const result = await adminLogin( name, password, dbRespositoryUser, authService );
    res.status(200).json({ status: "success", message: "Admin loggedin successfully", token:result?.token, admin: result?.admin })
  })

  

  return { registerUser, loginUser, googleLogin, adminlogin };

};

export default authController;
