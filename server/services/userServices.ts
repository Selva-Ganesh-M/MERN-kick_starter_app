import mongoose, { Document } from "mongoose";
import { IUser, IUserDoc, ResIUser, User } from "../models/userModel";
import userSanitizer from "../sanitizer/userSanitizer";
import { JWT_SECRET } from "../utils/config";
import { customError } from "../utils/customError";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET ALL USERS
const getAllUsers = async (): Promise<ResIUser[]> => {
  let users: ResIUser[] = await User.find().select("-password");
  if (!users) throw new customError("Users fetching failed", 500);
  return users;
};

// GET SINGLE USER
const getSingleUser = async (id: string): Promise<ResIUser> => {
  if (!mongoose.isValidObjectId) {
    throw new customError("Get single user failed.", 400, "Invalid user id.");
  }
  let user: ResIUser | null = await User.findById(id).select("-password");
  if (!user) {
    throw new customError("Get sigle user failed", 404, "User not found");
  }
  return user;
};

// CREATE A USER
const createUser = async (
  content: IUser
): Promise<{ email: string; token: string }> => {
  const { username, email, password, isAdmin } = userSanitizer(content);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const preparedContent = {
    username,
    email,
    password: hashedPassword,
    isAdmin,
  };
  const user = await User.create(preparedContent);
  if (!user) throw new customError("User creation failed.", 500);
  const fetchedUser = (await User.findById(user.id)) as
    | (IUserDoc & { token: string })
    | null;
  if (!fetchedUser) throw new customError("User creation failed.", 500);
  fetchedUser.token = await jwt.sign(
    { email: fetchedUser.email, username: fetchedUser.username },
    JWT_SECRET,
    { expiresIn: "2d" }
  );

  return { email: fetchedUser.email, token: fetchedUser.token };
};

// UPDATE SINGLE USER
const updateUser = async (
  id: string,
  content: Partial<IUser>
): Promise<ResIUser> => {
  if (!mongoose.isValidObjectId(id)) {
    throw new customError(
      "Update user failed.",
      400,
      "Invalid user id provided for updating."
    );
  }
  const sanitizedContent = userSanitizer(content);
  const updatedUser: IUserDoc = await User.findOneAndUpdate(
    { _id: id },
    sanitizedContent,
    { upsert: true, new: true }
  ).select("-password");
  return updatedUser;
};

// DELETE USER
const deleteUser = async (id: string): Promise<ResIUser> => {
  if (!mongoose.isValidObjectId(id)) {
    throw new customError(
      "User deletion request failed.",
      400,
      "Invalid user id."
    );
  }
  let user: ResIUser | null = await User.findById(id).select("-password");
  if (!user)
    throw new customError(
      "Delete user failed",
      404,
      "Requested user not found."
    );
  await User.findByIdAndDelete(id);
  return user;
};

export default {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
