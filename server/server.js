import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./db/connection.js";
import records from "./routes/record.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/record", records);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5050;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});