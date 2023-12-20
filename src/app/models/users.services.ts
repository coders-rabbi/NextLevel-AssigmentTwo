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

// const addAnewOrderService = async (id: string) => {
//   const quary = await user.
// };

const deleteASpecificUser = async (id: string) => {
  // console.log(id);
  const findOne = await User.findOne({ userId: id });
  if (findOne) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    console.log('data not found');
  }
  return;
};

export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getASpecificUser,
  // addAnewOrderService,
  deleteASpecificUser,
};
