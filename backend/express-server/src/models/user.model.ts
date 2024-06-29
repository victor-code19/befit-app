import { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  tokens: Array<{ token: string }>;
  generateAuthToken(): Promise<string>;
}

interface IUserMethods {
  generateAuthToken(): Promise<string>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    validate(value: string) {
      const regex = /^[A-Za-z]+$/;
      const isValidName = regex.test(value);
      if (!isValidName) {
        throw new Error('Invalid name');
      }
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    validate(value: string) {
      const regex = /^[A-Za-z]+$/;
      const isValidName = regex.test(value);
      if (!isValidName) {
        throw new Error('Invalid last name');
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    validate(value: string) {
      if (!/^(?=.*[A-Z])(?=.*\d).{7,}$/.test(value)) {
        throw new Error('Stronger password required');
      }
    },
  },
  role: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('The account does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Authentication error');
  }

  return user;
};

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.SECRET!);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function (): Omit<IUser, 'password' | 'tokens'> {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
