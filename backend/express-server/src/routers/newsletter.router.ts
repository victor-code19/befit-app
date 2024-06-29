import { Router } from 'express';
import { newsletterController } from '../controllers/newsletter.controller';

const { signUpToNewsletter } = newsletterController;

export const newsletterRouter = Router();

newsletterRouter.post('/newsletter/signup', signUpToNewsletter);
