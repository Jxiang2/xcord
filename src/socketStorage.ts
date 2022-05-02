import {IAddNewConnectedUser} from "./types";

const connectedUsers = new Map(); // online indicator

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

export {
  addNewConnectedUser,
  removeConnectedUser
};