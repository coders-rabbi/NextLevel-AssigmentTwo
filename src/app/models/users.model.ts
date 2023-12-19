import { Schema, model } from 'mongoose';
import { Order, User, UserAddress, UserName } from './users.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<UserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userInfoSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: {
    type: Boolean,
    enum: ['true', 'false'],
    default: true,
  },
  hobbies: { type: [String], required: true },
  address: UserAddressSchema,
  orders: {
    type: orderSchema,
    default: [],
  },
});

export const UserModel = model<User>('User', userInfoSchema);
