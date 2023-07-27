import { registerInterface } from "../../types/interface/userInterface";
import { userRepositoryDbType } from "../../frameworks/database/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<userRepositoryDbType>
) => {
  const addUser = async (user: registerInterface) => {
    return await repository.addUser(user);
  };

  const getUserByEmail = async (email: string) => {
    return await repository.getUserByEmail(email);
  };

  const getUserByName = async (name: string) => {
    return await repository.getUserByName(name);
  };

  const userSearch = async (name: string) => {
    console.log("function 3")
    return await repository.userSearch(name);
  };

  return { addUser, getUserByEmail, getUserByName, userSearch };
};

export type userDbInterface = typeof userDbRepository;
