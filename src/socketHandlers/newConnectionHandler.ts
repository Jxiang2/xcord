import socketStorage from "../socketStorage";
import {Socket} from "socket.io";
import {ICustomSocketData, IJwtUser} from "../types";

/**
 * handle new connector
 * @param socket
 * @param io
 */
const newConnectionHandler = (socket: Socket, io: unknown) => {
  const customSocket = socket as ICustomSocketData;
  const userDetail = customSocket.user as IJwtUser;

  socketStorage.addNewConnectedUser({
    socketId: customSocket.id,
    userId: userDetail.userId
  });
};

export {
  newConnectionHandler
};