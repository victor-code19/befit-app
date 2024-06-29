import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { userRouter } from './routers/user.router';
import { newsletterRouter } from './routers/newsletter.router';
import { postRouter } from './routers/post.router';
import { orderRouter } from './routers/order.router';

export default class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.connectDatabase();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);
    } catch (error) {
      console.error('Could not connect to MongoDB', error);
    }
  };

  private configureMiddlewares = () => {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(compression());
    this.express.use(morgan('dev'));
    this.express.use(helmet());
  };

  private configureRoutes = () => {
    this.express.use(userRouter);
    this.express.use(newsletterRouter);
    this.express.use(postRouter);
    this.express.use(orderRouter);
  };

  public start = (port: string) => {
    this.express.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  };
}
