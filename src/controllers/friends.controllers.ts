import {Request, Response} from "express";

const postInvite = async (req: Request, res: Response) => {
  const {targetMail} = req.body;
  return res.send(`controller is sending: ${targetMail}`);
};

const friendsControllers = {
  postInvite,
};

export default friendsControllers;