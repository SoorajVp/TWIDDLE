import { authServiceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = ( service: authServiceReturn ) => {

    const encryptPassword = ( password: string ) => {
       return service.encryptPassword(password)
    } 

    const verifyEmail = ( email: string, token: string ) => {
        return service.verifyEmail(email, token)
    }

    const generateToken = ( payload: string ) => {
        return service.generateToken( payload );
    } 

    const comparePassword = ( pasword: string , hashedPassword: string ) =>{
        return service.comparePassword( pasword, hashedPassword )
    }

    return { encryptPassword, verifyEmail, generateToken, comparePassword }
    
}

export type authServiceInterfaceType = typeof authServiceInterface;