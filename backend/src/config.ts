import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
    MONGODB_URL: process.env.MONGODB_URL as string,
    SERVER_PORT: process.env.SERVER_PORT,
    CLIENT_PORT: process.env.CLIENT_PORT,
    EMAIL_PASS: process.env.EMAIL_PASS as string,
    EMAIL_USER: process.env.EMAIL_USER as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    S3_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY as string,
    S3_SECRET_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY as string,
    S3_REGION: process.env.S3_BUCKET_REGION as string,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME as string,
}

export default configKeys;