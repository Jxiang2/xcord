import {Request, Response} from "express";
import {ICustomRequest, IJwtUser} from "../types";
import UserModels from "../models/user.models";
import friendInvite from "../models/friendInvite.models";
import {updateFriendsPendingInvites} from "../socketHandlers/updates/friendsUpdates";

/**
 * send friend invitation
 * @param expressReq
 * @param res
 */
const postInvite = async (expressReq: Request, res: Response) => {
  const req = expressReq as ICustomRequest;
  const {targetMail} = req.body;
  const {userId, mail} = req.user as IJwtUser;
  const targetUser = await UserModels.findOne({mail: targetMail.toLowerCase()});

  // check if user is inviting itself
  if (mail.toLowerCase() === targetMail.toLowerCase()) {
    return res.status(409).json({message: "users can not invite themselves"});
  }

  // check if user is in db
  if (!targetUser) {
    return res.status(404).json({message: `Friend of ${targetMail} does not exist`});
  }

  // check if invite already sent
  const inviteAlreadyReceived = await friendInvite.findOne({
    senderId: userId,
    receiverId: targetUser._id
  });

  if (inviteAlreadyReceived) {
    return res.status(409).json({message: "Invite is already sent"});
  }

  // if the user we invite is already a friend
  const usersAlreadyFriends = targetUser.friends
    .find((friendId: any) => friendId.toString() === userId.toString())

  if (usersAlreadyFriends) {
    return res.status(409).json({message: "This friend is already invited"});
  }

  // send invite to DB
  const newInvite = await friendInvite.create({
    senderId: userId,
    receiverId: targetUser._id
  });

  // send real-time pending friend invites update to specific user
  await updateFriendsPendingInvites(targetUser._id.toString());

  return res.status(201).json({message: "Invitation sent"});
};

const friendInviteControllers = {
  postInvite,
};

export default friendInviteControllers;