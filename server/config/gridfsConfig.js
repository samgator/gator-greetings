import mongoose from "mongoose";
import grid from "gridfs-stream";
import dotenv from "dotenv";
dotenv.config();

const conn = mongoose.createConnection(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("GridFS is ready!");
});

export { gfs, conn };
