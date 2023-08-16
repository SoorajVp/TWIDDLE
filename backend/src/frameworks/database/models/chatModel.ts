import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", ChatSchema);
export default Chat;