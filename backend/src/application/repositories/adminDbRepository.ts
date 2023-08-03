import { adminRepositoryInterface } from "../../frameworks/database/repositories/adminRepository";

export const adminDbRepository = ( repository: ReturnType<adminRepositoryInterface>) => {
    const getAdminByEmail = async( email: string ) => {
        return await repository.getAdminByEmail(email);
    }

    
    return { getAdminByEmail }
}

export type adminDbInterface = typeof adminDbRepository;