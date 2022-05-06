require('dotenv').config();
import {NextFunction} from "express";
import jwt from "jsonwebtoken";
import {IJwtUser, ISocketData} from "../types";
import {Socket} from "socket.io";

/**
 * verify the existence and validity of the JWT token when a user is connected through socket.io
 * @param socket
 * @param next
 */
export const verifyTokenSocket = (socket: Socket, next: NextFunction) => {
  const customSocket = socket as ISocketData;
  const token = customSocket.handshake.auth?.token;

  try {
    // attach user property to socket
    customSocket.user = jwt.verify(token, process.env.TOKEN_KEY!) as IJwtUser;
  } catch (err) {
    const socketErr = new Error("NOT_AUTHORIZED");
    return next(socketErr);
  }

  return next();
};