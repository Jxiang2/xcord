import {IAddNewConnectedUser} from "./types";
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

const connectedUsers = new Map(); // online indicator

let io: Server<DefaultEventsMap, DefaultEventsMap> | null = null;

const setSocketIoInstance = (ioInstance: Server<DefaultEventsMap, DefaultEventsMap> ) => {
  io = ioInstance;
}

const getSocketIoInstance = () => {
  return io;
}

/**
 * add new connector to the temporary memory
 * @param socketId
 * @param userId
 */
const addNewConnectedUser = ({socketId, userId}: IAddNewConnectedUser) => {
  connectedUsers.set(socketId, {userId});
  console.log("current connected users: ", connectedUsers);
};

/**
 * remove a connector from the temporary memory
 * @param socketId
 */
const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("current connected users: ", connectedUsers);
  }
};

/**
 * get a users' all currently online sockets
 * @param userId
 */
const getActiveUsers = (userId: string) => {
  const activeConnections: string[] = [];

  // key: socketId, value: userId
  connectedUsers.forEach((key, value) => {
    if (value.userId === userId)
      activeConnections.push(key)
  });

  return activeConnections;
}

const socketStorage =  {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveUsers,
  setSocketIoInstance,
  getSocketIoInstance
};

export default socketStorage;