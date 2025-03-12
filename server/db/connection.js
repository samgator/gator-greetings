import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    db = client.db("gatorgreetings");
  } catch(err) {
    console.error("Error Connecting to MongoDB");
    process.exit(1);
  }
};

const connectMongoose = async () => {
  try {
      await mongoose.connect(uri);
      console.log("Successfully connected to MongoDB using Mongoose");
  } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
  }
};

export { connectDB, connectMongoose, db };