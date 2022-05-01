import {addNewConnectedUser} from "../socketStorage";
import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {ISocketData, ISocketJwtPayload} from "../types";

const newConnectionHandler = (socket: Socket, io: Server<DefaultEventsMap, DefaultEventsMap>) => {
  const customSocket = socket as ISocketData;
  const userDetail = customSocket.user as ISocketJwtPayload;

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetail.userId
  });
};

export {
  newConnectionHandler
};