import {Request} from "express";
import jwt from "jsonwebtoken";

interface IRequestCustom extends Request {
  user: string | jwt.JwtPayload;
}

interface IUserDetails {
  mail: string;
  token: string;
  username: string;
}

export type {
  IRequestCustom,
  IUserDetails
};