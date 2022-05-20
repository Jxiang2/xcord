import {IAddNewConnectedUser} from "./types";
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import express, {Response} from "express";

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
 * @param res
 */
const removeConnectedUser = (socketId: string, res: Response = express().response) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("current connected users: ", connectedUsers);
  } else {
    res.status(404).json({message: "user not found in socket storage"})
  }
};

/**
 * get a users' all currently online sockets
 * @param userId
 */
const getActiveSockets = (userId: string) => {
  const activeConnections: string[] = [];

  // key: socketId, value: userId
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId)
      activeConnections.push(key)
  });

  return activeConnections;
}

/**
 * get currently online users' userId AND socketId
 */
const getOnlineUsers = () => {
  const onlineUsers: IAddNewConnectedUser[] = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({socketId: key, userId: value.userId})
  });

  return onlineUsers;
}

const socketStorage =  {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveSockets,
  setSocketIoInstance,
  getSocketIoInstance,
  getOnlineUsers
};

export default socketStorage;