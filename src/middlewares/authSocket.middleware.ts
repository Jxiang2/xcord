import {NextFunction} from "express";
import jwt from "jsonwebtoken";

require('dotenv').config();

export const verifyTokenSocket = (socket: any, next: NextFunction) => {
  const token = socket.handshake.auth?.token;

  try {
    socket.user = jwt.verify(token, process.env.TOKEN_KEY!);
  } catch (err) {
    const socketErr = new Error("NOT_AUTHORIZED");
    return next(socketErr);
  }

  return next();
};