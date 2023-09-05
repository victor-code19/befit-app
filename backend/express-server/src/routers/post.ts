import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth';

import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  removePost,
} from '../controllers/postController';

export const router = Router();

router.get('/blog/posts', getPosts);
router.get('/blog/post/:id', getPost);
router.post('/blog/post', adminAuth, addPost);
router.patch('/blog/post/:id', adminAuth, updatePost);
router.delete('/blog/post/:id', adminAuth, removePost);
