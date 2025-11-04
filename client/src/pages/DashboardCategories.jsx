import React, { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";
import Button from "../components/Button";

export default function DashboardCategories() {
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
        const res = await categoryService.getCategories();
        setCategories(res);
        } catch (err) {
        console.log(err);
        alert("Failed to load categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return alert("Category name required");

        setLoading(true);
        try {
        await categoryService.createCategory({ name });
        setName("");
        setOpenModal(false);
        fetchCategories();
        } catch (err) {
        alert(err.response?.data?.message || "Failed to create category");
        }
        setLoading(false);
    };

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Manage Categories</h1>
                <Button variant="primary" onClick={() => setOpenModal(true)}>
                + Add Category
                </Button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((c) => (
                <div
                    key={c._id}
                    className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
                >
                    <h2 className="font-semibold text-lg">{c.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">/{c.slug}</p>
                </div>
                ))}
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
                        <form onSubmit={handleCreate}>
                            <input
                                type="text"
                                placeholder="Category name"
                                className="w-full border rounded-lg p-2 mb-4"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setOpenModal(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Saving..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
