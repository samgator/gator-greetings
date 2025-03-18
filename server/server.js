import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import bcrypt from "bcrypt";
import googleRoutes from "./routes/googleRoutes.js";
import { connectDB, connectMongoose } from "./db/connection.js";
import records from "./routes/record.js";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();
connectMongoose();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/record", records); // MongoDB example
app.use("/api/auth", googleRoutes); // GoogleOAuth
app.use("/auth", authRoutes); // Regular Authentication
app.use("/messages", messageRoutes); // Messaging routes


const PORT = process.env.PORT || 5050;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});