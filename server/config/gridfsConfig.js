import mongoose from "mongoose";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
dotenv.config();

const conn = mongoose.createConnection(process.env.ATLAS_URI, {});

let gfs, gridfsBucket;
conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
 bucketName: 'uploads'
});

 gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('uploads');
})

export { gfs, conn, gridfsBucket };
