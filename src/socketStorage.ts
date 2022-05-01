import {IAddNewConnectedUser} from "./types";

const connectedUsers = new Map(); // online indicator

/**
 * add new connector to the temporary memory
 * @param socketId
 * @param userId
 */
const addNewConnectedUser = ({socketId, userId}: IAddNewConnectedUser) => {
  connectedUsers.set(socketId, {userId});
  console.log(connectedUsers, "added to connectedUsers");
};

/**
 * remove a connector from the temporary memory
 * @param socketId
 */
const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("new connected users: ", connectedUsers);
  }
};

export {
  addNewConnectedUser,
  removeConnectedUser
};