import mongoose from "mongoose";
import { IProjectModel, projectInterface } from "../Types/Types";
import { projectSchema } from "./schema/projectSchema";

const Project = mongoose.model<IProjectModel>("Project", projectSchema);

module.exports = mongoose.models.Project || Project;
