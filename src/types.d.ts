import type {Request} from "express";
import type {JwtPayload} from "jsonwebtoken";
import type {Socket} from "socket.io";

interface IRequestCustom extends Request {
  user: string | JwtPayload;
}

interface ISocketJwtPayload extends JwtPayload {
  user: {
    userId: string,
    mail: string,
    iat: number,
    exp: number
  };
}

interface ISocketData extends Socket {
  user: string | ISocketJwtPayload;
}

interface IUserDetails {
  mail: string;
  token: string;
  username: string;
}

interface IAddNewConnectedUser {
  socketId: string;
  userId: string;
}

export type {
  IRequestCustom,
  IUserDetails,
  IAddNewConnectedUser,
  ISocketData,
  ISocketJwtPayload
};