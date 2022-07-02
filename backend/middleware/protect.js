import User from "../models/userModel.js";

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import sendError from "../helpers/sendError.js";

const { ACCESS_TOKEN } = process.env;

// Check if auth user
const isAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return sendError("Tidak diizinkan.", 401);
  const token = authHeader.split(" ")[1];
  if (!token) return sendError("Tidak diizinkan.", 401);
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN);
    const userExists = await User.findOne({ email: decoded.email });
    if (!userExists) return sendError("Tidak ditemukan.", 404);
    if (!userExists.refreshToken) return sendError("Akses dilarang.", 403);
    req.user = userExists;
    next();
  } catch (err) {
    sendError("Akses dilarang.", 403);
  }
});

export { isAuth };
export default { isAuth };
