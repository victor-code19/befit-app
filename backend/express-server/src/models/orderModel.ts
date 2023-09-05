import { Schema, model } from 'mongoose';

interface IService {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  services: IService[];
  totalAmount: number;
  orderedBy: Schema.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>({
  services: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  orderedBy: Schema.Types.ObjectId,
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
