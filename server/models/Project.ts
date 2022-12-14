import mongoose from "mongoose";

export interface projectInterface {
  title: string;
}

const projectSchema = new mongoose.Schema<projectInterface>(
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

const Project = mongoose.model<projectInterface>("Project", projectSchema);

module.exports = mongoose.models.Project || Project;
