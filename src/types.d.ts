import type {Request} from "express";
import type {JwtPayload} from "jsonwebtoken";
import type {Socket} from "socket.io";

export interface IJwtUser extends JwtPayload {
  userId: string,
  mail: string,
  iat: number,
  exp: number
}

export interface ICustomRequest extends Request {
  user: string | IJwtUser;
}

export interface ISocketData extends Socket {
  user: string | IJwtUser;
}

export interface IUserLoginData {
  mail: string;
  token: string;
  username: string;
}

export interface IAddNewConnectedUser {
  socketId: string;
  userId: string;
}