import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createOrder } from '../controllers/orderController';

export const router = Router();

router.post('/orders/createOrder', auth, createOrder);
