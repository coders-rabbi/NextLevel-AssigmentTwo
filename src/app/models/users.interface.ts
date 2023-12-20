import { Model } from 'mongoose';

//userName
export type TUserName = {
  firstName: string;
  lastName: string;
};

//user address
export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

// export type Order = {
//   productName: string;
//   price: number;
//   quantity: number;
// };

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: true | false;
  hobbies: string[];
  address: TUserAddress;
};

export type UserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
