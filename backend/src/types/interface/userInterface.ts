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
    followers?: string[] | null,
    saved?: string[] | null,

    following?: string[] | null
}

export interface adminDataInterface {
    readonly _id: string,
    name: string,
    email: string,
    password: string,
}

export interface editUserInterface {
    id: string | undefined,
    name: string,
    email: string,
    bio: string | null
}