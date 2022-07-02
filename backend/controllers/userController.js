import User from "../models/userModel.js";

import asyncHandler from "express-async-handler";

/**
 * @desc    Handling get user login
 * @route   GET => /api/users
 * @access  Private
 */
const getUserLogin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("_id name email");
  res.status(200).json({
    message: "Berhasil mendapatkan user login.",
    success: true,
    user,
  });
});

/**
 * @desc    Handling get all users
 * @route   GET => /api/users/all
 * @access  Private
 */
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().where("_id").ne(req.user._id).select("_id name email");
  res.status(200).json({
    message: "Berhasil mendapatkan semua user.",
    success: true,
    users,
  });
});

export { getUserLogin, getAllUsers };
export default { getUserLogin, getAllUsers };
