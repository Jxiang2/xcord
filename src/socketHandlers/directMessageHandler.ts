import {Socket} from "socket.io";
import {ICustomSocketData, IDirectMessageData, IJwtUser} from "../types";
import messageModels from "../models/message";
import conversationModels from "../models/conversation";
import {updateChatHistory} from "./updates/chatUpdates";

const directMessageHandler = async (socket: Socket, data: IDirectMessageData) => {
  try {
    const customSocket = socket as ICustomSocketData;
    const {userId} = customSocket.user as IJwtUser;
    const {receiverUserId, content} = data;

    // create new message
    const message = await messageModels.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT"
    })

    // find conversation if it exists between sender and receiver
    const conversation = await conversationModels.findOne({
      participants: { $all: [userId, receiverUserId]}
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // real-time update to sender & receiver if is online
      await updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await conversationModels.create({
        participants: [userId, receiverUserId],
        messages: [message._id],
      });

      // real-time update to sender & receiver if is online
      await updateChatHistory(conversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
}

export default directMessageHandler;