import {Server} from "socket.io";
import type http from "http";
import {verifyTokenSocket} from "./middlewares/authSocket.middlewares";
import {newConnectionHandler} from "./socketHandlers/newConnectionHandler";
import {NextFunction} from "express";
import {disconnectHandler} from "./socketHandlers/disconnectHandler";
import socketStorage from "./socketStorage";

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

  socketStorage.setSocketIoInstance(io);

  // middleware, invoked before events
  io.use((socket, next: any | NextFunction) => verifyTokenSocket(socket, next));

  // events
  io.on("connection", async (socket) => {
    await newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
};