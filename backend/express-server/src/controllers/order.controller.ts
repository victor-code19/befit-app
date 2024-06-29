import { Request, Response } from 'express';
import Order, { IService } from '../models/order.model';
// import { sendEmail, sendOrderMessages } from '../emails/email';

interface OrderRequest {
  services: IService[];
  totalAmount: number;
}

export class OrderController {
  createOrder = async (req: Request<{}, {}, OrderRequest>, res: Response) => {
    const order = new Order({
      ...req.body,
      orderedBy: req.user._id,
    });

    try {
      await order.save();
      // sendOrderMessages(order, req.user);
      res.status(201).send();
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
