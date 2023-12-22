import { Request, Response } from 'express';
import { UserService } from './users.services';
import { userSchemaValidation } from './users.validation';
// import { string } from 'zod';
// import { number } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(user);
    const zodValidation = userSchemaValidation.parse(user);
    //will call service function to send this data
    const result = await UserService.createUserIntoDB(zodValidation);
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Users already exist!',
      data: null,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getASpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(req.params);
    const result = await UserService.getASpecificUser(userId as string);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(req.params);
    const result = await UserService.deleteASpecificUser(userId as string);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const UserUpdate = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUserData = req.body;

  try {
    const updatedUser = await UserService.userUpdateService(
      Number(userId),
      updatedUserData
    );
    res.json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const orderCreateController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orderData = req.body;
  try {
    await UserService.createAOrderService(Number(userId), orderData);
    res.json({
      success: true,
      message: 'Order Created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getASpecificUser,
  deleteAUser,
  UserUpdate,
  orderCreateController,
};
