import { Request, Response } from "express";
import { User } from "../models/userModel";
import { JWT_SECRET } from "../utils/config";
import { customError } from "../utils/customError";
const validator = require("validator");
import userContoller from "./userController";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signupHandler = async (req: Request, res: Response) => {
  userContoller.createUser(req, res);
};

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    console.log("email failed");
    throw new customError("Login failed.", 400, "Invalid email address.");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("user failed");

    throw new customError("Login failed", 404, "User not found");
  }
  console.log(password, user.password);

  const genuine = await bcrypt.compare(password, user.password);
  if (!genuine) {
    console.log("genuine failed");

    throw new customError("Login failed.", 400, "Invalid password.");
  }
  const token = await jwt.sign(
    { username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "2d" }
  );
  res.status(200).json({ email: user.email, token: token });
};

export default {
  signupHandler,
  loginHandler,
};
