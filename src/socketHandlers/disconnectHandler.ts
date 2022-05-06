import socketStorage from "../socketStorage";
import {Socket} from "socket.io";

const disconnectHandler = (socket: Socket) => {
  socketStorage.removeConnectedUser(socket.id);
};

export {
  disconnectHandler
};