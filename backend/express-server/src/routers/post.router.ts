import { Router } from 'express';
import { adminAuth } from '../middlewares/auth';

import { PostController } from '../controllers/post.controller';

const postController = new PostController();

const { getPosts, getPost, addPost, updatePost, removePost } = postController;

export const postRouter = Router();

postRouter.get('/blog/posts', getPosts);
postRouter.get('/blog/post/:id', getPost);
postRouter.post('/blog/post', adminAuth, addPost);
postRouter.patch('/blog/post/:id', adminAuth, updatePost);
postRouter.delete('/blog/post/:id', adminAuth, removePost);
