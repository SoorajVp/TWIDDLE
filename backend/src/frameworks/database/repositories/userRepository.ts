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

    const getUserById = async ( id: string ) => {
        const user: userDataInterface | null = await User.findById({ _id: id });
        return user
    }

    const userSearch =async (name?:string) => {
        const user: userDataInterface[] | null = await User.find({ name: { $regex: `^${name}`, $options: "i"}})
        return user;
    }

    return { addUser, getUserByEmail, getUserByName, getUserById, userSearch }
}

export type userRepositoryDbType = typeof userRepositoryDb;