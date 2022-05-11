import userModels from "../models/user.models";
import friendInviteModels from "../models/friendInvite.models";
import socketStorage from "../socketStorage";
import {IFriendProperties} from "../types";

/**
 * real-time update the pending invites of a specific user
 * @param userId
 */
export const updateFriendsPendingInvites = async (userId: string) => {
  try {
    // find all active sockets of the userId
    const receiverSocketList = socketStorage.getActiveSockets(userId);

    if (receiverSocketList.length > 0) {
      const pendingInvites = await friendInviteModels
        .find({receiverId: userId})
        .populate("senderId", "_id username mail")

      // get io instance
      const io = socketStorage.getSocketIoInstance();

      // socket.io server emit "friends-invitations" event to the requesting socket
      receiverSocketList.forEach(rcvSocket => {
        io?.to(rcvSocket).emit("friends-invitations", {
          pendingInvites: pendingInvites ? pendingInvites: [],
        });
      })
    }
  } catch (e) {
    console.log(e);
    throw Error(e as string | undefined)
  }
};

/**
 * real-time update the friend list of a specific user
 * @param userId
 */
export const updateFriends = async (userId: string) => {
  try {
    // find active sockets of current user
    const receiverList = socketStorage.getActiveSockets(userId);

    if (receiverList.length > 0) {
      const user = await userModels
        .findById(userId, {_id: 1, friends: 1})
        .populate("friends", "_id username mail")

      let friendList: IFriendProperties[];

      // get current user
      if (user) {
        friendList = user.friends.map((fr: IFriendProperties) => {
          return {
            id: fr._id,
            mail: fr.mail,
            username: fr.username
          };
        });
      }

      // get io instance
      const io = socketStorage.getSocketIoInstance();

      // send back friendList to client
      receiverList.forEach(rcvSocket => {
        io?.to(rcvSocket).emit("friend-list", {
          friends: friendList ? friendList : []
        });
      });
    }
  } catch (e) {
    console.log(e);
    throw Error(e as string | undefined)
  }
}