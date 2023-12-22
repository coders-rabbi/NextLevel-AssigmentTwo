import express from 'express';
import { UserControllers } from './users.controller';

const router = express.Router();

//will call controller function
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getASpecificUser);
router.get('/:userId/orders', UserControllers.getASpecificOrdersController);
router.put('/:userId', UserControllers.UserUpdate);
router.put('/:userId/orders', UserControllers.orderCreateController);
router.delete('/:userId', UserControllers.deleteAUser);

export const UserRoutes = router;
