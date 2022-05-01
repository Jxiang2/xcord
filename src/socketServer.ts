import {Server} from "socket.io";
import type http from "http";
import {verifyTokenSocket} from "./middlewares/authSocket.middlewares";
import {newConnectionHandler} from "./socketHandlers/newConnectionHandler";
import {NextFunction} from "express";

/**
 * use socket.io server to wrap the http server
 * @param httpServer
 */
export const registerSocketServer = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // middleware, invoked before events
  io.use((socket, next: any | NextFunction) => verifyTokenSocket(socket, next));

  // events
  io.on("connection", (socket) => {
    console.log("A user with SocketID:", socket.id, "connected");
    newConnectionHandler(socket, io);
  });
};