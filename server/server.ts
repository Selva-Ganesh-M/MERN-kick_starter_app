import { connectToDb } from "./database/db";
import { customErrorHandler } from "./middleware/customErrorHandler";
import * as Colors from "colors.ts";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";

const express = require("express");
const { PORT } = require("./utils/config");
const projectsRouter = require("./routers/projectRouter");
Colors.colors("", "");

const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.use(customErrorHandler);
connectToDb().then(() => {
  console.log("mongo db connected".blue.underline.bold);
  server.listen(PORT, () => console.log("server is listening at port", PORT));
});
