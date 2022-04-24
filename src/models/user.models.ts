import type {Schema} from "mongoose";
import mongoose from "mongoose";

const userSchema: Schema = new mongoose.Schema({
  mail: {type: String, unique: true},
  username: {type: String},
  password: {type: String},
});

export default mongoose.model("user", userSchema);