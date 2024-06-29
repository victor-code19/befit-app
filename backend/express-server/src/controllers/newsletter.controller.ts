import { Request, Response } from 'express';
import Newsletter, { INewsletter } from '../models/newsletter.model';

class NewsletterController {
  signUpToNewsletter = async (req: Request<{}, {}, INewsletter>, res: Response) => {
    const newsletter = new Newsletter(req.body);

    try {
      await newsletter.save();
      res.status(201).send({ status: 201 });
    } catch (error) {
      this.handleDuplicationError(res, error);
    }
  };

  private handleDuplicationError(error: any, res: Response) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const duplicationError = {
        message: 'Email address already signed up to the newsletter',
        code: 11000,
      };

      return res.status(400).json({ error: duplicationError });
    }

    res.status(400).json({ error });
  }
}

export const newsletterController = new NewsletterController();
