import { Request, Response } from 'express';
import { UserService } from './users.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    //will call service function to send this data
    const result = await UserService.createUserIntoDB(userData);
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
};
