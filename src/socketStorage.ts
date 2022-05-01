import {IAddNewConnectedUser} from "./types";

const connectedUsers = new Map();

/**
 * add new connector to the temporary memory
 * @param socketId
 * @param userId
 */
const addNewConnectedUser = ({socketId, userId}: IAddNewConnectedUser) => {
  connectedUsers.set(socketId, {userId});
  console.log(connectedUsers, "added to connectedUsers");
};

export {
  addNewConnectedUser
};