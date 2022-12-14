import * as express from "express";
const {
  getAllProjects,
  getSingleProject,
  CreateProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.route("/").get(getAllProjects).post(CreateProject);
router
  .route("/:id")
  .get(getSingleProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
