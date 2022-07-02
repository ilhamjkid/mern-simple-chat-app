import { Router } from "express";

import { isAuth } from "../middleware/protect.js";
import { getUserLogin, getAllUsers } from "../controllers/userController.js";

const router = Router();

router
  .route("/")
  // "GET => /api/users => Get User Login"
  .get(isAuth, getUserLogin);

router
  .route("/all")
  // "GET => /api/users/all => Get All Users"
  .get(isAuth, getAllUsers);

export default router;
