import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepository";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";
import asyncHandler from "express-async-handler"
import { userSearch } from "../../application/useCases/user/user";

const userController = ( userDbRepository: userDbInterface, userRepositoryDb: userRepositoryDbType ) => {
    const dbRepositoryUser = userDbRepository(userRepositoryDb())
    const searchUser = asyncHandler(async (req: Request, res: Response ) => {
        console.log("function 1", req.body)
        const name: string = req.body.name;
        const users = await userSearch( name, dbRepositoryUser)
        res.status(200).json({ status: "success", users })
    })

    return { searchUser }
}

export default userController;