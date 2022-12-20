import mongoose, { Document, Model, Schema } from "mongoose";

export interface ResIUser {
  username: string;
  password?: string;
  email: string;
  isAdmin?: boolean;
  resetPasswordToken: string;
  resetPasswordExpiry: string;
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
  resetPasswordToken: string;
  resetPasswordExpiry: string;
}

export interface IUserDoc extends Document, IUser {}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: String,
});

export const User = mongoose.model<IUserDoc, Model<IUserDoc>>(
  "User",
  userSchema
);
