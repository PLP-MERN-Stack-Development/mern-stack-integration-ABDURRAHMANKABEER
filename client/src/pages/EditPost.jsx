// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
    });

    const loadPost = async () => {
        const data = await PostService.getPostById(id);
        setPost({
        title: data.title,
        content: data.content,
        });
    };

    useEffect(() => {
        loadPost();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await PostService.updatePost(id, post);
        navigate("/dashboard");
    };

    return (
        <section className="max-w-2xl mx-auto p-6">
            <h1 className="text-xl font-bold mb-4">Edit Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="border p-2 w-full"
                    placeholder="Title"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />

                <textarea
                    className="border p-2 w-full h-40"
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                />

                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    Save Changes
                </button>
            </form>
        </section>
    );
};

export default EditPost;
