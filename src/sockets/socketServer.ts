import {Server} from "socket.io";
import type http from "http";
import {verifyTokenSocket} from "../middlewares/authSocket.middleware";

export const registerSocketServer = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // middleware, invoked before events
  io.use((socket, next: any) => verifyTokenSocket(socket, next));

  // events
  io.on("connection", (socket) => {
    console.log("a user connected");
    console.log(socket.id);
  });
};