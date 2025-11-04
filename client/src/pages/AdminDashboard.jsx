// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        const res = await PostService.getMyPosts();
        setPosts(res);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        await PostService.deletePost(id);
        loadPosts();
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <section className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <Link to="/create-post" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Create Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="border p-4 rounded-lg flex justify-between">
                        <h2 className="font-semibold">{post.title}</h2>
                        <div className="flex gap-3">
                            <Link to={`/edit-post/${post._id}`} className="text-blue-600">Edit</Link>
                            <button className="text-red-600" onClick={() => handleDelete(post._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </section>
    );
};

export default Dashboard;
