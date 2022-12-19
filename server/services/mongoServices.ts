import mongoose, { Document, Model, model } from "mongoose";
import Project, { IProjectType, ProjectDoc } from "../models/projectModel";

// get all projects
export const getAllProjects = async (): Promise<ProjectDoc[]> => {
  const projects: ProjectDoc[] = await Project.find();
  if (!projects) {
    throw new Error("No projects to display");
  }
  return projects;
};

// create a new project
export const createProject = async (
  data: IProjectType
): Promise<ProjectDoc> => {
  const alreadyExist: ProjectDoc | null = await Project.findOne(data);
  if (!alreadyExist) {
    const newProject: ProjectDoc = await Project.create(data);
    return newProject;
  } else {
    throw new Error("Title must be unique.");
  }
};

// get single project
export const getSingleProject = async (
  id: mongoose.Types.ObjectId | string
): Promise<ProjectDoc> => {
  const project: ProjectDoc | null = await Project.findById(id);
  if (!project) throw new Error("Project not found");
  return project;
};

// update a project
export const updateProject = async (
  id: mongoose.Types.ObjectId | string,
  body: IProjectType
): Promise<ProjectDoc> => {
  const project: ProjectDoc | null = await Project.findByIdAndUpdate(
    { _id: id },
    body,
    {
      new: true,
    }
  );
  if (!project) {
    throw new Error("project update failed.");
  }
  return project;
};

// delete a project
export const deleteProject = async (
  id: string | mongoose.Types.ObjectId
): Promise<ProjectDoc> => {
  const project: ProjectDoc | null = await Project.findByIdAndDelete(id);
  if (!project) throw new Error("project deletion failed");
  return project;
};
