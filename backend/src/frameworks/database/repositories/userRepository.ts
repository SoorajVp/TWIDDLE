import { registerInterface, userDataInterface } from "../../../types/interface/userInterface";
import User from "../models/userModel";

export const userRepositoryDb = () => {
    const addUser = async ( user: registerInterface ) => {
        const newUser = new User(user)
        return await newUser.save()
    }

    const getUserByEmail = async (email: string) => {
        const user: registerInterface | null = await User.findOne({ email });
        return user;
    };

    const getUserByName = async (name: string ) => {
        const user: userDataInterface | null = await User.findOne({ name })
        return user;
    }

    const userSearch =async (name?:string) => {
        console.log("function 4", name)
        const user: userDataInterface[] | null = await User.find({ name: { $regex: `^${name}`, $options: "i"}})
        console.log("this is user - - - - -", user)
        return user;
    }

    return { addUser, getUserByEmail, getUserByName, userSearch }
}

export type userRepositoryDbType = typeof userRepositoryDb;