import conversationModels from "../../models/conversation"
import socketStorage from "../../socketStorage";

/**
 * update real-time chat history between 2 users
 * @param conversationId
 * @param toSpecifiedSocketId
 */
const updateChatHistory = async (conversationId: string, toSpecifiedSocketId: string | null = null) => {
    const conversation = await conversationModels.findById(conversationId).populate({
      path: "messages",
      model: "Message",
      populate: {path: "author", model: "User", select: "username _id"}
    });

    if (conversation) {
      const io = socketStorage.getSocketIoInstance();

      if (toSpecifiedSocketId) {
        // init update of chat history for when user requesting it at the first time
        return io?.to(toSpecifiedSocketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants
        });
      }

      // update all chat participants the chat history if they are online
      conversation.participants.forEach((userId: string) => {
        const activeConnections = socketStorage.getActiveSockets(userId.toString());
        return activeConnections.forEach(socketId => {
          io?.to(socketId).emit("direct-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants
          });
        });
      });
    }
}

export {updateChatHistory};