import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        originalImage: { type: String, required: true },
        enhancedImage: { type: String, required: true },
        imagekitUrl: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
