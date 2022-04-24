require('dotenv').config();

import userSchema from "../models/user.models";
import UserModels from "../models/user.models";
import { getJWTToken } from "./auth.helpers";
import bcrypt from "bcryptjs";

import type { Request, Response } from "express";
import type { IUserDetails } from "./auth.helpers";

/**
 * Register new user
 * @param req
 * @param res
 */
const postRegister = async (req: Request, res: Response) => {
  try {
    const { username, mail, password } = req.body;

    // check if user exits
    const userExists = await userSchema.exists({ "mail": mail });
    if (userExists)
      return res.status(409).json({ error:"Email already exists" });

    // encrypt password
    const encrypted = await bcrypt.hash(password, 10);

    // create user in mongoDB
    const user = await userSchema.create({
      username,
      mail: mail.toLowerCase(),
      password: encrypted
    });

    const userDetails: IUserDetails = {
      mail: user.mail,
      token: getJWTToken(user._id, user.mail),
      username: user.username
    };

    return res.status(201).json(userDetails);
  } catch (err) {
    return res.status(500).json({ error: "User Register failed" });
  }
};

/**
 * login an existing user
 * @param req
 * @param res
 */
const postLogin = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    const user = await UserModels.findOne({ mail: mail.toLowerCase() });

    if (user && await bcrypt.compare(password, user.password)) {
      const userDetails: IUserDetails = {
        mail: user.mail,
        token: getJWTToken(user._id, user.mail),
        username: user.username
      }
      return res.status(200).json(userDetails)
    }

    return res.status(404).json({ error: "Invalid credentials" });
  } catch (e) {
    return res.status(500).json({ error: "User Login failed" });
  }
};

const authControllers = {
  postLogin,
  postRegister
};

export default authControllers;