import {Socket} from "socket.io";
import conversationModels from "../../models/conversation";
import {updateChatHistory} from "../updates/chatUpdates";
import {ICustomSocketData, IJwtUser} from "../../types";

/**
 * retrieve real-time chat history between 2 users
 * @param socket
 * @param data
 */
const directChatHistoryHandler = async (socket: Socket, data: { receiverUserId: '6276fb4d7e012ac433690af1' }) => {
  try {
    const customSocket = socket as ICustomSocketData;
    const {userId} = customSocket.user as IJwtUser;
    const {receiverUserId} = data;

    // find conversation if it exists between sender and receiver
    const conversation = await conversationModels.findOne({
      participants: { $all: [userId, receiverUserId]},
      type: "DIRECT"
    });

    if (conversation) {
      await updateChatHistory(conversation._id.toString(), socket.id)
    }
  } catch (err) {
    console.log(err);
  }
}

export {directChatHistoryHandler};