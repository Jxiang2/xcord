import {IAddNewConnectedUser} from "./types";

const connectedUsers = new Map();

const addNewConnectedUser = ({socketId, userId}: IAddNewConnectedUser) => {
  connectedUsers.set(socketId, {userId});
  console.log(connectedUsers, "connected");
};

export {
  addNewConnectedUser
};