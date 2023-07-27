import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import confirmEmail from './confirmEmail';
import configKeys from '../../config';


export const authService = () => {

    const encryptPassword = async( password: string ) => {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash( password, salt )
        return password;
    }

    const verifyEmail = async( email: string, token: string ) => {
        const result: boolean = await confirmEmail(email, token)
        return result;
    }

    const generateToken = (payload:string) => {
        const token = jwt.sign({payload}, configKeys.JWT_SECRET, { expiresIn: "5d", });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET)
    }

    const comparePassword = ( pasword: string, hashedPassword: string ) => {
        return bcrypt.compare( pasword, hashedPassword )
    }


    return { encryptPassword, verifyEmail, generateToken, verifyToken, comparePassword }

}

export type authServiceType = typeof authService;
export type authServiceReturn = ReturnType<authServiceType>