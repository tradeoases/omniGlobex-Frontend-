/* eslint-disable react-refresh/only-export-components */
import { RecoilState, atom } from "recoil";

export interface IRole {
  role_id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  user_id: string;
  country_id: string;
  businessNames: string[]
  city: string;
  email: string;
  active: number;
  fullname: string;
  phonenumber: string;
  zipCode: string;
  status: number;
  is_verified: number;
  createdAt: string;
  updatedAt: string;
  roles: IUserRole[],
  Roles: [
    {
      name: IUserRole;
      role_id: string;
      UserRole: {
        user_role_id: string;
        user_id: string;
        role_id: string;
        createdAt: string;
        updatedAt: string;
      };
    }
  ];
}

export type IUserRole =
  | "Buyer"
  | "Admin"
  | "Supplier"
  | "LocalMarketing"
  | "LocalLogistic"
  | "InternationalSupplier";

export const RoleStore: RecoilState<IRole[] | null> = atom<IRole[] | null>({
  key: "role-store",
  default: null,
});

export const userStore: RecoilState<IUser | null> = atom<IUser | null>({
  key: "user-store",
  default: null,
});

export const EmailStore: RecoilState<{
  email: string | null;
  id: string | null;
}> = atom<{ email: string | null; id: string | null }>({
  key: "email-store",
  default: { email: null, id: null },
});
