import {Socket} from "socket.io";
import {ICustomSocketData, IDirectMessageData, IJwtUser} from "../types";
import messageModels from "../models/message";
import conversationModels from "../models/conversation";

const directMessageHandler = async (socket: Socket, data: IDirectMessageData) => {
  try {
    const customSocket = socket as ICustomSocketData;
    const {userId} = customSocket.user as IJwtUser;
    const {receiverUserId, content} = data;

    // create new message
    const message = await messageModels.create({
      content: content,
      authorId: userId,
      date: new Date(),
      type: "DIRECT"
    })

    // find if conversation exists between sender and receiver
    const conversation = await conversationModels.findOne({
      participants: { $all: [userId, receiverUserId]}
    })

    if (conversation) {
      conversation.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver
    } else {
      const newConversation = await conversationModels.create({
        messages: [message._id],
        participants: [userId, receiverUserId]
      });

      // real-time update to sender & receiver if is online
    }
  } catch (e) {
    console.log(e);
  }
}

export default directMessageHandler;