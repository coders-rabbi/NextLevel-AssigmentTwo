import { Request, Response } from 'express';
import { UserService } from './users.services';
import { userSchemaValidation } from './users.validation';
// import { string } from 'zod';
// import { number } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { User: userData } = req.body;
    const zodValidation = userSchemaValidation.parse(userData);
    //will call service function to send this data
    const result = await UserService.createUserIntoDB(zodValidation);
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Users already exist!',
      data: null
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getASpecificUser,
  deleteAUser,
};
