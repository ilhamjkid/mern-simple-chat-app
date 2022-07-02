import User from "../models/userModel.js";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sendError from "../helpers/sendError.js";

const { NODE_ENV, ACCESS_TOKEN, REFRESH_TOKEN, JWT_AGE, JWT_EXP } = process.env;

/**
 * @desc    Handling register user
 * @route   POST => /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendError("Validasi gagal.", 422, errors.mapped());

  // Create new user
  const { name, email, password: rawPW } = req.body;
  const password = await bcrypt.hash(rawPW, 12);
  const verified = { status: true };
  const user = await User.create({ name, email, password, verified });

  res.status(201).json({
    message: "Berhasil mendaftar.",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * @desc    Handling login user
 * @route   POST => /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendError("Validasi gagal.", 422, errors.mapped());

  // Check if user exists
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  const errorMessage = "Gagal masuk, Email atau Password salah.";
  if (!userExists) return sendError(errorMessage, 401);

  // Check if password match
  const { name, password: pwHash } = userExists;
  if (!(await bcrypt.compare(password, pwHash))) return sendError(errorMessage, 401);

  // Check if user verified
  if (!userExists.verified?.status) return sendError("Akun belum diverifikasi.", 403);

  // Create access token & refresh token
  const accessToken = jwt.sign({ name, email }, ACCESS_TOKEN, { expiresIn: "30s" });
  const refreshToken = jwt.sign({ name, email }, REFRESH_TOKEN, { expiresIn: JWT_EXP });
  userExists.refreshToken = refreshToken;
  await userExists.save();

  res.cookie("refreshToken", refreshToken, {
    maxAge: +JWT_AGE,
    httpOnly: true,
    secure: NODE_ENV === "production",
  });
  res.cookie("authenticated", true, {
    maxAge: +JWT_AGE,
    httpOnly: false,
    secure: NODE_ENV === "production",
  });
  res.status(200).json({
    message: "Berhasil masuk.",
    user: {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    },
    accessToken,
  });
});

/**
 * @desc    Handling logout user
 * @route   DELETE => /api/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res, next) => {
  // Delete refresh token from database
  const user = await User.findById(req.user._id);
  user.refreshToken = null;
  await user.save();

  // Delete refresh token from cookies
  res.clearCookie("refreshToken");
  res.clearCookie("authenticated");

  res.status(200).json({ message: "Berhasil keluar." });
});

/**
 * @desc    Handling refresh token
 * @route   GET => /api/auth/refresh
 * @access  Public
 */
const refresh = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  // Check if refresh token exists on cookies
  if (!refreshToken) {
    res.clearCookie("refreshToken");
    res.clearCookie("authenticated");
    return sendError("Tidak diizinkan.", 401);
  }
  // Check if refresh token exists on database user
  const userExists = await User.findOne({ refreshToken });
  if (!userExists) {
    res.clearCookie("refreshToken");
    res.clearCookie("authenticated");
    return sendError("Tidak diizinkan.", 401);
  }
  // Verify refresh token with secret token
  if (!jwt.verify(refreshToken, REFRESH_TOKEN)) {
    res.clearCookie("refreshToken");
    res.clearCookie("authenticated");
    return sendError("Tidak diizinkan.", 401);
  }

  // Create new access token
  const { name, email } = userExists;
  const accessToken = jwt.sign({ email, name }, ACCESS_TOKEN, { expiresIn: "30s" });

  res.cookie("authenticated", true, {
    maxAge: +JWT_AGE,
    httpOnly: false,
    secure: NODE_ENV === "production",
  });
  res.status(200).json({
    message: "Berhasil mendapatkan token.",
    accessToken,
  });
});

export { register, login, logout, refresh };
export default { register, login, logout, refresh };
