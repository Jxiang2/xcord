import type { Request, Response } from "express";

const postRegister = async (req: Request, res: Response) => {
  res.send("register route");
};

export default postRegister;
