import {Request, Response} from "express";
import {ICustomRequest, IJwtUser} from "../types";

/**
 * send friend invitation
 * @param expressReq
 * @param res
 */
const postInvite = async (expressReq: Request, res: Response) => {
  const req = expressReq as ICustomRequest;
  const {targetMail} = req.body;
  const {userId, mail} = req.user as IJwtUser;
};

const friendControllers = {
  postInvite,
};

export default friendControllers;