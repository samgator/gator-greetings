import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB using Mongoose!");
} catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
}
};

export { connectDB };