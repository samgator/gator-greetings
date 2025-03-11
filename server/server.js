import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import bcryptjs from "bcryptjs";
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


app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // user existence
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // use bcrypt to hash passwords for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save to database
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
} catch (error) {
    res.status(500).json({ message: "Server error" });
}
});


const PORT = process.env.PORT || 5050;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});