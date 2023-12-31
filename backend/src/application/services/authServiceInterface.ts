import { authServiceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = ( service: authServiceReturn ) => {

    const encryptPassword = ( password: string ) => {
       return service.encryptPassword(password)
    } 

    const verifyEmail = ( email: string, userId: string, token: string ) => {
        return service.verifyEmail(email, userId, token)
    }

    const generateToken = ( payload?: { userId: string, isAdmin: boolean} ) => {
        return service.generateToken( payload );
    } 

    const comparePassword = ( pasword: string , hashedPassword: string ) =>{
        return service.comparePassword( pasword, hashedPassword )
    }

    const createRandomName = ( name: string ) => {
        return service.createRandomName( name );
    }

    return { encryptPassword, verifyEmail, generateToken, comparePassword, createRandomName }
    
}

export type authServiceInterfaceType = typeof authServiceInterface;