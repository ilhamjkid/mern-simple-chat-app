import { Router } from "express";
import { check } from "express-validator";

import { isAuth } from "../middleware/protect.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

router
  .route("/")
  // "POST => /api/messages => Send message"
  .post(
    isAuth,
    [
      // Message validation
      check("value").not().isEmpty().withMessage("Pesan wajib diisi.").trim(),
      // Receiver ID validation
      check("receiverId").not().isEmpty().withMessage("ID Penerima wajib diisi.").trim(),
    ],
    sendMessage
  );

router
  .route("/:receiverId")
  // "GET => /api/messages/:receiverId => Get Messages"
  .get(isAuth, getMessages);

export default router;
