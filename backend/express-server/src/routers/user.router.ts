import { Router } from 'express';
import { auth } from '../middlewares/auth';

import { UserController } from '../controllers/user.controller';
import { EmailService } from '../emails/email';

const userController = new UserController(
  new EmailService(process.env.SENDGRID_API_KEY!)
);

const { createUser, loginUser, logoutUser } = userController;

export const userRouter = Router();

userRouter.post('/users/create', createUser);
userRouter.post('/users/login', loginUser);
userRouter.post('/users/logout', auth, logoutUser);
