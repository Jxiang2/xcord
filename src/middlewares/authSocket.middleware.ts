require('dotenv').config();

import {NextFunction} from "express";
import jwt from "jsonwebtoken";
import {ISocketData, ISocketJwtPayload} from "../types";
import {Socket} from "socket.io";

export const verifyTokenSocket = (socket: Socket, next: NextFunction) => {
  const customSocket = socket as ISocketData;
  const token = customSocket.handshake.auth?.token;

  try {
    // attach user property to socket
    customSocket.user = jwt.verify(token, process.env.TOKEN_KEY!) as ISocketJwtPayload;
  } catch (err) {
    const socketErr = new Error("NOT_AUTHORIZED");
    return next(socketErr);
  }

  return next();
};