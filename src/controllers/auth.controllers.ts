require('dotenv').config();
import jwt from "jsonwebtoken";
import userSchema from "../models/user.models";
import UserModels from "../models/user.models";
import bcrypt from "bcryptjs";
import type {Request, Response} from "express";
import {ICustomRequest, IUserLoginData} from "../types";

/**
 * create new JWT token
 * @param userId
 * @param mail
 */
const getJWTToken = (userId: string, mail: string) => {
  return jwt.sign(
    {userId, mail},
    process.env.TOKEN_KEY as string,
    {expiresIn: "1h"}
  );
};

/**
 * Register new user
 * @param req
 * @param res
 */
const postRegister = async (req: Request, res: Response) => {
  try {
    const {username, mail, password} = req.body;

    // check if user exits
    const userExists = await userSchema.exists({"mail": mail});
    if (userExists)
      return res.status(409).json({message: "email already exists"});

    // encrypt password
    const encrypted = await bcrypt.hash(password, 10);

    // create user in mongoDB
    const user = await userSchema.create({
      username,
      mail: mail.toLowerCase(),
      password: encrypted
    });

    const userDetails: IUserLoginData = {
      mail: user.mail,
      token: getJWTToken(user._id, user.mail),
      username: user.username
    };

    return res.status(201).json(userDetails);
  } catch (err) {
    return res.status(500).json({message: "user register failed"});
  }
};

/**
 * login an existing user
 * @param req
 * @param res
 */
const postLogin = async (req: Request, res: Response) => {
  try {
    const {mail, password} = req.body;
    const user = await UserModels.findOne({mail: mail.toLowerCase()});

    // authenticate user
    if (user && await bcrypt.compare(password, user.password)) {
      const userDetails: IUserLoginData = {
        mail: user.mail,
        token: getJWTToken(user._id, user.mail),
        username: user.username
      };

      return res.status(200).json(userDetails);
    }

    return res.status(404).json({message: "invalid credentials"});
  } catch (e) {
    return res.status(500).json({message: "user Login failed"});
  }
};

/**
 * change username
 * @param expressReq
 * @param res
 */
const patchChangeUsername = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as ICustomRequest;
    const newUsername = req.body.newUsername;
    const reqUser = req.user as jwt.JwtPayload;

    const user = await UserModels.findByIdAndUpdate(reqUser.userId, {username: newUsername});

    if (user.username === newUsername)
      return res.status(400).json({message: "new username must be different"});

    return res.status(200).json({
      message: "username updated",
      user: {
        username: newUsername,
        mail: user.mail
      }
    });
  } catch (e) {
    return res.status(500).json({message: "change username failed"});
  }
};

const authControllers = {
  postLogin,
  postRegister,
  patchChangeUsername
};

export default authControllers;