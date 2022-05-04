import {Request, Response} from "express";

/**
 * send friend invitation
 * @param req
 * @param res
 */
const postInvite = async (req: Request, res: Response) => {
  const {targetMail} = req.body;
  return res.send(`controller is sending: ${targetMail}`);
};

const friendControllers = {
  postInvite,
};

export default friendControllers;