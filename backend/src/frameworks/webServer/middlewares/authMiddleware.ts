import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/authService";
import { CustomRequest } from "../../../types/interface/customeRequest";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { userDataInterface } from "../../../types/interface/userInterface";
import User from "../../database/models/userModel";


export const userAuthMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {

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
    if (!user) {
      throw new AppError("UnAuthorized user found", HttpStatus.OK);
    }
    if (user.isBlocked) {
      res.json({ status: "blocked", message: "Account action Blocked " })
    }
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.json({ status: "blocked", message: "Internal server error" })
  }
};




export const adminAuthMiddleware = ( req: CustomRequest, res: Response, next: NextFunction) => {

  try {
    let token: string | null = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AppError("UnAuthorized admin found", HttpStatus.OK);
    }
    const { payload }: any = authService().verifyToken(token);
    if (payload.isAdmin == true) {
      next();
    } else {
      throw new AppError("UnAuthorized user found", HttpStatus.OK);
    }
  } catch (error) {
    res.json({ status: "blocked", message: "Account action Blocked " })
  }
};
