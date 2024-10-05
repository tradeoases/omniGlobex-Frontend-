import request from "../base.service";

const PATH = "user/";

export interface IUserSignup {
  countryId: string;
  password: string;
  email: string;
  fullname: string;
}

export interface ISellerSignup extends IUserSignup {
  address: string;
  phonenumber: string;
  city: string;
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
  city: string;
  email?: string;
  address?: string;
  phonenumber?: string;
  is_phonenumber?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface ProfileImagesAttributes {
//   profile_image_id?: string;
//   profile_id?: string;
//   avatar_url?: string;
//   avatar_id?: string;
//   logo_url?: string;
//   logo_id?: string;
//   cover_url?: string;
//   cover_id?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface IUserSignup {
  countryId: string;
  password: string;
  email: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  city: string;
}

export interface IVerifyEmail {
  token: string;
}

export const userLogin = async (data: IUserSignin) =>
  await request.post(`${PATH}signin`, data);

export const signup = async (data: IUserSignup) =>
  await request.post(`${PATH}signup`, data);

export const emailVerification = async (data?: {
  key?: string;
  token?: string;
  id?: string;
}) => await request.post(`${PATH}verify-email`, data);

export const resendVerificationEmail = async (email: string) =>
  request.get(`${PATH}verification/email/${email}`);

export const getUserInfo = async () =>
  await request.get(`${PATH}details/userinfo`);

export const getUserPreferences = async () =>
  await request.get(`${PATH}preferences/all`);

export const startPasswordReset= async (email: string) =>
  await request.post(`${PATH}reset-password/start/${email}`);

export const completePasswordResetComplete = async (data: {
  id: string;
  key: string;
  confirmPassword: string;
  password: string;
}) =>
  await request.post(`${PATH}reset-password/complete/`, data, {
    headers: { "Content-Type": "application/json" },
  });
