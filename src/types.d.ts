import type {Request} from "express";
import type {JwtPayload} from "jsonwebtoken";
import type {Socket} from "socket.io";

export interface IRequestCustom extends Request {
  user: string | JwtPayload;
}

export interface ISocketJwtPayload extends JwtPayload {
  user: {
    userId: string,
    mail: string,
    iat: number,
    exp: number
  };
}

export interface ISocketData extends Socket {
  user: string | ISocketJwtPayload;
}

export interface IUserDetails {
  mail: string;
  token: string;
  username: string;
}

export interface IAddNewConnectedUser {
  socketId: string;
  userId: string;
}