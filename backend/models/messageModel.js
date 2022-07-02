import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
