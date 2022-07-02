import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import sendError from "../helpers/sendError.js";

/**
 * @desc    Handling send message
 * @route   POST => /api/messages
 * @access  Private
 */
const sendMessage = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendError("Validasi gagal.", 422, errors.mapped());

  // Save message to database with senderId and receiverId
  const { value, receiverId } = req.body;
  if (receiverId.toString() === req.user._id.toString()) {
    return sendError("Gagal mengirimkan pesan.", 400);
  }
  const sender = await User.findById(req.user._id);
  const receiver = await User.findById(receiverId);
  if (!sender || !receiver) return sendError("Tidak ditemukan.", 404);
  const message = await Message.create({ value, sender, receiver });

  // Send back message to frontend with populate user
  const messagePopulate = await Message.findById(message._id).populate(
    "sender receiver",
    "_id name email"
  );

  res.status(201).json({
    message: "Berhasil mengirim pesan.",
    messageSent: messagePopulate,
  });
});

/**
 * @desc    Handling fetch all messages
 * @route   GET => /api/messages/:receiverId
 * @access  Private
 */
const getMessages = asyncHandler(async (req, res, next) => {
  const { receiverId } = req.params;
  if (!receiverId) return sendError("Tidak ditemukan.", 404);

  if (receiverId.toString() === req.user._id.toString()) {
    return sendError("Gagal mendapatkan pesan.", 400);
  }

  // Find messages matching sender and receiver id
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id },
    ],
  }).populate("sender receiver", "_id name email");

  res.status(200).json({
    message: "Berhasil mendapatkan pesan.",
    messages,
  });
});

export { sendMessage, getMessages };
export default { sendMessage, getMessages };
