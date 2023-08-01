import { NextFunction, Request, Response } from "express";
import { authService } from "../../services/authService";
import { CustomRequest } from "../../../types/interface/customeRequest";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

const authMiddleware = ( req: CustomRequest, res: Response, next: NextFunction ) => {
    let token: string | null = "";
    if( req.headers.authorization ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        throw new AppError("UnAuthorized user found", HttpStatus.OK)
    }
    const { payload }: any = authService().verifyToken(token)
    req.userId = payload;
    next()
}

export default authMiddleware;