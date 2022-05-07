import userModels from "../models/user.models";
import friendInviteModels from "../models/friendInvite.models";
import socketStorage from "../socketStorage";

export const updateFriendsPendingInvites = async (userId: string) => {
  try {
    const pendingInvites = await friendInviteModels
      .find({receiverId: userId})
      .populate("senderId", "_id username mail")

    // find all active user sockets
    const receiverSocketList = socketStorage.getActiveSockets(userId);

    // socket.io server emit "friends-invitations" event to the requesting socket
    const io = socketStorage.getSocketIoInstance();
    receiverSocketList.forEach(rcvSocket => {
      io?.to(rcvSocket).emit("friends-invitations", {
        pendingInvites: pendingInvites ? pendingInvites: [],
      });
    })

  } catch (e) {
    console.log(e);
  }
};