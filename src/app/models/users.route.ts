import express from 'express';
import { UserControllers } from './users.controller';

const router = express.Router();

//will call controller function
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getASpecificUser);
router.delete('/:userId', UserControllers.deleteAUser);
router.put('/:userId', UserControllers.UserUpdate);
router.put('/:userId/orders', UserControllers.orderCreateController)

export const UserRoutes = router;
