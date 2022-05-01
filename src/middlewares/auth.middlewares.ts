require('dotenv').config();

import jwt from "jsonwebtoken";

import type {NextFunction, Response} from "express";
import {IRequestCustom} from "../types";

/**
 * verify the existence and validity of the JWT token
 * @param req
 * @param res
 * @param next
 */
export const verifyToken = (req: IRequestCustom, res: Response, next: NextFunction) => {
  let token: string = req.body.token || req.query.token || req.headers["authorization"];

  if (!token)
    return res.status(403).json({message: "a token is required for authentication"});

  try {
    token = token.replace(/^Bearer\s+/, "");
    req.user = jwt.verify(token, process.env.TOKEN_KEY!);
  } catch (err) {
    return res.status(401).json({message: "invalid token"});
  }

  return next();
};