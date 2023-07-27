import AppError from "../../../utils/appError";
import { userDbInterface } from "../../repositories/userDbRepository";
import { HttpStatus } from "../../../types/httpStatus";
import {
  adminDataInterface,
  registerInterface,
  userDataInterface,
} from "../../../types/interface/userInterface";
import { authServiceInterfaceType } from "../../services/authServiceInterface";
import { adminDbInterface } from "../../repositories/adminDbRepository";

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
  const userId = users._id;
  const token = await authService.generateToken(userId.toString());
  await authService.verifyEmail(user.email, token);
  return { token, userData: users };
};

export const userLogin = async (
  user: { name: string; password: string },
  userRepository: ReturnType<userDbInterface>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  const userData: userDataInterface | null = await userRepository.getUserByName(
    user.name
  );

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

  if (userData.isBlocked) {
    throw new AppError("This account was blocked !", HttpStatus.OK);
  }

  const token = await authService.generateToken(userData._id);

  return { token, userData };
};

export const loginWithGoogle = async (
  user: { name: string; email: string; picture: string; googleUser: boolean },
  userRepository: ReturnType<userDbInterface>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  const userData: any = await userRepository.getUserByEmail(user.email);
  if (!userData) {
    const users = await userRepository.addUser(user);
    const userId = users._id;
    const token = await authService.generateToken(userId.toString());
    return { token, userData: users };
  }
  if (userData?.isBlocked) {
    throw new AppError("This account was blocked by admin ", HttpStatus.OK);
  }
  const token = await authService.generateToken(userData._id);
  return { token, userData };
};



export const adminLogin = async(
  email: string,
  password: string,
  adminRepository: ReturnType<adminDbInterface>,
  service: ReturnType<authServiceInterfaceType>
) => {
  const admin : adminDataInterface | null = await adminRepository.getAdminByEmail(email);
  if(!admin) {
    throw new AppError("Admin not found !", HttpStatus.OK);
  }
  const checkPassword: boolean = await service.comparePassword( password, admin.password );
  if(!checkPassword) {
    throw new AppError("Incorrect password !", HttpStatus.OK);
  } 
  const token = await service.generateToken(admin._id.toString());
  return { token, admin };
  
};
