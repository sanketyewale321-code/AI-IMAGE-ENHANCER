import axios from "axios";
import { useEffect, useState } from "react";
import CompareSlider from "../components/CompareSlider.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = "http://localhost:5000/api";

const History = () => {
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        setError("");
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE}/images`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(data);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) return;
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const onDelete = async (id) => {
        await axios.delete(`${API_BASE}/images/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setItems((prev) => prev.filter((x) => x._id !== id));
    };

    const onDownload = async (id) => {
        const { data } = await axios.get(`${API_BASE}/download/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        window.open(data.url, "_blank", "noopener,noreferrer");
    };

    if (!token) {
        return (
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
                <div className="text-gray-700">Please login to view history.</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl">
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800">Image History</h2>
                {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

                {loading ? (
                    <div className="mt-6 text-gray-600">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="mt-6 text-gray-600">No images yet.</div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-6">
                        {items.map((img) => (
                            <div key={img._id} className="bg-gray-50 rounded-2xl p-4 border">
                                <div className="text-sm text-gray-500 mb-3">
                                    {img.createdAt ? new Date(img.createdAt).toLocaleString() : ""}
                                </div>

                                <CompareSlider
                                    before={`http://localhost:5000${img.originalImage}`}
                                    after={img.imagekitUrl}
                                    height={340}
                                />

                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => onDownload(img._id)}
                                        className="px-4 py-2 rounded-lg bg-blue-700 text-white font-medium"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => onDelete(img._id)}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
