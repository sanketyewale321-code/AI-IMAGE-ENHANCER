import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import getImageKit from "../config/imagekit.js";
import Image from "../models/Image.js";

const BASE_URL = "https://techhk.aoscdn.com";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createEnhanceTask = async (filePath) => {
    const form = new FormData();
    form.append("image_file", fs.createReadStream(filePath));

    const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, form, {
        headers: {
            ...form.getHeaders(),
            "X-API-KEY": process.env.API_KEY,
        },
        maxBodyLength: Infinity,
    });

    const taskId = data?.data?.task_id;
    if (!taskId) {
        throw new Error("Failed to create enhance task");
    }

    return taskId;
};

const fetchTask = async (taskId) => {
    const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
        headers: { "X-API-KEY": process.env.API_KEY },
    });

    if (!data?.data) {
        throw new Error("Failed to fetch task result");
    }

    return data.data;
};

const pollUntilDone = async (taskId) => {
    const maxRetries = 30;
    const delayMs = 2000;

    for (let i = 0; i < maxRetries; i++) {
        const result = await fetchTask(taskId);
        if (result.state !== 4) {
            return result;
        }
        await sleep(delayMs);
    }

    throw new Error("Enhancement timed out. Please try again.");
};

const downloadAsBuffer = async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
};

const uploadToImageKit = async (buffer, fileName) => {
    const imagekit = getImageKit();
    const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
    });

    if (!uploadResponse?.url) {
        throw new Error("ImageKit upload failed");
    }

    return uploadResponse.url;
};

export const enhanceImage = async (req, res) => {
    try {
        if (!process.env.API_KEY) {
            return res.status(500).json({ message: "API_KEY is not configured" });
        }

        if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
            return res.status(500).json({ message: "ImageKit credentials are not configured" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "image_file is required" });
        }

        const originalLocalPath = req.file.path;
        const originalImage = `/uploads/${req.file.filename}`;

        const taskId = await createEnhanceTask(originalLocalPath);
        const result = await pollUntilDone(taskId);

        const enhancedUrl = result?.image;
        if (!enhancedUrl) {
            return res.status(500).json({ message: "Enhanced image URL not found" });
        }

        const enhancedBuffer = await downloadAsBuffer(enhancedUrl);
        const imagekitUrl = await uploadToImageKit(enhancedBuffer, `enhanced_${Date.now()}_${req.file.originalname}`);

        const saved = await Image.create({
            userId: req.user._id,
            originalImage,
            enhancedImage: enhancedUrl,
            imagekitUrl,
        });

        return res.status(201).json({
            id: saved._id,
            originalImage: saved.originalImage,
            enhancedImage: saved.enhancedImage,
            imagekitUrl: saved.imagekitUrl,
            createdAt: saved.createdAt,
            image: saved.imagekitUrl,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Server error" });
    }
};

export const getImages = async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.json(images);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const image = await Image.findOne({ _id: req.params.id, userId: req.user._id });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        await image.deleteOne();
        return res.json({ message: "Image deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const downloadImage = async (req, res) => {
    try {
        const image = await Image.findOne({ _id: req.params.id, userId: req.user._id });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        return res.json({ url: image.imagekitUrl });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};
