import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/authService";
import { CustomRequest } from "../../../types/interface/customeRequest";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { userDataInterface } from "../../../types/interface/userInterface";
import User from "../../database/models/userModel";

export const userAuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | null = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AppError("UnAuthorized user found", HttpStatus.OK);
    }
    const { payload }: any = authService().verifyToken(token);
    
    const user: userDataInterface | null = await User.findById({ _id: payload.userId });
    console.log(user);

    if (!user) {
      throw new AppError("UnAuthorized user found", HttpStatus.OK);
    }
    if (user.isBlocked) {
      console.log("blocked user found");
      throw new AppError("Account action blocked ", HttpStatus.OK);
    }



    console.log("payload", payload);
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.log("error - - - - - ", error)
    // throw new AppError("Something went wrong ! ", HttpStatus.OK);
  }
};

export const adminAuthMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("token", token);

  if (!token) {
    throw new AppError("UnAuthorized admin found", HttpStatus.OK);
  }
  const { payload }: any = authService().verifyToken(token);
  console.log("payload", payload);
  if (payload.isAdmin == true) {
    next();
  } else {
    throw new AppError("UnAuthorized user found", HttpStatus.OK);
  }
};
