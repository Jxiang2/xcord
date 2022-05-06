import {Schema} from "mongoose";
import mongoose from "mongoose";

const userSchema: Schema = new mongoose.Schema({
  mail: {type: String, unique: true},
  username: {type: String},
  password: {type: String},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

export default mongoose.model("User", userSchema);