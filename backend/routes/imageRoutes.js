import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authMiddleware from "../middleware/authMiddleware.js";
import { deleteImage, downloadImage, enhanceImage, getImages } from "../controllers/imageController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const upload = multer({ storage });

router.post("/enhance", authMiddleware, upload.single("image_file"), enhanceImage);
router.get("/images", authMiddleware, getImages);
router.delete("/images/:id", authMiddleware, deleteImage);
router.get("/download/:id", authMiddleware, downloadImage);

export default router;
