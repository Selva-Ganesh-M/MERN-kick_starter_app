import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");
const mongoose = require("mongoose");

// @desc GET ALL PROJECTS
// @route /api/projects
// @access Public
const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find();
  res.json(projects);
});

// @desc CREATE NEW PROJECT
// @route /api/projects
// @access Private
const CreateProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("title missing");
  }
  const project = await Project.create({
    title: req.body.title,
  });
  res.status(201).json(project);
});

// @desc GET SINGLE PROJECT
// @route /api/projects/:id
// @access Public
const getSingleProject = asyncHandler(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid project id.");
  }
  const project = await Project.findOne({ _id: id });
  if (!project) {
    res.status(400);
    throw new Error("project not exist.");
  }
  res.status(200).json(project);
});

// @desc UPDATE PROJECT
// @route /api/projects/:id
// @access Public
const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid project id.");
  }

  if (!req.body) {
    res.status(400);
    throw new Error("request body is missing.");
  }

  const project = await Project.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!project) {
    res.status(400);
    throw new Error("project update failed.");
  }
  res.status(200).json(project);
});

// @desc DELETE PROJECT
// @route /api/projects/:id
// @access Public
const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid project id.");
  }
  const project = await Project.findOneAndDelete({ _id: id });
  res.status(200).json(project);
});

module.exports = {
  getAllProjects,
  getSingleProject,
  CreateProject,
  updateProject,
  deleteProject,
};
