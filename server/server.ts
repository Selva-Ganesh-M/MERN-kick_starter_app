const express = require("express");
const { PORT } = require("./utils/config");
const projectsRouter = require("./routers/projectRouter");

const server = express();

server.use("/api/projects", projectsRouter);

server.listen(PORT, () => console.log("server is listening at port", PORT));
