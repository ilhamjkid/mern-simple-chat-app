import User from "../models/userModel.js";

import asyncHandler from "express-async-handler";

/**
 * @desc    Handling get user login
 * @route   GET => /api/users
 * @access  Private
 */
const getUserLogin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("_id name email");
  const message = "Berhasil mendapatkan user login.";
  res.status(200).json({ message, user });
});

export { getUserLogin };
export default { getUserLogin };
