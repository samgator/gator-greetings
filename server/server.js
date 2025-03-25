import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import bcrypt from "bcrypt";
import { connectDB, connectMongoose } from "./db/connection.js";
import records from "./routes/record.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
connectDB();
connectMongoose();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5050/messages/post']; // update as needed
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/record", records); // MongoDB example
app.use("/auth", authRoutes); // Regular Authentication Routes
app.use("/messages", messageRoutes); // Messaging routes
app.use("/profile", profileRoutes); // Profile routes


const PORT = process.env.PORT || 5050;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});