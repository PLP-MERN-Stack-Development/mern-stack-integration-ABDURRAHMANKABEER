import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchPosts = async () => {
        try {
        const res = await axios.get("/posts/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.data);
        } catch (err) {
        toast.error("Failed to load your posts");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        if(!window.confirm("Are you sure you want to delete this post?")) return;

        try {
        await axios.delete(`/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Post deleted");
        setPosts(posts.filter(p => p._id !== id));
        } catch (err) {
        toast.error("Delete failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Posts</h1>

            {posts.length === 0 ? (
                <p>No posts yet!</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post._id} className="p-4 border rounded shadow-sm flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold text-lg">{post.title}</h2>
                                <p className="text-sm text-gray-500">{post.category?.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-post/${post._id}`}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                    >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deletePost(post._id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
