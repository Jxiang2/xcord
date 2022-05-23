import conversationModels from "../../models/conversation"
import socketStorage from "../../socketStorage";

const updateChatHistory = async (conversationId: string, toSpecifiedSocketId: string | null = null) => {
    const conversation = await conversationModels.findById(conversationId).populate({
      path: "messages",
      model: "Message",
      populate: {path: "author", model: "User", select: "username _id"}
    });

    if (conversation) {
      const io = socketStorage.getSocketIoInstance();

      if (toSpecifiedSocketId) {
        // init update of chat history
        return io?.to(toSpecifiedSocketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants
        });
      }

      // check if users of this conversation are online
      // if yes, update them of messages
      conversation.participants.forEach((userId: string) => {
        const activeConnections = socketStorage.getActiveSockets(userId.toString());
        activeConnections.forEach(socketId => {
          io?.to(socketId).emit("direct-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants
          });
        });
      });
    }
}

export {updateChatHistory};