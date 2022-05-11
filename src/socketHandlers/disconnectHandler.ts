import socketStorage from "../socketStorage";
import {Socket} from "socket.io";

/**
 * remove users from socket storage
 * @param socket
 */
const disconnectHandler = (socket: Socket) => {
  socketStorage.removeConnectedUser(socket.id);
};

export {
  disconnectHandler
};