import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import { categoryService } from "../services/categoryService";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [newCategory, setNewCategory] = useState("");

    // FETCH POSTS
    const loadPosts = async () => {
        try {
        const data = await PostService.getPosts();
        setPosts(data);
        } catch (err) {
        toast.error("Failed to load posts");
        } finally {
        setLoadingPosts(false);
        }
    };

    // FETCH CATEGORIES
    const loadCategories = async () => {
        try {
        const data = await categoryService.getCategories();
        setCategories(data);
        } catch (err) {
        toast.error("Failed to load categories");
        } finally {
        setLoadingCategories(false);
        }
    };

    useEffect(() => {
        loadPosts();
        loadCategories();
    }, []);

    // DELETE POST
    const handleDeletePost = async (id) => {
        if (!window.confirm("Delete this post?")) return;

        try {
        await PostService.deletePost(id);
        toast.success("Post deleted");
        loadPosts();
        } catch (err) {
        toast.error("Failed to delete post");
        }
    };

    // ADD CATEGORY
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return toast.error("Category cannot be empty");

        try {
        await categoryService.createCategory({ name: newCategory });
        toast.success("Category added");
        setNewCategory("");
        loadCategories();
        } catch (err) {
        toast.error("Failed to add category");
        }
    };

    // DELETE CATEGORY
    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        try {
        await categoryService.deleteCategory(id);
        toast.success("Category deleted");
        loadCategories();
        } catch (err) {
        toast.error("Failed to delete category");
        }
    };

    return (
        <div className="space-y-10 text-gray-900 dark:text-gray-200">

        {/* POSTS SECTION */}
        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">All Posts</h2>

            {loadingPosts ? (
            <p>Loading posts...</p>
            ) : posts.length === 0 ? (
            <p>No posts yet</p>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full border rounded">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2 text-left">Author</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                    <tr key={post._id} className="border-t dark:border-gray-700">
                        <td className="p-2">{post.title}</td>
                        <td className="p-2">{post.author?.name}</td>
                        <td className="p-2 flex items-center gap-2">
                        <button
                            onClick={() => handleDeletePost(post._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <a
                            href={`/edit-post/${post._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Edit
                        </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </section>

        {/* CATEGORIES SECTION */}
        <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Categories</h2>

            {/* Add Category */}
            <div className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 border rounded w-60 bg-white dark:bg-gray-800 dark:text-gray-100"
            />
            <button
                onClick={handleAddCategory}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Add
            </button>
            </div>

            {loadingCategories ? (
            <p>Loading categories...</p>
            ) : (
            <ul className="space-y-2">
                {categories.map((cat) => (
                <li
                    key={cat._id}
                    className="flex justify-between items-center border p-2 rounded dark:border-gray-700"
                >
                    {cat.name}
                    <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                    Delete
                    </button>
                </li>
                ))}
            </ul>
            )}
        </section>

    </div>
    );
}
