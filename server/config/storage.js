import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.ATLAS_URI,
  file: (req, file) => {
    return {
      filename: `image_${Date.now()}_${file.originalname}`,
      bucketName: "uploads",
      metadata: {
        fieldName: file.fieldname
      }
    };
  },
});

const upload = multer({ storage });

export default upload;
