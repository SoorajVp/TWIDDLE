import AppError from "../../../utils/appError";
import { userDbInterface } from "../../repositories/userDbRepository";
import { HttpStatus } from "../../../types/httpStatus";
import {
  registerInterface,
  userDataInterface,
} from "../../../types/interface/userInterface";
import { authServiceInterfaceType } from "../../services/authServiceInterface";


export const userRegister = async (
  user: registerInterface,
  userRepository: ReturnType<userDbInterface>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  const isExistingEmail = await userRepository.getUserByEmail(user.email);

  if (isExistingEmail) {
    throw new AppError("Email is already exists !", HttpStatus.OK);
  }
  const isExistingName: userDataInterface | null =
    await userRepository.getUserByName(user.name);

  if (isExistingName) {
    throw new AppError("Username already taken !", HttpStatus.OK);
  }

  user.password =
    user.password && (await authService.encryptPassword(user?.password));

  const users = await userRepository.addUser(user);
  const payload: { userId: string, isAdmin: boolean} = { userId: users._id.toString(), isAdmin: users.isAdmin}

  const token = authService.generateToken(payload);
  await authService.verifyEmail(user.email, token);
  return { token, userData: users };
};


export const userLogin = async (
  user: { name: string; password: string },
  userRepository: ReturnType<userDbInterface>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  console.log("login function 2")

  const userData: userDataInterface | null = await userRepository.getUserByName(
    user.name
  );
  console.log("login function 3")


  if (!userData) {
    throw new AppError("User not found !", HttpStatus.OK);
  }

  if (userData.password) {
    const checkPassword: boolean | null = await authService.comparePassword(
      user.password,
      userData.password
    );
    if (!checkPassword) {
      throw new AppError("Incorrect password !", HttpStatus.OK);
    }
  }
  console.log("login function 4")


  if (userData.isBlocked) {
    throw new AppError("Account action blocked !", HttpStatus.OK);
  }

  const payload: { userId: string, isAdmin: boolean} = { userId: userData._id.toString(), isAdmin:  Boolean(userData.isAdmin)}
  const token = authService.generateToken(payload);
  console.log("login function 5")


  return { token, userData };
};

export const loginWithGoogle = async (

  user: { name: string; email: string; picture: string; googleUser: boolean },
  userRepository: ReturnType<userDbInterface>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  console.log("login function 2")

  user.name = user.name.split(" ").join(""); 
  const userData: any = await userRepository.getUserByEmail( user.email );
  console.log("login function 3")

  if (!userData) {
    user.googleUser = true;
    user.name = authService.createRandomName(user.name)
    const users = await userRepository.addUser(user);
    const payload: { userId: string; isAdmin: boolean  } = { userId: users._id.toString(), isAdmin:  users.isAdmin}
    const token = authService.generateToken(payload);
    return { token, userData: users };
  }
  console.log("login function 4")

  if(userData.googleUser) {
    if (userData.isBlocked) {
      throw new AppError("Account action blocked !", HttpStatus.OK);
    }
    console.log("login function 5")

    const token = authService.generateToken(userData._id);
    return { token, userData };
  } else {
    throw new AppError("Email already registered", HttpStatus.OK);
  }
};



export const adminLogin = async(
  name: string,
  password: string,
  userRepository: ReturnType<userDbInterface>,
  service: ReturnType<authServiceInterfaceType>
) => {

  const admin: userDataInterface | null = await userRepository.getUserByName( name );
  if(!admin) {
    throw new AppError("Admin not found !", HttpStatus.OK);
  }
  if(!admin.isAdmin) {
    throw new AppError("Admin not found !", HttpStatus.OK);
  }
  if(admin.password) {
    const checkPassword: boolean = await service.comparePassword( password, admin.password );
    if(!checkPassword) {
      throw new AppError("Incorrect password !", HttpStatus.OK);
    } 
    const payload: { userId: string, isAdmin: boolean} = { userId: admin._id.toString(), isAdmin:  Boolean(admin.isAdmin)}
    const token = service.generateToken(payload);
    return { token, admin };
  }
};


