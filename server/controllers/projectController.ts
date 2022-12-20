import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProjectDoc } from "../models/projectModel";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../services/projectServices";
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc GET ALL PROJECTS
// @route /api/projects
// @access Public
const getAllProjectsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const projects: ProjectDoc[] = await getAllProjects();
    res.status(200).json(projects);
  }
);

// @desc CREATE NEW PROJECT
// @route /api/projects
// @access Private
const CreateProjectHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.title) {
      res.status(400);
      throw new Error("title missing");
    }
    const project: ProjectDoc = await createProject(req.body);
    res.status(201).json(project);
  }
);

// @desc GET SINGLE PROJECT
// @route /api/projects/:id
// @access Public
const getSingleProjectHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: mongoose.Types.ObjectId | string = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      throw new Error("Invalid project id.");
    }
    const project: ProjectDoc = await getSingleProject(id);
    res.status(200).json(project);
  }
);

// @desc UPDATE PROJECT
// @route /api/projects/:id
// @access Public
const updateProjectHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      throw new Error("Invalid project id.");
    }

    if (!req.body) {
      res.status(400);
      throw new Error("request body is missing.");
    }

    const project: ProjectDoc = await updateProject(id, req.body);

    res.status(200).json(project);
  }
);

// @desc DELETE PROJECT
// @route /api/projects/:id
// @access Public
const deleteProjectHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      throw new Error("Invalid project id.");
    }
    const project: ProjectDoc = await deleteProject(id);
    res.status(200).json(project);
  }
);

module.exports = {
  getAllProjectsHandler,
  getSingleProjectHandler,
  CreateProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
};
