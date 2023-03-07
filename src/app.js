import express from "express";
import http from "http";
import cors from "cors";
import { socketLogic } from "./05-BLL/socket.js";
import  authController  from "./06-Controllers/auth-controller.js";
import  usersController  from "./06-Controllers/users-controller.js";
import  homeController  from "./06-Controllers/home-controller.js";
import config from "./01-Utils/config.js";
import errorsHandler from "./02-Middlewares/errors-handler.js";
import { connect } from "./04-DAL/dal.js";
import ClientError from "./03-Models/client-error.js";

const app = express();
const server = http.Server(app);

connect();
app.use(cors());
app.use(express.json());

app.use('/api', homeController);
app.use('/api/auth', authController);
app.use('/api/users', usersController);


app.use("*", (req, res, next) => {
  const clientErr = new ClientError(400,"Route Not Found");
  next(clientErr); // Will jump to the Catch-All Middleware
});

app.use(errorsHandler);
server.listen(config.port,()=>{
  console.log(`Listening on port: ${config.port}`);
});
socketLogic(server);