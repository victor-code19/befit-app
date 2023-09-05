import { Router } from 'express';
import { signUpToNewsletter } from '../controllers/newsletterController';

export const router = Router();

router.post('/newsletter/signup', signUpToNewsletter);
