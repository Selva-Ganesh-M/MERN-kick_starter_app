import mongoose from "mongoose";
import { projectInterface } from "../../Types/Types";

export const projectSchema = new mongoose.Schema<projectInterface>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
