import { File } from "buffer"

export interface registerInterface  {
    name: string,
    email: string,
    password?: string | undefined,
    googleUser?: boolean

}

export interface userDataInterface {
    readonly _id: string,
    isAdmin?: boolean,
    name: string,
    email: string,
    password?: string ,
    isBlocked?: boolean,
    createdAt: Date,
    googleUser?: boolean,
    followers?: string[] | null | userDataInterface[],
    following?: string[] | null | userDataInterface[],
    saved?: string[] | null,
}

export interface adminDataInterface {
    readonly _id: string,
    name: string,
    email: string,
    password: string,
}

export interface editUserInterface {
    id: string ,
    key: string ,
    profilePic?: any | null,
    name: string,
    email: string,
    bio: string | null
}