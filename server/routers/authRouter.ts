const express = require("express");
import authController from "../controllers/authController";
const authRouter = express.Router();

authRouter.post("/signup", authController.signupHandler);
authRouter.post("/login", authController.loginHandler);

export default authRouter;
