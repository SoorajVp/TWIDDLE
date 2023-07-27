import { adminDataInterface } from "../../../types/interface/userInterface";
import Admin from "../models/adminModel";

export const adminRepository = () => {
    const getAdminByEmail = async(email: string) => {
        console.log(email)
        const admin : adminDataInterface | null = await Admin.findOne({ email });
        console.log(admin)
        return admin;
    }

    return { getAdminByEmail }
}

export type adminRepositoryInterface = typeof adminRepository;