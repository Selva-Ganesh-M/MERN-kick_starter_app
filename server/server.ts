import { customErrorHandler } from "./middleware/customErrorHandler";

const express = require("express");
const { PORT } = require("./utils/config");
const projectsRouter = require("./routers/projectRouter");

const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);

server.use(customErrorHandler);
server.listen(PORT, () => console.log("server is listening at port", PORT));
