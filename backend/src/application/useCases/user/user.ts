import { userDbInterface } from "../../repositories/userDbRepository";

export const userSearch = async( name: string, repository: ReturnType<userDbInterface> ) => {
    console.log("function 2")
    const result = await repository.userSearch(name);
    return result;
}