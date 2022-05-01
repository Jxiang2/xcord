import {removeConnectedUser} from "../socketStorage";
import {Socket} from "socket.io";

const disconnectHandler = (socket: Socket) => {
  removeConnectedUser(socket.id);
};

export {
  disconnectHandler
};