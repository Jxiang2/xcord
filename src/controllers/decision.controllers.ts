import {Request, Response} from "express";
import friendInviteModels from "../models/friendInvite.models";
import {updateFriendsPendingInvites} from "../socketHandlers/friendInviteUpdatesHandler";
import {ICustomRequest, IJwtUser} from "../types";

const postAccept = async (req: Request, res: Response) => {
  return res.send("hello accept")
}

/**
 * reject friend invite, with the sender id provided in request body
 * @param expressReq
 * @param res
 */
const postReject = async (expressReq: Request, res: Response) => {
  try {
    const req = expressReq as ICustomRequest;
    const {id} = req.body;
    const {userId} = req.user as IJwtUser;

    // find invite in the database
    const invitationExists = await friendInviteModels.exists({_id: id});
    if (invitationExists) {
      await friendInviteModels.findByIdAndDelete(id);
    }

    // update pending invites
    await updateFriendsPendingInvites(userId);

    return res.status(200).json({message: "Invite rejected"})
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: "Something went wrong ..."})
  }
}

const decisionControllers = {
  postAccept,
  postReject
}

export default decisionControllers;