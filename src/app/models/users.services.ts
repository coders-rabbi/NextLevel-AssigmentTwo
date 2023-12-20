import { User } from './users.model';
import { TUser } from './users.interface';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const userUpdateService = async (userId: number, updatedUserData: TUser) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: userId },
      { $set: updatedUserData },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...updatedUserWithoutPassword } = user.toObject();
    return updatedUserWithoutPassword;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getASpecificUser,
  deleteASpecificUser,
  userUpdateService,
};
