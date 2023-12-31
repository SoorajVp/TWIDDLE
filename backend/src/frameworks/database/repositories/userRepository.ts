import { editUserInterface, registerInterface, userDataInterface } from "../../../types/interface/userInterface";
import Notification from "../models/notificationModel";
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
        const user: userDataInterface[] | null = await User.find({ name: { $regex: `${name}`, $options: "i"}})
        return user;
    }

    const updateProfile = async ( userData: editUserInterface ) => {
        return await User.findByIdAndUpdate({_id: userData.id}, { name: userData.name, email: userData.email, bio: userData.bio }, { new: true })
    }

    const newProfilePic = async ( userId: string, imgUrl: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {profilePic: imgUrl}, { new: true })
    }
 
    const newPassword = async ( userId: string, password: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {password: password}, { new: true })
    }

    const followUser = async ( id: string, userId?: string ) => {
        const notify = {
            userId: id,
            user: userId,
            follow: true
        }
        const notification = new Notification(notify) 
        await User.findByIdAndUpdate({ _id: id }, {$push: {followers: userId} }, { new: true })
        await notification.save()
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {following: id} }, { new: true })
    }

    const unfollowUser = async ( id: string, userId?: string ) => {
        await Notification.findOneAndDelete({ userId: id, user: userId, follow: true })
        await User.findByIdAndUpdate({ _id: id }, {$pull: {followers: userId} }, { new: true })
        return await User.findByIdAndUpdate({ _id: userId }, {$pull: {following: id} }, { new: true })
    }

    const setFollowing = async ( id: string, userId: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {followers: id} }, { new: true })
    }

    const blockUser = async (id: string ) => {
        return await User.findByIdAndUpdate({ _id: id }, {isBlocked: true}, { new: true })
    }

    const unBlockUser = async (id: string ) => {
        return await User.findByIdAndUpdate({ _id: id }, {isBlocked: false}, { new: true })
    }

    const getSavedPost = async( id: string ) => {
        return await User.findById({_id: id}).populate("saved").populate("saved.userId")
    }

    const savePost = async( postId: string, userId?: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {$push: {saved: postId} }, { new: true })
    } 

    const unSavePost = async( postId: string, userId?: string ) => {
        return await User.findByIdAndUpdate({ _id: userId }, {$pull: {saved: postId} }, { new: true })
    } 

    const getNotifications = async( userId: string ) => {
        return await Notification.find({ userId: userId })
            .populate({ path: "user", select: "name profilePic verfied" })
            .populate({ path: "liked", select: "_id image" })
            .populate({ path: 'comment.postId', select: '_id image' }).sort({ _id: -1 })
    }

    const clearNotification = async( userId: string ) => {
        return await Notification.deleteMany({ userId: userId });
    }

    const verificationTick = async (userId: string) => {
        return await User.findByIdAndUpdate( { _id: userId},{ verfied: true });
    }

    const verfiedUsers = async() => {
        const users = await User.find({ verfied: true })
        return users
    }

    const randomUsers = async( ) => {
        return await User.aggregate([
            { $sample: { size: 10 } }
        ]).exec()
    }



    return { 
        addUser, 
        getAllUser, 
        getUserByEmail, 
        getUserByName, 
        getUserById, 
        userSearch, 
        updateProfile, 
        newProfilePic, 
        newPassword, 
        followUser, 
        unfollowUser, 
        setFollowing, 
        blockUser, 
        unBlockUser, 
        savePost, 
        unSavePost, 
        getSavedPost, 
        getNotifications, 
        clearNotification,
        verificationTick,
        verfiedUsers,
        randomUsers
    }
}

export type userRepositoryDbType = typeof userRepositoryDb;