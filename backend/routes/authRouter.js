import User from "../models/userModel.js";

import { Router } from "express";
import { check } from "express-validator";

import { isAuth } from "../middleware/protect.js";
import { register, login, logout, refresh } from "../controllers/authController.js";

const router = Router();

router
  .route("/register")
  // "POST => /api/auth/register => Register user"
  .post(
    [
      // Name validation
      check("name")
        .not()
        .isEmpty()
        .withMessage("Nama wajib diisi.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Nama harus berisi setidaknya 3 sampai 20 karakter.")
        .custom((value) => {
          if (!/[0-9]/gi.test(value)) return true;
          return Promise.reject("Nama tidak valid.");
        }),
      // Email validation
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email wajib diisi.")
        .isEmail()
        .withMessage("Email tidak valid.")
        .custom(async (value) => {
          const userExists = await User.findOne({ email: value });
          if (userExists) return Promise.reject("Email tidak tersedia.");
          else return true;
        })
        .normalizeEmail(),
      // Password validation
      check("password")
        .not()
        .isEmpty()
        .withMessage("Password wajib diisi.")
        .isLength({ min: 8 })
        .withMessage("Password harus berisi setidaknya 8 karakter.")
        .trim(),
    ],
    register
  );

router
  .route("/login")
  // "POST => /api/auth/login => Login user"
  .post(
    [
      // Email validation
      check("email").not().isEmpty().withMessage("Email wajib diisi.").normalizeEmail(),
      // Password validation
      check("password").not().isEmpty().withMessage("Password wajib diisi.").trim(),
    ],
    login
  );

router
  .route("/logout")
  // "DELETE => /api/auth/logout => Logout user"
  .delete(isAuth, logout);

router
  .route("/refresh")
  // "GET => /api/auth/refresh => Refresh token"
  .get(refresh);

export default router;
