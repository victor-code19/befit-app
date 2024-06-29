import { Document, Schema, model } from 'mongoose';

export interface IService {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IOrder extends Document {
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
