import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { OrderController } from '../controllers/order.controller';

const orderController = new OrderController();

const { createOrder } = orderController;

export const orderRouter = Router();

orderRouter.post('/orders/createOrder', auth, createOrder);
