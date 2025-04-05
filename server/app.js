import { config } from 'dotenv'
config({ path: './config/config.env' })

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectToDatabase from './config/database.js'


import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import chatRouter from './routes/chat.routes.js'
import groupRouter from './routes/group.routes.js'
import messageRouter from './routes/message.routes.js'

import cleanupAllExpiredData from './Automation/cleanupManager.js'
import { errorMiddleware } from './middlewares/errorHandler.js'


export const app = express()

const allowedOrigins = [process.env.CLIENT_URL, process.env.LOCAL_HOST_URL];
app.use(cors({
   origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ["Authorization", "Content-Type"],
   credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/chats', chatRouter)
app.use('/api/v1/group', groupRouter)
app.use('/api/v1/messages', messageRouter)


connectToDatabase()
cleanupAllExpiredData()


app.use(errorMiddleware)







