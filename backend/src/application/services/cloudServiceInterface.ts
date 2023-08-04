import { s3ServiceType } from "../../frameworks/services/s3CloudService";

export const cloudService = ( service: ReturnType<s3ServiceType>) => {

    const uploadAndGetUrl = async(file: any) => {
        return await service.uploadFile(file);
    }

    const deleteFile = async(key: string) => {
    console.log("function - 3")
        return await service.deleteFile(key);
    }

    return { uploadAndGetUrl, deleteFile }
}

export type cloudServiceType = typeof cloudService;