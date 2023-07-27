import { s3ServiceType } from "../../frameworks/services/s3CloudService";

export const cloudService = ( service: ReturnType<s3ServiceType>) => {
    const uploadAndGetUrl = async(file: any) => {
        return await service.uploadFile(file);
    }

    return { uploadAndGetUrl }
}

export type cloudServiceType = typeof cloudService;