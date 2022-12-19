import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProjectType {
  title: string;
}

export interface ProjectDoc extends Document, IProjectType {}

const projectSchema: Schema<IProjectType> = new Schema<IProjectType>(
  {
    title: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<Document & IProjectType> = mongoose.model<
  Document & IProjectType,
  Model<Document & IProjectType>
>("Project", projectSchema, "Projects");

export default Project;
