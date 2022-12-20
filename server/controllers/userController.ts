const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
import { IUserDoc, ResIUser, User } from "../models/userModel";
import userServices from "../services/userServices";

type partialIUserDoc = Partial<IUserDoc>;

const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const users: ResIUser[] = await userServices.getAllUsers();
    return res.status(200).json(users);
  }
);

const getSingleUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const user: ResIUser = await userServices.getSingleUser(id);
    return res.status(200).json(user);
  }
);

const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const user: { email: string; token: string } =
      await userServices.createUser(req.body);
    return res.status(201).json(user);
  }
);

const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const updatedUser: ResIUser = await userServices.updateUser(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedUser);
  }
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const deletedUser: ResIUser = await userServices.deleteUser(req.params.id);
    // status code: 204 (document deleted succesfully) doesn't send any data.
    // return res.status(204).json(deletedUser);
    return res.status(200).json(deletedUser);
  }
);

export default {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
