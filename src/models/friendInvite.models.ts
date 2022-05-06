import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendInviteSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("FriendInvite", friendInviteSchema);