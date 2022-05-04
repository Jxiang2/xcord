import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendInviteSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

export default mongoose.model("friendInvite", friendInviteSchema);