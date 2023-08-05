import { s3ServiceType } from "../../frameworks/services/s3CloudService";

export const cloudService = ( service: ReturnType<s3ServiceType>) => {

    const uploadAndGetUrl = async(file: any) => {
        return await service.uploadFile(file);
    }

    const removeFile = async(key?: string) => {
        return await service.removeFile(key);
    }

    return { uploadAndGetUrl, removeFile }
}

export type cloudServiceType = typeof cloudService;