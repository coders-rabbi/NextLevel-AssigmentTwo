// users.model.ts
import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  UserModel,
  TUserName,
  UserMethods,
  TOrder,
} from './users.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userInfoSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: { type: [String], required: true },
  address: UserAddressSchema,
  orders: { type: [String], required: true},
});

//order Schema
const OrderSchema = new Schema<TOrder>({
  userId: { type: Number, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// this middleware worked before the saved user data
userInfoSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
  next();
});

//pre save middleware
userInfoSchema.methods.isUserExists = async function (userId: string) {
  const exsistingUser = await User.findOne({ userId });
  return exsistingUser;
};

export const User = model<TUser, UserModel>('User', userInfoSchema);
export const OrderModel = model<TOrder>('Order', OrderSchema);
