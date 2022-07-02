import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

import mongoDB from "./config/mongoDB.js";
import accessLogStream from "./helpers/accessLogStream.js";
import errorController from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const server = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const { NODE_ENV, MONGO_URI } = process.env;

server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: CLIENT_URL, credentials: true }));
server.use(morgan("combined", { stream: accessLogStream }));
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.use(errorController.get404Error);
server.use(errorController.getSystemError);

mongoDB.connect(MONGO_URI, (message) => {
  console.log(message);
  server.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log("Server is running");
    if (NODE_ENV !== "production") {
      console.log("Link: http://localhost:" + PORT);
    }
  });
});
