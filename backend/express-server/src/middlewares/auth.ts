import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

type JwtPayload = {
  _id: string;
};

type QueryFields = {
  _id: string;
  'tokens.token': string;
  role?: string;
};

const createAuthMiddleware = (role: string | undefined = undefined) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '') || '';
      const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;

      const queryFields: QueryFields = {
        _id: decoded._id,
        'tokens.token': token,
      };

      if (role) {
        queryFields.role = role;
      }

      const user: IUser | null = await User.findOne(queryFields);

      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Authentication error' });
    }
  };
};

export const auth = createAuthMiddleware();
export const adminAuth = createAuthMiddleware('admin');
