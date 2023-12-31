import { ChatListInterface } from "./chatInterface";

export interface userInterface {
  _id: string;
  isAdmin: boolean;
  verfied: boolean;
  bio?: string;
  email: string;
  isBlocked: boolean;
  name: string;
  password?: string;
  profilePic: string;
  __v: number;
  followers?: string[];
  following?: string[];
  saved?: string[];
}



export interface AuthState {
  darkMode?: boolean;
  user?: userInterface | null;
  token?: string | null;
  lastChat?: ChatListInterface;
  actions?: number;
}

export interface RootState {
  user :AuthState
}

export interface AuthResponse {
  user?: userInterface;
  token?: string;
  status: string;
  message: string;
}


export interface AdminInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}

export interface AdminAuthResponse {
  admin?: AdminInterface;
  token?: string;
  status: string;
  message: string;
}

export interface AdminState {
  admin: AdminInterface | null;
  token: string | null;
}


