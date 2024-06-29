import { Request, Response } from 'express';
import Post, { IPost } from '../models/post.model';

export class PostController {
  getPosts = async (req: Request, res: Response) => {
    const category = req.query.category as string;

    try {
      const query = category ? { category } : {};
      const posts = await Post.find(query).select('-createdAt -content');
      res.send(posts);
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  getPost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      res.send(post);
    } catch (error) {
      res.send({ error });
    }
  };

  addPost = async (req: Request<{}, {}, IPost>, res: Response) => {
    const post = new Post(req.body);

    try {
      await post.save();
      res.status(201).send({ id: post._id });
    } catch (error) {
      res.status(400).send({ error });
    }
  };

  removePost = async (req: Request, res: Response) => {
    const postId = req.params.id;

    try {
      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).send({ error: 'Post not found' });
      }

      res.send();
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  updatePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const updates = req.body;

    try {
      const post = await Post.findByIdAndUpdate(postId, updates);

      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      res.send();
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
