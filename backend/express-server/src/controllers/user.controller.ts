import User from '../models/user.model';
import { Request, Response } from 'express';
import { EmailService } from '../emails/email';

export class UserController {
  constructor(private emailService: EmailService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      this.emailService.sendWelcomeEmail(user);
      res.status(201).send({ token });
    } catch (error) {
      this.handleDuplicationError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      res.status(200).send({ token, role: user.role });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  logoutUser = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      user.tokens = user.tokens.filter(
        (obj: { token: string }) => obj.token !== req.token
      );
      await user.save();
      res.status(200).send();
    } catch (error) {
      res.status(401).send({ error });
    }
  };

  private handleDuplicationError = (error: any, res: Response) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const duplicateError = {
        message: 'Email address already in use',
        code: 11000,
      };
      return res.status(400).send({ error: duplicateError });
    }
    res.status(400).send({ error });
  };
}
