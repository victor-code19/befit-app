import { Router } from 'express';
import { auth } from '../middlewares/auth';

import { createUser, loginUser, logoutUser } from '../controllers/userController';

export const router = Router();

router.post('/users/create', createUser);
router.post('/users/login', loginUser);
router.post('/users/logout', auth, logoutUser);
