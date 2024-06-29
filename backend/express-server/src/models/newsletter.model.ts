import { Schema, Document, model } from 'mongoose';
import validator from 'validator';

export interface INewsletter extends Document {
  email: string;
}

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string): void {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
});

const Newsletter = model<INewsletter>('Newsletter', newsletterSchema);

export default Newsletter;
