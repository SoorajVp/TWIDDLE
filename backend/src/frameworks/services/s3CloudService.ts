import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import configKeys from "../../config";
import crypto from "crypto";
import sharp from "sharp";

const s3 = new S3Client({
  credentials: {
    accessKeyId: configKeys.S3_ACCESS_KEY,
    secretAccessKey: configKeys.S3_SECRET_KEY,
  },
  region: configKeys.S3_REGION,
});


const randomKeyName = ( bytes = 15 ) => crypto.randomBytes(bytes).toString("hex")


export const s3CloudService = () => {

  const uploadFile = async (file: Express.Multer.File) => {

    const buffer = await sharp(file.buffer).resize({width: 500, height: 500, fit: 'cover'}).toBuffer()
    const key = randomKeyName();
    const params = {
      Bucket: configKeys.S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const imgUrl = `https://${configKeys.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    return { key, imgUrl}
  };

  const removeFile = async (key?: string) => {
    const params = {
      Bucket: configKeys.S3_BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  };



  return { uploadFile, removeFile };
};

export type s3ServiceType = typeof s3CloudService;
