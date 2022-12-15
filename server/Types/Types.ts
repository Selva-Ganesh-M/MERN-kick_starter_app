import mongoose from "mongoose";

export interface projectInterface {
  title: string;
}

export interface IProjectModel extends projectInterface {
  _id: mongoose.Types.ObjectId;
}
