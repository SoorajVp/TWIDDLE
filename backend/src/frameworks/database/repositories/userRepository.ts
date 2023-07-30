import { registerInterface, userDataInterface } from "../../../types/interface/userInterface";
import User from "../models/userModel";

export const userRepositoryDb = () => {
    
    const addUser = async ( user: registerInterface ) => {
        const newUser = new User(user)
        return await newUser.save()
    }

    const getAllUser = async () => {
        const users: userDataInterface[] = await User.find();
        return users;
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

    const followUser = async ( id: string, userId?: string ) => {
        await User.findByIdAndUpdate({ _id: id }, {$push: {followers: userId} }, { new: true })
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {following: id} }, { new: true })
    }

    const unfollowUser = async ( id: string, userId?: string ) => {
        await User.findByIdAndUpdate({ _id: id }, {$pull: {followers: userId} }, { new: true })
        return await User.findByIdAndUpdate({ _id: userId }, {$pull: {following: id} }, { new: true })
    }

    const setFollowing = async ( id: string, userId: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {followers: id} }, { new: true })
    }

    const getSavedPost = async( id: string ) => {
        return await User.findById({_id: id}).populate("saved")
    }

    const savePost = async( postId: string, userId?: string ) => {
        console.log("adding post-__---__");
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {saved: postId} }, { new: true })
    } 

    const unSavePost = async( postId: string, userId?: string ) => {
        console.log("removing post-__---__");
        return await User.findByIdAndUpdate({ _id: userId }, {$pull: {saved: postId} }, { new: true })
    } 



    return { addUser, getAllUser, getUserByEmail, getUserByName, getUserById, userSearch, followUser, unfollowUser, setFollowing, savePost, unSavePost, getSavedPost }
}

export type userRepositoryDbType = typeof userRepositoryDb;