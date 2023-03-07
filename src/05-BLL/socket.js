import { Server } from "socket.io";
import { getUserFromToken } from "../01-Utils/jwt.js";

export function socketLogic(appServer){
  const options = {
    cors:{
      origin: '*'
    }
  };
  
  const socketIoServer = new Server(appServer,options);

  socketIoServer.sockets.on("connection", (socket)=>{
    const token = socket.request.headers.auth;
    if(token){
      const user = getUserFromToken(token);
      socket.id = user?._id;
    }
    
    socket.on('login', (token)=>{
      const user = getUserFromToken(token);
      socket.id = user?._id;
      console.log(`Socket: ${socket.id} logged-in as ${user?.emails.email} and gets a new socket.id`);
    });

  });

};