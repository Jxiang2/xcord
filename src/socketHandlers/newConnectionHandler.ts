import socketStorage from "../socketStorage";
import {Socket} from "socket.io";
import {ICustomSocketData, IJwtUser} from "../types";
import {updateFriendsPendingInvites} from "./friendUpdatesHandler";

/**
 * handle new connector
 * @param socket
 * @param io
 */
const newConnectionHandler = async (socket: Socket, io: unknown) => {
  const customSocket = socket as ICustomSocketData;
  const userDetail = customSocket.user as IJwtUser;

  socketStorage.addNewConnectedUser({
    socketId: customSocket.id,
    userId: userDetail.userId
  });

  // send real-time pending friend invites update to specific user
  await updateFriendsPendingInvites(userDetail.userId);
};

export {
  newConnectionHandler
};