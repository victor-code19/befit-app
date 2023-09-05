import { Schema, model } from 'mongoose';

interface IPost {
  title: string;
  introduction: string;
  content: string;
  category: string;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    introduction: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

postSchema.set('toJSON', {
  transform: function (doc, ret) {
    const { updatedAt, __v, ...rest } = ret;
    return rest;
  },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
