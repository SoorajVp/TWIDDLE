import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import confirmEmail from './confirmEmail';
import configKeys from '../../config';


export const authService = () => {

    const encryptPassword = async( password: string ) => {
        console.log("encrypting - 2 -", password)

        const salt = await bcrypt.genSalt(10);
        console.log("function - password -", salt)

        password = await bcrypt.hash( password, salt )
        console.log("function - password -", password)

        return password;
    }

    const verifyEmail = async( email: string, token: string ) => {
        const result: boolean = await confirmEmail(email, token)
        return result;
    }

    const generateToken = (payload?: { userId: string, isAdmin: boolean}) => {
        const token = jwt.sign({payload}, configKeys.JWT_SECRET, { expiresIn: "5d", });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET)
    }

    const comparePassword = ( pasword: string, hashedPassword: string ) => {
        return bcrypt.compare( pasword, hashedPassword )
    }

    const createRandomName = ( name: string ) => {
        const randomName = name + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        return randomName;
    }


    return { encryptPassword, verifyEmail, generateToken, verifyToken, comparePassword, createRandomName }

}

export type authServiceType = typeof authService;
export type authServiceReturn = ReturnType<authServiceType>