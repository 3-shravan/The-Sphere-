import { config } from "dotenv";
config({ path: "./src/config/config.env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import cleanupManager from "./Automation/index.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL, process.env.LOCALHOST_URL];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.status(200).json({
    success: true,
    message: "API's are working 🚀🚀",
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/chats", chatRouter);

cleanupManager();

app.use(errorMiddleware);
export default app;
