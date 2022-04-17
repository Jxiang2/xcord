import type { Request, Response } from "express";

const postLogin = async (req: Request, res: Response) => {
  res.send("login route");
};

export default postLogin;