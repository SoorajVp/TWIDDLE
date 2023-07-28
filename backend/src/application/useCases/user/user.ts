import { userDbInterface } from "../../repositories/userDbRepository";

export const userSearch = async( name: string, repository: ReturnType<userDbInterface> ) => {
    const users = await repository.userSearch(name);
    return users;
}

export const userById = async ( id: string, repository: ReturnType<userDbInterface> ) => {
    const user = await repository.getUserById( id );
    return user;
}

export const userByName = async ( name: string, repository: ReturnType<userDbInterface> ) => {
    const user = await repository.getUserByName( name );
    return user;
}

