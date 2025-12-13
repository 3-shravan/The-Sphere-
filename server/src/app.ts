import { config } from "dotenv";

config({ path: "./src/config/config.env" });

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Request, type Response } from "express";

import cleanupManager from "./Automation/index.js";

import { corsOptions } from "./config/cors.js";
import { errorMiddleware } from "./middlewares/errMiddleware.js";

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SERVER IS LIVE 🗽",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/chats", chatRouter);

cleanupManager();

app.use(errorMiddleware);

export default app;
