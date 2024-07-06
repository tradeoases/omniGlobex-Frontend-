import request from "../base.service";

const PATH = "user/";

export interface IUserSignup {
  country_id: string;
  password: string;
  roleIds: string[];
  email: string;
  fullname: string;
}

export interface ISellerSignup extends IUserSignup {
  address: string;
  shopName: string;
  profileImages: ProfileImagesAttributes;
  phonenumber: string;
  city?: string;
  showRooms: string[];
}

export interface IUserSignin {
  email: string;
  password: string;
}

export interface IProfile {
  user_id?: string;
  profile: ProfileAttributes;
  avatar_url?: string;
  avatar_id?: string;
}

export interface ProfileAttributes {
  profile_id?: string;
  user_id: string;
  fullname?: string;
  country_id?: string;
  city?: string;
  email?: string;
  address?: string;
  phonenumber?: string;
  is_phonenumber?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileImagesAttributes {
  profile_image_id?: string;
  profile_id?: string;
  avatar_url?: string;
  avatar_id?: string;
  logo_url?: string;
  logo_id?: string;
  cover_url?: string;
  cover_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserSignup {
  country_id: string;
  password: string;
  roleIds: string[];
  email: string;
  fullname: string;
}

export interface IVerifyEmail {
  token: string;
}

export const createSeller = async (data: ISellerSignup) =>
  await request.post(`${PATH}seller`, data);

export const getAllRoles = async () => await request.get(`role`);

export const userLogin = async (data: IUserSignin) =>
  await request.post(`${PATH}signin`, data);

export const signup = async (data: IUserSignup) =>
  await request.post(`${PATH}signup`, data);

export const emailVerification = async (token: IVerifyEmail) =>
  await request.post(`${PATH}verify-email`, token);

export const resendVerificationEmail = async (email: string) =>
  request.get(`${PATH}verification-email/${email}`);

export const getUserInfo = async () => await request.get(`userinfo`);
