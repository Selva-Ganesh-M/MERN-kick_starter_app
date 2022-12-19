import * as express from "express";
const {
  getAllProjectsHandler,
  getSingleProjectHandler,
  CreateProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} = require("../controllers/projectController");

const router = express.Router();

router.route("/").get(getAllProjectsHandler).post(CreateProjectHandler);
router
  .route("/:id")
  .get(getSingleProjectHandler)
  .put(updateProjectHandler)
  .delete(deleteProjectHandler);

module.exports = router;
