import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
    const [form, setForm] = useState({ title: "", content: "", category: "" });
    const [categories, setCategories] = useState([]);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/categories")
        .then((res) => setCategories(res.data))
        .catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Posting...");
        setLoading(true);
        try {
        await api.post("/posts", form);
        toast.dismiss();
        toast.success("Post created!");
        nav("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full border p-2 rounded focus:ring focus:border-blue-400"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <select
                    className="w-full border p-2 rounded focus:ring focus:border-blue-400"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                <option value="">Select Category</option>
                {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
                </select>

                <textarea
                    placeholder="Post Content"
                    rows="6"
                    className="w-full border p-2 rounded focus:ring focus:border-blue-400"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                    >
                    {loading ? "Posting..." : "Create Post"}
                </button>
            </form>
        </section>
    );
}
