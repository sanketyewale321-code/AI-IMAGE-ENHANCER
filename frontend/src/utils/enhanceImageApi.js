import axios from "axios";

export const enhancedImageAPI = async (file) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Please login first");
        }

        const formData = new FormData();
        formData.append("image_file", file);

        const { data } = await axios.post(
            "http://localhost:5000/api/enhance",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return data;
    } catch (error) {
        console.log("Error enhancing image:", error.message);
        throw error;
    }
};
