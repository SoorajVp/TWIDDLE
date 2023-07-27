export interface registerInterface  {
    name: string,
    email: string,
    password?: string | undefined,
    googleUser?: boolean

}

export interface userDataInterface {
    readonly _id: string,
    name: string,
    email: string,
    password?: string ,
    isBlocked: boolean,
    createdAt: Date,
    googleUser?: boolean

}

export interface adminDataInterface {
    readonly _id: string,
    name: string,
    email: string,
    password: string,
}