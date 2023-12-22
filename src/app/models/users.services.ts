import { User } from './users.model';
import { TOrder, TUser } from './users.interface';
// import { string } from 'zod';

const createUserIntoDB = async (userData: TUser) => {
  // const result = await UserModel.create(user);

  const user = new User(userData); // create an instance

  const userIdString = String(userData.userId);
  if (await user.isUserExists(userIdString)) {
    throw new Error('User already exists');
  }

  const result = await user.save(); // user create using instance method
  // response without password newly created user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

const getAllUsers = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getASpecificUser = async (id: string) => {
  const result = await User.findOne({ userId: id }).select({
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
  return result;
};

const deleteASpecificUser = async (id: string) => {
  // const user = new User(userData); // create an instance
  // const userIdString = String(userData.userId);
  // if (await user.isUserExists(userIdString)) {
  //   throw new Error('User already exists');
  // }

  const result = await User.deleteOne({ userId: id });
  return result;
};

const userUpdateService = async (userId: number, updatedUserData: string) => {
  const id = userId;

  try {
    const user = await User.findOne({ userId: id }, { updatedUserData });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password, ...updatedUserWithoutPassword } = user.toObject();
    return updatedUserWithoutPassword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAspecificOrderIntoDB = async (id: string) => {
  try {
    const user = await User.findOne({ userId: id }, { orders: 1 });
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { _id, ...updatedUserWithoutPassword } = user.toObject();
    return updatedUserWithoutPassword;
  } catch (err) {
    console.log('something went wrong');
  }
};

const createAOrderService = async (userId: number, orderInfo: TOrder) => {
  console.log(orderInfo);
  try {
    const existingUser = await User.findOne({ userId: userId });

    if (!existingUser) {
      throw new Error('Use Not Found');
    }

    if (!existingUser.orders) {
      existingUser.orders = [];
    }
    existingUser.orders.push({
      productName: orderInfo.productName,
      price: orderInfo.price,
      quantity: orderInfo.quantity,
    });

    await existingUser.save();
    return null;
  } catch (error) {
    console.log('Something went wrong:', error);
  }
};

export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getASpecificUser,
  deleteASpecificUser,
  userUpdateService,
  createAOrderService,
  getAspecificOrderIntoDB,
};
