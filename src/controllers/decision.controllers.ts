import {Request, Response} from "express";
import friendInviteModels from "../models/friendInvite.models";
import {updateFriendsPendingInvites} from "../socketHandlers/friendInviteUpdatesHandler";
import {ICustomRequest, IJwtUser} from "../types";
import FriendInviteModels from "../models/friendInvite.models";
import userModels from "../models/user.models";

/**
 * accept friend invite, with the invite id provided in request body
 * @param req
 * @param res
 */
const postAccept = async (req: Request, res: Response) => {
  try {
    const {id} = req.body;

    // retrieve senderId, receiverId if invitation exists
    const invite = await FriendInviteModels.findById(id);
    if (!invite) {
      return res.status(401).json({message: "invite not found"})
    }

    const {senderId, receiverId} = invite;

    // add friends to both users
    const senderUser = await userModels.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await userModels.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    // update receiver's pending invites
    await friendInviteModels.findByIdAndDelete(id)
    console.log(receiverId);
    await updateFriendsPendingInvites(receiverId.toString());

    // update the friend list of both users

    // save changes on user model's friends field
    senderUser.save()
    receiverUser.save()

    return res.status(200).json({message: "friend added"})
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: "Something went wrong ..."})
  }
}

/**
 * reject friend invite, with the invite id provided in request body
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