import { authServiceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = ( service: authServiceReturn ) => {

    const encryptPassword = ( password: string ) => {
        console.log("encrypting - 1 -")

       return service.encryptPassword(password)
    } 

    const verifyEmail = ( email: string, token: string ) => {
        return service.verifyEmail(email, token)
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