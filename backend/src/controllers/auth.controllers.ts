import type { Request, Response } from "express";

const postRegister = async (req: Request, res: Response) => {
  res.send("register route");
};

const postLogin = async (req: Request, res: Response) => {
  res.send("login route");
};

const authControllers = {
  postLogin,
  postRegister
};

export default authControllers;