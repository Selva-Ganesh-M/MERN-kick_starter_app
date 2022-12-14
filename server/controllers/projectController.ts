import { Request, Response } from "express";

// @desc GET ALL PROJECTS
// @route /api/projects
// @access Public
const getAllProjects = (req: Request, res: Response) => {
  res.json("all projects");
};

// @desc CREATE NEW PROJECT
// @route /api/projects
// @access Private
const CreateProject = (req: Request, res: Response) => {
  res.json("create project");
};

// @desc GET SINGLE PROJECT
// @route /api/projects/:id
// @access Public
const getSingleProject = (req: Request, res: Response) => {
  res.status(200).json({
    message: `get single project ${req.params.id}`,
  });
};

// @desc UPDATE PROJECT
// @route /api/projects/:id
// @access Public
const updateProject = (req: Request, res: Response) => {
  res.status(200).json({
    message: `update project ${req.params.id}`,
  });
};

// @desc DELETE PROJECT
// @route /api/projects/:id
// @access Public
const deleteProject = (req: Request, res: Response) => {
  res.status(200).json({
    message: `delete project ${req.params.id}`,
  });
};

module.exports = {
  getAllProjects,
  getSingleProject,
  CreateProject,
  updateProject,
  deleteProject,
};
