import { adminDataInterface } from "../../../types/interface/userInterface";
import Admin from "../models/adminModel";

export const adminRepository = () => {

    const getAdminByEmail = async(email: string) => {
        const admin : adminDataInterface | null = await Admin.findOne({ email });
        return admin;
    }


    return { getAdminByEmail }
}

export type adminRepositoryInterface = typeof adminRepository;