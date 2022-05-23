import {Server} from "socket.io";
import type http from "http";
import {verifyTokenSocket} from "./middlewares/authSocket.middlewares";
import {newConnectionHandler} from "./socketHandlers/newConnectionHandler";
import {NextFunction} from "express";
import {disconnectHandler} from "./socketHandlers/disconnectHandler";
import socketStorage from "./socketStorage";
import directMessageHandler from "./socketHandlers/directChat/directMessageHandler";
import {directChatHistoryHandler} from "./socketHandlers/directChat/directChatHistoryHandler";

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

  // middlewares
  io.use((socket, next: any | NextFunction) => verifyTokenSocket(socket, next));

  // emitters
  const emitOnlineUsers = () => {
    const onlineUsers = socketStorage.getOnlineUsers();
    io.emit("online-users", {onlineUsers: onlineUsers})
  }

  // events
  io.on("connection", async (socket) => {
    await newConnectionHandler(socket, io);

    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    })

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });

    socket.on("direct-chat-history", (data)=>{
      directChatHistoryHandler(socket, data);
    })
  });

  setInterval(()=> emitOnlineUsers(), 8000);
};