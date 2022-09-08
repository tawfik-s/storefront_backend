import express from 'express';
import {
  DeleteUserController,
  RegisterUserController,
  showMyDataController,
  UpdateUserController,
} from '../controllers/userController';

import { authenticateToken } from '../middleware/authinticateToken';

const userRouter = express.Router();

userRouter.get('/showme', authenticateToken, showMyDataController);
userRouter.post('/register', RegisterUserController);
userRouter.delete('/delete', authenticateToken, DeleteUserController); //need auth
userRouter.put('/update', authenticateToken, UpdateUserController);

export default userRouter;
