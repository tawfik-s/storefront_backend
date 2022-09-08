import express from 'express';
import {
  loginController,
  logoutController,
} from '../controllers/authController';

import { authenticateToken } from '../middleware/authinticateToken';

const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);

export default authRouter;
