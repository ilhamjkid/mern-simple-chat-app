import { Router } from "express";

import { isAuth } from "../middleware/protect.js";
import { getUserLogin } from "../controllers/userController.js";

const router = Router();

router
  .route("/")
  // "GET => /api/users => Get User Login"
  .get(isAuth, getUserLogin);

export default router;
